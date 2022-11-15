<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="800"
      :visible="visible"
      title="修改系统配置"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <sysconfig-form v-model:form="state.form" ref="formRef" />
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
      title="添加系统配置"
      v-else
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      @close="updateVisible(false)"
    >
      <sysconfig-form v-model:form="state.form" ref="formRef" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import SysconfigForm from './sysconfig-form.vue';
  import { reactive, ref, watch, nextTick, onMounted } from 'vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    data?: Object;
    // 配置分类编码
    groupCode: String;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const state = reactive({
    form: {},
  });

  // ref
  const formRef = ref(null);

  // 提交状态
  const loading = ref<boolean>(false);
  // 是否是修改
  const isUpdate = ref<boolean>(false);

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
   * 保存编辑
   *
   * @author fengshuonan
   * @date 2021/4/9 16:08
   */
  const save = () => {
    // 校验表单
    formRef.value.$refs.formRef.validate().then((valid) => {
      if (valid) {
        if (state.form.sysFlagChecked === true) {
          state.form.sysFlag = 'Y';
        } else {
          state.form.sysFlag = 'N';
        }
        state.form.groupCode = props.groupCode;

        // 修改加载框为正在加载
        loading.value = true;

        let result;

        // 执行编辑或修改方法
        if (isUpdate.value) {
          result = SysConfigApi.editSysConfig(state.form);
        } else {
          result = SysConfigApi.addSysConfig(state.form);
        }
        result
          .then((result) => {
            // 移除加载框
            loading.value = false;

            // 提示添加成功
            message.success(result.message);

            // 如果是新增用户，则form表单置空
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
