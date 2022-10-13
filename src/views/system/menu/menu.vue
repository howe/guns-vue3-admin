<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="应用选择:">
              <a-select
                show-search
                v-model:value="where.appCode"
                placeholder="请选择所属应用"
                style="width: 205px"
                allow-clear
              >
                <a-select-option v-for="item in appList" :key="item.appCode">
                  {{ item.appName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="菜单名称:">
              <a-input
                v-model:value.trim="where.menuName"
                placeholder="请输入菜单名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="菜单编码">
              <a-input
                v-model:value.trim="where.menuCode"
                placeholder="请输入菜单编码"
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
      <a-card :bordered="false" class="table-height">
        <BasicTable
          :canResize="false"
          ref="tableRef"
          :api="MenuApi.findTableMenus"
          :where="where"
          :isTreeTable="true"
          :columns="columns"
          :defaultExpandAllRows="true"
          showTableSetting
          rowKey="menuId"
          :pagination="false"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
            onChange: onSelectChange,
          }"
          @register="registerTable"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-space>
                <a-button type="primary" @click="openEdit(null, '1')">
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
                <a-button @click="expandAll">展开全部</a-button>
                <a-button @click="collapseAll">折叠全部</a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <!-- table列表是否可见栏 -->
            <!-- Y是可见，N是不可见 -->
            <template v-if="column.key === 'visible'">
              <a-tag color="green" v-if="record.antdvVisible === 'Y'">可见</a-tag>
              <a-tag v-else> 不可见</a-tag>
            </template>

            <!-- 图标渲染 -->
            <template v-else-if="column.key === 'icon'">
              <component style="fontsize: 20px" :is="$antIcons[record.antdvIcon]" />
              <a @click="openEdit(record, '1')">{{ record.menuName }}</a>
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record, '1')">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此菜单吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
                <a-divider v-if="record.leafFlag" type="vertical" />
                <a v-if="record.leafFlag" @click="openEdit(record, '2')">按钮管理</a>
                <a-divider v-if="record.leafFlag" type="vertical" />
                <a v-if="record.leafFlag" @click="openEdit(record, '3')">绑定接口</a>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <menu-edit
      v-model:visible="showEdit"
      :data="current"
      @done="reload"
      :defaultKey="defaultKey"
      v-if="showEdit"
    />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, createVNode, onMounted } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import MenuEdit from './menu-edit.vue';
  import { MenuApi } from '/@/api/system/menu/MenuApi';
  import { deleteEmptyChild } from '/@/utils/common/util';

  // 查询条件
  const where = reactive({
    appCode: '',
    menuName: '',
    menuCode: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '菜单名称',
      dataIndex: 'appIcon',
      key: 'icon',
      minWidth: 160,
      align: 'left',
    },
    {
      title: '菜单编号',
      dataIndex: 'menuCode',
      align: 'center',
      width: 160,
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      align: 'center',
      width: 160,
    },
    {
      title: '路由地址',
      dataIndex: 'antdvRouter',
      align: 'center',
      width: 160,
    },
    {
      title: '组件地址',
      dataIndex: 'antdvComponent',
      align: 'center',
      width: 160,
    },
    {
      title: '是否可见',
      key: 'visible',
      dataIndex: 'visible',
      align: 'center',
      width: 160,
    },
    {
      title: '排序',
      dataIndex: 'menuSort',
      align: 'center',
      width: 68,
      sorter: true,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 290,
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);
  // 当前编辑数据
  const current = ref<any>(null);
  // 是否显示编辑弹窗
  const showEdit = ref<boolean>(false);
  //应用列表
  const appList = ref<string[]>([]);
  // 默认选中
  const defaultKey = ref<string>('1');

  // ref
  const tableRef = ref(null);

  onMounted(async () => {
    // 查询应用
    appList.value = await MenuApi.getAppDropList();
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
    where.appCode = '';
    where.menuName = '';
    where.menuCode = '';
    reload();
  };

  // 表格选中改变
  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    checkedKeys.value = selectedRowKeys;
  };

  const [registerTable, { expandAll, collapseAll }] = useTable({
    afterFetch: (data) => {
      return deleteEmptyChild(data);
    },
  });

  /**
   * 删除单个
   *
   * @author jiawei
   * @date 2021/4/8 10:06
   */
  const remove = async (row: any) => {
    const result = await MenuApi.deleteMenu({ menuId: row.menuId });
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
    showEdit.value = false;
    if (!checkedKeys.value.length) {
      message.error('请至少选择一条数据');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的菜单吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        let params = checkedKeys.value;
        const result = await MenuApi.deleteMenu({ menuIds: params });
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
  const openEdit = (row: any, flag: string) => {
    defaultKey.value = flag;
    current.value = row;
    showEdit.value = true;
  };
</script>

<style></style>
