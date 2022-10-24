import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysTimersParam extends BaseRequest {
  /**
   * 定时器id
   */
  timerId?: string;
  /**
   * 任务名称
   */
  timerName?: string;
  /**
   * 执行任务的class的类名（实现了TimerTaskRunner接口的类的全称）
   */
  actionClass?: string;

  /**
   * 定时任务表达式
   */
  cron?: string;

  /**
   * 状态（字典 1运行  2停止）
   */
  jobStatus?: number;
  /**
   * 参数
   */
  params?: string;
  /**
   * 备注信息
   */
  remark?: string;

  /**
   * 是否删除标记
   */
  delFlag?: string;
}

export interface SysTimers extends BaseResponse {
  /**
   * 定时器id
   */
  timerId?: string;
  /**
   * 任务名称
   */
  timerName?: string;
  /**
   * 定时任务表达式
   */
  cron?: string;

  /**
   * 状态（字典 1运行  2停止）
   */
  jobStatus?: number;

  /**
   * 参数
   */
  params?: string;

  /**
   * 备注信息
   */
  remark?: string;

  /**
   * 是否删除标记
   */
  delFlag?: string;
}
