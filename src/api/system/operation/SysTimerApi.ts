import { defHttp } from '/@/utils/http/axios';

/**
 * 应用api
 *
 * @author luojie
 * @date 2021/4/13 09:52
 */
export class SysTimerApi {
  /**
   * 获取定时任务列表
   *
   * @author fengshuonan
   * @date 2021/4/12 22:25
   */
  static findTimerPage(params) {
    return defHttp.get({ url: '/sysTimers/page', params });
  }

  /**
   * 新增
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static add(params) {
    return defHttp.post({ url: '/sysTimers/add', params }, { isTransformResponse: false });
  }

  /**
   * 查看定时任务详情
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static detail(params) {
    return defHttp.post({ url: '/sysTimers/detail', params }, { isTransformResponse: false });
  }

  /**
   * 编辑
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static edit(params) {
    return defHttp.post({ url: '/sysTimers/edit', params }, { isTransformResponse: false });
  }

  /**
   * 停止任务
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static stop(params) {
    return defHttp.post({ url: '/sysTimers/stop', params }, { isTransformResponse: false });
  }

  /**
   * 启动任务
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static start(params) {
    return defHttp.post({ url: '/sysTimers/start', params }, { isTransformResponse: false });
  }

  /**
   * 删除单个任务
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static delete(params) {
    return defHttp.post({ url: '/sysTimers/delete', params }, { isTransformResponse: false });
  }

  /**
   * 获取定时任务执行类列表
   *
   * @author luojie
   * @date 2021/4/13 09:52
   */
  static getActionClasses() {
    return defHttp.post({ url: '/sysTimers/getActionClasses' }, { isTransformResponse: false });
  }
}
