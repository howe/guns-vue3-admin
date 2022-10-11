<template>
  <div class="guns-body guns-body-card">
    <!-- 欢迎提示 -->
    <a-card :bordered="false" :body-style="{ padding: '20px' }">
      <div class="ele-cell workplace-user-card">
        <div class="ele-cell-content ele-cell">
          <a-avatar :size="68" :src="loginUser.avatar" />
          <div class="ele-cell-content">
            <h4 class="ele-elip">{{ loginUser.username }}，欢迎登录！</h4>
          </div>
        </div>
        <div class="workplace-count-group">
          <h2>{{ currentDate }}</h2>
        </div>
      </div>
    </a-card>

    <!-- 常用功能 -->
    <a-card class="function" :body-style="{ padding: '1em' }">
      <template #title> 常用功能 </template>
      <a-row :gutter="16">
        <a-col :lg="3" :md="6" :sm="12" :xs="12" v-for="(item, index) in recentMenus" :key="index">
          <a-card hoverable :body-style="{ padding: 0 }">
            <router-link :to="item.antdvRouter" class="app-link-block">
              <component class="app-link-icon" :is="$antIcons[item.antdvIcon]" />
              <div class="app-link-title">{{ item.menuName }}</div>
            </router-link>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <!-- 系统企业概况 -->
    <a-row :gutter="16">
      <!-- 系统企业概况 -->
      <a-col :lg="12" :md="24" :sm="24" :xs="24">
        <a-card class="function" :body-style="{ padding: '1em' }">
          <template #title> 系统企业概况 </template>
          <a-row :gutter="16">
            <a-col :lg="8" :md="12" :sm="12" :xs="12">
              <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg1">
                <div>
                  <ApartmentOutlined class="app-link-icon" />&nbsp;&nbsp;&nbsp;<span
                    >组织机构：{{ orgInfo.organizationNum }}</span
                  >
                </div>
              </a-card>
            </a-col>
            <a-col :lg="8" :md="12" :sm="12" :xs="12">
              <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg2">
                <div>
                  <TeamOutlined class="app-link-icon" />&nbsp;&nbsp;&nbsp;<span
                    >人员总数：{{ orgInfo.enterprisePersonNum }}</span
                  >
                </div>
              </a-card>
            </a-col>
            <a-col :lg="8" :md="12" :sm="12" :xs="12">
              <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg3">
                <div>
                  <AuditOutlined class="app-link-icon" />&nbsp;&nbsp;&nbsp;<span
                    >职位总数：{{ orgInfo.positionNum }}</span
                  >
                </div>
              </a-card>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <!-- 当前公司概况 -->
      <a-col :lg="12" :md="24" :sm="24" :xs="24">
        <a-card class="function" :body-style="{ padding: '1em' }">
          <template #title> 当前公司概况 </template>
          <a-row :gutter="16">
            <a-col :lg="8" :md="12" :sm="12" :xs="12">
              <a-card hoverable :body-style="{ padding: 0 }">
                <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg1">
                  <div>
                    <ApartmentOutlined class="app-link-icon" />&nbsp;&nbsp;&nbsp;<span
                      >部门总数：{{ orgInfo.currentDeptNum }}</span
                    >
                  </div>
                </a-card>
              </a-card>
            </a-col>
            <a-col :lg="8" :md="12" :sm="12" :xs="12">
              <a-card hoverable :body-style="{ padding: 0 }">
                <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg2">
                  <div>
                    <TeamOutlined class="app-link-icon" />&nbsp;&nbsp;&nbsp;<span
                      >人员总数：{{ orgInfo.currentCompanyPersonNum }}</span
                    >
                  </div>
                </a-card>
              </a-card>
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <!-- 在线用户 -->
      <a-col :lg="12" :md="24" :sm="24" :xs="24">
        <a-card
          :title="'在线用户：' + userList.totalNum"
          :bordered="false"
          :body-style="{ padding: 0 }"
        >
          <div style="height: 347px; overflow-y: auto">
            <div
              v-for="(item, index) in userList.totalUserNames"
              :key="index"
              class="ele-cell user-list-item"
            >
              <img src="../../../assets/avatar.png" style="width: 46px" />
              <div class="ele-cell-content">
                <div class="ele-cell-title">{{ item }}</div>
              </div>
              <a-tag color="green">在线</a-tag>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- 最近操作记录 -->
      <a-col :lg="12" :md="24" :sm="24" :xs="24">
        <a-card title="最近操作记录" :bordered="false" :body-style="{ padding: 0 }">
          <div style="height: 347px; padding: 28px 20px 0 20px" class="ele-scrollbar-hover">
            <a-timeline>
              <a-timeline-item v-for="(item, index) in activities" :key="index" :color="item.color">
                <em>{{ item.createTime }}</em>
                <em>{{ item.logName + '-' + item.logContent }}</em>
              </a-timeline-item>
            </a-timeline>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { HomeApi } from '/@/api/system/dashboard/HomeApi';
  import { useUserStore } from '/@/store/modules/user';

  Date.prototype.Format = function (fmt) {
    let o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
        );
    return fmt;
  };

  // 用户信息
  const userStore = useUserStore();

  // 登录人信息
  const loginUser = computed(() => {
    return userStore?.userInfo;
  });

  // 当前登录时间
  const currentDate = ref(new Date().Format('yyyy年MM月dd日'));

  // 常用功能
  const recentMenus = ref<string[]>([]);

  // 企业概况数据
  const orgInfo = ref<any>({
    organizationNum: 0,
    enterprisePersonNum: 0,
    positionNum: 0,
    currentDeptNum: 0,
    currentCompanyPersonNum: 0,
  });

  // 小组成员数据
  const userList = ref<any>({
    totalNum: 0,
    totalUserNames: [],
  });

  // 最新动态数据
  const activities = ref<string[]>([]);

  onMounted(() => {
    // 获取常用功能
    HomeApi.getCommonFunctions().then((response) => {
      recentMenus.value = response;
    });

    // 获取企业概况数据
    HomeApi.orgInfoStat().then((response) => {
      orgInfo.value = response;
    });

    // 获取在线用户数
    HomeApi.getOnlineUserStat().then((response) => {
      userList.value = response;
    });

    // 获取最近操作记录
    HomeApi.getRecentLogs().then((response) => {
      activities.value = response;
    });
  });
</script>

<style scoped>
  /** 用户卡片 */
  .workplace-user-card .ele-cell-content {
    overflow: hidden;
  }

  .workplace-user-card h4 {
    margin-bottom: 6px;
  }

  .workplace-count-group {
    font-size: 24px;
    margin-top: 6px;
    white-space: nowrap;
    text-align: right;
    flex-shrink: 0;
  }
  .workplace-count-group h2 {
    font-weight: 400;
  }

  .workplace-count-item {
    display: inline-block;
    margin: 0 4px 0 24px;
  }

  .workplace-count-name {
    margin-left: 8px;
  }

  @media screen and (max-width: 992px) {
    .workplace-count-item {
      margin: 0 2px 0 12px;
    }
  }

  @media screen and (max-width: 768px) {
    .workplace-user-card {
      display: block;
    }

    .workplace-count-group {
      margin-top: 8px;
    }
  }

  /** 快捷方式 */
  .app-link-block {
    padding: 12px;
    text-align: center;
    display: block;
    color: inherit;
  }

  .app-link-block .app-link-icon {
    color: #69c0ff;
    font-size: 30px;
    margin: 6px 0 10px 0;
  }

  /** 时间轴 */
  .ele-scrollbar-hover :deep(.ant-timeline-item-last > .ant-timeline-item-content) {
    min-height: auto;
  }

  /** 本月目标 */
  .workplace-goal-group {
    padding: 48px 0;
    text-align: center;
    position: relative;
  }

  .workplace-goal-group .workplace-goal-content {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
  }

  .workplace-goal-group .workplace-goal-num {
    font-size: 40px;
  }

  /** 小组成员 */
  .user-list-item {
    padding: 16px 18px;
  }

  .user-list-item + .user-list-item {
    border-top: 1px solid hsla(0, 0%, 60%, 0.15);
  }

  /** 表格拖拽 */
  .ant-table-tbody tr.sortable-chosen {
    background: hsla(0, 0%, 60%, 0.1) !important;
  }

  .ant-table-tbody tr.sortable-chosen td {
    background: none !important;
  }

  .ele-body.ele-body-card .function .ant-card {
    margin-bottom: 0;
  }

  .statistic {
    padding: 1.5em;
    color: white;
    font-size: 1.5em;
    background-size: cover;
  }

  .card-bg1 {
    background-image: url('../../../assets/card-background/1.png');
  }

  .card-bg2 {
    background-image: url('../../../assets/card-background/2.png');
  }

  .card-bg3 {
    background-image: url('../../../assets/card-background/3.png');
  }
</style>
