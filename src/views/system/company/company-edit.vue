<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="1100"
      :visible="visible"
      title="'编辑公司"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <template #extra>
        <a-button type="primary" @click="save" :loading="loading">确定</a-button>
      </template>
      <company-form v-model:form="state.form" ref="formRef" v-model:orgList="orgList">
        <field-expand-form ref="fieldExpandFormRef" expand-code="org_expand" />
      </company-form>
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="1100"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建公司"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <company-form v-model:form="state.form" ref="formRef" v-model:orgList="orgList">
        <field-expand-form ref="fieldExpandFormRef" expand-code="org_expand" />
      </company-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { reactive, ref, watch, nextTick } from 'vue';
  import CompanyForm from './company-form.vue';
  import { UserApi } from '/@/api/system/user/UserApi';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import FieldExpandForm from '/@/components/FieldExpand/FieldExpandForm.vue';
  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 接收上级传过来的组织机构信息
    data?: Object;
    // 组织机构列表
    orgList: Array;
    // 是否是编辑界面
    isUpdate: Boolean;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  // 提交状态
  const loading = ref<boolean>(false);

  const state = reactive({
    form: {},
  });

  // ref
  const formRef = ref(null);
  const fieldExpandFormRef = ref(null);

  watch(
    () => props.data,
    (val) => {
      if (props.visible) {
        if (val) {
          state.form = Object.assign({}, val);
          // 加载表单数据
          nextTick(() => {
            fieldExpandFormRef.value.loadForm(state.form.orgId);
          });
        } else {
          state.form = {};
          // 加载表单数据
          nextTick(() => {
            fieldExpandFormRef.value.loadForm();
          });
        }
        if (formRef.value.$refs.formRef) {
          formRef.value.$refs.formRef.clearValidate();
        }
      }
    },
  );

  /**
   * 更新编辑界面的弹框是否显示
   *
   * @param value true-显示，false-隐藏
   * @author fengshuonan
   * @date 2021/4/7 11:00
   */
  const updateVisible = (value) => {
    emits('update:visible', value);
  };

  /**
   * 保存和编辑
   *
   * @author fengshuonan
   * @date 2021/4/7 11:00
   */
  const save = () => {
    // 校验表单
    formRef.value.$refs.formRef.validate().then(async (valid) => {
      if (valid) {
        // 校验拓展表单并获取数据
        await fieldExpandFormRef.value.validate();

        // 采集动态表单数据
        state.form.expandDataInfo = fieldExpandFormRef.value.getData();

        // 修改加载框为正在加载
        loading.value = true;

        // 如果父级公司没有选，则就是顶级公司，设置位父级id为-1
        if (!state.form.orgParentId) {
          state.form.orgParentId = -1;
        }

        let result;

        // 设置机构类型为公司
        state.form.orgType = 1;

        // 执行编辑或修改用户方法
        if (props.isUpdate) {
          result = UserApi.editOrg(state.form);
        } else {
          result = UserApi.addOrg(state.form);
        }
        result
          .then((result) => {
            // 移除加载框
            loading.value = false;

            // 提示添加成功
            message.success(result.message);

            // 如果是新增，则form表单置空
            if (!props.isUpdate) {
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
