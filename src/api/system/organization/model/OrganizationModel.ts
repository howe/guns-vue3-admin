import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface HrOrganizationRequest extends BaseRequest {
  /**
   * 主键
   */
  orgId?: string;
  /**
   * 父id
   */
  orgParentId?: string;
  /**
   * 父ids
   */
  orgPids?: string;
  /**
   * 组织名称
   */
  orgName?: string;
  /**
   * 组织编码
   */
  orgCode?: string;
  /**
   * 排序
   */
  orgSort?: number;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 组织机构类型：1-公司，2-部门
   */
  orgType?: number;
  /**
   * 税号
   */
  taxNo?: string;
  /**
   * 描述
   */
  orgRemark?: string;
  /**
   * 角色id
   */
  roleId?: string;
  /**
   * 用户id（作为查询条件）
   */
  userId?: string;
}

export interface HrOrganization extends BaseResponse {
  /**
   * 主键
   */
  orgId: string;
  /**
   * 父id
   */
  orgParentId?: string;
  /**
   * 父ids
   */
  orgPids?: string;
  /**
   * 组织名称
   */
  orgName?: string;
  /**
   * 组织编码
   */
  orgCode?: string;
  /**
   * 排序
   */
  orgSort?: number;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 组织机构类型：1-公司，2-部门
   */
  orgType?: number;
  /**
   * 税号
   */
  taxNo?: string;
  /**
   * 描述
   */
  orgRemark?: string;
  delFlag?: string;
  children?: HrOrganization[];
}

/**
 * 组织机构树节点
 */
export interface OrganizationTreeNode {
  /**
   * 父id，一级节点父id是0
   */
  parentId: string;
  /**
   * 节点名称
   */
  title?: string;
  /**
   * 节点值
   */
  id: string;
  /**
   * 是否展开状态 不展开-false 展开-true
   */
  spread?: boolean;
  /**
   * 是否选中
   */
  selected?: boolean;
  /**
   * 组织名称
   */
  orgName?: string;
  /**
   * 组织编码
   */
  orgCode?: string;
  /**
   * 排序
   */
  orgSort?: number;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 组织机构类型：1-公司，2-部门
   */
  orgType?: number;
  /**
   * 税号
   */
  taxNo?: string;
  /**
   * 组织机构描述
   */
  orgRemark?: string;
  /**
   * 子节点的集合
   */
  children: OrganizationTreeNode[];
}
