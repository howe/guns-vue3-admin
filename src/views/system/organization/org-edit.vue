<!-- 组织机构编辑弹窗 -->
<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="1100"
      :visible="visible"
      title="编辑机构"
      @close="updateVisible(false)"
      v-if="isUpdate"
      :isShowTab="true"
      :activeKey="activeKey"
      :tabList="tabList"
      @tabChange="tabChange"
    >
      <template #extra>
        <div style="height: 32px">
          <a-button type="primary" @click="save" :loading="loading" v-show="activeKey == '1'"
            >确定</a-button
          >
        </div>
      </template>
      <!-- 基本信息 -->
      <org-form
        v-model:form="state.form"
        ref="formRef"
        :rules="rules"
        :orgList="orgList"
        v-if="activeKey == '1'"
      >
        <field-expand-form ref="fieldExpandFormRef" expand-code="org_expand" />
      </org-form>

      <!-- 设置审批人 -->
      <set-approver v-else ref="setApproverRef" :data="data" />
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="1100"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建机构"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <org-form v-model:form="state.form" ref="formRef" :rules="rules" :orgList="orgList">
        <field-expand-form ref="fieldExpandFormRef" expand-code="org_expand" />
      </org-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { UserApi } from '/@/api/system/user/UserApi';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import FieldExpandForm from '/@/components/FieldExpand/FieldExpandForm.vue';
  import SetApprover from './set-approver.vue';
  import OrgForm from './org-form.vue';
  import { nextTick, onMounted, reactive, ref, watch } from 'vue';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 接收上级传过来的组织机构信息
    data?: Object;
    // 组织机构列表
    orgList: Array;
    // 是否是编辑界面
    isUpdate: Boolean;
    // 默认选中
    defaultKey: String;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const state = reactive({
    // 表单数据
    form: {},
  });

  // 表单验证规则
  const rules = reactive({
    orgName: [{ required: true, message: '请输入组织机构名称', type: 'string', trigger: 'blur' }],
    orgCode: [{ required: true, message: '请输入组织机构编码', type: 'string', trigger: 'blur' }],
    orgType: [{ required: true, message: '请选择机构类型', type: 'number', trigger: 'blur' }],
    orgSort: [{ required: true, message: '请输入组织机构排序', type: 'number', trigger: 'blur' }],
  });
  // 提交状态
  const loading = ref<boolean>(false);
  // 编辑时tab默认选中的状态
  const activeKey = ref<string>('1');
  // 编辑时，tab显示的列表
  const tabList = ref<string[]>([
    {
      key: '1',
      name: '基本信息',
    },
    {
      key: '2',
      name: '设置审批人',
    },
  ]);

  // ref
  const formRef = ref(null);
  const fieldExpandFormRef = ref(null);
  const setApproverRef = ref(null);

  onMounted(() => {
    init();
  });

  // 监听数据的变化
  watch(
    () => props.data,
    (val) => {
      init();
    },
  );

  // 初始化数据
  const init = () => {
    if (props.data) {
      tabChange(props.defaultKey);
    } else {
      state.form = {};
      // 加载表单数据
      nextTick(() => {
        fieldExpandFormRef.value.loadForm();
      });
    }
    if (formRef.value && formRef.value.$refs.formRef) {
      formRef.value.$refs.formRef.clearValidate();
    }
  };

  // tab切换
  const tabChange = (key: string) => {
    activeKey.value = key;
    nextTick(() => {
      if (key == '1') {
        // 加载表单数据
        fieldExpandFormRef.value.loadForm(props.data.orgId);
        state.form = Object.assign({}, props.data);
      } else {
        setApproverRef.value.getListData();
      }
    });
  };

  /**
   * 更新编辑界面的弹框是否显示
   *
   * @param value true-显示，false-隐藏
   * @author fengshuonan
   * @date 2021/4/7 11:00
   */
  const updateVisible = (value: boolean) => {
    emits('update:visible', value);
  };

  // 保存
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

        // 执行编辑或修改用户方法
        if (props.isUpdate) {
          result = UserApi.editOrg(state.form);
        } else {
          result = UserApi.addOrg(state.form);
        }
        result
          .then((res) => {
            // 移除加载框
            loading.value = false;

            // 提示添加成功
            message.success(res.message);

            // 如果是新增，则form表单置空
            if (!props.isUpdate) {
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
</script>
