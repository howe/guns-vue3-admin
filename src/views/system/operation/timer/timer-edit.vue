<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="800"
      :visible="visible"
      title="修改定时任务"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <timer-form
        v-model:form="state.form"
        ref="formRef"
        @save="save"
        :actionClassList="actionClassList"
        :actionClassListLoading="actionClassListLoading"
      ></timer-form>
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
      title="新建定时任务"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <timer-form
        v-model:form="state.form"
        ref="formRef"
        @save="save"
        :actionClassList="actionClassList"
        :actionClassListLoading="actionClassListLoading"
      ></timer-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs, reactive, watch, nextTick, onMounted } from 'vue';
  import TimerForm from './timer-form.vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { SysTimerApi } from '/@/api/system/operation/SysTimerApi';
  import { message } from 'ant-design-vue';
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
    // 表单数据
    form: {},
  });

  // 提交状态
  const loading = ref<boolean>(false);

  // 是否是修改
  const isUpdate = ref<boolean>(false);

  // 任务job Class列表
  const actionClassList = ref<string[]>([]);

  // 任务job 下拉加载状态
  const actionClassListLoading = ref<boolean>(true);

  // ref
  const formRef = ref(null);

  onMounted(() => {
    init();
    // 获取定时任务执行class
    SysTimerApi.getActionClasses().then((res) => {
      actionClassList.value = res.data;
      actionClassListLoading.value = false;
    });
  });

  /**
   * 监听数据
   */
  watch(
    () => props.data,
    (newProp) => {
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
   * 保存和编辑
   *
   * @author luojie
   * @date 2021/4/13 11:25
   */
  const save = () => {
    // 校验表单
    formRef.value.$refs.formRef.validate().then((valid) => {
      if (valid) {
        // 修改加载框为正在加载
        loading.value = true;

        let result = null;

        // 执行编辑或修改方法
        if (isUpdate.value) {
          result = SysTimerApi.edit(state.form);
        } else {
          result = SysTimerApi.add(state.form);
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
