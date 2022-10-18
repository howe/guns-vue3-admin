import { defHttp } from '/@/utils/http/axios';

/**
 * 主题api
 *
 * @author fengshuonan
 * @date 2021/12/20 13:42:14
 */
export class ThemeApi {
  /**
   * 添加主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:44:51
   */
  static add(params) {
    return defHttp.post({ url: '/sysTheme/add', params }, { isTransformResponse: false });
  }

  /**
   * 删除主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:46:32
   */
  static del(params) {
    return defHttp.post({ url: '/sysTheme/del', params }, { isTransformResponse: false });
  }

  /**
   * 修改主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:47:43
   */
  static edit(params) {
    return defHttp.post({ url: '/sysTheme/edit', params }, { isTransformResponse: false });
  }

  /**
   * 查询主题
   *
   * @author fengshuonan
   * @date 2021/12/20 13:49:15
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysTheme/findPage', params });
  }

  /**
   * 查询主题详情
   *
   * @author fengshuonan
   * @date 2021/12/20 13:50:38
   */
  static detail(params) {
    return defHttp.get({ url: '/sysTheme/detail', params });
  }

  /**
   * 修改主题启用状态
   *
   * @author fengshuonan
   * @date 2021/12/20 13:51:25
   */
  static updateThemeStatus(params) {
    return defHttp.post({ url: '/sysTheme/updateStatus', params }, { isTransformResponse: false });
  }

  /**
   * 获取当前主题
   *
   * @author fengshuonan
   * @date 2022/1/12 11:52
   */
  static getCurrentThemeInfo(params) {
    return defHttp.get({ url: '/theme/currentThemeInfo', params });
  }
}
