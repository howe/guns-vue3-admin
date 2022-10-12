<template>
  <a-row class="user-select" :gutter="16">
    <!-- 审批人选择 -->
    <a-col :span="12">
      <!-- 搜索 -->
      <div class="search">
        <a-form layout="inline" :model="state.where">
          <a-row>
            <a-form-item label="角色名称:">
              <a-input v-model:value.trim="state.where.roleName" placeholder="请输入角色名称" allow-clear />
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
        rowId="roleId"
        ref="tableRef"
        url="/sysRole/page"
        @onSelect="onSelect"
        @onSelectAll="onSelectAll"
        @tableListChange="list => tableListChange(list, 'roleId')"
      ></common-table>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="12">
      <selected-list v-model:list="state.roleList" @delete="deleteRole" @deleteAll="deleteAll"></selected-list>
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
  roleList: [],
  where: {},
  //表格配置
  columns: [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center',
      isShow: true
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      align: 'center',
      isShow: true
    }
  ]
});

const tableRef = ref(null);

// 删除已选单行
const deleteRole = (record: any) => {
  state.roleList.splice(
    state.roleList.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  state.roleList = [];
};

// 选中或取消选中某一列
const onSelect = (record: any, selected: boolean, selectedRows: any) => {
  radioSelect(record, selected, state.roleList, 'roleId', 'roleName');
};

// 全选反选
const onSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
  checkBox(selected, changeRows, state.roleList, 'roleId', 'roleName');
};

// 表格数据变化
const tableListChange = (list: string[], id: string) => {
  tableRef.value.selectedRowKeys = getSelectedRowKeys(list, id, state.roleList);
};

// 监听已选列表变化
watch(
  () => state.roleList,
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
