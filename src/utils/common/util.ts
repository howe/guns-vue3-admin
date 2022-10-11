/**
 * @author: nxy
 * @Date: 2022-10-10 14:18:30
 * @param {*} value 验证邮箱是否正确
 */
export function emailReg(value: string | number) {
    let exp:any = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return exp.test(value);
}

/**
 * @author: nxy
 * @Date: 2022-10-10 14:19:06
 * @param {*} value 验证手机号是否正确
 */
export function phoneReg(value: string | number) {
    let exp:any = /^1\d{10}$/;
    return exp.test(value);
}

/**
 * @author: nxy
 * @Date: 2022-10-11 14:15:35
 * @param {any} arr 菜单数组
 */
export function setMenu(arr: any) {
    arr.forEach(arrItem => {
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
    })
    return arr;
  }