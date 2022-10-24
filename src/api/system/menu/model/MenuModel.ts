import { BaseRequest, BaseResponse, INode } from '/@/api/model/baseModel';

/**
 * 菜单
 */
export interface SysMenuRequest extends BaseRequest {
  /**
   * 主键
   */
  menuId?: string;
  /**
   * 父id，顶级节点的父id是-1
   */
  menuParentId?: string;
  /**
   * 菜单的名称
   */
  menuName?: string;
  /**
   * 菜单的编码
   */
  menuCode?: string;
  /**
   * 应用编码
   */
  appCode?: string;
  /**
   * 排序
   */
  menuSort?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 菜单的路径，适用于layui-beetl版本
   */
  layuiPath?: string;
  /**
   * 菜单的图标，适用于layui-beetl版本
   */
  layuiIcon?: string;
  /**
   * 路由地址，浏览器显示的URL，例如/menu，适用于antd vue版本
   */
  antdvRouter?: string;
  /**
   * 图标，适用于antd vue版本
   */
  antdvIcon?: string;
  /**
   * 前端组件名，适用于antd vue版本
   */
  antdvComponent?: string;
  // 外部链接打开方式：1-内置打开外链，2-新页面外链（适用于antd vue版本）
  antdvLinkOpenType?: number;
  /**
   * 外部链接地址
   */
  antdvLinkUrl?: string;
  /**
   * 前台还是后台菜单：1-前台，2-后台，3-前后台都显示
   */
  antdvFrontType?: string;
  visible?: string;
  /**
   * 用于非菜单显示页面的重定向url设置
   */
  antdvActiveUrl?: string;
  isShow?: boolean;
}

export interface SysMenu extends BaseResponse {
  /**
   * 主键
   */
  menuId: string;
  /**
   * 父id，顶级节点的父id是-1
   */
  menuParentId?: string;
  /**
   * 父id集合，中括号包住，逗号分隔
   */
  menuPids?: string;
  /**
   * 菜单的名称
   */
  menuName?: string;
  /**
   * 菜单的编码
   */
  menuCode?: string;
  /**
   * 应用编码
   */
  appCode?: string;
  /**
   * 排序
   */
  menuSort?: number;
  /**
   * 状态：1-启用，2-禁用
   */
  statusFlag?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 菜单的路径，适用于layui-beetl版本
   */
  layuiPath?: string;
  /**
   * 菜单的图标，适用于layui-beetl版本
   */
  layuiIcon?: string;
  /**
   * 是否可见(layui版用)：Y-是，N-否
   */
  layuiVisible?: string;
  /**
   * 路由地址，浏览器显示的URL，例如/menu，适用于antd vue版本
   */
  antdvRouter?: string;
  /**
   * 图标，适用于antd vue版本
   */
  antdvIcon?: string;
  /**
   * 前端组件名，适用于antd vue版本
   */
  antdvComponent?: string;
  /**
   * 外部链接打开方式：1-内置打开外链，2-新页面外链，适用于antd vue版本
   */
  antdvLinkOpenType?: number;
  /**
   * 外部链接地址
   */
  antdvLinkUrl?: string;
  /**
   * 用于非菜单显示页面的重定向url设置
   */
  antdvActiveUrl?: string;
  /**
   * 是否可见(分离版用)：Y-是，N-否
   */
  antdvVisible?: string;
  /**
   * 前台还是后台菜单：1-前台，2-后台，3-前后台都显示
   */
  antdvFrontType?: string;
  /**
   * 是否删除：Y-被删除，N-未删除
   */
  delFlag?: string;
  /**
   * 子节点（表中不存在，用于构造树）
   */
  children?: SysMenu[];
  /**
   * 应用名称
   */
  appName?: string;
  /**
   * 父级菜单的名称
   */
  menuParentName?: string;
  /**
   * 是否是叶子节点菜单
   */
  leafFlag?: boolean;
}

export interface AntdSysMenuDTO {
  title?: string;
  icon?: string;
  path?: string;
  component?: string;
  hide?: boolean;
  active?: string;
  children?: AntdSysMenuDTO[];
}

export interface AntdvMenuItem {
  menuId?: string;
  menuParentId?: string;
  router?: string;
  icon?: string;
  name?: string;
  invisible?: boolean;
  authority?: AntdvMenuAuthorityItem;
  children?: AntdvMenuItem[];
}

export interface AntdvMenuAuthorityItem {
  permission?: string[];
  role?: string[];
}

export interface AntdMenuSelectTreeNode {
  id: '';
  parentId: '';
  title: '';
  value: '';
  weight: number;
  children: AntdMenuSelectTreeNode[];
}

export interface MenuAndButtonTreeResponse {
  /**
   * 节点ID，可以是菜单id和按钮id
   */
  id: string;
  /**
   * 节点父ID
   */
  pid?: string;
  /**
   * 节点名称
   */
  name?: string;
  /**
   * code
   */
  code?: string;
  /**
   * 是否选择(已拥有的是true)
   */
  checked?: boolean;
  /**
   * 当前节点的按钮集合
   */
  buttons?: MenuAndButtonTreeResponse[];
  /**
   * 子节点集合
   */
  children?: MenuAndButtonTreeResponse[] | null;
  totalNodes?: INode[];
  selectedNodes?: string[];
}
