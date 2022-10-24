/**
 * 系统信息
 */
export interface SystemInfo {
  gunsMgrName: string;
  gunsMgrLoginBackgroundImg: string;
  gunsMgrLogo: string;
  gunsMgrFavicon: string;
  gunsMgrFooterText: string;
  gunsMgrBeiNo: string;
  gunsMgrBeiUrl: string;
  otherConfigs: {};
}

/**
 * 服务器相关信息
 *
 * @author yxx
 * @date 2022-05-13 13:42
 */
export interface SystemHardwareCalculator {
  /**
   * CPU相关信息
   */
  cpu?: CpuInfo;
  /**
   * 內存相关信息
   */
  mem?: MemInfo;
  /**
   * JVM相关信息
   */
  jvm?: JvmInfo;
  /**
   * 服务器相关信息
   */
  sys?: SysInfo;
  /**
   * 磁盘相关信息
   */
  sysFiles?: SysFileInfo[];
}

export interface CpuInfo {
  cpuNum: number;
  total: number;
  sys: number;
  used: number;
  wait: number;
  free: number;
}

export interface MemInfo {
  total: number;
  used: number;
  free: number;
  usage: number;
}

export interface JvmInfo {
  total: number;
  max: number;
  free: number;
  used: number;
  version: string;
  home: string;
  usage: number;
  name: string;
  startTime: string;
  runTime: string;
}

export interface SysInfo {
  computerName: string;
  computerIp: string;
  userDir: string;
  osName: string;
  osArch: string;
}

export interface SysFileInfo {
  dirName: string;
  sysTypeName: string;
  typeName: string;
  total: string;
  free: string;
  used: string;
  usage: number;
}
