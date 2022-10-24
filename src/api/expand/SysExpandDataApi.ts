import { defHttp } from '/@/utils/http/axios';

/**
 * 业务拓展-具体数据api
 *
 * @author fengshuonan
 * @date 2022/03/30 09:53
 */
export class SysExpandDataApi {
  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static delete(params) {
    return defHttp.post({ url: '/sysExpandData/delete', params }, { isTransformResponse: false });
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static detail(params) {
    return defHttp.get({ url: '/sysExpandData/detail', params });
  }

  /**
   * 分页获取列表
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysExpandData/page', params });
  }
}
