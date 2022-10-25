<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="业务名称:">
              <a-input
                v-model:value.trim="where.expandName"
                placeholder="请输入拓展业务名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="业务编码:">
              <a-input
                v-model:value.trim="where.expandCode"
                placeholder="请输入拓展业务唯一编码"
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
          :api="SysExpandApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="expandId"
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
            <!-- 名称点击 -->
            <template v-if="column.dataIndex == 'expandName'">
              <a @click="openEdit(record)">{{ record.expandName }}</a>
            </template>

            <!-- table列表状态栏 -->
            <!-- 1是激活，2是禁用 -->
            <template v-if="column.key === 'expandStatus'">
              <a-switch
                :checked="record.expandStatus === 1"
                @change="(checked) => editStatus(checked, record)"
              />
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此记录吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <sys-expand-edit v-model:visible="showEdit" :data="current" @done="reload" />
    <!-- 新增弹窗 -->
    <sys-expand-add v-model:visible="showAdd" @done="reload" />
  </div>
</template>

<script name="SysExpand" lang="ts" setup>
  import { ref } from 'vue';
  import { BasicColumn, BasicTable, TableActionType } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import useSearch from '/@/utils/common/use-search';
  import SysExpandEdit from './sys-expang-edit.vue';
  import SysExpandAdd from './sys-expand-add.vue';
  import { SysExpand, SysExpandRequest } from '/@/api/expand/model/SysExpandModel';
  import { SysExpandApi } from '/@/api/expand/SysExpandApi';

  // 查询条件
  const { where, resetWhereFields } = useSearch<SysExpandRequest>({});
  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);
  // 当前行数据
  const current = ref<any>(null);
  // 是否显示编辑弹框
  const showEdit = ref<boolean>(false);
  // 是否显示新增弹框
  const showAdd = ref<boolean>(false);

  // 表格配置
  const columns = ref<BasicColumn[]>([
    {
      title: '业务名称',
      dataIndex: 'expandName',
    },
    {
      title: '业务唯一编码',
      dataIndex: 'expandCode',
    },
    {
      title: '业务主键字段名',
      dataIndex: 'primaryFieldName',
    },
    {
      title: '状态',
      key: 'expandStatus',
      dataIndex: 'expandStatus',
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      align: 'center',
    },
  ]);

  // 表格实例
  const tableRef = ref<Nullable<TableActionType>>(null);

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-12 09:38:18
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value?.reload({
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
  const remove = async (row: SysExpand) => {
    const result = await SysExpandApi.delete({ expandId: row.expandId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑弹窗
   *
   * @author yxx
   * @date 2022/04/04 12:24
   */
  const openEdit = (row: SysExpand) => {
    current.value = row;
    showEdit.value = true;
  };

  /**
   * 打开新增弹窗
   *
   * @author yxx
   * @date 2022/04/04 12:24
   */
  const openAdd = () => {
    showAdd.value = true;
  };

  /**
   * 更新应用状态
   *
   * @author chenjinlong
   * @date 2021/4/2 17:04
   */
  const editStatus = async (checked: boolean, row: SysExpand) => {
    const expandId = row.expandId;
    // 状态：1-启用，2-禁用
    const expandStatus = checked ? 1 : 2;
    const result = await SysExpandApi.updateStatus({ expandId, expandStatus });
    message.success(result.message);
    reload();
  };
</script>
