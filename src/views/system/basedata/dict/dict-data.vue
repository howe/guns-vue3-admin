<template>
  <div>
    <a-form layout="inline" :model="where">
      <a-row>
        <a-form-item label="名称">
          <a-input v-model:value.trim="where.dictName" placeholder="请输入名称" allow-clear />
        </a-form-item>
        <a-form-item label="编码">
          <a-input v-model:value.trim="where.dictCode" placeholder="请输入编码" allow-clear />
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
        :api="SysDictDataApi.findDictPage"
        :where="where"
        :columns="columns"
        showTableSetting
        rowKey="dictId"
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
          <template v-if="column.dataIndex == 'dictName'">
            <a @click="openEdit(record)">{{ record.dictName }}</a>
          </template>

          <!-- table操作栏按钮 -->
          <template v-if="column.key === 'action'">
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
    <dict-data-edit
      v-model:visible="showEdit"
      :dict-type-code="dictTypeCode"
      :data="current"
      @done="reload"
    />
    <!-- 新增弹窗 -->
    <dict-data-add v-model:visible="showAdd" :dict-type-code="dictTypeCode" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { BasicColumn, BasicTable, TableActionType } from '/@/components/Table';
  import { message } from 'ant-design-vue/es';
  import useSearch from '/@/utils/common/use-search';
  import DictDataEdit from './dict-data-edit.vue';
  import DictDataAdd from './dict-data-add.vue';
  import { SysDictDataApi } from '/@/api/system/basedata/SysDictDataApi';
  import { DictRequest, SysDict } from '/@/api/system/basedata/model/SysDictDataModel';

  const props = defineProps<{
    // 配置组编码
    dictTypeCode: string;
  }>();

  // 查询条件
  const { where, resetWhereFields } = useSearch<DictRequest>({});

  // 表格配置
  const columns = ref<BasicColumn[]>([
    {
      title: '名称',
      dataIndex: 'dictName',
    },
    {
      title: '编码',
      dataIndex: 'dictCode',
    },
    {
      title: '排序',
      dataIndex: 'dictSort',
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
  const current = ref<SysDict | null>(null);
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
  const remove = async (row: SysDict) => {
    const result = await SysDictDataApi.del({ dictId: row.dictId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑弹窗
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const openEdit = (row: SysDict) => {
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

  // 监听字典类型变化
  watch(
    () => props.dictTypeCode,
    (val) => {
      where.dictTypeCode = val;
      reload();
    },
  );

  defineExpose({
    showEdit,
  });
</script>

<style></style>
