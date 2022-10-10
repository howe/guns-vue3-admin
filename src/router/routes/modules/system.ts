/*
 * @Author: nxy
 * @Date: 2022-10-09 13:45:58
 */
import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/user',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('系统用户'),
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('/@/views/system/user/index.vue'),
      meta: {
        title: t('用户管理'),
      },
    },
    {
      path: 'organization',
      name: 'Organization',
      component: () => import('/@/views/system/organization/index.vue'),
      meta: {
        title: t('机构管理'),
      },
    },
  ],
}

export default system;