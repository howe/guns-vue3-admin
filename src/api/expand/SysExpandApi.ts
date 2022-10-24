import { defHttp } from '/@/utils/http/axios';

/**
 * 业务拓展api
 *
 * @author fengshuonan
 * @date 2022/03/30 09:53
 */
export class SysExpandApi {
  /**
   * 分页获取列表
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysExpand/page', params });
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static add(params) {
    return defHttp.post({ url: '/sysExpand/add', params }, { isTransformResponse: false });
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static edit(params) {
    return defHttp.post({ url: '/sysExpand/edit', params }, { isTransformResponse: false });
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static delete(params) {
    return defHttp.post({ url: '/sysExpand/delete', params }, { isTransformResponse: false });
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static detail(params) {
    return defHttp.get({ url: '/sysExpand/detail', params });
  }

  /**
   * 更新状态
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static updateStatus(params) {
    return defHttp.post({ url: '/sysExpand/updateStatus', params }, { isTransformResponse: false });
  }

  /**
   * 查询拓展业务列表
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static list(params) {
    return defHttp.get({ url: '/sysExpand/list', params });
  }

  /**
   * 根据拓展业务编码，获取业务的元数据信息
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static getByExpandCode(params) {
    return defHttp.get({ url: '/sysExpand/getByExpandCode', params });
  }

  /**
   * 获取用在列表显示的字段信息
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static getListFields(params) {
    return defHttp.get({ url: '/sysExpand/getListFields', params });
  }
}
