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