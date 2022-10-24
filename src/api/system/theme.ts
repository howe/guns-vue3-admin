import { defHttp } from '/@/utils/http/axios';

/**
 * 获取api基础路径
 *
 * @author fengshuonan
 * @date 2021/4/1 14:45
 */
export function getCurrentThemeInfo() {
  return defHttp.get({ url: '/theme/currentThemeInfo' });
}
