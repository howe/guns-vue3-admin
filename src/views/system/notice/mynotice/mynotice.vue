<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="标题:">
              <a-input
                v-model:value.trim="where.messageTitle"
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
          :api="NoticeApi.findPage"
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
                <a-button type="primary" @click="setAlready">
                  <template #icon>
                    <CheckOutlined />
                  </template>
                  <span>全部已读</span>
                </a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'messageTitle'">
              <a @click="openEdit(record)">{{ record.messageTitle }}</a>
            </template>

            <!-- table列表已读状态 -->
            <template v-if="column.key === 'state'">
              <a-tag color="green" v-if="record.readFlag === 0">未读</a-tag>
              <a-tag v-else> 已读</a-tag>
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">查看</a>
                <a-divider type="vertical" />
                <a class="guns-text-danger" @click="deleteMessage(record)">删除</a>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!--我的消息-->
    <my-notice-detail v-model:visible="showDetail" :data="current" @done="reload" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicTable } from '/@/components/Table';
  import MyNoticeDetail from './mynotice-detail.vue';
  import { NoticeApi } from '/@/api/system/notice/NoticeApi';

  // 查询条件
  const where = reactive({
    messageTitle: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '标题',
      dataIndex: 'messageTitle',
    },
    {
      title: '发消息人',
      dataIndex: 'sendUserIdWrapper',
    },
    {
      title: '消息发送时间',
      dataIndex: 'messageSendTime',
    },
    {
      title: '已读状态',
      key: 'state',
      dataIndex: 'readFLag',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
    },
  ]);

  // 表格多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示详情抽屉
  const showDetail = ref<boolean>(false);

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
    where.messageTitle = '';
    reload();
  };

  /**
   * 设置为已读
   *
   * @author fengshuonan
   * @date 2021/6/15 23:08
   */
  const setAlready = async () => {
    let result = await NoticeApi.setAlreadyReadState();
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑页面
   *
   * @author fengshuonan
   * @date 2021/6/15 23:14
   */
  const openEdit = (record) => {
    current.value = record;
    showDetail.value = true;
  };

  /**
   * 删除消息
   *
   * @author fengshuonan
   * @date 2021/6/14 22:31
   */
  const deleteMessage = async (record) => {
    let result = await NoticeApi.deleteMessage(record);
    message.success(result.message);
    reload();
  };
</script>

<style></style>
