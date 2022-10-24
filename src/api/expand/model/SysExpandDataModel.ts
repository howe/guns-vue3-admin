import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';
import { SysExpand } from './SysExpandModel';
import { SysExpandField } from './SysExpandFieldModel';

export interface SysExpandDataRequest extends BaseRequest {
  /**
   * 主键id
   */
  expandDataId?: string;
  /**
   * 拓展业务id
   */
  expandId?: string;
  /**
   * 业务主键id
   */
  primaryFieldValue?: string;
  /**
   * 拓展业务具体数据
   */
  expandData?: string;
}

export interface SysExpandData extends BaseResponse {
  /**
   * 主键id
   */
  expandDataId?: string;
  /**
   * 拓展业务id
   */
  expandId?: string;
  /**
   * 业务主键id
   */
  primaryFieldValue?: string;
  /**
   * 拓展业务具体数据
   */
  expandData?: string;
  expandInfo?: SysExpand;
  fieldInfoList?: SysExpandField[];
}

export interface ExpandDataInfo {
  expandId?: string;
  expandData?: Map<string, object>;
  primaryFieldValue?: string;
}
