<template>
  <common-drawer
    :width="800"
    :visible="visible"
    @close="updateVisible(false)"
    :title="isUpdate ? '资源详情' : '新建资源'"
  >
    <a-form
      ref="form"
      :model="state.form"
      :rules="rules"
      :label-col="{ md: { span: 7 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
    >
      <a-row :gutter="16">
        <a-col :md="12" :sm="24" :xs="24">
          <a-form-item label="应用标识:" name="appCode">
            <a-input v-model:value="state.form.appCode" />
          </a-form-item>
          <a-form-item label="资源名称:" name="resourceName">
            <a-input v-model:value="state.form.resourceName" />
          </a-form-item>
          <a-form-item label="控制器类名:" name="className">
            <a-input v-model:value="state.form.className" />
          </a-form-item>
          <a-form-item label="所属模块:" name="modularCode">
            <a-input v-model:value="state.form.modularCode" />
          </a-form-item>
          <a-form-item label="初始化地址:" name="ipAddress">
            <a-input v-model:value="state.form.ipAddress" />
          </a-form-item>
          <a-form-item label="请求路径:" name="url">
            <a-input v-model:value="state.form.url" />
          </a-form-item>
          <a-form-item label="请求方法:" name="httpMethod">
            <a-input v-model:value="state.form.httpMethod" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24" :xs="24">
          <a-form-item label="资源标识:" name="resourceCode">
            <a-input v-model:value="state.form.resourceCode" />
          </a-form-item>
          <a-form-item label="项目编码:" name="projectCode">
            <a-input v-model:value="state.form.projectCode" />
          </a-form-item>
          <a-form-item label="方法名称:" name="methodName">
            <a-input v-model:value="state.form.methodName" />
          </a-form-item>
          <a-form-item label="模块名称:" name="modularName">
            <a-input v-model:value="state.form.modularName" />
          </a-form-item>
          <a-form-item label="是否视图">
            <a-switch
              checked-children="是"
              un-checked-children="否"
              :checked="state.form.viewFlag === 'Y'"
            />
          </a-form-item>
          <a-form-item label="是否需登录">
            <a-switch
              checked-children="是"
              un-checked-children="否"
              :checked="state.form.requiredLoginFlag === 'Y'"
            />
          </a-form-item>
          <a-form-item label="是否需权限验证">
            <a-switch
              checked-children="是"
              un-checked-children="否"
              :checked="state.form.requiredPermissionFlag === 'Y'"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </common-drawer>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch } from 'vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';

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
  const rules = reactive({});

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
  };

  /**
   * 更新编辑界面的弹框是否显示
   *
   * @param value true-显示，false-隐藏
   * @author jiawei
   * @date 2021/4/15 11:00
   */
  const updateVisible = (value: boolean) => {
    emits('update:visible', value);
  };
</script>

<style></style>
