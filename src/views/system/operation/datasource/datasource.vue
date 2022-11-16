<template>
  <div class="ele-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="数据源名称:">
              <a-input
                v-model:value.trim="where.dbName"
                placeholder="请输入数据源名称"
                allow-clear
              />
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
          :api="DataSourceApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="dbId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-space>
                <a-button type="primary" @click="openAdd()">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  <span>新建</span>
                </a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <!-- table列表状态标识 -->
            <template v-if="column.key === 'statusFlag'">
              <a-tag color="success" v-if="record.statusFlag === 1">正常</a-tag>
              <a-tag color="error" v-else>
                <a-tooltip>
                  <template #title>{{ record.errorDescription }}</template>
                  连接错误
                </a-tooltip>
              </a-tag>
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a-popconfirm title="确定要删除此数据源吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <data-source-add v-model:visible="showAdd" :data="current" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { DataSourceApi } from '/@/api/system/operation/DataSourceApi';
  import { message } from 'ant-design-vue';
  import DataSourceAdd from './datasource-add.vue';

  // 查询条件
  const where = reactive({
    dbName: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '数据库名称',
      dataIndex: 'dbName',
    },
    {
      title: '驱动类型',
      dataIndex: 'jdbcDriver',
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: 'jdbc的url',
      dataIndex: 'jdbcUrl',
      width: 400,
    },
    {
      title: '状态',
      key: 'statusFlag',
      dataIndex: 'statusFlag',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showAdd = ref<boolean>(false);

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
    where.dbName = '';
    reload();
  };

  /**
   * 删除单个
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await DataSourceApi.delete({ dbId: row.dbId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开新增弹窗
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const openAdd = () => {
    current.value = {};
    showAdd.value = true;
  };
</script>
