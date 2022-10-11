<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="通知标题:">
              <a-input
                v-model:value.trim="where.noticeTitle"
                placeholder="请输入通知标题"
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
          :api="PublishApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="noticeId"
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
            <template v-if="column.dataIndex == 'noticeTitle'">
              <a @click="openEdit(record)">{{ record.noticeTitle }}</a>
            </template>

            <!-- table操作栏按钮 -->
            <template v-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除吗？" @confirm="deleteNotice(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <publish-edit ref="publishRef" v-model:visible="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable } from '/@/components/Table';
  import { NoticeApi } from '/@/api/system/notice/NoticeApi';
  import PublishApi from '/@/api/system/notice/PublishApi';
  import PublishEdit from './publish-edit.vue';
  import { reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';

  // 搜索条件
  const where = reactive({
    noticeTitle: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '标题',
      dataIndex: 'noticeTitle',
      sorter: true,
    },
    {
      title: '创建人',
      dataIndex: 'createUserWrapper',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
    },
  ]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

  // ref
  const tableRef = ref(null);
  const publishRef = ref(null);

  // 表格多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-11 16:10:13
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value.reload({ page: 1 });
  };

  /**
   * 重置
   * @author: nxy
   * @Date: 2022-10-11 16:03:26
   */
  const reset = () => {
    where.noticeTitle = '';
    reload();
  };

  /**
   * 打开新建/编辑弹窗
   *
   * @author laihongliang
   * @date 2021/04/04 12:24
   */
  const openEdit = (row?: any) => {
    current.value = row;
    showEdit.value = true;
    publishRef.value.getUserList();
  };

  /**
   * 删除通知
   *
   * @author fengshuonan
   * @date 2021/6/14 21:00
   */
  const deleteNotice = async (row: any) => {
    const result = await NoticeApi.deleteNotice(row);
    message.success(result.message);
    reload();
  };
</script>

<style></style>
