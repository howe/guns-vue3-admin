import { defHttp } from '/@/utils/http/axios';

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export function getUserInfo(params) {
  return defHttp.get({ url: '/v3/userInfo', params });
}

/**
 * 修改当前登录的用户密码
 */
export function updatePassword(params) {
  return defHttp.post({ url: '/sysUser/updatePassword', params }, { isTransformResponse: false });
}
