<!--
 * @Author
  components: { orgList },: nxy
 * @Date: 2022-10-09 13:50:10
-->
<template>
  <div class="guns-body">
    <a-row :gutter="16">
      <!-- 左侧组织机构列表 -->
      <a-col :lg="5" :md="10" :sm="24" :xs="24" class="left-menu-height">
        <org-list
          :orgList="orgLists"
          v-model:currentSelectOrgId="where.orgId"
          @changeNodeSelect="reload"
          @updateOrgList="updateOrgList"
          ref="orgListRef"
          @closeCompanyEdit="closeCompanyEdit"
        />
      </a-col>

      <!-- 右侧用户管理表格 -->
      <a-col :lg="19" :md="14" :sm="24" :xs="24">
        <!-- 搜索表单 -->
        <div class="block-interval">
          <a-card :bordered="false">
            <a-form layout="inline" :model="where">
              <a-row>
                <a-form-item label="账号:">
                  <a-input
                    v-model:value.trim="where.account"
                    placeholder="请输入账号"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item label="姓名">
                  <a-input
                    v-model:value.trim="where.realName"
                    placeholder="请输入姓名"
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
              :api="UserApi.getUserPages"
              :where="where"
              :columns="columns"
              showTableSetting
              rowKey="userId"
              :rowSelection="{
                type: 'checkbox',
                selectedRowKeys: checkedKeys,
                onChange: onSelectChange,
              }"
            >
              <template #toolbar>
                <div class="table-toolbar">
                  <a-space>
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
                <template v-if="column.dataIndex == 'realName'">
                  <a @click="openEdit(record)">{{ record.realName }}</a>
                </template>

                <!-- table列表状态栏 -->
                <!-- 1是激活，2是禁用 -->
                <template v-if="column.key === 'status'">
                  <a-switch
                    :checked="record.statusFlag === 1"
                    @change="(checked) => editState(checked, record)"
                  />
                </template>

                <!-- 是否冻结，冻结的用户是因为登录重试次数过多 -->
                <template v-else-if="column.key === 'loginErrorCountFlag'">
                  <a-popconfirm
                    title="该用户密码重试次数过多，已被冻结，是否解除冻结该用户？"
                    @confirm="unFreezeUser(record)"
                    v-if="record.loginErrorCountFlag == true"
                  >
                    <a class="ele-text-danger">解除冻结</a>
                  </a-popconfirm>
                  <a-tag color="green" v-else>正常</a-tag>
                </template>

                <!-- table操作栏按钮 -->
                <template v-else-if="column.key === 'action'">
                  <a-space>
                    <a @click="openEdit(record)">修改</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定要删除此用户吗？" @confirm="remove(record)">
                      <a class="guns-text-danger">删除</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a>分配角色</a>
                    <a-divider type="vertical" />
                    <a @click="resetPsw(record)">重置密码</a>
                  </a-space>
                </template>
              </template>
            </BasicTable>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable } from '/@/components/Table';
  import { onMounted, reactive, ref, createVNode } from 'vue';
  import OrgList from './components/org-list.vue';
  import { UserApi } from '/@/api/sys/user/UserApi';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { message, Modal } from 'ant-design-vue';

  // 组织列表
  const orgLists = ref<string[]>([]);
  // 搜索数据
  const where = reactive({
    orgId: '',
    account: '',
    realName: '',
  });

  //ref
  const tableRef = ref<any>(null);
  const orgListRef = ref<any>(null);
  //表格配置
  const columns = ref<string[]>([
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '职务',
      dataIndex: 'positionName',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      customRender: function ({ text }) {
        if ('F' === text) {
          return '女';
        } else {
          return '男';
        }
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: '冻结状态',
      key: 'loginErrorCountFlag',
      dataIndex: 'loginErrorCountFlag',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 300,
      hideInSetting: true,
    },
  ]);

  // 表格多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 是否显示弹框
  const showEdit = ref<boolean>(false);
  onMounted(async () => {
    orgLists.value = await UserApi.getOrgTeeList();
  });

  // 查询
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value.reload({ page: 1 });
  };

  // 重置
  const reset = () => {
    where.orgId = '';
    where.account = '';
    where.realName = '';
    reload();
  };

  /**
   * 更新组织机构列表数据
   *
   * @author fengshuonan
   * @date 2021/4/12 14:18
   */
  const updateOrgList = async () => {
    orgLists.value = await UserApi.getOrgTeeList();
  };

  const closeCompanyEdit = () => {
    console.log(1111);
  };

  /**
   * 修改用户状态
   *
   * @author fengshuonan
   * @date 2021/4/2 17:04
   */
  const editState = async (checked: boolean, row: any) => {
    const userId = row.userId;
    // 用户状态：1-启用，2-禁用
    const statusFlag = checked ? 1 : 2;
    const result = await UserApi.changeStatus({ userId, statusFlag });
    message.success(result.message);
    row.statusFlag = statusFlag;
  };

  /**
   * 解除冻结用户
   *
   * @author fengshuonan
   * @date 2022/5/31 14:17
   */
  const unFreezeUser = async (record) => {
    const result = await UserApi.unFreezeUser({ account: record.account });
    message.success(result.message);
    reload();
  };

  // 打开新增编辑弹框
  const openEdit = (row: any) => {
    console.log(row);
  };

  /**
   * 批量删除
   * @author: nxy
   * @Date: 2022-10-09 16:56:28
   */
  const removeBatch = () => {
    orgListRef.value.showEdit = false;
    showEdit.value = false;
    if (!checkedKeys.value.length) {
      message.error('请至少选择一条数据');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的用户吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        let params = checkedKeys.value;
        const result = await UserApi.batchDeleteUser({ userIds: params });
        message.success(result.message);
        reload();
      },
    });
  };

  // 表格选中改变
  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    checkedKeys.value = selectedRowKeys;
  };

  /**
   * 重置用户密码
   *
   * @author fengshuonan
   * @date 2021/4/2 17:04
   */
  const resetPsw = (row?: any) => {
    Modal.confirm({
      title: '提示',
      content: '确定要重置此用户的密码为"123456"吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        let result = await UserApi.resetPwd({ userId: row.userId });
        message.success(result.message);
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
    const result = await UserApi.deleteUser({ userId: row.userId });
    message.success(result.message);
    reload();
  };
</script>

<style scoped lang="less"></style>
