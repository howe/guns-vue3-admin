<template>
  <a-modal
    :width="500"
    :visible="visible"
    :confirm-loading="loading"
    :forceRender="true"
    :maskClosable="false"
    :title="isUpdate ? '修改菜单按钮' : '新建菜单按钮'"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form
      ref="formRef"
      :model="state.form"
      :rules="rules"
      :label-col="{ md: { span: 6 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 18 }, sm: { span: 24 } }"
    >
      <a-form-item label="菜单按钮名称:" name="buttonName">
        <a-input
          v-model:value="state.form.buttonName"
          placeholder="请输入菜单按钮名称"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="菜单按钮编码:" name="buttonCode">
        <a-input
          v-model:value="state.form.buttonCode"
          placeholder="请输入菜单按钮编码"
          allow-clear
          :disabled="isUpdate"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { message } from 'ant-design-vue';
  import { MenuButtonApi } from '/@/api/system/menu/MenuButtonApi';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    data?: Object;
    //菜单Id
    menuId: String;
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
    buttonName: [
      { required: true, message: '请输入菜单按钮名称', type: 'string', trigger: 'blur' },
    ],
    buttonCode: [
      { required: true, message: '请输入菜单按钮编码', type: 'string', trigger: 'blur' },
    ],
  });

  // 提交状态
  const loading = ref<boolean>(false);
  // 是否是修改
  const isUpdate = ref<boolean>(false);

  // ref
  const formRef = ref(null);

  watch(
    () => props.visible,
    (val) => {
      if (val) {
        // 加载数据
        if (props.data) {
          state.form = Object.assign({}, props.data);
          isUpdate.value = true;
        } else {
          state.form = { menuId: props.menuId };
          isUpdate.value = false;
        }
      }
    },
  );

  /**
   * 保存和编辑
   *
   * @author jiawei
   * @date ji2021/4/14 11:00
   */
  const save = async () => {
    // 校验表单
    await formRef.value.validate();

    // 修改加载框为正在加载
    loading.value = true;

    let result = null;

    // 执行编辑或修改方法
    if (isUpdate.value) {
      result = MenuButtonApi.editMenuButton(state.form);
    } else {
      result = MenuButtonApi.addMenuButton(state.form);
    }
    result
      .then((result) => {
        // 移除加载框
        loading.value = false;

        // 提示添加成功
        message.success(result.message);

        // 如果是新增，则form表单置空
        if (!isUpdate.value) {
          state.form = { menuId: props.menuId };
        }

        // 关闭弹框，通过控制visible的值，传递给父组件
        updateVisible(false);

        // 触发父组件done事件
        emits('done');
      })
      .catch(() => {
        loading.value = false;
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
