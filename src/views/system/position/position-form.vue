<template>
  <a-form
    layout="horizontal"
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
  >
    <a-form-item label="职位名称:" name="positionName">
      <a-input
        v-model:value="form.positionName"
        placeholder="请输入职位名称"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>

    <a-form-item label="职位编码:" name="positionCode">
      <a-input
        v-model:value="form.positionCode"
        placeholder="请输入职位编码"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>

    <a-form-item label="职位排序:" name="positionSort">
      <a-input-number
        v-model:value="form.positionSort"
        placeholder="请输入职位排序"
        allow-clear
        autocomplete="off"
        style="width: 100%"
      />
    </a-form-item>

    <a-form-item label="备注信息:" name="positionRemark">
      <a-input
        v-model:value="form.positionRemark"
        placeholder="请输入备注信息"
        allow-clear
        autocomplete="off"
      />
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
    positionName: [{ required: true, message: '请输入职位名称', type: 'string', trigger: 'blur' }],
    positionCode: [{ required: true, message: '请输入职位编码', type: 'string', trigger: 'blur' }],
    positionSort: [{ required: true, message: '请输入数字顺序', type: 'number', trigger: 'blur' }],
  });
</script>
