import { BaseRequest } from '@/api';

/**
 * 系统通知请求参数
 */
export interface SysNoticeRequest extends BaseRequest {
  /**
   * 通知id
   */
  noticeId?: string;
  /**
   * 通知标题
   */
  noticeTitle?: string;
  /**
   * 通知摘要
   */
  noticeSummary?: string;
  /**
   * 通知优先级
   */
  priorityLevel?: string;
  /**
   * 通知开始时间
   */
  noticeBeginTime?: string;
  /**
   * 通知结束时间
   */
  noticeEndTime?: string;
  /**
   * 通知内容
   */
  noticeContent?: string;
  /**
   * 通知范围
   */
  noticeScope?: string;
}

/**
 * 通知信息
 */
export interface SysNotice {
  /**
   * 通知id
   */
  noticeId?: string;
  /**
   * 通知标题
   */
  noticeTitle?: string;
  /**
   * 通知摘要
   */
  noticeSummary?: string;
  /**
   * 通知优先级
   */
  priorityLevel?: string;
  /**
   * 通知开始时间
   */
  noticeBeginTime?: string;
  /**
   * 通知结束时间
   */
  noticeEndTime?: string;
  /**
   * 通知内容
   */
  noticeContent?: string;
  /**
   * 通知范围
   */
  noticeScope?: string;
  /**
   * 是否删除：Y-已删除，N-未删除
   */
  delFlag?: string;
  createTime?: string;
  createUser?: string;
  updateTime?: string;
  updateUser?: string;
}
