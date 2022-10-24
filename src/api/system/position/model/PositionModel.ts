import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface HrPositionRequest extends BaseRequest {
  /**
   * 主键
   */
  positionId?: string;
  /**
   * 职位名称
   */
  positionName?: string;
  /**
   * 职位编码
   */
  positionCode?: string;
  /**
   * 排序
   */
  positionSort?: number;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 备注
   */
  positionRemark?: string;
  /**
   * 职位id集合（用在批量操作）
   */
  positionIds?: string[];
}

export interface HrPosition extends BaseResponse {
  /**
   * 主键
   */
  positionId: string;
  /**
   * 职位名称
   */
  positionName?: string;
  /**
   * 职位编码
   */
  positionCode?: string;
  /**
   * 排序
   */
  positionSort?: number;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 备注
   */
  positionRemark?: string;
  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}
