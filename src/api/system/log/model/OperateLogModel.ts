import { BaseRequest } from '/@/api/model/baseModel';

export interface LogManagerRequest extends BaseRequest {
  /**
   * 单条日志id
   */
  logId?: string;
  /**
   * 查询的起始时间
   */
  beginDate?: string;
  /**
   * 查询日志的结束时间
   */
  endDate?: string;
  /**
   * 日志的名称，一般为业务名称
   */
  logName?: string;
  /**
   * 服务名称，一般为spring.application.name
   */
  appName?: string;
  /**
   * 当前服务器的ip
   */
  serverIp?: string;
  /**
   * 客户端请求的用户id
   */
  userId?: string;
  /**
   * 客户端的ip
   */
  clientIp?: string;
  /**
   * 当前用户请求的url
   */
  requestUrl?: string;
}

export interface LogRecordDTO {
  /**
   * 日志id
   */
  logId: string;
  /**
   * 日志的名称，一般为业务名称
   */
  logName?: string;
  /**
   * 日志记录的内容
   */
  logContent?: {};
  /**
   * 服务名称，一般为spring.application.name
   */
  appName?: string;
  /**
   * http或方法的请求参数体
   */
  requestParams?: string;
  /**
   * http或方法的请求结果
   */
  requestResult?: string;
  /**
   * 操作发生的时间
   */
  dateTime?: string;
  /**
   * 当前服务器的ip
   */
  serverIp?: string;
  /**
   * 客户端请求的token
   * <p>
   * 如果是http请求，并且用户已经登录，可以带这项
   */
  token?: string;
  /**
   * 客户端请求的用户id
   * <p>
   * 如果是http请求，并且用户已经登录，可以带这项
   */
  userId?: string;
  realName?: string;
  /**
   * 客户端的ip
   * <p>
   * 如果是http请求，可以带这项
   */
  clientIp?: string;
  /**
   * 当前用户请求的requestUrl
   * <p>
   * 如果是http请求，可以带这项
   */
  requestUrl?: string;
  /**
   * 请求方式（GET POST PUT DELETE)
   * <p>
   * 如果是http请求，可以带这项
   */
  httpMethod?: string;
  /**
   * 浏览器
   * <p>
   * 如果是http请求，可以带这项
   */
  clientBrowser?: string;
  /**
   * 操作系统
   * <p>
   * 如果是http请求，可以带这项
   */
  clientOs?: string;
  /**
   * 创建时间
   */
  createTime?: string;
}
