/*
 * @Author: nxy
 * @Date: 2022-10-11 17:57:49
 */
import { defHttp } from '/@/utils/http/axios';

const API_BASE_PREFIX = import.meta.env.VITE_GLOB_API_URL;
/**
 * 文件上传的url
 */
export const FileUploadUrl = '/sysFileInfo/upload';

/**
 * 文件相关api
 *
 * @author fengshuonan
 * @date 2021/4/1 15:10
 */
export class FileApi {
  /**
   * 获取文件列表，用在文件选择组件
   *
   * @author fengshuonan
   * @date 2022/5/8 20:36
   */
  static findSelectPageList(params) {
    return defHttp.get({ url: '/sysFileInfo/fileInfoListPage', params });
  }

  /**
   * 获取文件列表
   *
   * @author fengshuonan
   * @date 2021/4/1 16:07
   */
  static findPage(params) {
    return defHttp.get({ url: '/sysFileInfo/fileInfoListPage', params });
  }

  /**
   * 通用文件上传
   *
   * 使用示例：
   * let formData = new FormData();
   * formData.append('file', file);
   * FileApi.commonUpload('Y', formData);
   *
   * @param {String} secretFlag  是否是机密文件，Y-是机密文件，N-非机密文件
   * @param {Object} formData   FormData的实例对象，需要在formData中添加file属性
   * @author fengshuonan
   * @date 2021/4/1 14:34
   */
  static commonUpload(secretFlag, params) {
    // 添加secretFlag属性
    params.secretFlag = secretFlag;
    return defHttp.uploadFile({ url: FileUploadUrl }, params);
  }

  /**
   * 删除文件
   *
   * @param {string} params.fileCode 文件编码
   * @author fengshuonan
   * @date 2021/4/12 22:02
   */
  static delete(params) {
    return defHttp.post({ url: '/sysFileInfo/deleteReally', params }, { isTransformResponse: false });
  }

  /**
   * 下载文件
   *
   * @param {string} params.fileId 文件id
   * @param {string} params.secretFlag 是否是私有文件
   * @param {string} params.token 用户的token
   * @author fengshuonan
   * @date 2021/4/12 22:08
   */
  static download(params) {
    if (params.secretFlag === 'Y') {
      window.location.href = `${API_BASE_PREFIX}/sysFileInfo/privateDownload?fileId=${params.fileId}&token=${params.token}`;
    } else {
      window.location.href = `${API_BASE_PREFIX}/sysFileInfo/publicDownload?fileId=${params.fileId}&token=${params.token}`;
    }
  }

  /**
   * 文件详情
   *
   * @param {string} params.fileId 文件id
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static detail(params) {
    return defHttp.get({ url: '/sysFileInfo/detail', params });
  }
}
