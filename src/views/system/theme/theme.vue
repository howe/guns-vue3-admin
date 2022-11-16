<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="主题名称:">
              <a-input
                v-model:value.trim="where.themeName"
                placeholder="请输入主题名称"
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
          :api="ThemeApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="themeId"
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
            <template v-if="column.dataIndex == 'themeName'">
              <a @click="openEdit(record)">{{ record.themeName }}</a>
            </template>

            <!-- table列表状态栏 -->
            <!-- 1是激活，2是禁用 -->
            <template v-if="column.key === 'state'">
              <a-switch
                :checked="record.statusFlag === 'Y'"
                @change="(checked) => editStatus(checked, record)"
              />
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="openEdit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此主题吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <theme-edit v-model:visible="showEdit" :data="current" @done="reload" v-if="showEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import { ThemeApi } from '/@/api/system/theme/ThemeApi';
  import ThemeEdit from './components/theme-edit.vue';

  // 查询条件
  const where = reactive({
    themeName: '',
  });

  // 表格配置
  const columns = ref<string[]>([
    {
      title: '主题名称',
      dataIndex: 'themeName',
      width: 160,
    },
    {
      title: '主题模板',
      dataIndex: 'templateName',
      width: 160,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 160,
    },
    {
      title: '启用状态',
      key: 'state',
      dataIndex: 'statusFlag',
      width: 100,
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      width: 260,
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

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
    where.themeName = '';
    reload();
  };

  /**
   * 删除单个
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await ThemeApi.del({ themeId: row.themeId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑页面
   *
   * @author fengshuonan
   * @date 2021/6/15 23:14
   */
  const openEdit = (record: any) => {
    current.value = record;
    showEdit.value = true;
  };

  /**
   * 修改主题状态
   *
   * @author fengshuonan
   * @date 2021/12/21 11:30:07
   */
  const editStatus = async (checked: boolean, row: any) => {
    const themeId = row.themeId;
    // 职位状态：Y-启用，N-禁用
    const statusFlag = checked ? 'Y' : 'N';
    const result = await ThemeApi.updateThemeStatus({ themeId });
    message.success(result.message);
    row.statusFlag = statusFlag;
    reload();
  };
</script>
