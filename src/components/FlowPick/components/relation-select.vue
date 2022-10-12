<template>
  <a-row class="user-select" :gutter="16">
    <!-- 审批人选择 -->
    <a-col :span="12">
      <common-table
        :columns="state.columns"
        :where="state.where"
        bordered
        :isSort="false"
        :isPage="false"
        rowId="code"
        ref="tableRef"
        url="/sysUserGroup/getSelectRelationList"
        @onSelect="onSelect"
        @onSelectAll="onSelectAll"
      ></common-table>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="12">
      <selected-list v-model:list="state.relationList" @delete="deleteRelation" @deleteAll="deleteAll"></selected-list>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { radioSelect, checkBox, getSelectedRowKeys } from './common';
import CommonTable from '/@/components/CommonTable/index.vue';
import { reactive, ref, watch, nextTick } from 'vue';
import SelectedList from './selected-list.vue';

const emits = defineEmits(['selectedChange']);

const state = reactive({
  //已选列表
  relationList: [],
  where: {},
  //表格配置
  columns: [
    {
      title: '关系名称',
      dataIndex: 'name',
      align: 'center',
      isShow: true
    },
    {
      title: '关系编码',
      dataIndex: 'code',
      align: 'center',
      isShow: true
    },
  ]
});

const tableRef = ref(null);

// 删除已选单行
const deleteRelation = (record: any) => {
  state.relationList.splice(
    state.relationList.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  state.relationList = [];
};

// 选中或取消选中某一列
const onSelect = (record: any, selected: boolean, selectedRows: any) => {
  radioSelect(record, selected, state.relationList, 'code', 'name');
};

// 全选反选
const onSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
  checkBox(selected, changeRows, state.relationList, 'code', 'name');
};

// 表格数据变化
const tableListChange = (list: string[], id: string) => {
  tableRef.value.selectedRowKeys = getSelectedRowKeys(list, id, state.relationList);
};

// 监听已选列表变化
watch(
  () => state.relationList,
  val => {
    tableListChange(val, 'bizId');
    emits('selectedChange');
  },
  { deep: true }
);

// 搜索
const reload = () => {
  nextTick(() => {
    tableRef.value.reload();
  });
};

// 重置
const reset = () => {
  state.where.roleName = '';
  reload();
};

defineExpose({
  state,
})
</script>

<style>
.user-select {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
