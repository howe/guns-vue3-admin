<template>
  <a-row class="user-select" :gutter="16">
    <!-- 公司部门选择 -->
    <a-col :span="6">
      <selected-tree @treeSelect="treeSelect" v-bind="props" ref="selectedTreeRef"></selected-tree>
    </a-col>
    <!-- 人员表格 -->
    <a-col :span="12">
      <a-card :bordered="false" style="height: 100%" v-if="state.where.orgId">
        <!-- 搜索 -->
        <div class="search">
          <a-form layout="inline" :model="state.where">
            <a-row>
              <a-form-item label="用户名称:">
                <a-input v-model:value.trim="state.where.realName" placeholder="请输入用户名称" allow-clear />
              </a-form-item>
              <a-form-item class="ele-text-center" :wrapper-col="{ span: 24 }">
                <a-space>
                  <a-button type="primary" @click="reload">
                    <template #icon><SearchOutlined /></template>查询
                  </a-button>
                  <a-button @click="reset"><template #icon><redo-outlined /></template>重置</a-button>
                </a-space>
              </a-form-item>
            </a-row>
          </a-form>
        </div>
        <div>
          <common-table
            :columns="state.columns"
            :where="state.where"
            bordered
            :isSort="false"
            rowId="userId"
            ref="tableRef"
            url="/sysUser/page"
            @onSelect="onSelect"
            @onSelectAll="onSelectAll"
            @tableListChange="list => tableListChange(list, 'userId')"
          ></common-table>
        </div>
      </a-card>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="6">
      <selected-list v-model:list="state.userList" @delete="deleteUser" @deleteAll="deleteAll"></selected-list>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import CommonTable from '/@/components/CommonTable/index.vue';
import { watch, reactive, ref, nextTick } from 'vue';
import { radioSelect, checkBox, getSelectedRowKeys } from './common';
import SelectedTree from './selected-tree.vue';
import SelectedList from './selected-list.vue';
const props = defineProps({
  // 左侧树列表
  orgTreeList: Array
});

const emits = defineEmits(['selectedChange']);

// 左侧树ref
const selectedTreeRef = ref(null);
// ref
const tableRef = ref(null);

const state = reactive({
  //表格配置
  columns: [
    {
      title: '部门名称',
      dataIndex: 'orgName',
      align: 'center',
      isShow: true
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      align: 'center',
      isShow: true
    },
    {
      title: '账号',
      dataIndex: 'account',
      align: 'center',
      isShow: true
    },
    {
      title: '电话',
      dataIndex: 'phone',
      align: 'center',
      isShow: true
    },
  ],
  //用户搜索
  where: {
    orgId: ''
  },
  //已选列表
  userList: [],
});

// 监听组织机构树列表数据的变化
watch(
  () => props.orgTreeList,
  val => {
    if (val && val.length > 0) {
      nextTick(() => {
        selectedTreeRef.value.state.selectedKeys.push(val[0].id);
        state.where.orgId = val[0].id;
      });
    }
  }
);

// 树选择
const treeSelect = (selectedKeys: string[], info: any) => {
  state.where.orgId = selectedKeys[0];
  reload();
};

// 搜索
const reload = () => {
  nextTick(() => {
    tableRef.value.reload();
  });
};

// 重置
const reset = () => {
  state.where.realName = '';
  reload();
};

// 全选反选
const onSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
  checkBox(selected, changeRows, state.userList, 'userId', 'realName');
};

// 选中或取消选中某一列
const onSelect = (record: any, selected: boolean, selectedRows: any) => {
  radioSelect(record, selected, state.userList, 'userId', 'realName');
};

// 刪除已选单个
const deleteUser = (record: any) => {
  state.userList.splice(
    state.userList.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  state.userList = [];
};

// 表格数据变化
const tableListChange = (list: string[], id: string) => {
  tableRef.value.selectedRowKeys = getSelectedRowKeys(list, id, state.userList);
};

// 监听已选数据的变化
watch(
  () => state.userList,
  val => {
    if (tableRef.value) {
      tableListChange(val, 'bizId');
      emits('selectedChange');
    }
  },
  { deep: true }
);

defineExpose({
  state,
})
</script>

<style scoped lang="less">
.user-select {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.search {
  margin-bottom: 20px;
}
:deep(.table) {
  --table-row-hover-bg: var(--primary-1);
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
}
</style>
