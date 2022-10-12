<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="职位名称:">
              <a-input
                v-model:value.trim="where.positionName"
                placeholder="请输入职位名称"
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
          :api="PositionApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="positionId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
            onChange: onSelectChange,
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
                <a-button danger @click="removeBatch()">
                  <template #icon>
                    <delete-outlined />
                  </template>
                  <span>删除</span>
                </a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'positionName'">
              <a @click="openEdit(record)">{{ record.positionName }}</a>
            </template>
            <!-- table列表状态栏 -->
            <!-- 1是激活，2是禁用 -->
            <template v-if="column.key === 'status'">
              <a-switch
                :checked="record.statusFlag === 1"
                @change="(checked) => editState(checked, record)"
              />
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此职务吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <position-edit v-model:visible="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { reactive, ref, createVNode } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import PositionEdit from './position-edit.vue';
  import { PositionApi } from '/@/api/system/position/PositionApi';
  import { message, Modal } from 'ant-design-vue';
  // 查询条件
  const where = reactive({
    positionName: '',
  });

  // 表格列配置
  const columns = ref<string[]>([
    {
      title: '职位名称',
      dataIndex: 'positionName',
      width: 160,
    },
    {
      title: '职位编码',
      dataIndex: 'positionCode',
      width: 160,
    },
    {
      title: '备注',
      dataIndex: 'positionRemark',
      width: 160,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
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
    where.positionName = '';
    reload();
  };

  // 表格选中改变
  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    checkedKeys.value = selectedRowKeys;
  };

  /**
   * 打开编辑弹窗
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const openEdit = (row) => {
    current.value = row;
    showEdit.value = true;
  };

  /**
   * 修改职位状态
   *
   * @author fengshuonan
   * @date 2021/4/2 17:04
   */
  const editState = async (checked: boolean, row: any) => {
    const positionId = row.positionId;
    // 职位状态：1-启用，2-禁用
    const statusFlag = checked ? 1 : 2;
    const result = await PositionApi.updateStatus({ positionId, statusFlag });
    message.success(result.message);
    row.statusFlag = statusFlag;
  };

  /**
   * 批量删除
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const removeBatch = () => {
    showEdit.value = false;
    if (!checkedKeys.value.length) {
      message.error('请至少选择一条数据');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的职位吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        let params = checkedKeys.value;
        const result = await PositionApi.batchDel({ positionIds: params });
        message.success(result.message);
        reload();
      },
    });
  };

  /**
   * 删除单个
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await PositionApi.del({ positionId: row.positionId });
    message.success(result.message);
    reload();
  };
</script>

<style></style>
