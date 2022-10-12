import { defHttp } from '/@/utils/http/axios';

/**
 * 应用api
 *
 * @author chenjinlong
 * @date 2021/4/1 16:06
 */
export class SysAppApi {
  /**
   * 分页获取列表
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysApp/page', params });
  }

  /**
   * 新增
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static add(params) {
    return defHttp.post({ url: '/sysApp/add', params }, { isTransformResponse: false });
  }

  /**
   * 删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static del(params) {
    return defHttp.post({ url: '/sysApp/delete', params }, { isTransformResponse: false });
  }

  /**
   * 批量删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static batchDel(params) {
    return defHttp.post({ url: '/sysApp/batchDelete', params }, { isTransformResponse: false });
  }

  /**
   * 修改
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static edit(params) {
    return defHttp.post({ url: '/sysApp/edit', params }, { isTransformResponse: false });
  }

  /**
   * 激活默认应用
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static active(params) {
    return defHttp.post({ url: '/sysApp/updateActiveFlag', params }, { isTransformResponse: false });
  }

  /**
   * 获取系统顶部导航的应用列表
   *
   * @author fengshuonan
   * @date 2021/4/21 16:20
   */
  static getAppList() {
    return defHttp.get({ url: '/sysMenu/getTopAppList' });
  }

  /**
   * 更新应用状态
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static updateStatus(params) {
    return defHttp.post({ url: '/sysApp/updateStatus', params }, { isTransformResponse: false });
  }
}
