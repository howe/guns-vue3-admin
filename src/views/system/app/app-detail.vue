<template>
  <!-- 编辑 -->
  <common-drawer :width="800" :visible="visible" title="详情" @close="updateVisible(false)">
    <a-descriptions bordered :column="2" size="small" class="descriptions">
      <a-descriptions-item label="应用名称">{{ sysAppInfo.appName }}</a-descriptions-item>
      <a-descriptions-item label="应用编码">{{ sysAppInfo.appCode }}</a-descriptions-item>
      <a-descriptions-item label="应用图标">
        <component style="fontsize: 20px" :is="sysAppInfo.appIcon" />
      </a-descriptions-item>
      <a-descriptions-item label="是否显示">
        <span v-if="sysAppInfo.statusFlag === 1">启用</span>
        <span v-else-if="sysAppInfo.statusFlag === 2">禁用</span>
      </a-descriptions-item>
      <a-descriptions-item label="排序">{{ sysAppInfo.appSort }}</a-descriptions-item>
    </a-descriptions>
  </common-drawer>
</template>

<script name="SysAppDetail" lang="ts" setup>
  import { reactive, watch } from 'vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { SysApp } from '/@/api/system/app/model/SysAppModel';

  const props = defineProps<{
    // 弹窗是否打开
    visible: boolean;
    // 数据
    data?: SysApp | null;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  // 详细数据
  const sysAppInfo = reactive<SysApp>({
    appId: '',
  });

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        if (props.data) {
          Object.assign(sysAppInfo, props.data);
        }
      }
    },
  );

  /**
   * 更新编辑界面弹框是否显示
   *
   * @author fengshuonan
   * @date 2021/6/14 20:24
   */
  const updateVisible = (value: boolean) => {
    emits('update:visible', value);
  };
</script>
