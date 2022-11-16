<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="主题属性名称:">
              <a-input
                v-model:value.trim="where.fieldName"
                placeholder="请输入主题属性名称"
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
          :api="ThemeTemplateFieldApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="fieldId"
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
            <template v-if="column.dataIndex == 'fieldName'">
              <a @click="openEdit(record)">{{ record.fieldName }}</a>
            </template>

            <!-- table操作栏按钮 -->
            <template v-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此属性吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <field-edit v-model:visible="showEdit" :data="current" @done="reload" v-if="showEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { createVNode } from 'vue';
  import { ThemeTemplateFieldApi } from '/@/api/system/theme/ThemeTemplateFieldApi';
  import FieldEdit from './components/field-edit.vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  // 查询条件
  const where = reactive({
    fieldName: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '属性名称',
      dataIndex: 'fieldName',
      width: 140,
    },
    {
      title: '属性编码',
      dataIndex: 'fieldCode',
      width: 140,
    },
    {
      title: '属性类型',
      dataIndex: 'fieldType',
      width: 60,
    },
    {
      title: '是否必填',
      dataIndex: 'fieldRequired',
      width: 60,
    },
    {
      title: '属性长度',
      dataIndex: 'fieldLength',
      width: 60,
    },
    {
      title: '属性描述',
      dataIndex: 'fieldDescription',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 190,
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

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
    where.fieldName = '';
    reload();
  };

  /**
   * 删除单个
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await ThemeTemplateFieldApi.del({ fieldId: row.fieldId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑页面
   *
   * @author fengshuonan
   * @date 2021/6/15 23:14
   */
  const openEdit = (record) => {
    current.value = record;
    showEdit.value = true;
  };
</script>
