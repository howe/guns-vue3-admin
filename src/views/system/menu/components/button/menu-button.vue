<template>
  <div>
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="按钮名称:">
              <a-input
                v-model:value.trim="where.buttonName"
                placeholder="请输入按钮名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="按钮编码">
              <a-input
                v-model:value.trim="where.buttonCode"
                placeholder="请输入按钮编码"
                allow-clear
              />
            </a-form-item>
            <a-form-item class="ele-text-center" :wrapper-col="{ span: 24 }">
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
      <a-card :bordered="false">
        <BasicTable
          :canResize="false"
          ref="tableRef"
          :api="MenuButtonApi.findPage"
          :where="where"
          :isTreeTable="true"
          :columns="columns"
          :defaultExpandAllRows="true"
          showTableSetting
          rowKey="buttonId"
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
                <a-button type="primary" @click="addDefaultButton()">
                  <template #icon>
                    <plus-circle-outlined />
                  </template>
                  <span>一建添加默认按钮</span>
                </a-button>
                <a-button type="primary" @click="openEdit()">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  <span>新建</span>
                </a-button>
                <a-button danger @click="removeBatch">
                  <template #icon>
                    <delete-outlined />
                  </template>
                  <span>删除</span>
                </a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <!-- table操作栏按钮 -->
            <template v-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a @click="openBindResource(record)">绑定接口</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此按钮吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <menu-button-edit v-model:visible="showEdit" :data="current" :menuId="menuId" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, createVNode, onMounted, nextTick } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import MenuButtonEdit from './menu-button-edit.vue';
  import { MenuButtonApi } from '/@/api/system/menu/MenuButtonApi';

  const props = defineProps<{
    // 菜单数据
    data: Object;
  }>();

  const emits = defineEmits<{
    (e: 'openBindResource', row: any): void;
  }>();

  // 查询条件
  const where = reactive({
    buttonName: '',
    buttonCode: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '按钮名称',
      dataIndex: 'buttonName',
      width: 160,
    },
    {
      title: '按钮编码',
      dataIndex: 'buttonCode',
      width: 320,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 280,
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);
  // 当前编辑数据
  const current = ref<any>(null);
  // 是否显示编辑弹窗
  const showEdit = ref<boolean>(false);
  // 菜单id
  const menuId = ref<string>('');

  // ref
  const tableRef = ref(null);

  onMounted(() => {
    if (props.data) {
      menuId.value = props.data.menuId;
      where.menuId = props.data.menuId;
      nextTick(() => {
        reload();
      });
    }
  });

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-13 09:21:26
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value.reload({ page: 1 });
  };

  /**
   * 点击重置
   * @author: nxy
   * @Date: 2022-10-13 09:21:50
   */
  const reset = () => {
    where.buttonName = '';
    where.buttonCode = '';
    reload();
  };

  // 表格选中改变
  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    checkedKeys.value = selectedRowKeys;
  };

  /**
   * 删除单个
   *
   * @author jiawei
   * @date 2021/4/8 10:06
   */
  const remove = async (row: any) => {
    const result = await MenuButtonApi.deleteMenuButton({ buttonId: row.buttonId });
    message.success(result.message);
    reload();
  };

  /**
   * 批量删除
   *
   * @author jiawei
   * @date 2021/4/8 10:06
   */
  const removeBatch = () => {
    if (!checkedKeys.value.length) {
      message.error('请至少选择一条数据');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的按钮吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        let params = checkedKeys.value;
        const result = await MenuButtonApi.batchDeleteMenuButton({ buttonIds: params });
        message.success(result.message);
        reload();
      },
    });
  };

  /**
   * 一建添加默认按钮
   *
   * @author jiawei
   * @date 2021/4/8 10:06
   */
  const addDefaultButton = async () => {
    Modal.confirm({
      title: '提示',
      content: '是否一键添加系统默认CRUD操作按钮?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        const result = await MenuButtonApi.addDefaultMenuButton({ menuId: props.data.menuId });
        message.success(result.message);
        reload();
      },
    });
  };

  /**
   * 打开编辑弹窗
   *
   * @author jiawei
   * @date 2021/4/8 10:06
   */
  const openEdit = (row: any) => {
    current.value = row;
    menuId.value = props.data.menuId;
    showEdit.value = true;
  };

  /**
   * 打开绑定资源
   *
   * @author fengshuonan
   * @date 2021/8/10 17:44
   */
  const openBindResource = (row: any) => {
    emits('openBindResource', row);
  };
</script>

<style></style>
