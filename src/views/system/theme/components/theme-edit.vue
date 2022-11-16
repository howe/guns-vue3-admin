<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="900"
      :visible="visible"
      title="修改主题"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <theme-form
        v-model:form="state.form"
        ref="formRef"
        :rules="rules"
        :disabledChangeTemplate="disabledChangeTemplate"
        v-model:tempFileList="tempFileList"
        @getThemeAttributes="getThemeAttributes"
        :templateFields="templateFields"
      />
      <template #extra>
        <a-button type="primary" @click="save" :loading="loading">确定</a-button>
      </template>
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="900"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建主题"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <theme-form
        v-model:form="state.form"
        ref="formRef"
        :rules="rules"
        :disabledChangeTemplate="disabledChangeTemplate"
        v-model:tempFileList="tempFileList"
        @getThemeAttributes="getThemeAttributes"
        :templateFields="templateFields"
      />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch, nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { ThemeApi } from '/@/api/system/theme/ThemeApi';
  import { ThemeTemplateApi } from '/@/api/system/theme/ThemeTemplateApi';
  import ThemeForm from './theme-form.vue';

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

  const rules = ref<any>({
    templateId: [{ required: true, message: '请输入用户账号', type: 'string', trigger: 'blur' }],
    themeName: [{ required: true, message: '请输入主题名称', type: 'string', trigger: 'blur' }],
  });

  // ref
  const formRef = ref(null);

  // 模板属性
  const templateFields = ref<string[]>([]);
  // 是否禁用
  const disabledChangeTemplate = ref<boolean>(false);

  // 临时存放文件列表（用来限制上传数量）
  const tempFileList = ref<any>({});

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
    // 有数据，则是编辑界面
    if (props.data) {
      isUpdate.value = true;
      disabledChangeTemplate.value = true;
      // 获取动态表单所有属性，组装元数据
      getThemeAttributes(props.data.templateId).then(() => {
        // 加载动态表单的具体值
        loadFormValues(props.data);
      });
    } else {
      // 无数据，则是新增界面
      state.form = {};
      isUpdate.value = false;
      disabledChangeTemplate.value = false;
      templateFields.value = [];
    }
    if (formRef.value && formRef.value.$refs.formRef) {
      formRef.value.$refs.formRef.clearValidate();
    }
  };

  /**
   * 保存和修改主题
   *
   * @author fengshuonan
   * @date 2021/12/23 14:10:13
   */
  const save = () => {
    // 校验表单
    formRef.value.$refs.formRef.validate().then(async (valid) => {
      if (valid) {
        // 修改加载框为正在加载
        loading.value = true;

        let result = null;

        // 执行编辑或修改
        if (isUpdate.value) {
          formPreProcess();
          result = await ThemeApi.edit(state.form);
        } else {
          formPreProcess();
          result = await ThemeApi.add(state.form);
        }

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

  /**
   * 点击选择模板时，查询系统模板详情
   *
   * @param value 模板id
   * @author fengshuonan
   * @date 2021/12/29 10:33:06
   */
  const getThemeAttributes = async (value) => {
    templateFields.value = await ThemeTemplateApi.detail({ templateId: value });
    calcRules();
    calcTemplateAttr();
  };

  /**
   * 处理编辑表单数据
   *
   * @author fengshuonan
   * @date 2021/12/31 16:31:22
   */
  const formPreProcess = () => {
    // 获取被删除的字段
    let themeName = state.form.themeName;
    let templateId = state.form.templateId;
    let themeId = state.form.themeId;

    // 剩余内容转为JSON串
    let jsonStr = JSON.stringify(state.form);

    // 将form置空
    state.form = {};

    if (themeId) {
      state.form['themeId'] = themeId;
    }
    state.form['themeName'] = themeName;
    state.form['templateId'] = templateId;
    state.form['themeValue'] = jsonStr;
  };

  /**
   * 计算必填校验规则
   *
   * @author fengshuonan
   * @date 2022/1/1 19:53
   */
  const calcRules = () => {
    // 默认的规则
    let defaultRules = {
      templateId: [{ required: true, message: '请输入用户账号', type: 'string', trigger: 'blur' }],
      themeName: [{ required: true, message: '请输入主题名称', type: 'string', trigger: 'blur' }],
    };
    // 动态表单的规则
    for (let number in templateFields.value) {
      const thisObj = templateFields.value[number];
      if (thisObj.fieldRequired === 'Y') {
        defaultRules[thisObj.fieldCode] = [
          {
            required: true,
            message: `请输入${thisObj.fieldDescription}`,
            type: 'string',
            trigger: 'blur',
          },
        ];
      }
    }
    rules.value = defaultRules;
  };

  /**
   * 设置临时文件数组赋空
   *
   * @author fengshuonan
   * @date 2022/1/1 21:28
   */
  const calcTemplateAttr = () => {
    // 动态表单的规则
    for (let number in templateFields.value) {
      const thisObj = templateFields.value[number];
      if (thisObj.fieldType === 'file') {
        tempFileList.value[thisObj.fieldCode] = [];
      }
    }
  };

  /**
   * 加载动态表单的值
   *
   * @param data 当前主题的详情记录
   * @author fengshuonan
   * @date 2022/1/1 21:28
   */
  const loadFormValues = async (data: any) => {
    // 从新组装form表单的值
    state.form.themeId = data.themeId;
    state.form.themeName = data.themeName;
    state.form.templateId = data.templateId;

    // 获取表单的动态表单信息
    let themeDetail = await ThemeApi.detail({ themeId: state.form.themeId });

    // 组装动态表单的值
    state.form = Object.assign(state.form, themeDetail.dynamicForm);

    // 加载图片预览
    tempFileList.value = themeDetail.tempFileList;
  };
</script>
