/** 格式校验工具 */
/**
 * 手机号正则表达式
 */
export const phoneReg = /^1\d{10}$/;
/**
 * 手机号正则表达式(强校验)
 */
export const phoneStrongReg = /^1[3|5|7|8|9][0-9]{9}$/;
/**
 * 固话正则表达式
 */
export const telReg =
  /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
/**
 * 邮箱正则表达式
 */
export const emailReg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
/**
 * 网址正则表达式
 */
export const urlReg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
/**
 * 身份证正则表达式
 */
export const identityReg = /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
/**
 * 日期正则表达式
 */
export const dateReg = /^(\d{4})[-/](\d{1}|0\d{1}|1[0-2])([-/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
/**
 * 数字正则表达式
 */
export const numberReg = /^[0-9]+\.?[0-9]*$/;
/**
 * 整数正则表达式
 */
export const integerReg = /^-?\d+$/;
/**
 * 正整数正则表达式
 */
export const positiveIntegerReg = /^[1-9]\d*$/;
/**
 * 负整数正则表达式
 */
export const negativeIntegerReg = /^-[1-9]\d*$/;
/**
 * 非负整数(正整数或0)正则表达式
 */
export const nonNegativeIntegerReg = /^\d+$/;
/**
 * 非正整数(负整数或0)正则表达式
 */
export const nonPositiveIntegerReg = /^-[1-9]\d*|0/;
/**
 * 中文正则表达式
 */
export const chineseReg = /^[\u4E00-\u9FA5]{2,4}$/;
/**
 * 端口号正则表达式
 */
export const portReg =
  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
/**
 * IP正则表达式
 */
export const ipReg =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
/**
 * 经度正则表达式, -180.0 ~ +180.0(整数部分为 0 ~ 180 , 必须输入 1 到 5 位小数)
 */
export const longitudeReg = /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/;
/**
 * 纬度正则表达式, -90.0 ~ +90.0(整数部分为 0 ~ 90, 必须输入 1 到 5 位小数)
 */
export const latitudeReg = /^[-|+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
