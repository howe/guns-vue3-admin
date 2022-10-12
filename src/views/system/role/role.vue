<template>
  <div class="ele-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="角色名称:">
              <a-input
                v-model:value.trim="where.roleName"
                placeholder="请输入角色名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="角色编码:">
              <a-input
                v-model:value.trim="where.roleCode"
                placeholder="请输入角色编码"
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
          :api="SysRoleApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="roleId"
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
            <template v-if="column.dataIndex == 'roleName'">
              <a @click="openEdit(record)">{{ record.roleName }}</a>
            </template>

            <!-- table操作栏按钮 -->
            <template v-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此角色吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <sys-role-edit v-model:visible="showEdit" :data="current" @done="reload" v-if="showEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { SysRoleApi } from '/@/api/system/role/SysRoleApi';
  import SysRoleEdit from './role-edit.vue';
  import { message } from 'ant-design-vue';
  // 查询条件
  const where = reactive({
    roleName: '',
    roleCode: '',
  });

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '数据范围',
      dataIndex: 'dataScopeType',
    },
    {
      title: '排序',
      dataIndex: 'roleSort',
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      align: 'center',
    },
  ]);

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
    where.roleCode = '';
    where.roleName = '';
    reload();
  };

  /**
   * 删除单个
   *
   * @author chenjinlong
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await SysRoleApi.del({ roleId: row.roleId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑弹窗
   *
   * @author chenjinlong
   * @date 2021/4/2 17:03
   */
  const openEdit = (row: any) => {
    current.value = row;
    showEdit.value = true;
  };
</script>

<style></style>
