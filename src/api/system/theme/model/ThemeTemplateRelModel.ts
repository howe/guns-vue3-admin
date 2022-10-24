import { BaseRequest } from '/@/api/model/baseModel';
export interface SysThemeTemplateRelRequest extends BaseRequest {
  /**
   * 主键ID
   */
  relationId?: string;

  /**
   * 模板ID
   */
  templateId?: string;

  /**
   * 属性编码集合
   */
  fieldCodes?: string[];
}
