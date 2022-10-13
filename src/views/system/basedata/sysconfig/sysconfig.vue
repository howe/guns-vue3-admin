<template>
  <div class="guns-body guns-body-card">
    <a-row :gutter="16">
      <a-col :lg="5" :md="10" :sm="24" :xs="24">
        <a-card :bordered="false" :body-style="{ padding: '24px 24px' }" class="new-table">
          <!-- 界面左侧系统配置类型表格 -->
          <BasicTable
            :canResize="false"
            ref="tableRef"
            :api="SysConfigApi.findConfigGroupPage"
            :columns="columns"
            rowKey="dictCode"
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
          <sys-config-table v-if="current" :groupCode="current.dictCode" ref="sysTableRef" />
        </a-card>
      </a-col>
    </a-row>

    <!-- 编辑系统配置分类的弹框 -->
    <sys-config-type-edit v-model:visible="showEdit" :data="editData" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { createVNode, onMounted, reactive, ref } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import SysConfigTable from './sysconfig-table.vue';
  import SysConfigTypeEdit from './sysconfig-type-edit.vue';
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';

  // 左侧表格配置
  const columns = ref<string[]>([
    {
      title: '配置类型',
      dataIndex: 'dictName',
    },
    {
      title: '字典编码',
      dataIndex: 'dictCode',
    },
  ]);

  // 当前行数据
  const current = ref<any>(null);

  // ref
  const tableRef = ref(null);
  const sysTableRef = ref(null);

  // 配置类型的字典数据
  const configTypeDict = ref<any>({});

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

  // 编辑回显数据
  const editData = ref<any>(null);

  // 接口设置
  const [registerTable, {}] = useTable({
    afterFetch: (data) => {
      if (data && data.length > 0) {
        tableRef.value.setSelectedRowKeys([data[0].dictCode]);
        current.value = data[0];
      }
    },
  });

  //左侧配置类型选择改变
  const onSelectChange = (val: any, row: any) => {
    if (row && row.length > 0) current.value = row[0];
  };

  onMounted(async () => {
    // 加载字典数据
    const result = await SysConfigApi.getConfigDictTypeDetail();
    configTypeDict.value.dictTypeCode = result.dictTypeCode;
    configTypeDict.value.dictTypeId = result.dictTypeId;
    configTypeDict.value.dictTypeName = result.dictTypeName;
  });

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
  const openEdit = () => {
    sysTableRef.value.showEdit = false;
    editData.value = configTypeDict.value;
    showEdit.value = true;
  };

  /**
   * 删除系统配置分类
   *
   * @author fengshuonan
   * @date 2021/4/9 11:49
   */
  const remove = () => {
    sysTableRef.value.showEdit = false;
    showEdit.value = false;
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的类型吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        let result = await SysConfigApi.deleteConfigType({ dictId: current.value.dictId });
        message.success(result.message);
        reload();
      },
    });
  };
</script>

<style></style>
