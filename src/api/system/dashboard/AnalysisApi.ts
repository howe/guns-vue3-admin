/**
 * 获取支付笔数数据
 */
export async function getPayNumList() {
  const json =
    '{"code":0,"data":[{"date":"2020-06-12","value":7},{"date":"2020-06-13","value":5},{"date":"2020-06-14","value":4},{"date":"2020-06-15","value":2},{"date":"2020-06-16","value":4},{"date":"2020-06-17","value":7},{"date":"2020-06-18","value":5},{"date":"2020-06-19","value":6},{"date":"2020-06-20","value":5},{"date":"2020-06-21","value":9},{"date":"2020-06-22","value":6},{"date":"2020-06-23","value":3},{"date":"2020-06-24","value":1},{"date":"2020-06-25","value":5},{"date":"2020-06-26","value":3},{"date":"2020-06-27","value":6},{"date":"2020-06-18","value":5}]}';
  return Promise.resolve(JSON.parse(json).data);
}

/**
 * 获取销售量数据
 */
export async function getSaleroomList() {
  const json =
    '{"code":0,"data":{"list1":[{"month":"1月","value":816},{"month":"2月","value":542},{"month":"3月","value":914},{"month":"4月","value":781},{"month":"5月","value":355},{"month":"6月","value":796},{"month":"7月","value":714},{"month":"8月","value":1195},{"month":"9月","value":1055},{"month":"10月","value":271},{"month":"11月","value":384},{"month":"12月","value":1098}],"list2":[{"month":"1月","value":1098},{"month":"2月","value":384},{"month":"3月","value":271},{"month":"4月","value":1055},{"month":"5月","value":1195},{"month":"6月","value":714},{"month":"7月","value":796},{"month":"8月","value":355},{"month":"9月","value":781},{"month":"10月","value":914},{"month":"11月","value":542},{"month":"12月","value":816}]}}';
  return Promise.resolve(JSON.parse(json).data);
}

/**
 * 获取最近1小时访问情况数据
 * @returns {Promise<Object>}
 */
export async function getVisitHourList() {
  const json =
    '{"code":0,"data":[{"time":"16:00","visits":15,"views":45},{"time":"16:05","visits":39,"views":169},{"time":"16:10","visits":152,"views":400},{"time":"16:15","visits":94,"views":285},{"time":"16:20","visits":102,"views":316},{"time":"16:25","visits":86,"views":148},{"time":"16:30","visits":39,"views":150},{"time":"16:35","visits":38,"views":234},{"time":"16:40","visits":95,"views":158},{"time":"16:45","visits":30,"views":100},{"time":"16:50","visits":86,"views":266}]}';
  return Promise.resolve(JSON.parse(json).data);
}

/**
 * 获取词云数据
 */
export async function getWordCloudList() {
  const json =
    '{"code":0,"data":[{"name":"软妹子","value":23},{"name":"汪星人","value":23},{"name":"长腿欧巴","value":23},{"name":"萝莉","value":22},{"name":"辣~","value":22},{"name":"K歌","value":22},{"name":"大长腿","value":21},{"name":"川妹子","value":21},{"name":"女神","value":21},{"name":"米粉","value":20},{"name":"专注设计","value":20},{"name":"逛街","value":20},{"name":"黑长直","value":20},{"name":"海纳百川","value":19},{"name":"萌萌哒","value":19},{"name":"坚持","value":19},{"name":"话唠","value":19},{"name":"果粉","value":18},{"name":"喵星人","value":18},{"name":"花粉","value":18},{"name":"衬衫控","value":18},{"name":"宅男","value":17},{"name":"小清新","value":17},{"name":"眼镜男","value":17},{"name":"琼瑶","value":17},{"name":"穷游党","value":16},{"name":"铲屎官","value":16},{"name":"正太","value":16},{"name":"中二病","value":16},{"name":"夜猫子","value":15},{"name":"逗比","value":15},{"name":"腹黑","value":15},{"name":"吃鸡","value":15},{"name":"为了联盟","value":14},{"name":"背包客","value":14},{"name":"民谣","value":14},{"name":"为了部落","value":14},{"name":"懒癌患者","value":13},{"name":"追剧","value":13},{"name":"IT民工","value":13},{"name":"CNB成员","value":13},{"name":"选择困难","value":12},{"name":"锤粉","value":12},{"name":"欧皇","value":12},{"name":"仙气十足","value":12}]}';
  return Promise.resolve(JSON.parse(json).data);
}
