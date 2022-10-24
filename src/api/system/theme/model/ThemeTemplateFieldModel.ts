import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysThemeTemplateFieldRequest extends BaseRequest {
  /**
   * 主键ID
   */

  fieldId?: string;

  /**
   * 模板ID
   */
  templateId?: string;

  /**
   * 属性名称
   */
  fieldName?: string;

  /**
   *属性编码
   */
  fieldCode?: string;

  /**
   * 属性展示类型(字典维护)
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
  /**
   * 是否删除标记
   */
  delFlag?: string;
}

export interface SysThemeTemplateField extends BaseResponse {
  /**
   * 主键ID
   */

  fieldId: string;

  /**
   * 属性名称
   */
  fieldName?: string;

  /**
   *属性编码
   */
  fieldCode: string;

  /**
   * 属性展示类型(字典维护)
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
  /**
   * 是否删除标记
   */
  delFlag?: string;
}
