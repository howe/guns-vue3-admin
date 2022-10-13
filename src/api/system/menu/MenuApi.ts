import { defHttp } from '/@/utils/http/axios';

/**
 * 菜单管理api
 *
 * @author jiawei
 * @date 2021/4/7 11:47
 */
export class MenuApi {
  /**
   * 获取表格数据
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findTableMenus(params) {
    return defHttp.get({ url: '/sysMenu/list', params });
  }

  /**
   * 获取菜单列表
   *
   * @author jiawei
   * @date 2021/4/7 11:47
   */
  static async getMenuList(params) {
    return await defHttp.get({ url: '/sysMenu/list', params });
  }

  /**
   * 新增菜单
   *
   * @author jiawei
   * @date 2021/4/7 11:47
   */
  static async addMenu(params) {
    return await defHttp.post({ url: '/sysMenu/add', params }, { isTransformResponse: false });
  }

  /**
   * 修改菜单
   *
   * @author jiawei
   * @date 2021/4/7 11:47
   */
  static async editMenu(params) {
    return await defHttp.post({ url: '/sysMenu/edit', params }, { isTransformResponse: false });
  }

  /**
   * 删除菜单
   *
   * @author jiawei
   * @date 2021/4/7 11:47
   */
  static async deleteMenu(params) {
    return await defHttp.post({ url: '/sysMenu/delete', params }, { isTransformResponse: false });
  }

  /**
   * 获取系统菜单树（用于新增，编辑时选择上级节点）
   *
   * @author jiawei
   * @date 2021/4/7 11:47
   */
  static async getMenuTree(params) {
    return await defHttp.get({ url: '/sysMenu/tree', params });
  }

  /**
   * 获取应用（选择菜单所属应用时使用）
   *
   * @author jiawei
   * @date 2021/4/7 11:47
   */
  static async getAppDropList(params) {
    return await defHttp.get({ url: '/sysApp/list', params });
  }

  /**
   * 绑定菜单和资源
   *
   * @author fengshuonan
   * @date 2021/8/10 14:57
   */
  static async addMenuResourceBind(params) {
    return await defHttp.post({ url: '/sysMenuResource/addMenuResourceBind', params }, { isTransformResponse: false });
  }
}
