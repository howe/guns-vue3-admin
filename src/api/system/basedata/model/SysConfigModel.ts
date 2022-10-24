import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysConfigParam extends BaseRequest {
  /**
   * 主键
   */
  configId?: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 编码
   */
  configCode?: string;
  /**
   * 配置值
   */
  configValue?: string;
  /**
   * 是否是系统参数：Y-是，N-否
   */
  sysFlag?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态：1-正常，2停用
   */
  statusFlag?: number;
  /**
   * 常量所属分类的编码，来自于“常量的分类”字典
   */
  groupCode?: string;
}

// 初始化系统配置参数
export interface ConfigInitRequest {
  sysConfigs?: any;
}

export interface SysConfig extends BaseResponse {
  /**
   * 主键
   */
  configId: string;
  /**
   * 名称
   */
  configName?: string;
  /**
   * 编码
   */
  configCode?: string;
  /**
   * 配置值
   */
  configValue?: string;
  /**
   * 是否是系统参数：Y-是，N-否
   */
  sysFlag?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态：1-正常，2停用
   */
  statusFlag?: number;
  /**
   * 常量所属分类的编码，来自于“常量的分类”字典
   */
  groupCode?: string;
  /**
   * 是否删除：Y-被删除，N-未删除
   */
  delFlag?: string;
}

/**
 * 初始化系统配置参数
 */
export interface ConfigInitItem {
  /**
   * 配置中文名称
   */
  configName?: string;
  /**
   * 配置编码
   */
  configCode: string;
  /**
   * 配置的初始化值
   */
  configValue?: string;
  /**
   * 配置的描述
   */
  configDescription?: string;
}
