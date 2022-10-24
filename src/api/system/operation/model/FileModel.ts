import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';

export interface SysFileInfoRequest extends BaseRequest {
  /**
   * 文件ID
   */
  fileId?: string;
  /**
   * 文件编码
   */

  fileCode?: string;

  /**
   * 是否为机密文件，Y-是机密，N-不是机密
   */

  secretFlag?: string;

  /**
   * 文件名称（上传时候的文件全名，例如：开发文档.txt）
   */

  fileOriginName?: string;

  /**
   * 其他文件形式传参
   */

  token?: string;

  /**
   * 文件存储位置：1-阿里云，2-腾讯云，3-minio，4-本地
   */

  fileLocation?: number;

  /**
   * 文件仓库（文件夹）
   */

  fileBucket?: string;

  /**
   * 文件后缀
   */

  fileSuffix?: string;

  /**
   * 文件大小kb
   */

  fileSizeKb?: string;
  /**
   * 存储到bucket中的名称，主键id+.后缀
   */

  fileObjectName?: string;

  /**
   * 存储路径
   */

  filePath?: string;
  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}
export interface SysFileInfoResponse extends BaseResponse {
  /**
   * 主键id
   */

  fileId?: string;

  /**
   * 文件编码
   */
  fileCode?: string;

  /**
   * 文件版本
   */
  fileVersion?: string;

  /**
   * 文件状态（0-历史版,1-最新版）
   */

  fileStatus?: string;

  /**
   * 文件后缀，例如.txt
   */

  fileSuffix?: string;

  /**
   * 文件大小kb
   */

  fileSizeKb?: string;

  /**
   * 文件大小信息，计算后的
   */

  fileSizeInfo?: string;

  /**
   * 是否为机密文件
   */

  secretFlag?: string;

  /**
   * 文件的字节
   */

  fileBytes?: string;

  /**
   * 存储到bucket中的名称，主键id+.后缀
   */

  fileObjectName?: string;

  /**
   * 文件存储位置：1-阿里云，2-腾讯云，3-minio，4-本地
   */

  fileLocation?: number;

  /**
   * 文件仓库
   */

  fileBucket?: string;

  /**
   * 文件名称（上传时候的文件名）
   */
  fileOriginName?: string;

  /**
   * 存储路径
   */
  filePath?: string;

  /**
   * 文件访问的路径，如果是私密文件，则返回带鉴权的url，如果不是私密文件，则返回公网能直接访问的url
   */
  fileUrl?: string;

  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}
export interface SysFileInfoListResponse extends BaseResponse {
  /**
   * 主键id
   */
  fileId?: string;

  /**
   * 文件编码
   */

  fileCode?: string;

  /**
   * 文件仓库（文件夹）
   */
  fileBucket?: string;

  /**
   * 存储到bucket中的名称，主键id+.后缀
   */
  fileObjectName?: string;

  /**
   * 是否为机密文件
   */
  secretFlag?: string;

  /**
   * 文件应用Code名称
   */
  fileAppCodeName?: string;
  /**
   * 文件名称（上传时候的文件名）
   */
  fileOriginName?: string;

  /**
   * 文件存储位置：1-阿里云，2-腾讯云，3-minio，4-本地
   */
  fileLocation?: number;

  /**
   * 文件后缀
   */
  fileSuffix?: string;

  /**
   * 文件大小信息，计算后的
   */
  fileSizeInfo?: string;

  /**
   * 文件版本
   */
  fileVersion?: number;

  /**
   * 创建人
   */
  createAccountId?: string;

  /**
   * 创建人部门id
   */
  createDeptId?: string;

  /**
   * 创建人姓名
   */
  createUserName?: string;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 创建人姓名
   */
  realName?: string;

  /**
   * 文件访问的url
   */
  fileUrl?: string;

  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}
export interface SysFileInfo extends BaseResponse {
  /**
   * 主键id
   */
  fileId?: string;

  /**
   * 文件编码
   */

  fileCode?: string;
  /**
   * 文件版本
   */
  fileVersion?: number;
  /**
   * 文件状态（0-历史版,1-最新版）
   */

  fileStatus?: string;
  /**
   * 文件存储位置：1-阿里云，2-腾讯云，3-minio，4-本地
   */
  fileLocation?: number;

  /**
   * 文件仓库（文件夹）
   */
  fileBucket?: string;

  /**
   * 文件名称（上传时候的文件名）
   */
  fileOriginName?: string;

  /**
   * 文件后缀
   */
  fileSuffix?: string;

  /**
   * 文件大小kb
   */

  fileSizeKb?: string;
  /**
   * 文件大小信息，计算后的
   */
  fileSizeInfo?: string;

  /**
   * 存储到bucket中的名称，主键id+.后缀
   */
  fileObjectName?: string;

  /**
   * 存储路径
   */
  filePath?: string;

  /**
   * 是否为机密文件
   */
  secretFlag?: string;

  /**
   * 删除标记：Y-已删除，N-未删除
   */
  delFlag?: string;
}
