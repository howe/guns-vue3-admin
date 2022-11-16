<template>
  <div>
    <a-form layout="inline" :model="where">
      <a-row>
        <a-form-item label="配置名称">
          <a-input v-model:value.trim="where.configName" placeholder="请输入名称" allow-clear />
        </a-form-item>
        <a-form-item label="配置编码">
          <a-input v-model:value.trim="where.configCode" placeholder="请输入编码" allow-clear />
        </a-form-item>
        <a-form-item class="ele-text-center">
          <a-space>
            <a-button type="primary" @click="reload">查询</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-row>
    </a-form>

    <div style="margin-top: 10px; width: 100%; overflow: hidden">
      <BasicTable
        :canResize="false"
        ref="tableRef"
        :api="SysConfigApi.findConfigPage"
        :where="where"
        :columns="columns"
        showTableSetting
        rowKey="configId"
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
          <template v-if="column.dataIndex == 'configName'">
            <a @click="openEdit(record)">{{ record.configName }}</a>
          </template>

          <template v-if="column.key === 'sysFlag'">
            <a-tag color="blue" v-if="record.sysFlag === 'Y'">是</a-tag>
            <a-tag color="default" v-else>否</a-tag>
          </template>

          <template v-if="column.dataIndex == 'configCode'">
            <a @click="openEdit(record)">{{ record.configCode }}</a>
          </template>

          <!-- table操作栏按钮 -->
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a @click="openEdit(record)">修改</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定要删除吗？" @confirm="remove(record)">
                <a class="guns-text-danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </BasicTable>
    </div>

    <!-- 编辑弹窗 -->
    <sys-config-edit
      v-model:visible="showEdit"
      :group-code="groupCode"
      :data="current"
      @done="reload"
    />

    <!-- 编辑弹窗 -->
    <sys-config-add v-model:visible="showAdd" :group-code="groupCode" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { BasicColumn, BasicTable, TableActionType } from '/@/components/Table';
  import { message } from 'ant-design-vue/es';
  import useSearch from '/@/utils/common/use-search';
  import SysConfigEdit from './sysconfig-edit.vue';
  import SysConfigAdd from './sysconfig-add.vue';
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';
  import { SysConfigParam } from '/@/api/system/basedata/model/SysConfigModel';

  const props = defineProps<{
    // 配置组编码
    groupCode: string;
  }>();

  // 查询条件
  const { where, resetWhereFields } = useSearch<SysConfigParam>({
    groupCode: props.groupCode,
  });

  // 表格配置
  const columns = ref<BasicColumn[]>([
    {
      title: '配置名称',
      dataIndex: 'configName',
      width: 200,
    },
    {
      title: '配置编码',
      dataIndex: 'configCode',
      width: 230,
    },
    {
      title: '属性值',
      dataIndex: 'configValue',
      width: 360,
      ellipsis: true,
    },
    {
      title: '系统类型',
      key: 'sysFlag',
      dataIndex: 'sysFlag',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);
  // 当前行数据
  const current = ref<any>(null);
  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);
  // 是否显示新增编辑弹框
  const showAdd = ref<boolean>(false);
  // 表格实例
  const tableRef = ref<Nullable<TableActionType>>(null);

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-12 09:38:18
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value?.reload({ page: 1 });
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
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await SysConfigApi.deleteSysConfig({ configId: row.configId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑弹窗
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const openEdit = (row: any) => {
    current.value = row;
    showEdit.value = true;
    if (row && row.sysFlag) {
      current.value.sysFlagChecked = row.sysFlag === 'Y';
    }
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

  watch(
    () => props.groupCode,
    (val) => {
      where.groupCode = val;
      reload();
    },
  );

  defineExpose({
    showEdit,
  });
</script>
