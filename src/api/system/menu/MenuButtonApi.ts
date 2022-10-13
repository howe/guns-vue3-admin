import { defHttp } from '/@/utils/http/axios';

/**
 * 菜单按钮管理api
 *
 * @author jiawei
 * @date 2021/4/13 16:06
 */
export class MenuButtonApi {
  /**
   * 获取分页数据
   *
   * @param {String} params.menuId - 菜单id
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysMenuButton/pageList', params });
  }

  /**
   * 获取菜单按钮列表
   *
   * @author jiawei
   * @date 2021/4/13 16:07
   */
  static getMenuButtonList(params) {
    return defHttp.get({ url: '/sysMenuButton/pageList', params });
  }

  /**
   * 新增菜单按钮
   *
   * @author jiawei
   * @date 2021/4/13 16:07
   */
  static addMenuButton(params) {
    return defHttp.post({ url: '/sysMenuButton/add', params }, { isTransformResponse: false });
  }

  /**
   * 添加系统菜单按钮-默认按钮
   *
   * @author jiawei
   * @date 2021/4/13 16:07
   */
  static addDefaultMenuButton(params) {
    return defHttp.post({ url: '/sysMenuButton/addSystemDefaultButton', params }, { isTransformResponse: false });
  }

  /**
   * 修改菜单按钮
   *
   * @author jiawei
   * @date 2021/4/13 16:07
   */
  static editMenuButton(params) {
    return defHttp.post({ url: '/sysMenuButton/edit', params }, { isTransformResponse: false });
  }

  /**
   * 删除菜单按钮
   *
   * @author jiawei
   * @date 2021/4/13 16:07
   */
  static deleteMenuButton(params) {
    return defHttp.post({ url: '/sysMenuButton/delete', params }, { isTransformResponse: false });
  }

  /**
   * 批量删除菜单按钮
   *
   * @author jiawei
   * @date 2021/4/13 16:07
   */
  static batchDeleteMenuButton(params) {
    return defHttp.post({ url: '/sysMenuButton/batchDelete', params }, { isTransformResponse: false });
  }
}
