/**
 * 修改密码参数
 */
export interface UpdatePasswordParam {
  // 原始密码
  password?: string;
  // 新密码
  newPassword?: string;
  newPassword2?: string;
}
