import { router } from '/@/router';
import { useUserStoreWithOut } from '/@/store/modules/user';
import JSEncrypt from 'jsencrypt';

// 定义公钥
const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCochIaKWEh6IIK1pJQcJPsYhZ2AJmGNc12XeC2lsj3dHkMO9vGrXN4ZJiN3qNLlO3hERtY0UZdN8Uz18zoiL60XoOclMuuwf1TwiMA3/4Vy2NOaQdX/RgLQ8XiRobVPLMe/JTteZ6eoPrWVC5jf4kdWD7LWwgdWrnzGs/4UiWnsQIDAQAB`;

/**
 * @author: nxy
 * @Date: 2022-10-10 14:18:30
 * @param {*} value 验证邮箱是否正确
 */
export function emailReg(value: string | number) {
  const exp: any = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return exp.test(value);
}

/**
 * @author: nxy
 * @Date: 2022-10-10 14:19:06
 * @param {*} value 验证手机号是否正确
 */
export function phoneReg(value: string | number) {
  const exp: any = /^1\d{10}$/;
  return exp.test(value);
}

/**
 * @author: nxy
 * @Date: 2022-10-11 14:15:35
 * @param {any} arr 菜单数组
 */
export function setMenu(arr: any) {
  arr.forEach((arrItem) => {
    arrItem.name = arrItem.title;
    arrItem.meta = {};
    arrItem.meta.title = arrItem.title;
    arrItem.meta.hideMenu = arrItem.hide;
    arrItem.meta.icon = arrItem.icon;
    if (arrItem.children) arrItem.component = 'LAYOUT';
    arrItem.meta.orderNo = arrItem.sortNumber;

    if (arrItem.children && arrItem.children.length > 0) {
      arrItem.children = setMenu(arrItem.children);
    }
  });
  return arr;
}

/**
 * 遍历children形式数据
 * @param data 需要遍历的数组
 * @param callback 回调
 * @param childKey children字段名
 */
export function eachTreeData(data: any, callback: any, childKey = 'children') {
  if (!data || !data.length) {
    return;
  }
  data.forEach((d) => {
    if (callback(d) !== false && d[childKey]) {
      eachTreeData(d[childKey], callback, childKey);
    }
  });
}

/**
 * 删除空的children对象，为了显示树形菜单时不显示多余的 + 号
 *
 * @author fengshuonan
 * @date 2022/5/20 18:33
 */
export function deleteEmptyChild(nodes: any) {
  for (const thisNode of nodes) {
    if (!thisNode) {
      continue;
    }
    if (thisNode.children && thisNode.children.length === 0) {
      delete thisNode.children;
    } else if (thisNode.children && thisNode.children.length > 0) {
      thisNode.children = deleteEmptyChild(thisNode.children);
    }
  }
  return nodes;
}

/**
 * 退出登录
 * @param route 是否使用路由跳转
 * @param from 登录后跳转的地址
 */
export function logout(route: boolean, from: any) {
  const userStore = useUserStoreWithOut();
  userStore.setToken(undefined);
  if (route) {
    router.push({
      path: '/login',
    });
  } else {
    // 这样跳转避免再次登录重复注册动态路由
    location.replace('/login' + (from ? '?redirect=' + from : ''));
  }
}

/**
 * rsa加密
 * @author: nxy
 * @Date: 2022-10-16 21:53:44
 */
export function RsaEncry(data: any) {
  // 使用 RSA 公钥加密 请求响应解密的key
  const myEncrypt = new JSEncrypt();
  myEncrypt.setPublicKey(publicKey);
  const cryptRespKeyStr = myEncrypt.encrypt(data);
  return cryptRespKeyStr;
}
