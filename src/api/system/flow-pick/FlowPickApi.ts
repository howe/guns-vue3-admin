import { defHttp } from '/@/utils/http/axios';

/**
 * 流程选人api
 *
 * @author nxy
 * @date 2022/9/26
 */
export class FlowPickApi {
  /**
   * 获取左侧组织机构列表
   *
   * @author nxy
   * @date 2022/5/8 20:36
   */
  static getOrgTreeList(params) {
    return defHttp.post(
      { url: '/hrOrganization/post/getOrgTreeList', params },
      { isTransformResponse: false },
    );
  }

  /**
   * 用户组添加
   *
   * @author nxy
   * @date 2022/5/8 20:36
   */
  static add(params) {
    return defHttp.post({ url: '/sysUserGroup/add', params }, { isTransformResponse: false });
  }

  /**
   * 用户组详情
   *
   * @author nxy
   * @date 2022/5/8 20:36
   */
  static detail(params) {
    return defHttp.get({ url: '/sysUserGroup/detail', params });
  }
}
