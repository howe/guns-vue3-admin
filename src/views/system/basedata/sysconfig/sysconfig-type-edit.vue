<template>
  <a-modal
    :width="800"
    :visible="visible"
    :confirm-loading="loading"
    :forceRender="true"
    :maskClosable="false"
    title="新增配置类型"
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
      <a-form-item label="类型名称:" name="dictName">
        <a-input v-model:value="form.dictName" placeholder="请输入类型名称" allow-clear />
      </a-form-item>
      <a-form-item label="类型编码:" name="dictCode">
        <a-input v-model:value="form.dictCode" placeholder="请输入类型编码" allow-clear />
      </a-form-item>
      <a-form-item label="排序号:" name="dictSort">
        <a-input-number
          v-model:value="form.dictSort"
          placeholder="请输入排序号"
          :min="0"
          class="ele-fluid"
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
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';
  import { DictRequest, SysDict } from '/@/api/system/basedata/model/SysDictDataModel';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', visible: boolean): void;
  }>();

  const props = defineProps<{
    // 弹窗是否打开
    visible: boolean;
    // 修改回显的数据
    data?: SysDict | null;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 表单数据
  const { form, resetFormFields } = useFormData<DictRequest>({
    dictId: undefined,
    dictName: undefined,
    dictCode: undefined,
    dictSort: undefined,
    dictTypeCode: undefined,
    dictTypeId: undefined,
  });

  // 验证规则
  const rules = reactive<Record<string, Rule[]>>({
    dictName: [{ required: true, message: '请输入类型名称', type: 'string', trigger: 'blur' }],
    dictCode: [{ required: true, message: '请输入类型编码', type: 'string', trigger: 'blur' }],
    dictSort: [{ required: true, message: '请输入排序号', type: 'number', trigger: 'blur' }],
  });

  // 提交状态
  const loading = ref<boolean>(false);

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
   * 保存或编辑
   *
   * @author fengshuonan
   * @date 2021/4/9 13:42
   */
  const save = () => {
    // 校验表单
    if (!formRef.value) {
      return;
    }
    formRef.value.validate().then(() => {
      // 修改加载框为正在加载
      loading.value = true;

      SysConfigApi.addConfigType(form)
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
    });
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
