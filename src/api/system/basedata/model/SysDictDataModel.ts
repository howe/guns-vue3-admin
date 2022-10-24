import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

/**
 * 字典
 */
export interface DictRequest extends BaseRequest {
  /**
   * 字典id
   */
  dictId?: string;
  /**
   * 字典编码
   */
  dictCode?: string;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 字典名称拼音
   */
  dictNamePinYin?: string;
  /**
   * 字典编码
   */
  dictEncode?: string;
  /**
   * 字典类型编码
   */
  dictTypeCode?: string;
  /**
   * 字典简称
   */
  dictShortName?: string;
  /**
   * 字典简称的编码
   */
  dictShortCode?: string;
  /**
   * 上级字典的id
   * <p>
   * 字典列表是可以有树形结构的，但是字典类型没有树形结构
   * <p>
   * 如果没有上级字典id，则为-1
   */
  dictParentId?: string;
  /**
   * 状态(1:启用,2:禁用)，参考 StatusEnum
   */
  statusFlag?: number;
  /**
   * 排序，带小数点
   */
  dictSort?: number;
  /**
   * 所有的父级id,逗号分隔
   */
  dictPids?: string;
  /**
   * 字典类型id，用在作为查询条件
   */
  dictTypeId?: string;
}

/**
 * 字典搜索条件
 */
export interface DictionaryParam {
  dictCode?: string;
  dictName?: string;
}

export interface SysDict extends BaseResponse {
  /**
   * 字典id
   */
  dictId: string;
  /**
   * 字典编码
   */
  dictCode: string;
  /**
   * 字典编码-数值型
   */
  dictCodeNumber: number;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 字典名称首字母
   */
  dictNamePinyin?: string;
  /**
   * 字典编码
   */
  dictEncode?: string;
  /**
   * 字典类型的编码
   */
  dictTypeCode?: string;
  /**
   * 字典简称
   */
  dictShortName?: string;
  /**
   * 字典简称的编码
   */
  dictShortCode?: string;
  /**
   * 上级字典的id(如果没有上级字典id，则为-1)
   */
  dictParentId?: string;
  /**
   * 状态：(1-启用,2-禁用),参考 StatusEnum
   */
  statusFlag?: number;
  /**
   * 排序，带小数点
   */
  dictSort?: number;
  /**
   * 父id集合
   */
  dictPids?: string;
  /**
   * 是否删除，Y-被删除，N-未删除
   */
  delFlag?: string;
  /**
   * 字典类型的名称
   */
  dictTypeName?: string;
  /**
   * 字典上级的名称（字典有上下级，字典类型没有上下级）
   */
  parentName?: string;
}

export interface TreeDictInfo {
  /**
   * 字典id
   */
  dictId: string;
  /**
   * 字典编码
   */
  dictCode?: string;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 上级字典id
   */
  dictParentI?: string;
  /**
   * tree子节点
   */
  children?: TreeDictInfo[];
}
