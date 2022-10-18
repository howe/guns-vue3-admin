import { defHttp } from '/@/utils/http/axios';

/**
 * 主题模板api
 *
 * @author fengshuonan
 * @date 2021/12/20 11:36:02
 */
export class ThemeTemplateApi {
  /**
   * 增加主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:38:37
   */
  static add(params) {
    return defHttp.post({ url: '/sysThemeTemplate/add', params }, { isTransformResponse: false });
  }

  /**
   * 编辑主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:38:53
   */
  static edit(params) {
    return defHttp.post({ url: '/sysThemeTemplate/edit', params }, { isTransformResponse: false });
  }

  /**
   * 删除主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:40:30
   */
  static del(params) {
    return defHttp.post({ url: '/sysThemeTemplate/del', params }, { isTransformResponse: false });
  }

  /**
   * 查询主题模板
   *
   * @author fengshuonan
   * @date 2021/12/20 11:45:45
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysThemeTemplate/findPage', params });
  }

  /**
   * 查询主题模板列表
   *
   * @author fengshuonan
   * @date 2021/12/29 09:15:48
   */
  static findList(params) {
    return defHttp.get({ url: '/sysThemeTemplate/findList', params });
  }

  /**
   * 修改主题模板状态
   *
   * @author fengshuonan
   * @date 2021/12/20 11:49:24
   */
  static updateTemplateStatus(params) {
    return defHttp.post({ url: '/sysThemeTemplate/updateStatus', params }, { isTransformResponse: false });
  }

  /**
   * 查询主题模板详情
   *
   * @author fengshuonan
   * @date 2021/12/20 11:53:17
   */
  static detail(params) {
    return defHttp.get({ url: '/sysThemeTemplate/detail', params });
  }
}
