import { defHttp } from '/@/utils/http/axios';

/**
 * 主题模板属性api
 *
 * @author fengshuonan
 * @date 2021/12/20 11:19:37
 */
export class ThemeTemplateFieldApi {
  /**
   * 增加主题模板属性
   *
   * @author fengshuonan
   * @date 2021/12/20 11:21:42
   */
  static add(params) {
    return defHttp.post(
      { url: '/sysThemeTemplateField/add', params },
      { isTransformResponse: false },
    );
  }

  /**
   * 删除主题模板属性
   *
   * @author fengshuonan
   * @date 2021/12/20 11:22:55
   */
  static del(params) {
    return defHttp.post(
      { url: '/sysThemeTemplateField/del', params },
      { isTransformResponse: false },
    );
  }

  /**
   * 编辑主题模板属性
   *
   * @author fengshuonan
   * @date 2021/12/20 11:24:57
   */
  static edit(params) {
    return defHttp.post(
      { url: '/sysThemeTemplateField/edit', params },
      { isTransformResponse: false },
    );
  }

  /**
   * 查看主题模板属性详情
   *
   * @author fengshuonan
   * @date 2021/12/20 11:33:37
   */
  static detail(params) {
    return defHttp.get({ url: '/sysThemeTemplateField/detail', params });
  }

  /**
   * 查询系统主题模板属性列表
   *
   * @author fengshuonan
   * @date 2021/12/27 10:13:22
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysThemeTemplateField/findPage', params });
  }

  /**
   * 查询系统主题模板属性已有关系列表
   *
   * @author fengshuonan
   * @date 2021/12/27 10:14:18
   */
  static findRelList(params) {
    return defHttp.get({ url: '/sysThemeTemplateField/findRelList', params });
  }

  /**
   * 查询系统主题模板属性未有关系列表
   *
   * @author fengshuonan
   * @date 2021/12/27 10:15:16
   */
  static findNotRelList(params) {
    return defHttp.get({ url: '/sysThemeTemplateField/findNotRelList', params });
  }
}
