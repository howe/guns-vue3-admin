import Request from '@/utils/request-util';

/**
 * 在线用户接口
 *
 * @author fengshuonan
 * @date 2022/5/9 22:34
 */
export class OnlineUserApi {
  /**
   * 获取在线用户列表
   *
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static onlineUserList(params) {
    return Request.getAndLoadData('/sysUser/onlineUserList', params);
  }
}
