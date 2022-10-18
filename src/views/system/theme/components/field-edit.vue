<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="1000"
      :visible="visible"
      title="修改属性"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <field-form v-model:form="state.form" ref="formRef" :isUpdate="isUpdate"></field-form>
      <template #extra>
        <a-button type="primary" @click="save" :loading="loading">确定</a-button>
      </template>
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="1000"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建属性"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <field-form v-model:form="state.form" ref="formRef" :isUpdate="isUpdate"></field-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch } from 'vue';
  import { message } from 'ant-design-vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import FieldForm from './field-form.vue';
  import { ThemeTemplateFieldApi } from '/@/api/system/theme/ThemeTemplateFieldApi';

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

  // 提交状态
  const loading = ref<boolean>(false);

  // 是否是修改
  const isUpdate = ref<boolean>(false);

  // ref
  const formRef = ref(null);

  onMounted(() => {
    init();
  });

  watch(
    () => props.data,
    (val) => {
      init();
    },
  );

  // 初始化数据
  const init = () => {
    if (props.data) {
      state.form = Object.assign({}, props.data);
      isUpdate.value = true;
    } else {
      state.form = {};
      isUpdate.value = false;
    }
    if (formRef.value && formRef.value.$refs.formRef) {
      formRef.value.$refs.formRef.clearValidate();
    }
  };

  /**
   * 保存和修改属性
   *
   * @author fengshuonan
   * @date 2021/12/27 11:43:02
   */
  const save = () => {
    // 校验表单
    formRef.value.$refs.formRef.validate().then((valid) => {
      if (valid) {
        // 修改加载框为正在加载
        loading.value = true;

        let result = null;

        // 执行编辑或修改
        if (isUpdate.value) {
          result = ThemeTemplateFieldApi.edit(state.form);
        } else {
          result = ThemeTemplateFieldApi.add(state.form);
        }
        result
          .then((result) => {
            // 移除加载框
            loading.value = false;

            // 提示添加成功
            message.success(result.message);

            // 如果是新增，则form表单置空
            if (!isUpdate.value) {
              state.form = {};
            }
            // 关闭弹框，通过控制visible的值，传递给父组件
            updateVisible(false);
            // 触发父组件done事件
            emits('done');
          })
          .catch(() => {
            loading.value = false;
          });
      }
    });
  };

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

<style></style>
