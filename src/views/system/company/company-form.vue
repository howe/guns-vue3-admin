<template>
  <div>
    <div class="card-title card-title-background">基础信息</div>
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item label="上级公司:" name="orgParentId">
        <a-tree-select
          :disabled="form.orgParentId === '-1'"
          v-model:value="form.orgParentId"
          style="width: 100%"
          :tree-data="orgList"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择上级公司"
          :fieldNames="{ children: 'children', label: 'title', key: 'id', value: 'id' }"
          allow-clear
          tree-default-expand-all
        />
      </a-form-item>
      <a-form-item label="公司名称:" name="orgName">
        <a-input v-model:value="form.orgName" placeholder="请输入公司名称" allow-clear />
      </a-form-item>
      <a-form-item label="公司编码:" name="orgCode">
        <a-input v-model:value="form.orgCode" placeholder="请输入公司编码" allow-clear />
      </a-form-item>
      <a-form-item label="排序号:" name="orgSort">
        <a-input-number
          v-model:value="form.orgSort"
          placeholder="请输入排序号"
          :min="0"
          class="ele-fluid"
        />
      </a-form-item>
      <a-form-item label="备注:" name="orgRemark">
        <a-input v-model:value="form.orgRemark" placeholder="请输入备注" allow-clear />
      </a-form-item>
    </a-form>
    <div class="card-title card-title-background">详细信息</div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const props = defineProps<{
    // 表单数据
    form: Object;
    // 组织机构列表
    orgList: Array;
  }>();

  // 验证规则
  const rules = reactive({
    orgName: [{ required: true, message: '请输入组织机构名称', type: 'string', trigger: 'blur' }],
    orgCode: [{ required: true, message: '请输入组织机构编码', type: 'string', trigger: 'blur' }],
    orgType: [{ required: true, message: '请选择机构类型', type: 'number', trigger: 'blur' }],
    orgSort: [{ required: true, message: '请输入组织机构排序', type: 'number', trigger: 'blur' }],
  });
</script>

<style lang="less" scoped>
  .card-title {
    border-left: 5px solid;
    border-color: var(--primary-color);
    padding-left: 10px;
  }

  .card-title-background {
    background-color: #f5f5f5;
    height: 2em;
    line-height: 2em;
    margin-bottom: 2em;
  }
</style>
