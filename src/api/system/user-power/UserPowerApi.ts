import { defHttp } from '/@/utils/http/axios';

/**
 * 用户管理api
 *
 * @author fengshuonan
 * @date 2021/4/1 16:06
 */
export class UserPowerApi {
  /**
   * 获取用户角色列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getRoleSelectList(params) {
    return defHttp.get({ url: '/sysRole/getRoleSelectList', params });
  }

  /**
   * 获取管理员列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getAdminList(params) {
    return defHttp.get({ url: '/sysUser/backAuth/getAdminList', params });
  }

  /**
   * 添加管理员
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static addAdmin(params) {
    return defHttp.post(
      { url: '/sysUser/backAuth/addAdmin', params },
      { isTransformResponse: false },
    );
  }

  /**
   * 删除管理员
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static delAdmin(params) {
    return defHttp.post(
      { url: '/sysUser/backAuth/delAdmin', params },
      { isTransformResponse: false },
    );
  }
}
