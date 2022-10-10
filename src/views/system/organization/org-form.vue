<!--
 * @Author: nxy
 * @Date: 2022-10-10 10:37:45
-->
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
      <a-form-item label="上级机构:" name="orgParentId">
        <a-tree-select
          :disabled="form.orgParentId === '-1'"
          v-model:value="form.orgParentId"
          style="width: 100%"
          :tree-data="orgList"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择上级机构"
          :fieldNames="{ children: 'children', label: 'title', key: 'id', value: 'id' }"
          allow-clear
          tree-default-expand-all
        />
      </a-form-item>
      <a-form-item label="机构名称:" name="orgName">
        <a-input v-model:value="form.orgName" placeholder="请输入机构名称" allow-clear />
      </a-form-item>
      <a-form-item label="机构编码:" name="orgCode">
        <a-input v-model:value="form.orgCode" placeholder="请输入机构编码" allow-clear />
      </a-form-item>
      <a-form-item label="机构类型:" name="orgType">
        <a-select
          v-model:value="form.orgType"
          placeholder="请选择机构类型"
          style="width: 100%"
          allow-clear
        >
          <a-select-option :value="1">公司</a-select-option>
          <a-select-option :value="2">部门</a-select-option>
        </a-select>
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

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      form: {
        type: Object,
        default: {},
      },
      rules: Object,
      // 组织机构列表
      orgList: Array,
    },
  });
</script>

<style lang="less" scoped>
  .card-title {
    border-left: 5px solid;
    border-color: #2a7dc9;
    padding-left: 10px;
  }

  .card-title-background {
    background-color: #f5f5f5;
    height: 2em;
    line-height: 2em;
    margin-bottom: 2em;
  }
</style>
