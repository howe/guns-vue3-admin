import { defHttp } from '/@/utils/http/axios';

/**
 * 机构管理的api
 *
 * @author chenjinlong
 * @date 2021/4/8 11:43
 */
export class OrganizationApi {
  /**
   * 获取组织机构界面
   *
   * @author fengshuonan
   * @date 2022/5/20 17:18
   */
  static organizationTreeList(params) {
    return defHttp.get({ url: '/hrOrganization/tree', params });
  }

  /**
   * 公司树列表
   *
   * @author fengshuonan
   * @date 2022/5/20 17:18
   */
  static companyTreeList(params) {
    return defHttp.get({ url: '/hrOrganization/companyTree', params });
  }

  /**
   * 树
   *
   * @author chenjinlong
   * @date 2021/4/8 11:43
   */
  static tree(params) {
    return defHttp.get({ url: '/hrOrganization/roleBindOrgScopeAntdv', params });
  }

  /**
   * 新增
   *
   * @author chenjinlong
   * @date 2021/4/8 11:43
   */
  static add(params) {
    return defHttp.post({ url: '/hrOrganization/add', params }, { isTransformResponse: false });
  }

  /**
   * 删除
   *
   * @author chenjinlong
   * @date 2021/4/8 11:45
   */
  static del(params) {
    return defHttp.post({ url: '/hrOrganization/delete', params }, { isTransformResponse: false });
  }

  /**
   * 批量删除
   *
   * @author chenjinlong
   * @date 2021/4/8 11:45
   */
  static batchDel(params) {
    return defHttp.post({ url: '/hrOrganization/batchDelete', params }, { isTransformResponse: false });
  }

  /**
   * 修改
   *
   * @author chenjinlong
   * @date 2021/4/8 11:45
   */
  static edit(params) {
    return defHttp.post({ url: '/hrOrganization/edit', params }, { isTransformResponse: false });
  }

  /**
   * 查看详情
   *
   * @author chenjinlong
   * @date 2021/4/8 11:46
   */
  static detail(params) {
    return defHttp.post({ url: '/hrOrganization/detail', params }, { isTransformResponse: false });
  }

  /**
   * 更新状态
   *
   * @author chenjinlong
   * @date 2021/4/8 13:41
   */
  static updateStatus(params) {
    return defHttp.post({ url: '/hrOrganization/updateStatus', params }, { isTransformResponse: false });
  }

  /**
   * 获取最近选择的条件
   *
   * @author chenjinlong
   * @date 2021/4/8 13:41
   */
   static selector(params) {
    return defHttp.get({ url: '/sysUser/selectorAll', params });
  }
}
