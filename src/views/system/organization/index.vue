<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="机构名称:">
              <a-input
                v-model:value.trim="where.orgName"
                placeholder="请输入机构名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="机构编码">
              <a-input
                v-model:value.trim="where.orgCode"
                placeholder="请输入机构编码"
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
          :api="OrganizationApi.organizationTreeList"
          :where="where"
          :isTreeTable="true"
          :columns="columns"
          :defaultExpandAllRows="true"
          showTableSetting
          rowKey="id"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
          @register="registerTable"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-space>
                <a-button type="primary" @click="openAdd">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  <span>新建</span>
                </a-button>
                <a-button @click="expandAll">展开全部</a-button>
                <a-button @click="collapseAll">折叠全部</a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'orgName'">
              <a @click="openEdit(record, '1')">{{ record.orgName }}</a>
            </template>
            <!-- 1-启用，2-禁用 -->
            <template v-if="column.key === 'statusFlag'">
              <a-tag color="green" v-if="record.statusFlag === 1">启用</a-tag>
              <a-tag color="red" v-else> 禁用</a-tag>
            </template>

            <!-- 组织机构类型 -->
            <template v-else-if="column.key === 'orgType'">
              <a-tag color="orange" v-if="record.orgType === 1">公司</a-tag>
              <a-tag color="blue" v-else-if="record.orgType === 2">部门</a-tag>
              <a-tag v-else> 其他</a-tag>
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record, '2')">设置审批人</a>
                <a-divider type="vertical" />
                <a @click="openEdit(record, '1')">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此机构吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <org-edit
      v-model:visible="showEdit"
      :isUpdate="updateOrg"
      :data="currentOrgInfo"
      @done="reload"
      :org-list="orgList"
      :defaultKey="defaultKey"
    />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { OrganizationApi } from '/@/api/system/organization/OrganizationApi';
  import { UserApi } from '/@/api/system/user/UserApi';
  import OrgEdit from './org-edit.vue';
  import { reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';

  // 搜索条件
  const where = reactive({
    orgName: '',
    orgCode: '',
  });
  // ref
  const tableRef = ref(null);
  // 表格配置
  const columns = ref<string[]>([
    {
      title: '机构名称',
      dataIndex: 'orgName',
      align: 'left',
    },
    {
      title: '机构编码',
      dataIndex: 'orgCode',
      align: 'center',
    },
    {
      title: '机构状态',
      key: 'statusFlag',
      dataIndex: 'statusFlag',
      align: 'center',
    },
    {
      title: '机构类型',
      dataIndex: 'orgType',
      key: 'orgType',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'orgSort',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
    },
  ]);

  // 表格多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 是否显示弹框
  const showEdit = ref<boolean>(false);

  // 当前行的数据
  const currentOrgInfo = ref<any>(null);

  // 默认选中tab
  const defaultKey = ref<string>('1');

  // 是否是更新组织机构
  const updateOrg = ref<boolean>(false);

  // 全部机构数据
  const orgList = ref<string[]>([]);

  // 点击搜索
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value.reload();
  };

  // 重置
  const reset = () => {
    where.orgName = '';
    where.orgCode = '';
    reload();
  };

  const [registerTable, { expandAll, collapseAll }] = useTable({
    afterFetch: (data) => {
      orgList.value = data;
    }
  });

  /**
   * 打开编辑弹窗
   *
   * @author fengshuonan
   * @date 2022/5/20 17:54
   */
  const openEdit = async (row: any, flag: string) => {
    currentOrgInfo.value = await UserApi.getOrgDetail({ orgId: row.nodeId });
    defaultKey.value = flag;
    showEdit.value = true;
    updateOrg.value = true;
  };

  /**
   * 打开编辑弹窗
   *
   * @author fengshuonan
   * @date 2022/5/20 17:54
   */
  const openAdd = () => {
    defaultKey.value = '1';
    currentOrgInfo.value = {};
    showEdit.value = true;
    updateOrg.value = false;
  };

  /**
   * 删除单个
   *
   * @author fengshuonan
   * @date 2022/5/20 17:54
   */
  const remove = async (row: any) => {
    const result = await OrganizationApi.del({ orgId: row.id });
    message.success(result.message);
    reload();
  };
</script>

<style></style>
