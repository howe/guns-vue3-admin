/*
 * @Author: nxy
 * @Date: 2022-10-10 10:01:58
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 字典类型api
 *
 * @author chenjinlong
 * @date 2021/4/13 09:52
 */
export class SysDictTypeApi {
  /**
   * 获取字典类型分页列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findDictTypePage(params) {
    return defHttp.get({ url: '/dictType/page', params });
  }

  /**
   * 新增
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static add(params) {
    return defHttp.post({ url: '/dictType/add', params }, { isTransformResponse: false });
  }

  /**
   * 删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static del(params) {
    return defHttp.post({ url: '/dictType/delete', params }, { isTransformResponse: false });
  }

  /**
   * 批量删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static batchDel(params) {
    return defHttp.post({ url: '/dictType/batchDelete', params }, { isTransformResponse: false });
  }

  /**
   * 修改
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static edit(params) {
    return defHttp.post({ url: '/dictType/edit', params }, { isTransformResponse: false });
  }

  /**
   * 获取字典类型下的所有字典
   *
   * @author fengshuonan
   * @date 2021/4/19 22:42
   */
  static getDictListByParams(params) {
    return defHttp.get({ url: '/dict/list', params });
  }

  /**
   * 获取所有字典类型列表
   *
   * @author fengshuonan
   * @date 2021/4/20 10:41
   */
  static getDictTypeList() {
    return defHttp.get({ url: '/dictType/list' });
  }
}
