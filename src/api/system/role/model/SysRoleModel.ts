import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysRoleRequest extends BaseRequest {
  /**
   * 主键
   */
  roleId?: string;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 角色编码
   */
  roleCode?: string;
  /**
   * 排序
   */
  roleSort?: number;
  /**
   * 数据范围类型：10-仅本人数据，20-本部门数据，30-本部门及以下数据，40-指定部门数据，50-全部数据
   */
  dataScopeType?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态（字典 1正常 2停用）
   */
  statusFlag?: number;
  /**
   * 是否是系统角色：Y-是，N-否
   */
  roleSystemFlag?: string;
  /**
   * 角色类型
   */
  roleTypeCode?: string;
  /**
   * 授权资源
   */
  grantResourceList?: string[];
  /**
   * 授权资源，模块组包含的所有资源
   */
  modularTotalResource?: string[];
  /**
   * 授权资源，模块组选中的资源
   */
  selectedResource?: string[];
  /**
   * 授权数据
   */
  grantOrgIdList?: string[];
  /**
   * 授权菜单
   */
  grantMenuIdList?: string[];
  /**
   * 授权菜单按钮
   */
  grantMenuButtonIdList?: SysRoleMenuButtonRequest[];
  /**
   * 是否是新增绑定菜单，true-新增绑定菜单，false-取消绑定菜单
   */
  grantAddMenuFlag?: boolean;
  /**
   * 绑定菜单的id
   */
  grantMenuId?: string;
  /**
   * 模块下所有的按钮id
   */
  modularButtonIds?: string[];
  /**
   * 模块下选中的按钮id
   */
  selectedButtonIds?: string[];
  /**
   * 绑定标识，true-新增绑定菜单，false-取消绑定菜单
   */
  selectBindFlag?: boolean;
}

export interface SysRoleDTO extends BaseRequest {
  /**
   * 主键
   */
  roleId?: string;
  /**
   * 名称
   */
  roleName?: string;
  /**
   * 编码
   */
  roleCode?: string;
  /**
   * 排序
   */
  roleSort?: number;
  /**
   * 数据范围类型：10-仅本人数据，20-本部门数据，30-本部门及以下数据，40-指定部门数据，50-全部数据
   */
  dataScopeType?: number;
  /**
   * 数据范围类型枚举
   */
  dataScopeTypeEnum?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 是否是系统角色：Y-是，N-否
   */
  roleSystemFlag?: string;
  /**
   * 角色类型
   */
  roleTypeCode?: string;
}

/**角色按钮 */
export interface SysRoleMenuButtonRequest {
  buttonId?: string;
  buttonCode?: string;
}

export interface SysUserRole extends BaseResponse {
  /**
   * 主键
   */
  userRoleId: string;
  /**
   * 用户id
   */
  userId: string;
  /**
   * 角色id
   */
  roleId: string;
}

export interface SysRole extends BaseResponse {
  /**
   * 主键
   */
  roleId: string;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 角色编码
   */
  roleCode?: string;
  /**
   * 排序
   */
  roleSort?: number;
  /**
   * 数据范围类型：10-仅本人数据，20-本部门数据，30-本部门及以下数据，40-指定部门数据，50-全部数据
   */
  dataScopeType?: number;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 删除标记（Y-已删除，N-未删除）
   */
  delFlag?: string;
  /**
   * 是否是系统角色：Y-是，N-否
   */
  roleSystemFlag?: string;
  /**
   * 角色类型
   */
  roleTypeCode?: string;
}
