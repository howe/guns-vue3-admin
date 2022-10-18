<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="开始时间:">
              <a-date-picker
                v-model:value="where.beginDate"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
              />
            </a-form-item>
            <a-form-item label="结束时间:">
              <a-date-picker
                v-model:value="where.endDate"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
              />
            </a-form-item>
            <a-form-item label="服务名称:">
              <a-select v-model:value="where.appName" style="width: 205px">
                <a-select-option value="guns">guns</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="日志名称:">
              <a-input v-model:value="where.logName" />
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
          :api="OperateLogApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="logId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-space>
                <a-button danger @click="removeBatch()">
                  <template #icon>
                    <delete-outlined />
                  </template>
                  <span>清空日志</span>
                </a-button>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'logName'">
              <a @click="openDetail(record)">{{ record.logName }}</a>
            </template>

            <!-- table操作栏按钮 -->
            <template v-if="column.key === 'action'">
              <a-space>
                <a @click="openDetail(record)">详情</a>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 操作日志详情 -->
    <operate-log-detail v-model:visible="showDetail" :detail="current" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { createVNode } from 'vue';
  import { OperateLogApi } from '/@/api/system/log/OperateLogApi';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import OperateLogDetail from './operatelog-detail.vue';

  // 查询条件
  const where = reactive({
    beginDate: '',
    endDate: '',
    logName: '',
    appName: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '日志分类',
      dataIndex: 'logName',
    },
    {
      title: '执行接口',
      dataIndex: 'requestUrl',
    },
    {
      title: '具体消息',
      dataIndex: 'logContent',
    },
    {
      title: '操作用户',
      dataIndex: 'userIdWrapper',
    },
    {
      title: '服务名称',
      dataIndex: 'appName',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示详情弹框
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
    where.beginDate = '';
    where.endDate = '';
    where.logName = '';
    where.appName = '';
    reload();
  };

  /**
   * 批量删除
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const removeBatch = () => {
    if (!where.beginDate || !where.endDate || !where.appName) {
      message.error('清空日志需要填写开始时间，结束时间以及app名称');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: '确定要清空指定日期的操作日志吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        const result = await OperateLogApi.delete(where);
        message.success(result.message);
        reload();
      },
    });
  };

  /**
   * 打开详情窗口
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const openDetail = async (row: any) => {
    current.value = await OperateLogApi.detail({ logId: row.logId });
    showDetail.value = true;
  };
</script>

<style></style>
