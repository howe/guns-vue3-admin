<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="800"
      :visible="visible"
      title="修改角色"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <role-form v-model:form="state.form" ref="formRef" />
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
      title="新建角色"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <role-form v-model:form="state.form" ref="formRef" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { reactive, ref, watch, onMounted } from 'vue';
  import { SysRoleApi } from '/@/api/system/role/SysRoleApi';
  import { message } from 'ant-design-vue';
  import RoleForm from './role-form.vue';

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

  // 初始化
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

  onMounted(() => {
    init();
  });

  watch(
    () => props.data,
    (val) => {
      init();
    },
  );

  /**
   * 保存和编辑
   *
   * @author chenjinlong
   * @date 2021/4/7 11:00
   */
  const save = () => {
    // 校验表单
    formRef.value.$refs.formRef.validate().then((valid) => {
      if (valid) {
        // 修改加载框为正在加载
        loading.value = true;

        let result = null;

        // 设置数据范围为空，不能在这里修改数据范围
        state.form.dataScopeType = null;

        // 执行编辑或修改方法
        if (isUpdate.value) {
          result = SysRoleApi.edit(state.form);
        } else {
          result = SysRoleApi.add(state.form);
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
</script>
