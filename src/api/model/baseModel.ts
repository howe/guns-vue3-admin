export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

/**
 * 请求基类
 */
export interface BaseRequest {
  // 开始时间
  searchBeginTime?: string;
  // 结束时间
  searchEndTime?: string;
  // 分页：每页大小（默认20）
  pageSize?: number;
  // 分页：第几页（从1开始）
  pageNo?: number;
  // 排序字段
  orderBy?: string;
  // 正序或者倒序排列（asc 或 desc）
  sortBy?: string;
  // 他参数（如有需要）
  otherParams?: {};
  // 唯一请求号
  requestNo?: string;
  // 业务节点id
  spanId?: string;
  // 当前登录用户的token
  token?: string;
  // 扩展字段信息
  // expandDataInfo?: ExpandDataInfo;
}

/**
 * 返回基类
 */
export interface BaseResponse {
  createTime?: string;
  createUser?: string;
  createUserName?: string;
  updateTime?: string;
  updateUser?: string;
  updateUserName?: string;
}
/**
 * 接口统一返回结果
 */
export interface ApiResult<T> {
  success?: boolean;
  // 状态码
  code: string;
  // 状态信息
  message?: string;
  // 返回数据
  data: T;
  exceptionClazz?: string;
  exceptionPlace?: string;
  exceptionTip?: string;
}

/**
 * 分页查询统一结果
 */
export interface PageResult<T> {
  // 结果集
  rows?: T[];
  // 总记录数
  totalRows?: number;
  // 总页数
  totalPage?: number;
  // 每页条数
  pageSize?: number;
  // 第几页,从1开始
  pageNo?: number;
}

/**
 * 分页查询基本参数
 */
export interface PageParam {
  // 第几页
  pageNo?: number;
  // 每页多少条
  pageSize?: number;
  // 排序字段
  sort?: string;
  // 排序方式, asc升序, desc降序
  order?: string;
}

/**
 * zTree 插件的节点封装
 */
export interface ZTreeNode {
  id: string;
  pId?: string;
  name?: string;
  open?: boolean;
  checked?: boolean;
  iconSkin?: string;
  children?: ZTreeNode[];
}

export interface INode {
  label?: string;
  value: any;
}
