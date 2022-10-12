<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="800"
      :visible="visible"
      title="修改职位"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <position-form v-model:form="state.form" ref="formRef"></position-form>
      <template #extra>
        <a-button type="primary" @click="save" :loading="loading">确定</a-button>
      </template>
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="800"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建职位"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <position-form v-model:form="state.form" ref="formRef"></position-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { message } from 'ant-design-vue';
  import PositionForm from './position-form.vue';
  import { PositionApi } from '/@/api/system/position/PositionApi';
  import { reactive, ref, watch } from 'vue';

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

  // 是否是编辑
  const isUpdate = ref<boolean>(false);

  // 提交状态
  const loading = ref<boolean>(false);

  const state = reactive({
    form: {},
  });
  // 角色列表
  const roleList = ref<string[]>([]);
  // 组织机构树列表
  const orgList = ref<string[]>([]);
  // 职位列表
  const positionList = ref<string[]>([]);

  // ref
  const formRef = ref(null);

  /**
   * 更新编辑界面弹框是否显示
   *
   * @author fengshuonan
   * @date 2021/6/14 20:24
   */
  const updateVisible = (value: boolean) => {
    emits('update:visible', value);
  };

  /**
   * 保存和编辑职务
   *
   * @author fengshuonan
   * @date 2021/4/8 13:33
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
          result = PositionApi.edit(state.form);
        } else {
          result = PositionApi.add(state.form);
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
            emits('done');
          })
          .catch(() => {
            loading.value = false;
          });
      }
    });
  };

  watch(
    () => props.data,
    (val) => {
      if (val) {
        state.form = Object.assign({}, val);
        isUpdate.value = true;
      } else {
        state.form = {};
        isUpdate.value = false;
      }
      if (formRef.value.$refs.formRef) {
        formRef.value.$refs.formRef.clearValidate();
      }
    },
  );

  watch(
    () => props.visible,
    (val) => {
      if (!val) {
        state.form = {};
        if (formRef.value.$refs.formRef) {
          formRef.value.$refs.formRef.clearValidate();
        }
      }
    },
  );
</script>

<style></style>
