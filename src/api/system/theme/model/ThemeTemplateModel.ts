import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';
export interface SysThemeTemplateRequest extends BaseRequest {
  /**
   * 主键ID
   */
  templateId?: string;

  /**
   * 主题模板名称
   */
  templateName?: string;

  /**
   * 主题模板编码
   */
  templateCode?: string;

  /**
   * 主题模板类型：1-系统类型，2-业务类型
   */
  templateType?: string;

  /**
   * 主题模板启用状态：Y-启用，N-禁用
   */
  statusFlag?: string;
  /**
   * 是否删除标记
   */
  delFlag?: string;
}

export interface SysThemeTemplate extends BaseResponse {
  /**
   * 主键ID
   */
  templateId: string;

  /**
   * 主题模板名称
   */
  templateName?: string;

  /**
   * 主题模板编码
   */
  templateCode?: string;

  /**
   * 主题模板类型：1-系统类型，2-业务类型
   */
  templateType?: string;

  /**
   * 主题模板启用状态：Y-启用，N-禁用
   */
  statusFlag?: string;
  /**
   * 是否删除标记
   */
  delFlag?: string;
}

export interface SysThemeTemplateDataDTO extends BaseResponse {
  /**
   * 主键ID
   */
  templateId?: string;

  /**
   * 主题模板名称
   */
  templateName?: string;

  /**
   * 主题模板编码
   */

  templateCode?: string;

  /**
   * 主键ID
   */

  fieldId: string;

  /**
   * 属性名称
   */
  fieldName?: string;

  /**
   * 属性编码
   */
  fieldCode: string;

  /**
   * 属性展示类型
   */

  fieldType?: string;

  /**
   * 是否必填：Y-必填，N-非必填
   */
  fieldRequired?: string;

  /**
   * 属性长度
   */
  fieldLength?: number;

  /**
   * 属性描述
   */
  fieldDescription?: string;
}
