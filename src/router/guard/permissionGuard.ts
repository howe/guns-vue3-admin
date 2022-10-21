import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from '/@/store/modules/permission';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { useSystemStoreWithOut } from '/@/store/modules/system';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { RootRoute } from '/@/router/routes';

import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = RootRoute.path;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const systemStore = useSystemStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath);
      return;
    }

    const token = userStore.getToken;

    // 可以直接输入白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {}
      }
      next();
      return;
    }

    // token 不存在
    if (!token) {
      // 您可以不经许可访问。您需要设置路由元。ignoreAuth为true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // 重定向登录页面
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    } else {
      // 可以获取到token，代表用户已经登录了
      // 校验系统是否初始化过，如果没有初始化过，则进入初始化界面初始化一些后台需要的参数
      if (systemStore.alreadyInitConfig === null || !systemStore.alreadyInitConfig) {
        // 获取是否系统初始化过配置
        let alreadyInit = await SysConfigApi.getInitConfigFlag();

        // 更新store中存储的标识
        systemStore.updateInitFlag(alreadyInit);

        // 如果没有初始化系统配置，并且当前跳转的界面不是init界面，则跳转到init界面
        if (!alreadyInit && to.path !== '/init') {
          // 重定向登录页面
          const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
            path: '/init',
            replace: false,
          };
          if (to.path) {
            redirectData.query = {
              ...redirectData.query,
              redirect: to.path,
            };
          }
          next(redirectData);
          return;
        }
      }
    }

    // 处理登录后跳转到404页
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    // 获取用户信息，而上次获取时间为空
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction('1');
      } catch (err) {
        next();
        return;
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
