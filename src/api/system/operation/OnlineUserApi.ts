/*
 * @Author: nxy
 * @Date: 2022-10-11 17:57:49
 */
import { defHttp } from '/@/utils/http/axios';

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
    return defHttp.get({ url: '/sysUser/onlineUserList', params });
  }
}
