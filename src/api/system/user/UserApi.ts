import { defHttp } from '/@/utils/http/axios';

export class UserApi {
  /**
   * 获取用户列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
   static getUserPages(params) {
    return defHttp.get({ url: '/sysUser/page', params });
  }

  /**
   * 获取用户列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getUserList(params) {
    return defHttp.get({ url: '/sysUser/page', params });
  }

  /**
   * 新增用户
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static addUser(params) {
    return defHttp.post({ url: '/sysUser/add', params }, { isTransformResponse: false });
  }

  /**
   * 修改用户
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static editUser(params) {
    return defHttp.post({ url: '/sysUser/edit', params }, { isTransformResponse: false });
  }

  /**
   * 修改用户状态
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static changeStatus(params) {
    return defHttp.post({ url: '/sysUser/changeStatus', params }, { isTransformResponse: false });
  }

  /**
   * 解除用户冻结
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static unFreezeUser(params) {
    return defHttp.post({ url: '/cancelFreeze', params }, { isTransformResponse: false });
  }

  /**
   * 重置密码
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static resetPwd(params) {
    return defHttp.post({ url: '/sysUser/resetPwd', params }, { isTransformResponse: false });
  }

  /**
   * 删除用户
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static deleteUser(params) {
    return defHttp.post({ url: '/sysUser/delete', params }, { isTransformResponse: false });
  }

  /**
   * 批量删除用户
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static batchDeleteUser(params) {
    return defHttp.post({ url: '/sysUser/batchDelete', params }, { errorMessageMode: 'message' });
  }

  /**
   * 获取职位信息（下拉选择用）
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getPositionDropList(params) {
    return defHttp.get({ url: '/hrPosition/list', params });
  }

  // -----左侧组织机构相关------
  /**
   * 获取左侧组织机构树列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getOrgTeeList(params) {
    return defHttp.get({ url: '/hrOrganization/tree', params });
  }

  /**
   * 获取组织机构详情
   *
   * @param {String} params.orgId - 组织机构id
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getOrgDetail(params) {
    return defHttp.get({ url: '/hrOrganization/detail', params });
  }

  /**
   * 组织机构新增
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static addOrg(params) {
    return defHttp.post({ url: '/hrOrganization/add', params }, { isTransformResponse: false });
  }

  /**
   * 组织机构修改
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static editOrg(params) {
    return defHttp.post({ url: '/hrOrganization/edit', params }, { isTransformResponse: false });
  }

  /**
   * 组织机构删除
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static deleteOrg(params) {
    return defHttp.post({ url: '/hrOrganization/delete', params }, { isTransformResponse: false });
  }

  // -----授权角色界面使用------
  /**
   * 获取所有角色列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getRoleDropList(params) {
    return defHttp.get({ url: '/sysRole/dropDown', params });
  }

  /**
   * 查询用户的所有角色(需要传userId)
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getUserRoles(params) {
    return defHttp.get({ url: '/sysUser/getUserRoles', params });
  }

  /**
   * 授权角色
   *
   * @param {String} params.userId - 用户id
   * @param {Array} params.grantRoleIdList - 角色列表集合
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static grantRoles(params) {
    return defHttp.post({ url: '/sysUser/grantRole', params }, { isTransformResponse: false });
  }

  // -----授权数据界面使用------
  /**
   * 获取授权数据范围列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static getUserBindOrgScope(params) {
    return defHttp.get({ url: '/hrOrganization/userBindOrgScope', params });
  }

  /**
   * 授权数据范围
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static granData(params) {
    return defHttp.post({ url: '/sysUser/grantData', params },  { isTransformResponse: false });
  }

  // -----在线用户界面使用------
  /**
   * 强制踢下线
   *
   * @author fengshuonan
   * @date 2021/4/13 14:47
   */
  static kickOff(params) {
    return defHttp.post({ url: '/sysUser/removeSession', params },  { isTransformResponse: false });
  }

  /**
   * 获取组织机构审批人绑定列表
   *
   * @author fengshuonan
   * @date 2021/4/13 14:47
   */
  static getBindingList(params) {
    return defHttp.get({ url: '/hrOrgApprover/getBindingList', params });
  }

  /**
   * 更新组织机构绑定审批人
   *
   * @author fengshuonan
   * @date 2021/4/13 14:47
   */
  static bindUserList(params) {
    return defHttp.post({ url: '/hrOrgApprover/bindUserList', params }, { isTransformResponse: false });
  }

  /**
   * 删除组织机构绑定审批人
   *
   * @author fengshuonan
   * @date 2021/4/13 14:47
   */
  static hrOrgApproverDelete(params) {
    return defHttp.post({ url: '/hrOrgApprover/delete', params }, { isTransformResponse: false });
  }
}