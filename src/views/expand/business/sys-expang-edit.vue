<!-- 应用编辑弹窗 -->
<template>
  <!-- 编辑 -->
  <common-drawer :width="800" :visible="visible" title="修改" @close="updateVisible(false)">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ md: { span: 5 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
    >
      <a-form-item label="业务名称:" name="expandName">
        <a-input
          v-model:value="form.expandName"
          placeholder="请输入拓展业务名称，例如：用户信息拓展"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="业务编码:" name="expandCode">
        <a-input
          v-model:value="form.expandCode"
          placeholder="请输入拓展业务唯一编码，例如：user_expand"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="主业务表名" name="primaryTableName">
        <a-input
          v-model:value="form.primaryTableName"
          placeholder="主业务表，例如：sys_user"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="主键字段名" name="primaryFieldName">
        <a-input
          v-model:value="form.primaryFieldName"
          placeholder="请输入业务主键id字段名，例如：user_id"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="主键驼峰命名" name="primaryFieldCamel">
        <a-input
          v-model:value="form.primaryFieldCamel"
          placeholder="业务主键id字段名驼峰法，例如：userId"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
    </a-form>
    <template #extra>
      <a-button type="primary" @click="save" :loading="loading">确定</a-button>
    </template>
  </common-drawer>
</template>

<script name="SysExpangEdit" lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  import useFormData from '/@/utils/common/use-form-data';
  import { SysExpand, SysExpandRequest } from '/@/api/expand/model/SysExpandModel';
  import { SysExpandApi } from '/@/api/expand/SysExpandApi';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    visible: boolean;
    data: SysExpand;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 提交状态
  const loading = ref<boolean>(false);

  // 表单数据
  const { form, resetFormFields, assignFormFields } = useFormData<SysExpandRequest>({
    expandId: undefined,
    expandName: undefined,
    expandCode: undefined,
    primaryTableName: undefined,
    primaryFieldName: undefined,
    primaryFieldCamel: undefined,
  });

  // 表单验证规则
  const rules = reactive<Record<string, Rule[]>>({
    expandName: [
      { required: true, message: '请输入拓展业务名称', type: 'string', trigger: 'blur' },
    ],
    expandCode: [
      { required: true, message: '请输入拓展业务唯一编码', type: 'string', trigger: 'blur' },
    ],
    primaryTableName: [
      { required: true, message: '表名不能为空', type: 'string', trigger: 'blur' },
    ],
    primaryFieldName: [
      { required: true, message: '主键字段名称不能为空', type: 'string', trigger: 'blur' },
    ],
    primaryFieldCamel: [
      { required: true, message: '主键字段驼峰命名不能为空', type: 'string', trigger: 'blur' },
    ],
  });

  watch([() => props.visible, () => props.data], () => {
    if (props.visible) {
      assignFormFields(props.data);
    } else {
      resetFormFields();
      formRef.value?.clearValidate();
    }
  });

  watch(
    () => form.primaryFieldName,
    () => {
      form.primaryFieldCamel = toCamel(form.primaryFieldName);
    },
  );

  /**
   * 下划线转换驼峰
   *
   * @author fengshuonan
   * @date 2022/3/30 11:15
   */
  const toCamel = (name) => {
    if (name) {
      return name.replace(/_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
      });
    } else {
      return name;
    }
  };

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
        // 执行编辑
        SysExpandApi.edit(form)
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

<style scoped></style>
