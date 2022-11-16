<template>
  <common-drawer :width="800" :visible="visible" title="通知详情" @close="updateVisible(false)">
    <a-form
      ref="form"
      :model="state.form"
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item label="通知标题">
        <a-input placeholder="请输入通知标题" v-model:value="state.form.messageTitle" />
      </a-form-item>

      <a-form-item label="内容">
        <tinymce v-model:value="state.form.messageContent" :options="{ readonly: true }" />
      </a-form-item>
    </a-form>
  </common-drawer>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { NoticeApi } from '/@/api/system/notice/NoticeApi';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 上级组件传来的数据
    data?: Object;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const state = reactive({
    form: {
      noticeTitle: '',
      noticeContent: '',
    },
  });

  /**
   * 更新编辑界面弹框是否显示
   *
   * @author fengshuonan
   * @date 2021/6/14 20:24
   */
  const updateVisible = (value) => {
    emits('update:visible', value);
    emits('done');
  };

  watch(
    () => props.data,
    async (val) => {
      if (val) {
        let messageId = props.data.messageId;
        let result = await NoticeApi.messageDetail({ messageId });
        state.form = Object.assign({}, result);
      } else {
        state.form = {};
      }
    },
  );
</script>
