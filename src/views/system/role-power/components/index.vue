<!--
 * @Author: nxy
 * @Date: 2022-10-12 17:23:45
-->
<template>
  <div class="guns-body">
    <a-row class="power-header" v-if="resourceBizType == 2">
      <a-card :bordered="false" style="width: 100%">
        <a-tabs v-model:activeKey="state.activeKey" animated>
          <a-tab-pane :key="1" :tab="'角色权限'"></a-tab-pane>
          <a-tab-pane :key="2" :tab="'管理员权限'"></a-tab-pane>
        </a-tabs>
      </a-card>
    </a-row>

    <!-- 角色权限 -->
    <role-power v-if="state.activeKey == 1" :resourceBizType="resourceBizType"></role-power>
    <!-- 管理员权限 -->
    <sys-admin-power v-if="state.activeKey == 2" :resourceBizType="resourceBizType"></sys-admin-power>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import RolePower from './role-power.vue';
import SysAdminPower from './sysadmin-power.vue';

const props = defineProps<{
    // 资源类型
    resourceBizType: Number
}>();

const state = reactive({
    activeKey: 1,
})
</script>

<style scoped lang="less">
.right {
  height: calc(90vh - 108px);
  overflow-y: auto;
}
.right-top {
  margin-top: -10px;
}
:deep(.power-header .ant-card-body) {
  padding: 0 24px;
}
:deep(.power-header .ant-tabs-top > .ant-tabs-nav) {
  margin: 0;
}
</style>