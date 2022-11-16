<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="资源名称:">
              <a-input
                v-model:value.trim="where.resourceName"
                placeholder="请输入资源名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="资源url">
              <a-input v-model:value.trim="where.url" placeholder="请输入资源url" allow-clear />
            </a-form-item>
            <a-form-item class="ele-text-center">
              <a-space>
                <a-button type="primary" @click="reload">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-row>
        </a-form>
      </a-card>
    </div>

    <!-- 表格 -->
    <div>
      <a-card :bordered="false" class="table-height">
        <BasicTable
          :canResize="false"
          ref="tableRef"
          :api="ResourceApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="resourceId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'resourceName'">
              <a @click="openEdit(record)">{{ record.resourceName }}</a>
            </template>
            <!-- table列表是否是视图栏 -->
            <!-- Y是视图，N是不是视图 -->
            <template v-if="column.key === 'view'">
              <a-tag color="green" v-if="record.viewFlag === 'Y'">是</a-tag>
              <a-tag v-else> 否</a-tag>
            </template>

            <!-- table列表是需要登录栏 -->
            <!-- Y是需要登录，N是不需要登录 -->
            <template v-else-if="column.key === 'requiredLogin'">
              <a-tag color="green" v-if="record.requiredLoginFlag === 'Y'">是</a-tag>
              <a-tag v-else> 否</a-tag>
            </template>

            <!-- table列表是需要权限验证栏 -->
            <!-- Y是需要权限验证，N是不需要权限验证 -->
            <template v-else-if="column.key === 'requiredPermission'">
              <a-tag color="green" v-if="record.requiredPermissionFlag === 'Y'">是</a-tag>
              <a-tag v-else> 否</a-tag>
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">详情</a>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <resource-edit v-model:visible="showEdit" :data="current" @done="reload" v-if="showEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import ResourceEdit from './resource-edit.vue';
  import { ResourceApi } from '/@/api/system/resource/ResourceApi';
  // 查询条件
  const where = reactive({
    resourceName: '',
    url: '',
  });

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '资源名称',
      dataIndex: 'resourceName',
      width: 260,
    },
    {
      title: '资源编码',
      dataIndex: 'resourceCode',
      width: 260,
    },
    {
      title: '模块名称',
      dataIndex: 'methodName',
      width: 170,
    },
    {
      title: '是否视图',
      key: 'view',
      dataIndex: 'phone',
      width: 80,
      align: 'center',
    },
    {
      title: '请求url',
      dataIndex: 'url',
      width: 260,
    },
    {
      title: 'http方法',
      dataIndex: 'httpMethod',
      width: 80,
    },
    {
      title: '需要登录',
      key: 'requiredLogin',
      dataIndex: 'status',
      sorter: true,
      align: 'center',
      width: 80,
    },
    {
      title: '需要权限验证',
      key: 'requiredPermission',
      dataIndex: 'status',
      sorter: true,
      align: 'center',
      width: 110,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 80,
      align: 'center',
    },
  ]);

  // ref
  const tableRef = ref(null);

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-12 09:38:18
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value.reload({ page: 1 });
  };

  /**
   * 点击重置
   * @author: nxy
   * @Date: 2022-10-12 09:38:29
   */
  const reset = () => {
    where.resourceName = '';
    where.url = '';
    reload();
  };

  /**
   * 打开编辑弹窗
   *
   * @author jiawei
   * @date 2021/4/8 17:03
   */
  const openEdit = (row) => {
    current.value = row;
    showEdit.value = true;
  };
</script>
