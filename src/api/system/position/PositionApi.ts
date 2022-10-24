import { defHttp } from '/@/utils/http/axios';

/**
 * 职位管理的api
 *
 * @author fengshuonan
 * @date 2021/4/8 11:43
 */
export class PositionApi {
  /**
   * 查看分页数据
   *
   * @author fengshuonan
   * @date 2021/4/8 11:46
   */
  static findPage(params) {
    return defHttp.get({ url: '/hrPosition/page', params });
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2021/4/8 11:43
   */
  static add(params) {
    return defHttp.post({ url: '/hrPosition/add', params }, { isTransformResponse: false });
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2021/4/8 11:45
   */
  static del(params) {
    return defHttp.post({ url: '/hrPosition/delete', params }, { isTransformResponse: false });
  }

  /**
   * 批量删除
   *
   * @author fengshuonan
   * @date 2021/4/8 11:45
   */
  static batchDel(params) {
    return defHttp.post({ url: '/hrPosition/batchDelete', params }, { isTransformResponse: false });
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2021/4/8 11:45
   */
  static edit(params) {
    return defHttp.post({ url: '/hrPosition/edit', params }, { isTransformResponse: false });
  }

  /**
   * 查看详情
   *
   * @author fengshuonan
   * @date 2021/4/8 11:46
   */
  static detail(params) {
    return defHttp.post({ url: '/hrPosition/detail', params }, { isTransformResponse: false });
  }

  /**
   * 更新状态
   *
   * @author fengshuonan
   * @date 2021/4/8 13:41
   */
  static updateStatus(params) {
    return defHttp.post(
      { url: '/hrPosition/updateStatus', params },
      { isTransformResponse: false },
    );
  }
}
