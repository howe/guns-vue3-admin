<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="账号:">
              <a-input v-model:value.trim="where.account" placeholder="请输入账号" allow-clear />
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
          :api="OnlineUserApi.onlineUserList"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="resourceId"
          :rowSelection="{
            type: 'account',
            selectedRowKeys: checkedKeys,
          }"
        >
          <template #bodyCell="{ column, record }">
            <!-- table操作栏按钮 -->
            <template v-if="column.key === 'action'">
              <a-space>
                <a @click="kickOff(record)">踢下线</a>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import { UserApi } from '/@/api/system/user/UserApi';
  import { OnlineUserApi } from '/@/api/system/operation/OnlineUserApi';

  // 查询条件
  const where = reactive({
    account: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

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
    where.account = '';
    reload();
  };

  /**
   * 踢下线
   *
   * @author fengshuonan
   * @date 2021/4/13 14:47
   */
  const kickOff = async (row: any) => {
    const result = await UserApi.kickOff({ token: row.token });
    message.info(result.message);
    reload();
  };
</script>

<style></style>
