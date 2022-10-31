import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysExpandRequest extends BaseRequest {
  /**
   * 主键id
   */
  expandId?: string;
  /**
   * 拓展业务名称
   */
  expandName?: string;
  /**
   * 拓展业务唯一编码
   */
  expandCode?: string;
  /**
   * 状态：1-启用，2-禁用
   */
  expandStatus?: number;
  /**
   * 主业务表，例如：sys_user
   */
  primaryTableName?: string;
  /**
   * 业务主键id字段名，例如：user_id
   */
  primaryFieldName?: string;
  /**
   * 业务主键id字段名驼峰法，例如：userId
   */
  primaryFieldCamel?: string;
  /**
   * 业务主键id的值
   */
  primaryFieldValue?: string;
}

export interface SysExpand extends BaseResponse {
  /**
   * 主键id
   */
  expandId: string;
  /**
   * 拓展业务名称
   */
  expandName?: string;
  /**
   * 拓展业务唯一编码
   */
  expandCode?: string;
  /**
   * 状态：1-启用，2-禁用
   */
  expandStatus?: number;
  /**
   * 主业务表，例如：sys_user
   */
  primaryTableName?: string;
  /**
   * 业务主键id字段名，例如：user_id
   */
  primaryFieldName?: string;
  /**
   * 业务主键id字段名驼峰法，例如：userId
   */
  primaryFieldCamel?: string;
}
