<template>
  <a-form
    ref="formRef"
    :model="form"
    :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
  >
    <a-form-item label="通知标题">
      <a-input placeholder="请输入通知标题" v-model:value="form.noticeTitle" />
    </a-form-item>

    <a-form-item label="内容">
      <tinymce v-model:value="form.noticeContent" />
    </a-form-item>

    <a-form-item label="通知范围">
      <a-radio-group
        default-value="all"
        v-model:value="form.noticeScopeType"
        :disabled="isUpdate"
        button-style="solid"
      >
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="part">部分</a-radio-button>
      </a-radio-group>
    </a-form-item>

    <a-form-item v-if="form.noticeScopeType === 'part'" label="通知到的人">
      <a-transfer
        :disabled="isUpdate"
        :data-source="userList"
        show-search
        :list-style="{
          width: '40%',
          height: '300px',
        }"
        :targetKeys="targetKeys"
        :render="(item) => item.title"
        @change="handleChange"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { Tinymce } from '/@/components/Tinymce/index';

  const props = defineProps<{
    form: Object;
    isUpdate: Boolean;
    targetKeys: Array;
    userList: Array;
  }>();

  const emits = defineEmits<{
    (e: 'handleChange', targetKeys): void;
  }>();

  /**
   * 选中人员时的监听
   *
   * @author fengshuonan
   * @date 2021/6/14 20:23
   */
  const handleChange = (targetKeys) => {
    emits('handleChange', targetKeys);
  };
</script>
