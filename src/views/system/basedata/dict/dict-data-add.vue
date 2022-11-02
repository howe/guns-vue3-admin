<template>
  <!-- 新增 -->
  <a-modal
    :width="600"
    :maskClosable="false"
    :visible="visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="新建字典项"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ md: { span: 5 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
    >
      <a-form-item label="名称:" name="dictName">
        <a-input v-model:value="form.dictName" placeholder="请输入字典名称" allow-clear />
      </a-form-item>
      <a-form-item label="编码:" name="dictCode">
        <a-input v-model:value="form.dictCode" placeholder="请输入字典编码" allow-clear />
      </a-form-item>
      <a-form-item label="简称:" name="dictShortName">
        <a-input v-model:value="form.dictShortName" placeholder="请输入字典简称" allow-clear />
      </a-form-item>
      <a-form-item label="简码:" name="dictShortCode">
        <a-input v-model:value="form.dictShortCode" placeholder="请输入字典简码" allow-clear />
      </a-form-item>
      <a-form-item label="排序:" name="dictSort">
        <a-input-number
          style="width: 100%"
          v-model:value="form.dictSort"
          placeholder="请输入字典排序"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  import useFormData from '/@/utils/common/use-form-data';
  import { SysDictDataApi } from '/@/api/system/basedata/SysDictDataApi';
  import { DictRequest } from '/@/api/system/basedata/model/SysDictDataModel';

  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const props = defineProps<{
    // 弹窗是否打开
    visible: boolean;
    // 配置分类编码
    dictTypeCode: string;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 提交状态
  const loading = ref<boolean>(false);

  // 表单数据
  const { form, resetFormFields } = useFormData<DictRequest>({
    dictId: undefined,
    dictName: undefined,
    dictCode: undefined,
    dictShortName: undefined,
    dictShortCode: undefined,
    dictSort: undefined,
  });

  // 验证规则
  const rules = reactive<Record<string, Rule[]>>({
    dictName: [{ required: true, message: '请输入字典名称', type: 'string', trigger: 'blur' }],
    dictCode: [{ required: true, message: '请输入字典编码', type: 'string', trigger: 'blur' }],
    dictSort: [{ required: true, message: '请输入字典顺序', type: 'number', trigger: 'blur' }],
  });

  watch(
    () => props.visible,
    () => {
      if (!props.visible) {
        resetFormFields();
        formRef.value?.clearValidate();
      }
    },
  );

  /**
   * 保存和编辑
   *
   * @author chenjinlong
   * @date 2021/4/7 11:00
   */
  const save = () => {
    if (!formRef.value) {
      return;
    }
    formRef.value
      .validate()
      .then(() => {
        // 执行编辑
        form.dictTypeCode = props.dictTypeCode;
        SysDictDataApi.add(form)
          .then((res) => {
            // 移除加载框
            loading.value = false;
            // 提示添加成功
            message.success(res.message);
            // 关闭弹框，通过控制visible的值，传递给父组件
            updateVisible(false);
            // 触发父组件done事件
            emit('done');
          })
          .catch(() => {
            loading.value = false;
          });
      })
      .catch(() => {});
  };

  /**
   * 更新编辑菜单界面的弹框是否显示
   *
   * @param value true-显示，false-隐藏
   * @author jiawei
   * @date 2021/4/7 12:00
   */
  const updateVisible = (value: boolean) => {
    emit('update:visible', value);
  };
</script>

<style></style>
