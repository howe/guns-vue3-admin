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
      :model="state.form"
      :rules="rules"
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item label="类型名称:" name="dictName">
        <a-input v-model:value="state.form.dictName" placeholder="请输入类型名称" allow-clear />
      </a-form-item>
      <a-form-item label="类型编码:" name="dictCode">
        <a-input v-model:value="state.form.dictCode" placeholder="请输入类型编码" allow-clear />
      </a-form-item>
      <a-form-item label="排序号:" name="dictSort">
        <a-input-number
          v-model:value="state.form.dictSort"
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
  import { message } from 'ant-design-vue';
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    data?: Object;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const state = reactive({
    form: {},
  });

  // 验证规则
  const rules = reactive({
    dictName: [{ required: true, message: '请输入类型名称', type: 'string', trigger: 'blur' }],
    dictCode: [{ required: true, message: '请输入类型编码', type: 'string', trigger: 'blur' }],
    dictSort: [{ required: true, message: '请输入排序号', type: 'number', trigger: 'blur' }],
  });

  // 提交状态
  const loading = ref<boolean>(false);

  // ref
  const formRef = ref(null);

  watch(
    () => props.visible,
    (val) => {
      if (formRef.value) {
        formRef.value.clearValidate();
      }
      state.form = Object.assign({}, props.data);
    },
  );

  /**
   * 保存或编辑
   *
   * @author fengshuonan
   * @date 2021/4/9 13:42
   */
  const save = async () => {
    await formRef.value.validate();

    // 执行新增
    let result = SysConfigApi.addConfigType(state.form);
    result.then((result) => {
      // 提示添加成功
      message.success(result.message);

      // 如果是新增，则form表单置空
      state.form = {};

      // 关闭弹框，通过控制visible的值，传递给父组件
      updateVisible(false);

      // 触发父组件done事件
      emits('done');
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
    emits('update:visible', value);
  };
</script>

<style></style>
