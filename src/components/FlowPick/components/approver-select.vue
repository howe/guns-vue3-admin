<template>
  <a-row class="user-select" :gutter="16">
    <!-- 公司部门选择 -->
    <a-col :span="6">
      <selected-tree @treeSelect="treeSelect" v-bind="props" ref="selectedTreeRef"></selected-tree>
    </a-col>
    <!-- 审批人选择 -->
    <a-col :span="12">
      <common-table
        v-if="state.orgId"
        :columns="state.columns"
        :where="state.where"
        bordered
        rowId="code"
        ref="tableRef"
        url="/hrOrgApprover/getApproverTypeList"
        :isPage="false"
        :isSort="false"
        @onSelect="onSelect"
        @onSelectAll="onSelectAll"
      ></common-table>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="6">
      <selected-list v-model:list="state.approverList" @delete="deleteApprover" @deleteAll="deleteAll"></selected-list>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue';
import CommonTable from '/@/components/CommonTable/index.vue';
import SelectedList from './selected-list.vue';
import SelectedTree from './selected-tree.vue';
const props = defineProps({
  // 左侧树列表
  orgTreeList: Array
});

const emits = defineEmits(['selectedChange']);

const state = reactive({
  //已选列表
  approverList: [],
  // 搜索条件
  where: {},
  //表格配置
  columns: [
    {
      title: '审批人类型名称',
      dataIndex: 'name',
      align: 'center',
      isShow: true
    },
    {
      title: '审批人类型编码',
      dataIndex: 'code',
      align: 'center',
      isShow: true
    }
  ],
  // 组织机构id
  orgId: '',
  // 组织机构名称
  orgName: ''
});

const tableRef = ref(null);
const selectedTreeRef = ref(null);

// 树选择
const treeSelect = (selectedKeys: string[], info: any) => {
  state.orgId = selectedKeys[0];
  state.orgName = info.node.name;
};

// 监听组织机构树列表数据的变化
watch(
  () => props.orgTreeList,
  val => {
    if (val && val.length > 0) {
      nextTick(() => {
        selectedTreeRef.value.state.selectedKeys.push(val[0].id);
        state.orgId = val[0].id;
        state.orgName = val[0].name;
      });
    }
  }
);

// 监听组织机构选中变化, 选中当前组织下职位
watch(
  () => state.orgId,
  val => {
    let arr = [];
    if (state.approverList && state.approverList.length > 0) {
      state.approverList.forEach(item => {
        if (item.subValue == val) {
          arr.push(item.bizId);
        }
      });
    }

    nextTick(() => {
      tableRef.value.selectedRowKeys = arr;
    });
  }
);

// 职位单选
const onSelect = (record: any, selected: boolean, selectedRows: any) => {
  // 为选中状态时
  if (selected) {
    let obj = {
      bizId: record.code,
      name: record.name,
      subValue: state.orgId,
      subValueName: state.orgName
    };
    if (!state.approverList.find(userItem => userItem.bizId == record.code && userItem.subValue == state.orgId)) {
      state.approverList.push(obj);
    }
  } else {
    // 为不选中状态时,删除当前行
    state.approverList.splice(
      state.approverList.findIndex(item => item.bizId === record.code && item.subValue == state.orgId),
      1
    );
  }
};

// 全选反选
const onSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
  if (selected) {
    // 全选时遍历选中的数组，加入已选列表
    changeRows.forEach(item => {
      if (!state.approverList.find(userItem => userItem.bizId == item.code && userItem.subValue == state.orgId)) {
        let obj = {
          bizId: item.code,
          name: item.name,
          subValue: state.orgId,
          subValueName: state.orgName
        };
        state.approverList.push(obj);
      }
    });
  } else {
    // 反选时删除当前页的全部数据
    changeRows.forEach(item => {
      for (let i = state.approverList.length - 1; i >= 0; i--) {
        if (item.code == state.approverList[i].bizId && state.approverList[i].subValue == state.orgId) {
          state.approverList.splice(i, 1);
        }
      }
    });
  }
};

// 已选删除单个
const deleteApprover = (record: any) => {
  state.approverList.splice(
    state.approverList.findIndex(item => item.bizId === record.bizId && item.subValue == record.subValue),
    1
  );
};

// 已选删除全部
const deleteAll = () => {
  state.approverList = [];
};

// 监听已选列表的变化
watch(
  () => state.approverList,
  val => {
    let selectedRowKeys = [];
    if (val && val.length > 0) {
      val.forEach(listItem => {
        if (listItem.subValue == state.orgId) {
          selectedRowKeys.push(listItem.bizId);
        }
      });
    }
    if (tableRef.value) {
      tableRef.value.selectedRowKeys = selectedRowKeys;
      emits('selectedChange');
    }
  },
  { deep: true }
);

defineExpose({
  state
});
</script>

<style>
.user-select {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
