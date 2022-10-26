<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="backend"
          :text="t('后台管理')"
          v-if="antdvFrontType === 1 && menuType == 3"
          icon="ion:settings-outline"
        />
        <MenuItem
          key="frontend"
          :text="t('前台管理')"
          v-if="antdvFrontType === 2 && menuType == 3"
          icon="ant-design:appstore-add-outlined"
        />
        <MenuDivider />
        <MenuItem
          key="profile"
          :text="t('个人中心')"
          icon="ant-design:user-outlined"
        />
        <MenuItem
          key="password"
          :text="t('修改密码')"
          icon="ant-design:key-outlined"
        />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
  
  <!-- 修改密码弹窗 -->
  <PasswordModal v-model:visible="passwordVisible"/>
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu } from 'ant-design-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

  import { defineComponent, computed, ref } from 'vue';

  import { DOC_URL } from '/@/settings/siteSetting';

  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';

  import headerImg from '/@/assets/images/header.jpg';
  import { propTypes } from '/@/utils/propTypes';
  import { openWindow } from '/@/utils';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { useSystemStore } from '/@/store/modules/system';
  import PasswordModal from './password-modal.vue';
  import { router } from '/@/router';

  type MenuEvent = 'logout' | 'doc' | 'lock';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      PasswordModal,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getShowDoc, getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();
      const systemStore = useSystemStore();

      // 判断是前台还是后台
      const antdvFrontType = computed(() => {
        return systemStore.antdvFrontType;
      })

      // 显示的前后台类型
      const menuType = computed(() => {
        return Number(localStorage.getItem('menuType'))
      })

      // 是否显示修改密码弹窗
      const passwordVisible = ref<boolean>(false);

      const getUserInfo = computed(() => {
        const { realName = '', avatar, desc } = userStore.getUserInfo || {};
        return { realName, avatar: avatar || headerImg, desc };
      });

      const [register, { openModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      function handleMenuClick(e: MenuInfo) {
        switch (e.key as MenuEvent) {
          case 'logout':
            handleLoginOut();
            break;
          case 'lock':
            handleLock();
            break;
          case 'backend':
            systemStore.setMenuFrontType(2);
            localStorage.setItem('isChange', true);
            // 从新加载系统界面，跳转到首页
            window.location.reload();
            break;
          case 'frontend':
            systemStore.setMenuFrontType(1);
            localStorage.setItem('isChange', true);
            // 从新加载系统界面，跳转到首页
            window.location.reload();
            break;
          case 'password':
            passwordVisible.value = true;
            break;
          case 'profile':
            router.push('/personal/info');
            break;
        }
      }

      return {
        prefixCls,
        t,
        menuType,
        passwordVisible,
        getUserInfo,
        antdvFrontType,
        handleMenuClick,
        getShowDoc,
        register,
        getUseLockPage,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
