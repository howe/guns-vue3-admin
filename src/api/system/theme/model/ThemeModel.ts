import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';
export interface SysThemeRequest extends BaseRequest {
  /**
   * 主键ID
   */
  themeId?: string;

  /**
   * 主题名称
   */
  themeName?: string;

  /**
   * 主题属性(JSON格式)
   */
  themeValue?: string;

  /**
   * 主题模板ID
   */
  templateId?: string;
  /**
   * 是否删除标记
   */
  delFlag?: string;
}

export interface SysThemeDTO extends BaseResponse {
  /**
   * 主键ID
   */
  themeId?: string;

  /**
   * 主题名称
   */
  themeName?: string;

  /**
   * 主题属性(JSON格式)
   */
  themeValue?: string;

  /**
   * 主题模板ID
   */
  templateId?: string;

  /**
   * 启用状态：Y-启用，N-禁用
   */
  statusFlag?: string;

  /**
   * 模板名称，用于前端数据渲染
   */
  templateName?: string;

  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除标记
   */
  delFlag?: string;
}

export interface SysTheme extends BaseResponse {
  /**
   * 主键ID
   */
  themeId?: string;

  /**
   * 主题名称
   */
  themeName?: string;

  /**
   * 主题属性(JSON格式)
   */
  themeValue?: string;

  /**
   * 主题模板ID
   */
  templateId?: string;

  /**
   * 启用状态：Y-启用，N-禁用
   */
  statusFlag?: string;

  /**
   * 动态表单的key-value属性
   */
  dynamicForm: Map<string, object>;

  /**
   * 用于编辑界面渲染antdv的临时文件展示
   */
  tempFileList?: Map<string, AntdvFileInfo[]>;
  /**
   * 是否删除标记
   */
  delFlag?: string;
}
export interface AntdvFileInfo {
  /**
   * 文件唯一标识
   */
  uid?: string;

  /**
   * 文件名
   */
  name?: string;

  /**
   * 状态有：uploading done error removed
   */
  status?: string;

  /**
   * 服务端响应内容
   */
  response: '{"status": "success"}';

  /**
   * 下载链接额外的 HTML 属性
   */
  linkProps?: string;

  /**
   * XMLHttpRequest Header
   */
  xhr?: string;

  /**
   * 文件访问的url
   */
  thumbUrl?: string;
}

/**
 * 默认主题
 */
export interface DefaultTheme {
  /**
   * 平台名称
   */
  gunsMgrName?: string;
  /**
   * 登录页背景图片
   */
  gunsMgrLoginBackgroundImg?: string;
  /**
   * 平台LOGO
   */
  gunsMgrLogo?: string;
  /**
   * 浏览器Icon
   */
  gunsMgrFavicon?: string;
  /**
   * 页脚文字
   */
  gunsMgrFooterText?: string;
  /**
   * 备案号
   */
  gunsMgrBeiNo?: string;
  /**
   * 备案号跳转链接
   */
  gunsMgrBeiUrl?: string;
  /**
   * 其他的主题配置
   */
  otherConfigs?: Map<string, string>;
}
