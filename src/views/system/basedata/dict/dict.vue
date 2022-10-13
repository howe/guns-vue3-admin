<template>
  <div class="guns-body guns-body-card">
    <a-row :gutter="16">
      <a-col :lg="5" :md="10" :sm="24" :xs="24">
        <a-card :bordered="false" :body-style="{ padding: '24px 24px' }" class="new-table">
          <!-- 界面左侧系统配置类型表格 -->
          <BasicTable
            :canResize="false"
            ref="tableRef"
            :api="SysDictTypeApi.findDictTypePage"
            :columns="columns"
            rowKey="dictTypeId"
            :showIndexColumn="false"
            :rowSelection="{
              type: 'radio',
              onChange: onSelectChange,
            }"
            @register="registerTable"
          >
            <template #toolbar>
              <div class="table-toolbar">
                <a-space size="middle">
                  <a-button type="primary" @click="openEdit()">
                    <plus-outlined />
                    <span>新建</span>
                  </a-button>
                  <a-button danger @click="remove" :disabled="!current">
                    <delete-outlined />
                    <span>删除</span>
                  </a-button>
                </a-space>
              </div>
            </template>
          </BasicTable>
        </a-card>
      </a-col>
      <a-col :lg="19" :md="14" :sm="24" :xs="24">
        <a-card :bordered="false" class="new-table">
          <!-- 具体的系统配置table -->
          <dict-data v-if="current" :dictTypeCode="current.dictTypeCode" ref="dictDataRef" />
        </a-card>
      </a-col>
    </a-row>

    <!-- 编辑系统配置分类的弹框 -->
    <dict-edit v-model:visible="showEdit" :data="editData" @done="reload" v-if="showEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { createVNode, onMounted, reactive, ref, nextTick } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { SysDictTypeApi } from '/@/api/system/basedata/SysDictTypeApi';
  import DictData from './dict-data.vue';
  import DictEdit from './dict-edit.vue';

  // 左侧表格配置
  const columns = ref<string[]>([
    {
      title: '类型',
      dataIndex: 'dictTypeName',
    },
    {
      title: '编码',
      dataIndex: 'dictTypeCode',
    },
  ]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

  // 编辑回显数据
  const editData = ref<any>(null);

  // ref
  const tableRef = ref(null);
  const dictDataRef = ref(null);

  // 接口设置
  const [registerTable, {}] = useTable({
    afterFetch: (data) => {
      if (data && data.length > 0) {
        tableRef.value.setSelectedRowKeys([data[0].dictTypeId]);
        current.value = data[0];
      }
    },
  });

  //左侧配置类型选择改变
  const onSelectChange = (val: any, row: any) => {
    if (row && row.length > 0) current.value = row[0];
  };

  /**
   * 刷新系统配置分类表格
   *
   * @author fengshuonan
   * @date 2021/4/9 11:49
   */
  const reload = () => {
    tableRef.value.reload();
  };

  /**
   * 打开编辑系统配置分类
   *
   * @author fengshuonan
   * @date 2021/4/9 11:49
   */
  const openEdit = (row) => {
    editData.value = row;
    showEdit.value = true;
  };

  /**
   * 删除系统配置分类
   *
   * @author fengshuonan
   * @date 2021/4/9 11:49
   */
  const remove = () => {
    nextTick(() => {
      dictDataRef.value.showEdit = false;
      showEdit.value = false;
    });
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的类型吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        let result = await SysDictTypeApi.del({ dictTypeId: current.value.dictTypeId });
        message.success(result.message);
        reload();
      },
    });
  };
</script>

<style></style>
