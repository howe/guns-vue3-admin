import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysMenuButtonRequest extends BaseRequest {
  /**
   * 主键
   */
  buttonId?: string;
  /**
   * 菜单按钮主键集合
   */
  buttonIds?: string[];
  /**
   * 菜单id，按钮需要挂在菜单下
   */
  menuId?: string;
  /**
   * 按钮的名称
   */
  buttonName?: string;
  /**
   * 按钮的编码
   */
  buttonCode?: string;
}

export interface SysMenuButton extends BaseResponse {
  /**
   * 主键
   */
  buttonId: string;
  /**
   * 菜单id，按钮需要挂在菜单下
   */
  menuId?: string;
  /**
   * 按钮的名称
   */
  buttonName?: string;
  /**
   * 按钮的编码
   */
  buttonCode?: string;
}
