/*
 * @Author: nxy
 * @Date: 2022-10-11 17:57:49
 */
import { defHttp } from '/@/utils/http/axios';

/**
 * 数据源操作api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:10
 */
export class DataSourceApi {
  /**
   * 获取数据源信息列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return defHttp.get({ url: '/databaseInfo/page', params });
  }

  /**
   * 新增数据源
   *
   * @param {string} params.dbName 数据源名称
   * @param {string} params.jdbcDriver jdbc驱动
   * @param {string} params.jdbcUrl jdbc url
   * @param {string} params.password jdbc密码
   * @param {string} params.remark 备注
   * @param {string} params.username jdbc账号
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static add(params) {
    return defHttp.post({ url: '/databaseInfo/add', params }, { isTransformResponse: false });
  }

  /**
   * 删除数据源
   *
   * @param {string} params.dbId 数据源id
   * @author fengshuonan
   * @date 2021/4/13 15:12
   */
  static delete(params) {
    return defHttp.post({ url: '/databaseInfo/delete', params }, { isTransformResponse: false });
  }
}
