import { PageResult } from '../model/baseModel';
import { SysExpandData, SysExpandDataRequest } from './model/SysExpandDataModel';
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
  static delete(params: SysExpandDataRequest) {
    return defHttp.post({ url: '/sysExpandData/delete', params }, { isTransformResponse: false });
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  static detail(params: SysExpandDataRequest) {
    return defHttp.get<SysExpandData>({ url: '/sysExpandData/detail', params });
  }

  /**
   * 分页获取列表
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static findPage(params: SysExpandDataRequest) {
    return defHttp.get<PageResult<SysExpandData>>({ url: '/sysExpandData/page', params });
  }
}
