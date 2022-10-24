<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="应用名称:">
              <a-input
                v-model:value.trim="where.appName"
                placeholder="请输入应用名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="应用编码">
              <a-input
                v-model:value.trim="where.appCode"
                placeholder="请输入应用编码"
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
          :api="SysAppApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="appId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-space>
                <a-button type="primary" @click="openEdit()">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  <span>新建</span>
                </a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'appName'">
              <a @click="openEdit(record)">{{ record.appName }}</a>
            </template>
            <!-- table列表状态栏 -->
            <!-- 1是激活，2是禁用 -->
            <template v-if="column.key === 'state'">
              <a-switch
                :checked="record.statusFlag === 1"
                @change="(checked) => editStatus(checked, record)"
              />
            </template>

            <!-- 图标渲染 -->
            <template v-else-if="column.key === 'icon'">
              <component style="fontsize: 20px" :is="record.appIcon" />
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此应用吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <app-edit v-model:visible="showEdit" :data="current" @done="reload" />
    <app-detail v-model:visible="showDetail" :data="current" />
  </div>
</template>

<script name="SysApp" lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicColumn, BasicTable, TableActionType } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import useSearch from '/@/utils/common/use-search';
  import AppEdit from './app-edit.vue';
  import AppDetail from './app-detail.vue';
  import { SysAppApi } from '/@/api/system/app/SysAppApi';
  import { SysApp, SysAppRequest } from '/@/api/system/app/model/SysAppModel';

  // 查询条件
  const { where, resetWhereFields } = useSearch<SysAppRequest>({});

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);
  // 是否显详情
  const showDetail = ref<boolean>(false);

  // 表格配置
  const columns = ref<BasicColumn[]>([
    {
      title: '应用名称',
      dataIndex: 'appName',
    },
    {
      title: '应用编码',
      dataIndex: 'appCode',
    },
    {
      title: '应用图标',
      key: 'icon',
      dataIndex: 'appIcon',
    },
    {
      title: '是否显示',
      key: 'state',
      dataIndex: 'statusFlag',
    },
    {
      title: '排序',
      dataIndex: 'appSort',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]);

  // 表格实例
  const tableRef = ref<Nullable<TableActionType>>(null);
  // 获取表格action
  const getTableAction = () => {
    const tableAction = unref(tableRef);
    if (!tableAction) {
      throw new Error('tableAction is null');
    }
    return tableAction;
  };

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-12 09:38:18
   */
  const reload = () => {
    checkedKeys.value = [];
    getTableAction().reload({
      page: 1,
    });
  };

  /**
   * 点击重置
   * @author: nxy
   * @Date: 2022-10-12 09:38:29
   */
  const reset = () => {
    resetWhereFields();
    reload();
  };

  /**
   * 删除单个
   *
   * @author chenjinlong
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await SysAppApi.del({ appId: row.appId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开新建/编辑弹窗
   *
   * @author yxx
   * @date 2022/04/04 12:24
   */
  const openEdit = (row?: SysApp) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /**
   * 更新应用状态
   *
   * @author chenjinlong
   * @date 2021/4/2 17:04
   */
  const editStatus = async (checked: boolean, row: any) => {
    const appId = row.appId;
    // 激活状态：1-启用，2-禁用
    const statusFlag = checked ? 1 : 2;
    const result = await SysAppApi.updateStatus({ appId, statusFlag });
    message.success(result.message);
    reload();
  };
</script>
