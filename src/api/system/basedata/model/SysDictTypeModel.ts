import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

/**
 * 字典类型
 */
export interface DictTypeRequest extends BaseRequest {
  /**
   * 字典类型id
   */
  dictTypeId?: string;
  /**
   * 字典类型： 1-业务类型，2-系统类型，参考 DictTypeClassEnum
   */
  dictTypeClass?: number;
  /**
   * 字典类型业务编码
   */
  dictTypeBusCode?: string;
  /**
   * 字典类型编码
   */
  dictTypeCode?: string;
  /**
   * 字典类型名称
   */
  dictTypeName?: string;
  /**
   * 字典类型名词拼音
   */
  dictTypeNamePinYin?: string;
  /**
   * 字典类型描述
   */
  dictTypeDesc?: string;
  /**
   * 字典类型的状态：1-启用，2-禁用，参考 StatusEnum
   */
  statusFlag?: number;
  /**
   * 排序，带小数
   */
  dictTypeSort?: number;
}

export interface SysDictType extends BaseResponse {
  /**
   * 字典类型id
   */
  dictTypeId: string;
  /**
   * 字典类型： 1-业务类型，2-系统类型，参考 DictTypeClassEnum
   */
  dictTypeClass?: string;
  /**
   * 字典类型业务编码
   */
  dictTypeBusCode?: string;
  /**
   * 字典类型编码
   */
  dictTypeCode: string;
  /**
   * 字典类型名称
   */
  dictTypeName?: string;
  /**
   * 字典类型名词拼音
   */
  dictTypeNamePinYin?: string;
  /**
   * 字典类型描述
   */
  dictTypeDesc?: string;
  /**
   * 字典类型的状态：1-启用，2-禁用，参考 StatusEnum
   */
  statusFlag?: number;
  /**
   * 排序，带小数
   */
  dictTypeSort?: number;
  /**
   * 删除标记 Y-已删除，N-未删除，参考 YesOrNotEnum
   */
  delFlag?: string;
}
