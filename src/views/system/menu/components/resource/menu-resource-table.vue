<template>
  <div class="guns-body">
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
      rowKey="code"
      childrenColumnName="other"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'controller'">
          <a-checkbox
            v-model:checked="record.checked"
            :indeterminate="record.indeterminate"
            @change="checkedGroup($event, record)"
          >
            {{ record.nodeName }}
          </a-checkbox>
        </template>
        <template v-else-if="column.key === 'apis'">
          <a-checkbox-group
            :options="record.totalNodes"
            v-model:value="record.selectedNodes"
            @change="checkedItem($event, record)"
          />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    // 表格数据
    dataSource: Array;
    // 表格配置
    columns: Array;
  }>();

  const emits = defineEmits<{
    (e: 'checkedGroup', event: any, record: any): void;
    (e: 'checkedItem', checkedValue: any, record: any): void;
  }>();

  /**
   * 处理选中组的事件
   *
   * @author fengshuonan
   * @date 2021/8/8 23:35
   */
  const checkedGroup = (event: any, record: any) => {
    emits('checkedGroup', event, record);
  };

  /**
   * 处理选中的节点数据
   *
   * @author fengshuonan
   * @date 2021/8/8 23:35
   */
  const checkedItem = (checkedValue: any, record: any) => {
    emits('checkedItem', checkedValue, record);
  };
</script>
