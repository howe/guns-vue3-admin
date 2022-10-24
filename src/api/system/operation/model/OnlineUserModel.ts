import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface OnlineUserRequest extends BaseRequest {
  /**
   * 用户的token
   */
  token?: string;
  /**
   * 账号
   */
  account?: string;
  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}

export interface OnlineUserDTO extends BaseResponse {
  /**
   * 用户的token
   */
  token?: string;
  /**
   * 主键
   */
  userId?: string;
  /**
   * 账号
   */
  account?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 头像
   */
  avatar?: number;
  /**
   * 性别（M-男，F-女）
   */
  sex?: string;
  /**
   * 角色名称
   */
  roleName?: string;

  /**
   * 登录的时间
   */
  loginTime?: string;
  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}
