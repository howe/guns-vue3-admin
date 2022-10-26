/**
 * 按钮级权限控制
 * 使用：
 *
 *  有某个权限才会显示按钮，注意值是字符串，有单引号 -->
 *  <a-button v-permission="'sys:user:add'">添加</a-button>
 *  <!-- 有某些权限(全部都有)才会显示按钮 -->
 *  <a-button v-permission="['sys:user:add','sys:user:edit']">添加</a-button>
 *  <!-- 有任意一个权限才会显示按钮 -->
 *  <a-button v-any-permission="['sys:user:add','sys:user:edit']">添加</a-button>
 *
 *  <!-- 有某个角色才会显示按钮 -->
 *  <a-button v-role="'admin'">添加</a-button>
 *  <!-- 有某些角色才会显示按钮 -->
 *  <a-button v-role="['admin','user']">添加</a-button>
 *  <!-- 有任意一个角色才会显示按钮 -->
 *  <a-button v-any-role="['admin','user']">添加</a-button>
 */
import { useUserStore } from '/@/store/modules/user';
import { usePermissionStore } from '/@/store/modules/permission';

/* 判断数组是否有某些值 */
function arrayHas(array: string[], value: any) {
  if (!value) {
    return true;
  }
  if (!array) {
    return false;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (array.indexOf(value[i]) === -1) {
        return false;
      }
    }
    return true;
  }
  return array.indexOf(value) !== -1;
}

/* 判断数组是否有任意值 */
function arrayHasAny(array: string[], value: any) {
  if (!value) {
    return true;
  }
  if (!array) {
    return false;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (array.indexOf(value[i]) !== -1) {
        return true;
      }
    }
    return false;
  }
  return array.indexOf(value) !== -1;
}

/**
 * 是否有某些角色
 * @param value 角色字符或字符数组
 */
export function hasRole(value: any) {
  const userStore = useUserStore();
  return arrayHas(userStore?.roleList, value);
}

/**
 * 是否有任意角色
 * @param value 角色字符或字符数组
 */
export function hasAnyRole(value: any) {
  const userStore = useUserStore();
  return arrayHasAny(userStore?.roleList, value);
}

/**
 * 是否有某些权限
 * @param value 权限字符或字符数组
 */
export function hasPermission(value: any) {
  const permissionStore = usePermissionStore();
  return arrayHas(permissionStore?.permCodeList, value);
}

/**
 * 是否有任意权限
 * @param value 权限字符或字符数组
 */
export function hasAnyPermission(value: any) {
  const permissionStore = usePermissionStore();
  return arrayHasAny(permissionStore?.permCodeList, value);
}

export default {
  install(app) {
    // 添加自定义指令
    app.directive('role', {
      mounted: (el, binding) => {
        if (!hasRole(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      },
    });
    app.directive('any-role', {
      mounted: (el, binding) => {
        if (!hasAnyRole(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      },
    });
    app.directive('permission', {
      mounted: (el, binding) => {
        if (!hasPermission(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      },
    });
    app.directive('any-permission', {
      mounted: (el, binding) => {
        if (!hasAnyPermission(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      },
    });
  },
};
