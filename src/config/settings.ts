// 是否需要加密密码
export const IS_NEED_RSA = true;
// 刷新路由的路由地址
export const REDIRECT_PATH = '/redirect';

// 消息类型常量
export const WEBSOCKET_MESSAGE_TYPE = {
  // 服务端发过来的消息类型
  server: {
    // 系统通知消息类型
    SYS_NOTICE_MSG_TYPE: '100001',
    // 授权用户使用websocket
    SYS_REPLY_MSG_TYPE: '100002',
  },
  // 发送给服务器的消息类型
  client: {
    // 创建websocket连接时候的鉴权，发送token
    USER_CONNECTION_AUTHENTICATION: '200000',
  },
};
