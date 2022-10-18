<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="开始时间:">
              <a-date-picker
                v-model:value="where.beginTime"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
              />
            </a-form-item>
            <a-form-item label="结束时间:">
              <a-date-picker
                v-model:value="where.endTime"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
              />
            </a-form-item>
            <a-form-item label="日志名称:">
              <a-input @keydown.enter="reload" v-model:value="where.llgName" allow-clear />
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
          :api="LoginLogApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="llgId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-popconfirm title="是否清空所有日志？" @confirm="cleanAllLoginLog">
                <template #icon>
                  <question-circle-outlined />
                </template>
                <a-button danger>
                  <template #icon>
                    <delete-outlined />
                  </template>
                  <span>清空日志</span>
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </BasicTable>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import { LoginLogApi } from '/@/api/system/log/LoginLogApi';

  // 查询条件
  const where = reactive({
    beginTime: '',
    endTime: '',
    llgName: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '日志名称',
      dataIndex: 'llgName',
    },
    {
      title: '执行结果',
      dataIndex: 'llgSucceed',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
    },
    {
      title: '具体消息',
      dataIndex: 'llgMessage',
    },
    {
      title: 'IP',
      dataIndex: 'llgIpAddress',
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
    where.beginTime = '';
    where.endTime = '';
    where.llgName = '';
    reload();
  };

  /**
   * 清空所有日志
   *
   * @author luojie
   * @date 2021/4/13 14:32
   */
  const cleanAllLoginLog = async () => {
    const result = await LoginLogApi.deleteAll(where);
    message.success(result.message);
    reload();
  };
</script>

<style></style>
