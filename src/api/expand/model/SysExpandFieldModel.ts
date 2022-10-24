import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysExpandFieldRequest extends BaseRequest {
  /**
   * 主键id
   */
  fieldId?: string;
  /**
   * 对应拓展业务的主键id
   */
  expandId?: string;
  /**
   * 字段中文名称，例如：身份证号
   */
  fieldName?: string;
  /**
   * 字段英文名称，例如：idCard
   */
  fieldCode?: string;
  /**
   * 字段类型：1-字符串类型，2-数字类型，3-字典类型
   */
  fieldType?: number;
  /**
   * 是否必填：Y-必填，N-非必填
   */
  fieldRequired?: string;
  /**
   * 属性值长度，用于数字类型
   */
  fieldLength?: number;
  /**
   * 字典类型编码，用于字典类型
   */
  fieldDictTypeCode?: string;
  /**
   * 列表是否显示：Y-显示，N-不显示
   */
  listShowFlag?: string;
}

export interface ExpandFieldInfo {
  /**
   * 拓展id
   */
  expandId?: string;
  /**
   * 字段中文名
   */
  fieldName?: string;
  /**
   * 字段英文名
   */
  fieldCode?: string;
}

export interface SysExpandField extends BaseResponse {
  /**
   * 主键id
   */
  fieldId?: string;
  /**
   * 对应拓展业务的主键id
   */
  expandId?: string;
  /**
   * 字段中文名称，例如：身份证号
   */
  fieldName?: string;
  /**
   * 字段英文名称，例如：idCard
   */
  fieldCode?: string;
  /**
   * 字段类型：1-字符串类型，2-数字类型，3-字典类型
   */
  fieldType?: number;
  /**
   * 是否必填：Y-必填，N-非必填
   */
  fieldRequired?: string;
  /**
   * 属性值长度，用于数字类型
   */
  fieldLength?: string;
  /**
   * 字典类型编码，用于字典类型
   */
  fieldDictTypeCode?: string;
  /**
   * 列表是否显示：Y-显示，N-不显示
   */
  listShowFlag?: string;
}
