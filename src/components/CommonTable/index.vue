<template>
  <a-row style="margin-top: 10px" class="table-top">
    <a-table
      :data-source="list"
      :row-key="rowId"
      size="middle"
      class="table"
      :bordered="bordered"
      style="width: 100%"
      :columns="
        columns.filter((col, num) => {
          if (col.isShow) return col;
        })
      "
      :loading="tableLoading"
      :pagination="isPage ? pagination : false"
      @change="tableChange"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        onSelect: onSelect,
        onSelectAll: onSelectAll,
      }"
      :scroll="{ y: 500 }"
    >
      <!-- 表头 -->
      <template #headerCell="props">
        <slot name="headerCell" v-bind="props"></slot>
      </template>
      <!-- 表体 -->
      <template #bodyCell="props">
        <!-- 序号 -->
        <template v-if="props.column.title == '序号'">
          {{ props.index + 1 }}
        </template>
        <slot name="bodyCell" v-bind="props"></slot>
      </template>
    </a-table>
    <div :class="list.length > 0 ? 'table-group' : 'group-two'">
      <slot name="group"></slot>
    </div>
  </a-row>
</template>

<script lang=ts>
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  export default defineComponent({
    name: 'CommonTable',
    components: {},
    props: {
      // 表格配置项
      columns: {
        type: Array,
        default: [],
      },
      // 当前行的id
      rowId: {
        type: String,
        default: 'id',
      },
      // 表格接口路径
      url: {
        type: String,
        default: '',
      },
      // 请求方式
      methods: {
        type: String,
        default: 'get',
      },
      // 搜索条件
      where: {
        type: Object,
        default: {},
      },
      // 是否排序
      isSort: {
        type: Boolean,
        default: true,
      },
      // 是否显示border
      bordered: {
        type: Boolean,
        default: false,
      },
      // 是否展示分页
      isPage: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, { emit }) {
      const data = reactive({
        // 数据列表
        list: [],
        // 表格加载动画
        tableLoading: false,
        //分页参数
        pagination: {
          pageNo: 1,
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          showLessItems: true, // 显示较少页面内容
          pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
          showTotal: (total) => `共 ${total} 条`, // 显示总数
          onShowSizeChange: (current, pageSize) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
          onChange: (page, pageSize) => onPageChange(page, pageSize), //点击页码事件
          total: 0, //总条数
        },
        //选中项
        selectedRowKeys: [],
        // 是正序还是倒叙
        sortBy: '',
        // 排序的字段
        orderBy: '',
      });

      onMounted(() => {
        getTableList();
      });

      // 获取表格数据
      const getTableList = () => {
        data.tableLoading = true;
        let params = {
          ...props.where,
        };
        // 是否排序
        if (props.isSort) {
          params.sortBy = data.sortBy;
          params.orderBy = data.orderBy;
        }

        // 需要分页
        if (props.isPage) {
          params.pageNo = data.pagination.pageNo || 1;
          params.pageSize = data.pagination.pageSize || 20;
        }

        defHttp[props.methods]({ url: props.url, params }, { isTransformResponse: false })
          .then((res) => {
            // 需要分页
            if (props.isPage) {
              data.list = res.data.rows;
              data.pagination.total = res.data.totalRows;
            } else {
              data.list = res.data;
            }

            emit('tableListChange', data.list);
          })
          .finally(() => (data.tableLoading = false));
      };

      // 改变每页数量时更新显示
      const onSizeChange = (current: number, pageSize: number) => {
        data.pagination.pageSize = pageSize;
        getTableList();
      };

      // 表格选中事件
      const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        data.selectedRowKeys = selectedRowKeys;
      };

      // 用户手动选择/取消选择某列的回调
      const onSelect = (record: any, selected: boolean, selectedRows: any) => {
        emit('onSelect', record, selected, selectedRows);
      };

      // 用户手动选择/取消选择所有列的回调
      const onSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
        emit('onSelectAll', selected, selectedRows, changeRows);
      };

      //点击页码事件
      const onPageChange = (page: any, pageSize: number) => {
        if (page != data.pagination.pageNo) {
          data.pagination.pageNo = page;
          getTableList();
        }
      };

      // 排序变化
      const tableChange = (pagination: any, filters: any, sorter: any) => {
        if (sorter.order == 'ascend') {
          data.sortBy = 'asc';
        } else if (sorter.order == 'descend') {
          data.sortBy = 'desc';
        }
        data.orderBy = sorter.field;
        if (props.isSort) {
          getTableList();
        }
      };

      /**
       * 重置
       */
      const reload = () => {
        data.pagination.pageNo = 1;
        getTableList();
      };

      return {
        ...toRefs(data),
        onSizeChange,
        onSelectChange,
        onPageChange,
        tableChange,
        getTableList,
        onSelectAll,
        onSelect,
        reload,
      };
    },
  });
</script>

<style scoped lang="less">
  .table-top {
    position: relative;
    .table-bottom {
      position: absolute;
      bottom: 15px;
      left: -20px;
    }
  }
  .table-group {
    position: absolute;
    bottom: 10px;
    left: 6px;
  }
  .group-two {
    position: absolute;
    bottom: -42px;
    left: 6px;
  }
  :deep(.table) {
    // --table-header-bg: var(--primary-5);
    // --table-row-hover-bg: var(--blue-1);
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
  }
  //这是第一行改变颜色
  // .table :deep(.ant-table-tbody .ant-table-row:nth-child(odd)) {
  //    background-color: #f6f5f6;
  // }
  // // 这是第二行改变颜色
  // .table :deep(.ant-table-tbody .ant-table-row:nth-child(even)) {
  //     background-color: #fff;
  // }
</style>
