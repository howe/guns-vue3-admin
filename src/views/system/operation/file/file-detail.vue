<template>
  <common-drawer :width="800" :visible="visible" title="文件详情" @close="updateVisible(false)">
    <a-form
      ref="form"
      :model="state.form"
      layout="horizontal"
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item label="文件编码" name="fileCode">
        <a-input v-model:value="state.form.fileCode" disabled />
      </a-form-item>
      <a-form-item label="文件仓库" name="fileBucket">
        <a-input v-model:value="state.form.fileBucket" disabled />
      </a-form-item>
      <a-form-item label="文件名称" name="fileOriginName">
        <a-input v-model:value="state.form.fileOriginName" disabled />
      </a-form-item>
      <a-form-item label="是否为机密文件" name="secretFlag">
        <a-input v-model:value="state.form.secretFlag" disabled />
      </a-form-item>
      <a-form-item label="文件后缀" name="fileSuffix">
        <a-input v-model:value="state.form.fileSuffix" disabled />
      </a-form-item>
      <a-form-item label="文件大小" name="fileSizeInfo">
        <a-input v-model:value="state.form.fileSizeInfo" disabled />
      </a-form-item>
      <a-form-item label="唯一标识" name="fileObjectName">
        <a-input v-model:value="state.form.fileObjectName" disabled />
      </a-form-item>
      <a-form-item label="存储路径" name="filePath">
        <a-input v-model:value="state.form.filePath" disabled />
      </a-form-item>
    </a-form>
  </common-drawer>
</template>

<script lang="ts" setup>
  import { ref, toRefs, reactive, watch, nextTick, onMounted } from 'vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    data?: Object;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
  }>();

  const state = reactive({
    // 表单数据
    form: {},
  });

  watch(
    () => props.data,
    (val) => {
      state.form = Object.assign({}, props.data);
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
