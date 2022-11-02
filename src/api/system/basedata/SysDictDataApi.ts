/*
 * @Author: nxy
 * @Date: 2022-10-10 10:01:58
 */
import { PageResult } from '../../model/baseModel';
import { DictRequest, SysDict } from './model/SysDictDataModel';
import { defHttp } from '/@/utils/http/axios';

/**
 * 字典数据api
 *
 * @author chenjinlong
 * @date 2021/4/13 09:52
 */
export class SysDictDataApi {
  /**
   * 获取字典类型分页列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findDictPage(params: DictRequest) {
    return defHttp.get<PageResult<SysDict>>({ url: '/dict/page', params });
  }

  /**
   * 新增
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static add(params: DictRequest) {
    return defHttp.post({ url: '/dict/add', params }, { isTransformResponse: false });
  }

  /**
   * 删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static del(params: DictRequest) {
    return defHttp.post({ url: '/dict/delete', params }, { isTransformResponse: false });
  }

  /**
   * 批量删除
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static batchDel(params: DictRequest) {
    return defHttp.post({ url: '/dict/batchDelete', params }, { isTransformResponse: false });
  }

  /**
   * 修改
   *
   * @author chenjinlong
   * @date 2021/4/1 16:07
   */
  static edit(params: DictRequest) {
    return defHttp.post({ url: '/dict/edit', params }, { isTransformResponse: false });
  }
}
