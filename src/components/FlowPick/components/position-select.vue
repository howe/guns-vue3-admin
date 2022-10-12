<template>
  <a-row class="user-select" :gutter="16">
    <!-- 审批人选择 -->
    <a-col :span="12">
      <!-- 搜索 -->
      <div class="search">
        <a-form layout="inline" :model="state.where">
          <a-row>
            <a-form-item label="职位名称:">
              <a-input v-model:value.trim="state.where.positionName" placeholder="请输入职位名称" allow-clear />
            </a-form-item>
            <a-form-item class="ele-text-center" :wrapper-col="{ span: 24 }">
              <a-space>
                <a-button type="primary" @click="reload">
                  <template #icon><SearchOutlined /></template>查询
                </a-button>
                <a-button @click="reset">
                  <template #icon><redo-outlined /></template>重置
                </a-button>
              </a-space>
            </a-form-item>
          </a-row>
        </a-form>
      </div>
      <common-table
        :columns="state.columns"
        :where="state.where"
        bordered
        :isSort="false"
        rowId="positionId"
        ref="tableRef"
        url="/hrPosition/page"
        @onSelect="onSelect"
        @onSelectAll="onSelectAll"
        @tableListChange="list => tableListChange(list, 'positionId')"
      ></common-table>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="12">
      <selected-list v-model:list="state.positionList" @delete="deletePosition" @deleteAll="deleteAll"></selected-list>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { radioSelect, checkBox, getSelectedRowKeys } from './common';
import CommonTable from '/@/components/CommonTable/index.vue';
import { reactive, ref, nextTick, watch } from 'vue';
import SelectedList from './selected-list.vue';

const emits = defineEmits(['selectedChange']);

const state = reactive({
  //已选列表
  positionList: [],
  where: {},
  //表格配置
  columns: [
    {
      title: '职位名称',
      dataIndex: 'positionName',
      align: 'center',
      isShow: true
    },
    {
      title: '职位编码',
      dataIndex: 'positionCode',
      align: 'center',
      isShow: true
    }
  ]
});

const tableRef = ref(null);

// 删除已选单行
const deletePosition = (record: any) => {
  state.positionList.splice(
    state.positionList.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  state.positionList = [];
};

// 选中或取消选中某一列
const onSelect = (record: any, selected: boolean, selectedRows: any) => {
  radioSelect(record, selected, state.positionList, 'positionId', 'positionName');
};

// 全选反选
const onSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
  checkBox(selected, changeRows, state.positionList, 'positionId', 'positionName');
};

// 表格数据变化
const tableListChange = (list: string[], id: string) => {
  tableRef.value.selectedRowKeys = getSelectedRowKeys(list, id, state.positionList);
};

// 监听已选列表变化
watch(
  () => state.positionList,
  val => {
    tableListChange(val, 'bizId');
    emits('selectedChange')
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
  state.where.positionName = '';
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
