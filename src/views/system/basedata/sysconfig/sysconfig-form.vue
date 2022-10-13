<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
  >
    <a-form-item label="配置名称" name="configName">
      <a-input v-model:value="form.configName" placeholder="请输入配置名称" allow-clear />
    </a-form-item>
    <a-form-item label="配置编码" name="configCode">
      <a-input v-model:value="form.configCode" placeholder="请输入配置编码" allow-clear />
    </a-form-item>
    <a-form-item label="系统配置" name="sysFlagChecked">
      <a-switch
        checked-children="是"
        un-checked-children="否"
        v-model:checked="form.sysFlagChecked"
      />
    </a-form-item>
    <a-form-item label="配置值" name="configValue">
      <a-input v-model:value="form.configValue" placeholder="请输入配置值" allow-clear />
    </a-form-item>
    <a-form-item label="备注">
      <a-textarea v-model:value="form.remark" placeholder="请输入备注" :rows="4" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const props = defineProps<{
    form: Object;
  }>();

  // 验证规则
  const rules = reactive({
    configName: [{ required: true, message: '请输入配置名称', type: 'string', trigger: 'blur' }],
    configCode: [{ required: true, message: '请输入配置编码', type: 'string', trigger: 'blur' }],
    configValue: [{ required: true, message: '请输入配置值', type: 'string', trigger: 'blur' }],
  });
</script>

<style></style>
