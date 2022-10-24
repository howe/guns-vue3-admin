import type { BaseRequest, PageParam } from '/@/api/model/baseModel';

/**
 * 用户
 */
export interface SysUserRequest extends BaseRequest {
  // 用户id
  userId?: string;
  /**
   * 账号
   */
  account?: string;
  /**
   * 原密码
   */
  password?: string;
  /**
   * 新密码
   */
  newPassword?: string;
  /**
   *确认密码
   */
  repeatPassword?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 性别（M-男，F-女）
   */
  sex?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 手机
   */
  phone?: string;
  /**
   * 电话
   */
  tel?: string;
  /**
   * 授权角色，角色id集合
   */
  grantRoleIdList?: string[];
  /**
   * 授权数据范围，组织机构id集合
   */
  grantOrgIdList?: string[];
  /**
   * 用户所属机构
   */
  orgId?: string;
  /**
   * 用户所属机构的职务
   */
  positionId?: string;
  /**
   * 状态（字典 1正常 2冻结）
   */
  statusFlag?: number;
  /**
   * 用户id集合(用在批量删除)
   */
  userIds?: string[];
  /**
   * 部门的数据范围集合
   */
  scopeOrgIds?: string[];
  /**
   * 用户id的数据范围集合
   */
  userScopeIds?: string[];
}

/**
 * 用户搜索条件
 */
export interface UserParam extends PageParam {
  // 用户id
  userId?: string;
  // 账号
  account?: string;
  // 原密码
  password?: string;
  // 新密码
  newPassword?: string;
  // 昵称
  nickName?: string;
  // 姓名
  realName?: string;
  // 头像
  avatar?: string;
  // 生日
  birthday?: string;
  // 性别（M-男，F-女）
  sex?: string;
  // 邮箱
  email?: string;
  // 手机
  phone?: string;
  // 电话
  tel?: string;
  // 授权角色，角色id集合
  grantRoleIdList?: string[];
  // 授权数据范围，组织机构id集合
  grantOrgIdList?: string[];
  // 用户所属机构
  orgId?: string;
  // 用户所属机构的职务
  positionId?: string;
  // 状态（字典 1正常 2冻结）
  statusFlag?: string;
  // 用户id集合(用在批量删除)
  userIds?: string[];
  // 部门的数据范围集合
  scopeOrgIds?: string[];
  // 用户id的数据范围集合
  userScopeIds?: string[];
}

export interface OnlineUserRequest {
  /**
   * 用户的token
   */
  token?: string;
  /**
   * 用户账号
   */
  account?: string;
}

/**
 * 系统用户结果
 */
export interface SysUserDTO {
  userId: string;
  account?: string;
  nickName?: string;
  realName?: string;
  avatar?: string;
  birthday?: string;
  sex?: string;
  email?: string;
  phone?: string;
  password?: string;
  repeatPassword?: string;
  tel?: string;
  orgId?: string;
  orgName?: string;
  positionId?: string;
  positionName?: string;
  statusFlag?: number;
  grantRoleIdList?: string[];
  superAdminFlag?: string;
}
