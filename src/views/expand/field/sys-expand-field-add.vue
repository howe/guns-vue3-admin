<template>
  <a-modal
    :width="800"
    :visible="visible"
    :confirm-loading="loading"
    title="新增"
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
      <a-form-item label="字段名称" name="fieldName">
        <a-input
          v-model:value="form.fieldName"
          placeholder="请输入字段中文名称，例如：身份证号"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="字段英文名" name="fieldCode">
        <a-input
          v-model:value="form.fieldCode"
          placeholder="请输入字段英文名称，例如：idCard"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="字段类型" name="fieldType">
        <a-select v-model:value="form.fieldType" placeholder="请选择字段类型" style="width: 100%">
          <a-select-option :value="1">字符串类型</a-select-option>
          <a-select-option :value="2">数字类型</a-select-option>
          <a-select-option :value="3">字典类型</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="属性值长度" name="fieldLength" v-if="form.fieldType === 2">
        <a-input-number
          v-model:value="form.fieldLength"
          placeholder="请输入属性值长度，用于数字类型"
          allow-clear
          autocomplete="off"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="字典类型" name="fieldDictTypeCode" v-if="form.fieldType === 3">
        <dict-type-select value-type="dictTypeCode" v-model:value="form.fieldDictTypeCode" />
      </a-form-item>
      <a-form-item label="是否必填" name="fieldRequired">
        <a-radio-group name="fieldRequired" v-model:value="form.fieldRequired">
          <a-radio value="Y">必填</a-radio>
          <a-radio value="N">非必填</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="列表是否显示" name="listShowFlag">
        <a-radio-group name="listShowFlag" v-model:value="form.listShowFlag">
          <a-radio value="Y">显示</a-radio>
          <a-radio value="N">不显示</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup name="SysExpandFieldAdd">
  import { ref, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  import useFormData from '/@/utils/common/use-form-data';
  import { SysExpandFieldApi } from '/@/api/expand/SysExpandFieldApi';
  import DictTypeSelect from '/@/components/DictSelect/DictTypeSelect.vue';
  import { SysExpandFieldRequest } from '/@/api/expand/model/SysExpandFieldModel';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    visible: boolean;
    // 业务id
    expandId?: string;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 提交状态
  const loading = ref<boolean>(false);

  // 表单数据
  const { form, resetFormFields } = useFormData<SysExpandFieldRequest>({
    expandId: undefined,
    fieldName: undefined,
    fieldCode: undefined,
    fieldType: undefined,
    fieldLength: undefined,
    fieldDictTypeCode: undefined,
    fieldRequired: undefined,
    listShowFlag: undefined,
  });

  // 表单验证规则
  const rules = reactive<Record<string, Rule[]>>({
    fieldName: [{ required: true, message: '请输入字段中文名称', type: 'string', trigger: 'blur' }],
    fieldCode: [{ required: true, message: '请输入字段英文名称', type: 'string', trigger: 'blur' }],
    fieldType: [{ required: true, message: '请输入字段类型', type: 'number', trigger: 'blur' }],
    fieldLength: [{ required: true, message: '请输入字段长度', type: 'number', trigger: 'blur' }],
    fieldDictTypeCode: [
      { required: true, message: '请选择字典类型', type: 'string', trigger: 'blur' },
    ],
    fieldRequired: [{ required: true, message: '请输入是否必填', type: 'string', trigger: 'blur' }],
    listShowFlag: [
      { required: true, message: '请输入列表是否显示', type: 'string', trigger: 'blur' },
    ],
  });

  watch(
    () => props.visible,
    (visible) => {
      if (!visible) {
        resetFormFields();
        formRef.value?.clearValidate();
      }
    },
  );

  /**
   * 保存编辑
   *
   * @author yxx
   * @date 2022/6/14 20:24
   */
  const save = () => {
    if (!formRef.value) {
      return;
    }
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        form.expandId = props.expandId;
        // 执行保存
        SysExpandFieldApi.add(form)
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
   * 更新编辑界面弹框是否显示
   *
   * @author yxx
   * @date 2022/6/14 20:24
   */
  const updateVisible = (value) => {
    emit('update:visible', value);
  };
</script>
