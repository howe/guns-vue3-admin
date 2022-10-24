import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface DatabaseInfoRequest extends BaseRequest {
  /**
   * 主键id
   */

  dbId?: string;

  /**
   * 数据库名称（英文名称）
   */

  dbName?: string;

  /**
   * jdbc的驱动类型
   */

  jdbcDriver?: string;

  /**
   * jdbc的url
   */

  jdbcUrl?: string;

  /**
   * 数据库连接的账号
   */

  username?: string;

  /**
   * 数据库连接密码
   */
  password?: string;

  /**
   * 数据库schemaName，注意，每种数据库的schema意义不同
   */
  schemaName?: string;

  /**
   * 状态标识：1-正常，2-无法连接
   */
  statusFlag?: number;

  /**
   * 备注，摘要
   */

  remarks?: string;
  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}

export interface DatabaseInfo extends BaseResponse {
  /**
   * 主键id
   */

  dbId?: string;

  /**
   * 数据库名称（英文名称）
   */

  dbName?: string;

  /**
   * jdbc的驱动类型
   */

  jdbcDriver?: string;

  /**
   * jdbc的url
   */

  jdbcUrl?: string;

  /**
   * 数据库连接的账号
   */

  username?: string;

  /**
   * 数据库连接密码
   */

  password?: string;

  /**
   * 数据库的schema名称，每种数据库的schema意义都不同
   */

  schemaName?: string;

  /**
   * 状态标识：1-正常，2-无法连接
   */

  statusFlag?: number;
  /**
   * 无法连接原因
   */

  errorDescription?: string;

  /**
   * 备注，摘要
   */

  remarks?: string;

  /**
   * 是否删除，Y-被删除，N-未删除
   */
  delFlag?: string;
}
