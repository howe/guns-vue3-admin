import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, userInfoParams } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/loginApi',
  Logout = '/logoutAction',
  GetUserInfo = '/v3/userInfo',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * 获取api基础路径
 *
 * @author fengshuonan
 * @date 2021/4/1 14:45
 */
export function getBackendDeployUrl() {
  return defHttp.get({ url: '/sysConfig/getBackendDeployUrl' });
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo(params: userInfoParams) {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo, params },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
