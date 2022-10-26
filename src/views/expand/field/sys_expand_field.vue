<template>
  <div class="guns-body">
    <a-row>
      <!-- 左侧业务类型列表 -->
      <a-col :lg="3" :md="4" :sm="24" :xs="24" class="new-table left-menu-background">
        <a-menu mode="inline" class="zero-border" v-model:selectedKeys="selectedBusiness">
          <a-menu-item v-for="item in businessList" :key="item.expandId" @click="clickMenu(item)">
            {{ item.expandName }}
          </a-menu-item>
        </a-menu>
      </a-col>

      <!-- 右侧字段管理table -->
      <a-col :lg="21" :md="20" :sm="24" :xs="24">
        <!-- 表格 -->
        <div>
          <a-card :bordered="false" class="new-table">
            <BasicTable
              :canResize="false"
              ref="tableRef"
              :api="SysExpandFieldApi.findPage"
              :columns="columns"
              :where="where"
              showTableSetting
              rowKey="fieldId"
              :rowSelection="{
                type: 'checkbox',
                selectedRowKeys: checkedKeys,
              }"
            >
              <!-- table上边工具栏 -->
              <template #toolbar>
                <div class="table-toolbar">
                  <a-space>
                    <a-button type="primary" @click="openAdd()">
                      <template #icon>
                        <plus-outlined />
                      </template>
                      <span>新建</span>
                    </a-button>
                  </a-space>
                </div>
              </template>

              <template #bodyCell="{ column, record }">
                <!-- 名称点击 -->
                <template v-if="column.dataIndex == 'fieldName'">
                  <a @click="openEdit(record)">{{ record.fieldName }}</a>
                </template>

                <!-- table列表状态栏 -->
                <!-- 字段类型：1-字符串类型，2-数字类型，3-字典类型 -->
                <template v-if="column.key === 'fieldType'">
                  <a-tag v-if="record.fieldType === 1" color="green">字符串</a-tag>
                  <a-tag v-if="record.fieldType === 2" color="blue">数字</a-tag>
                  <a-tag v-if="record.fieldType === 3" color="orange">字典类型</a-tag>
                </template>

                <!-- 是否必填 -->
                <template v-else-if="column.key === 'fieldRequired'">
                  <a-tag v-if="record.fieldRequired === 'Y'" color="cyan">必填</a-tag>
                  <a-tag v-else>非必填</a-tag>
                </template>

                <!-- 是否在列表展示 -->
                <template v-else-if="column.key === 'listShowFlag'">
                  <a-tag color="purple" v-if="record.listShowFlag === 'Y'">列表显示</a-tag>
                  <a-tag v-else>列表不显示</a-tag>
                </template>

                <!-- table操作栏按钮 -->
                <template v-else-if="column.key === 'action'">
                  <a-space>
                    <a @click="openEdit(record)">修改</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定要删除此记录吗？" @confirm="remove(record)">
                      <a class="guns-text-danger">删除</a>
                    </a-popconfirm>
                  </a-space>
                </template>
              </template>
            </BasicTable>
          </a-card>
        </div>
      </a-col>
    </a-row>

    <!-- 新增弹窗 -->
    <sys-expand-field-add
      v-model:visible="showAdd"
      @done="reload"
      :expandId="selectedBusiness[0]"
    />

    <!-- 编辑弹窗 -->
    <sys-expand-field-edit
      v-model:visible="showEdit"
      :data="current"
      @done="reload"
      :expandId="selectedBusiness[0]"
    />
  </div>
</template>

<script lang="ts" setup name="SysExpandField">
  import { ref, onMounted } from 'vue';
  import { BasicColumn, BasicTable, TableActionType } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import useSearch from '/@/utils/common/use-search';
  import { SysExpandFieldApi } from '/@/api/expand/SysExpandFieldApi';
  import SysExpandFieldAdd from './sys-expand-field-add.vue';
  import SysExpandFieldEdit from './sys-expand-field-edit.vue';
  import { SysExpandApi } from '/@/api/expand/SysExpandApi';
  import { SysExpandField, SysExpandFieldRequest } from '/@/api/expand/model/SysExpandFieldModel';

  // 查询条件
  const { where } = useSearch<SysExpandFieldRequest>({});
  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);
  // 当前行数据
  const current = ref<any>(null);
  // 是否显示编辑弹框
  const showEdit = ref<boolean>(false);
  // 是否显示新增弹框
  const showAdd = ref<boolean>(false);

  // 表格配置
  const columns = ref<BasicColumn[]>([
    {
      title: '字段中文名称',
      dataIndex: 'fieldName',
    },
    {
      title: '字段英文名称',
      dataIndex: 'fieldCode',
    },
    {
      title: '字段类型',
      key: 'fieldType',
      dataIndex: 'fieldType',
    },
    {
      title: '属性值长度',
      dataIndex: 'fieldLength',
    },
    {
      title: '是否必填',
      key: 'fieldRequired',
      dataIndex: 'fieldRequired',
    },
    {
      title: '列表是否显示',
      key: 'listShowFlag',
      dataIndex: 'listShowFlag',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
    },
  ]);

  // 左侧业务列表
  const businessList = ref<string[]>([]);
  // 当前选中的左侧应用
  const selectedBusiness = ref<string[]>([]);

  // 表格实例
  const tableRef = ref<Nullable<TableActionType>>(null);

  onMounted(() => {
    // 获取左侧业务列表
    loadData();
  });

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-12 09:38:18
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value?.reload({
      page: 1,
    });
  };

  /**
   * 删除单个
   *
   * @author chenjinlong
   * @date 2021/4/2 17:03
   */
  const remove = async (row: SysExpandField) => {
    const result = await SysExpandFieldApi.delete({ fieldId: row.fieldId });
    message.success(result.message);
    reload();
  };

  /**
   * 打开编辑弹窗
   *
   * @author yxx
   * @date 2022/04/04 12:24
   */
  const openEdit = (row: SysExpandField) => {
    current.value = row;
    showEdit.value = true;
  };

  /**
   * 打开新增弹窗
   *
   * @author yxx
   * @date 2022/04/04 12:24
   */
  const openAdd = () => {
    showAdd.value = true;
  };

  /**
   * 获取左侧业务列表
   *
   * @author fengshuonan
   * @date 2022/03/30 09:53
   */
  const loadData = async () => {
    businessList.value = await SysExpandApi.list();
    let firstExpandId = businessList.value[0].expandId;
    selectedBusiness.value.push(firstExpandId);

    // 查询第一个业务的字段列表，刷新table
    where.expandId = firstExpandId;
    reload();
  };

  /**
   * 点击左侧菜单，加载业务对应的数据
   *
   * @author fengshuonan
   * @date 2022/3/30 13:46
   */
  const clickMenu = (item: any) => {
    where.expandId = item.expandId;
    reload();
  };
</script>

<style>
  .left-menu-background {
    background-color: white;
    border-right: 1px solid #eee;
  }

  .zero-border {
    border-right: 0;
  }
</style>
