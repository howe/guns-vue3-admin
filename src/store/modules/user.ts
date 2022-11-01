import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/system/model/userModel';
import { doLogout, getUserInfo, loginApi } from '/@/api/system/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { useSystemStore } from '/@/store/modules/system';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { setMenu, formatMenus, valueIsExistTree } from '/@/utils/common/util';
import { h } from 'vue';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  allMenuList: any;
  menuList: any;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // 用户信息
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    // 所有的菜单集合
    allMenuList: [],
    // 当前菜单集合
    menuList: [],
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    // 设置所有应用菜单列表
    setAllMenuList(list: string[]) {
      this.allMenuList = setMenu(list);
    },
    // 设置当前菜单列表
    setMenuList(list: string[]) {
      this.menuList = [list];
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data: any = await loginApi(loginParams, mode);
        localStorage.setItem('menuType', data.loginUser.menuType);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction('2');
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }

        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    // 获取用户信息
    async getUserInfoAction(flag: string): Promise<UserInfo | null> {
      const systemStore = useSystemStore();
      if (!this.getToken) return null;
      // 当前菜单类型
      let antdvMenuFrontType = systemStore.antdvFrontType;
      // 从后台获取的菜单类型
      let menuType: any = localStorage.getItem('menuType');
      if (menuType) {
        menuType = parseInt(menuType);
        if (menuType == 1) {
          // 只有前台
          antdvMenuFrontType = 1;
        } else if (menuType == 2) {
          // 只有后台
          antdvMenuFrontType = 2;
        } else if (menuType == 3) {
          // 都有
          const sessionFrontType = localStorage.getItem('antdvFrontType');
          if (sessionFrontType) {
            antdvMenuFrontType = parseInt(sessionFrontType);
          }
        }
      }
      const userInfo = await getUserInfo({ menuFrontType: antdvMenuFrontType });
      // 存所有菜单
      // 当前浏览器所在的路径
      const currentPath = window.location.pathname;
      // 当前菜单列表
      let currentMentList: any = {};
      if (userInfo?.authorities) {
        this.setAllMenuList(userInfo.authorities);
        // 获取当前菜单列表
        if (userInfo.authorities && userInfo.authorities.length) {
          userInfo.authorities.forEach((pathItem) => {
            if (valueIsExistTree(pathItem.children, 'path', currentPath, 'children')) {
              currentMentList = pathItem;
            }
          });

          if (JSON.stringify(currentMentList) == '{}') {
            currentMentList = userInfo.authorities[0];
          }
        }
        // 设置菜单列表
        this.setMenuList(currentMentList);
        // 获取跳转的首页路径
        const { homePath } = formatMenus(userInfo?.authorities[0]?.children, '');
        if (homePath) {
          userInfo.homePath = homePath;
        }
      }
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.roleCode) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      // 刷新时，更换路由
      if (flag == '1' && localStorage.getItem('isChange')) {
        await router.replace(userInfo?.homePath);
        localStorage.removeItem('isChange');
      }
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      if (localStorage.getItem('antdvFrontType')) {
        localStorage.removeItem('antdvFrontType');
      }

      if (localStorage.getItem('menuType')) {
        localStorage.removeItem('menuType');
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
