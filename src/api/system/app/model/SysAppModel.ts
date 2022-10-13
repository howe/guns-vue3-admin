import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

/**
 * 系统应用请求
 */
export interface SysAppRequest extends BaseRequest {
  /**
   * 主键
   */
  appId?: string;
  /**
   * 名称
   */
  appName?: string;
  /**
   * 编码
   */
  appCode?: string;
  /**
   * 应用图标
   */
  appIcon?: string;
  /**
   * 是否默认激活：Y-是，N-否，激活的应用下的菜单会在首页默认展开
   */
  activeFlag?: string;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 排序-升序
   */
  appSort?: number;
}

/**
 * 系统应用返回信息
 */
export interface SysApp extends BaseResponse {
  /**
   * 主键
   */
  appId: string;
  /**
   * 名称
   */
  appName?: string;
  /**
   * 编码
   */
  appCode?: string;
  /**
   * 应用图标
   */
  appIcon?: string;
  /**
   * 是否默认激活：Y-是，N-否，激活的应用下的菜单会在首页默认展开
   */
  activeFlag?: string;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 排序-升序
   */
  appSort?: number;
}
