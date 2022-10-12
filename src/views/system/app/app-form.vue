<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
  >
    <a-form-item label="应用名称:" name="appName">
      <a-input v-model:value="form.appName" placeholder="请输入应用名称" allow-clear />
    </a-form-item>
    <a-form-item label="应用编码:" name="appCode">
      <a-input
        v-model:value="form.appCode"
        placeholder="请输入应用编码"
        allow-clear
        :disabled="isUpdate"
      />
    </a-form-item>
    <a-form-item label="应用图标:">
      <icon-picker v-model:value="form.appIcon" placeholder="请选择应用图标"></icon-picker>
    </a-form-item>
    <a-form-item label="应用排序:" name="appSort">
      <a-input-number
        v-model:value="form.appSort"
        placeholder="请填写应用排序"
        style="width: 100%"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import IconPicker from '/@/components/icon-picker/main.vue';
  const props = defineProps<{
    form: Object;
    isUpdate: Boolean;
  }>();

  // 验证规则
  const rules = reactive({
    appName: [{ required: true, message: '请输入应用名称', type: 'string', trigger: 'blur' }],
    appCode: [{ required: true, message: '请输入应用编码', type: 'string', trigger: 'blur' }],
  });
</script>

<style></style>
