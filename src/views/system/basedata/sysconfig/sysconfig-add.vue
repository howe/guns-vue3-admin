<template>
  <div>
    <!-- 新增 -->
    <a-modal
      :width="600"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="添加系统配置"
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
        <a-form-item label="配置名称" name="configName">
          <a-input v-model:value="form.configName" placeholder="请输入配置名称" allow-clear />
        </a-form-item>
        <a-form-item label="配置编码" name="configCode">
          <a-input v-model:value="form.configCode" placeholder="请输入配置编码" allow-clear />
        </a-form-item>
        <a-form-item label="系统配置" name="sysFlagChecked">
          <a-switch
            checked-children="是"
            un-checked-children="否"
            v-model:checked="sysFlagChecked"
          />
        </a-form-item>
        <a-form-item label="配置值" name="configValue">
          <a-input v-model:value="form.configValue" placeholder="请输入配置值" allow-clear />
        </a-form-item>
        <a-form-item label="备注">
          <a-textarea v-model:value="form.remark" placeholder="请输入备注" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  import useFormData from '/@/utils/common/use-form-data';
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';
  import { SysConfigParam } from '/@/api/system/basedata/model/SysConfigModel';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    // 弹窗是否打开
    visible: boolean;
    // 配置分类编码
    groupCode: string;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);
  // 提交状态
  const loading = ref<boolean>(false);
  // 系统配置check
  const sysFlagChecked = ref<boolean>(false);

  // 表单数据
  const { form, resetFormFields } = useFormData<SysConfigParam>({
    configId: undefined,
    configName: undefined,
    configCode: undefined,
    configValue: undefined,
    sysFlag: undefined,
    remark: undefined,
    groupCode: undefined,
  });

  // 表单验证规则
  const rules = reactive<Record<string, Rule[]>>({
    configName: [{ required: true, message: '请输入配置名称', type: 'string', trigger: 'blur' }],
    configCode: [{ required: true, message: '请输入配置编码', type: 'string', trigger: 'blur' }],
    configValue: [{ required: true, message: '请输入配置值', type: 'string', trigger: 'blur' }],
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
   * 保存编辑
   *
   * @author fengshuonan
   * @date 2021/4/9 16:08
   */
  const save = () => {
    // 校验表单
    if (!formRef.value) {
      return;
    }
    formRef.value.validate().then((valid) => {
      if (valid) {
        if (sysFlagChecked.value === true) {
          form.sysFlag = 'Y';
        } else {
          form.sysFlag = 'N';
        }
        form.groupCode = props.groupCode;
        // 修改加载框为正在加载
        loading.value = true;
        // 执行新增保存
        SysConfigApi.addSysConfig(form)
          .then((result) => {
            // 移除加载框
            loading.value = false;
            // 提示添加成功
            message.success(result.message);
            // 关闭弹框，通过控制visible的值，传递给父组件
            updateVisible(false);
            // 触发父组件done事件
            emit('done');
          })
          .catch(() => {
            loading.value = false;
          });
      }
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
