import { defHttp } from '/@/utils/http/axios';

/**
 * 操作日志相关的api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:10
 */
export class OperateLogApi {
  /**
   * 获取操作日志列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return defHttp.get({ url: '/logManager/page', params });
  }

  /**
   * 批量删除日志
   *
   * @param {string} params.beginDate 开始日期
   * @param {string} params.endDate 结束日期
   * @param {string} params.appName 服务名称
   * @author fengshuonan
   * @date 2021/4/12 22:02
   */
  static delete(params) {
    return defHttp.post({ url: '/logManager/delete', params }, { isTransformResponse: false });
  }

  /**
   * 查看日志详情
   *
   * @param {string} params.logId 日志id
   * @author fengshuonan
   * @date 2021/4/13 10:37
   */
  static detail(params) {
    return defHttp.get({ url: '/logManager/detail', params });
  }
}
