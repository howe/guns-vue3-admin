import { defHttp } from '/@/utils/http/axios';

/**
 * 首页统计信息
 *
 * @author fengshuonan
 * @date 2022/2/11 10:18
 */
export class HomeApi {
  /**
   * 首页企业概况统计
   *
   * @author fengshuonan
   * @date 2022/2/11 10:18
   */
  static orgInfoStat(params) {
    return defHttp.get({ url: '/homePage/getHomeCompanyInfo', params });
  }

  /**
   * 获取在线人数统计
   *
   * @author fengshuonan
   * @date 2022/2/11 10:18
   */
  static getOnlineUserStat(params) {
    return defHttp.get({ url: '/homePage/getOnlineUserList', params });
  }

  /**
   * 获取最近操作记录
   *
   * @author fengshuonan
   * @date 2022/2/11 10:18
   */
  static getRecentLogs(params) {
    return defHttp.get({ url: '/homePage/getRecentLogs', params });
  }

  /**
   * 获取常用功能列表
   *
   * @author fengshuonan
   * @date 2022/2/11 10:18
   */
  static getCommonFunctions(params) {
    return defHttp.get({ url: '/homePage/getCommonFunctions', params });
  }
}
