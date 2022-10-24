import { BaseRequest, BaseResponse, INode } from '/@/api/model/baseModel';

/**
 * 菜单资源的请求
 */
export interface SysMenuResourceRequest extends BaseRequest {
  /**
   * 业务id不能为空
   */
  businessId: string;
  /**
   * 绑定资源的类型，1：菜单，2：菜单下按钮
   */
  businessType?: number;
  /**
   * 模块下所有的资源
   */
  modularTotalResource?: string[];
  /**
   * 模块下选中的资源
   */
  selectedResource?: string[];
}

export interface ResourceTreeNode {
  /**
   * 资源id
   */
  code: string;
  /**
   * 父级资源id
   */
  parentCode?: string;
  /**
   * 资源名称
   */
  nodeName?: string;
  /**
   * 是否是资源标识
   * <p>
   * true-是资源标识
   * false-虚拟节点，不是一个具体资源
   */
  resourceFlag?: boolean;
  /**
   * 能否选择
   */
  checked?: boolean;
  /**
   * 是否是半开状态（一部分选中）
   */
  indeterminate?: boolean;
  /**
   * 子节点集合
   */
  children?: ResourceTreeNode[];

  totalNodes?: INode[];

  selectedNodes?: string[];
}

export interface ResourceRequest extends BaseRequest {
  /**
   * 资源id
   */
  resourceId?: string;
  /**
   * 应用编码
   */
  appCode?: string;
  /**
   * 资源编码
   */
  resourceCode?: string;
  /**
   * 资源名称
   */
  resourceName?: string;
  /**
   * 项目编码
   */
  projectCode?: string;
  /**
   * 类名称
   */
  className?: string;
  /**
   * 方法名称
   */
  methodName?: string;
  /**
   * 资源模块编码
   */
  modularCode?: string;
  /**
   * 资源模块名称
   */
  modularName?: string;
  /**
   * 资源初始化的服务器ip地址
   */
  ipAddress?: string;
  /**
   * 是否是视图类型：Y-是，N-否
   * 如果是视图类型，url需要以 '/view' 开头，
   * 视图类型的接口会渲染出html界面，而不是json数据，
   * 视图层一般会在前后端不分离项目出现
   */
  viewFlag?: string;
  /**
   * 资源url
   */
  url?: string;
  /**
   * http请求方法
   */
  httpMethod?: string;
  /**
   * 是否需要登录：Y-是，N-否
   */
  requiredLoginFlag?: string;
  /**
   * 是否需要鉴权：Y-是，N-否
   */
  requiredPermissionFlag?: string;
  /**
   * 需要进行参数校验的分组
   * <p>
   * json形式存储
   */
  validateGroups?: string;
  /**
   * 接口参数的字段描述
   * <p>
   * json形式存储
   */
  paramFieldDescriptions?: string;
  /**
   * 接口返回结果的字段描述
   * <p>
   * json形式存储
   */
  responseFieldDescriptions?: string;
  /**
   * 是否是菜单（Y-是，N-否）
   */
  menuFlag?: string;
}

export interface SysResource extends BaseResponse {
  /**
   * 资源id
   */
  resourceId: string;
  /**
   * 应用编码
   */
  appCode?: string;
  /**
   * 资源编码
   */
  resourceCode?: string;
  /**
   * 资源名称
   */
  resourceName?: string;
  /**
   * 项目编码
   */
  projectCode?: string;
  /**
   * 类名称
   */
  className?: string;
  /**
   * 方法名称
   */
  methodName?: string;
  /**
   * 资源模块编码
   */
  modularCode?: string;
  /**
   * 资源模块名称
   */
  modularName?: string;
  /**
   * 资源初始化的服务器ip地址
   */
  ipAddress?: string;
  /**
   * 是否是视图类型：Y-是，N-否
   * 如果是视图类型，url需要以 '/view' 开头，
   * 视图类型的接口会渲染出html界面，而不是json数据，
   * 视图层一般会在前后端不分离项目出现
   */
  viewFlag?: string;
  /**
   * 资源url
   */
  url?: string;
  /**
   * http请求方法
   */
  httpMethod?: string;
  /**
   * 是否需要登录：Y-是，N-否
   */
  requiredLoginFlag?: string;
  /**
   * 是否需要鉴权：Y-是，N-否
   */
  requiredPermissionFlag?: string;
  /**
   * 需要进行参数校验的分组
   * <p>
   * json形式存储
   */
  validateGroups?: string;
  /**
   * 接口参数的字段描述
   * <p>
   * json形式存储
   */
  paramFieldDescriptions?: string;
  /**
   * 接口返回结果的字段描述
   * <p>
   * json形式存储
   */
  responseFieldDescriptions?: string;
  appName: '';
}
