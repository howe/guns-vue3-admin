import { defHttp } from '/@/utils/http/axios';

/**
 * 资源api
 *
 * @author chenjinlong
 * @date 2021/4/7 11:47
 */
export class SysResourceApi {
  /**
   * 获取角色资源列表
   *
   * @author chenjinlong
   * @date 2021/4/7 11:47
   */
  static async getResourceList(params) {
    return await defHttp.get({ url: '/resource/getRoleResourceTreeAntdv', params });
  }

  /**
   * 获取菜单绑定资源的列表
   *
   * @author fengshuonan
   * @date 2021/8/8 22:55
   */
  static async getMenuResourceList(params) {
    return await defHttp.get({ url: '/sysMenuResource/getMenuResourceList', params });
  }
}
