<template>
  <common-drawer :width="1000" :visible="visible" title="日志详情" @close="updateVisible(false)">
    <a-descriptions bordered :column="2" size="default">
      <a-descriptions-item label="服务名称">{{ state.form.appName }}</a-descriptions-item>
      <a-descriptions-item label="日志名称">{{ state.form.logName }}</a-descriptions-item>
      <a-descriptions-item label="日志内容" :span="2">{{
        state.form.logContent
      }}</a-descriptions-item>
      <a-descriptions-item label="请求地址">{{ state.form.requestUrl }}</a-descriptions-item>
      <a-descriptions-item label="请求方式">{{ state.form.httpMethod }}</a-descriptions-item>
      <a-descriptions-item label="服务IP">{{ state.form.serverIp }}</a-descriptions-item>
      <a-descriptions-item label="客户端IP">{{ state.form.clientIp }}</a-descriptions-item>
      <a-descriptions-item label="用户名称">{{ state.form.userIdWrapper }}</a-descriptions-item>
      <a-descriptions-item label="浏览器">{{ state.form.clientBrowser }}</a-descriptions-item>
      <a-descriptions-item label="操作系统">{{ state.form.clientOs }}</a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <a-collapse :active-key="['1', '2']">
      <a-collapse-panel key="1" header="请求参数">
        <p>{{ state.form.requestParams }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="响应参数">
        <p>{{ state.form.requestResult }}</p>
      </a-collapse-panel>
    </a-collapse>
  </common-drawer>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    detail?: Object;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
  }>();

  const state = reactive({
    // 表单数据
    form: {},
  });

  const updateVisible = (value) => {
    emits('update:visible', value);
  };

  watch(
    () => props.detail,
    (val) => {
      if (val) {
        state.form = Object.assign({}, props.detail);
      }
    },
  );
</script>
