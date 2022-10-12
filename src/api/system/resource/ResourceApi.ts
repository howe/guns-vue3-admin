import { defHttp } from '/@/utils/http/axios';

/**
 * 资源管理
 *
 * @author fengshuonan
 * @date 2021/4/8 11:43
 */
export class ResourceApi {
  /**
   * 查看分页数据
   *
   * @author fengshuonan
   * @date 2021/4/8 11:46
   */
  static findPage(params) {
    return defHttp.get({ url: '/resource/pageList', params });
  }
}
