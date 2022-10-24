import { BaseRequest } from '/@/api/model/baseModel';

export interface SysLoginLogRequest extends BaseRequest {
  /**
   * 主键id
   */
  llgId?: string;
  /**
   * 日志名称
   */
  llgName?: string;
  /**
   * 是否执行成功
   */
  llgSucceed?: string;
  /**
   * 具体消息
   */
  llgMessage?: string;
  /**
   * 登录ip
   */
  llgIpAddress?: string;
  /**
   * 用户id
   */
  userId?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
}

export interface SysLoginLog {
  /**
   * 主键id
   */
  llgId?: string;
  /**
   * 日志名称
   */
  llgName?: string;
  /**
   * 是否执行成功
   */
  llgSucceed?: string;
  /**
   * 具体消息
   */
  llgMessage?: string;
  /**
   * 登录ip
   */
  llgIpAddress?: string;
  /**
   * 用户id
   */
  userId?: string;
  /**
   * 创建时间
   */
  createTime?: string;
}

export interface SysLoginLogDto {
  /**
   * 主键id
   */
  llgId?: string;
  /**
   * 日志名称
   */
  llgName?: string;
  /**
   * 是否执行成功
   */
  llgSucceed?: string;
  /**
   * 具体消息
   */
  llgMessage?: string;
  /**
   * 登录ip
   */
  llgIpAddress?: string;
  /**
   * 用户id
   */
  userId?: string;
  /**
   * 登录姓名
   */
  userName?: string;
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
}
