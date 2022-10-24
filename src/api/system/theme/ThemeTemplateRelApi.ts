import { defHttp } from '/@/utils/http/axios';

/**
 * 主题模板属性关系api
 *
 * @author fengshuonan
 * @date 2021/12/27 10:18:08
 */
export class ThemeTemplateRelApi {
  /**
   * 增加系统主题属性关系
   *
   * @author fengshuonan
   * @date 2021/12/27 10:19:44
   */
  static add(params) {
    return defHttp.post(
      { url: '/sysThemeTemplateRel/add', params },
      { isTransformResponse: false },
    );
  }

  /**
   * 删除系统主题属性关系
   *
   * @author fengshuonan
   * @date 2021/12/27 10:20:54
   */
  static del(params) {
    return defHttp.post(
      { url: '/sysThemeTemplateRel/del', params },
      { isTransformResponse: false },
    );
  }
}
