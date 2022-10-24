import { defHttp } from '/@/utils/http/axios';

/**
 * 业务拓展-字段信息api
 *
 * @author fengshuonan
 * @date 2022/03/30 09:53
 */
export class SysExpandFieldApi {
  /**
   * 获取所有字段列表
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysExpandField/page', params });
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static add(params) {
    return defHttp.post({ url: '/sysExpandField/add', params }, { isTransformResponse: false });
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static edit(params) {
    return defHttp.post({ url: '/sysExpandField/edit', params }, { isTransformResponse: false });
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static delete(params) {
    return defHttp.post({ url: '/sysExpandField/delete', params }, { isTransformResponse: false });
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static detail(params) {
    return defHttp.get({ url: '/sysExpandField/detail', params });
  }
}
