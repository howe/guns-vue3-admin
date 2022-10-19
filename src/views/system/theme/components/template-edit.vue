<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="900"
      :visible="visible"
      title="修改模板"
      @close="updateVisible(false)"
      v-if="isUpdate"
      :isShowTab="true"
      :activeKey="activeKey"
      :tabList="tabList"
      @tabChange="tabChange"
    >
      <!-- 基本信息 -->
      <template-form
        v-model:form="state.form"
        ref="formRef"
        v-if="activeKey == '1'"
      ></template-form>
      <!-- 配置弹窗 -->
      <template-config ref="TemplateConfigRef" v-else />

      <template #extra>
        <div style="height: 32px">
          <a-button type="primary" @click="save" :loading="loading" v-show="activeKey == '1'"
            >确定</a-button
          >
        </div>
      </template>
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="900"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建模板"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <template-form v-model:form="state.form" ref="formRef"></template-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch, nextTick } from 'vue';
  import { message } from 'ant-design-vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import TemplateForm from './template-form.vue';
  import { ThemeTemplateApi } from '/@/api/system/theme/ThemeTemplateApi';
  import TemplateConfig from './template-config.vue';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    data?: Object;
    // 默认选中
    defaultKey: String;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const state = reactive({
    form: {},
  });

  // tab默认选中
  const activeKey = ref<string>('1');

  // tab栏列表
  const tabList = ref<string[]>([
    {
      key: '1',
      name: '基本信息',
    },
    {
      key: '2',
      name: '属性配置',
    },
  ]);

  // 提交状态
  const loading = ref<boolean>(false);

  // 是否是修改
  const isUpdate = ref<boolean>(false);

  // ref
  const formRef = ref(null);
  const TemplateConfigRef = ref(null);

  onMounted(() => {
    init();
  });

  watch(
    () => props.data,
    (val) => {
      init();
    },
  );

  // 设置初始化数据
  const init = () => {
    if (props.data) {
      isUpdate.value = true;
      tabChange(props.defaultKey);
    } else {
      state.form = {};
      isUpdate.value = false;
    }
    if (activeKey.value == '1' && formRef.value && formRef.value.$refs.formRef) {
      formRef.value.$refs.formRef.clearValidate();
    }
  };

  // tab栏切换
  const tabChange = (key: string) => {
    activeKey.value = key;
    if (key == '1') {
      state.form = Object.assign({}, props.data);
    } else {
      nextTick(() => {
        TemplateConfigRef.value.openConfig(props.data.templateId);
      });
    }
  };

  /**
   * 保存和修改模板
   *
   * @author fengshuonan
   * @date 2021/12/21 14:07:08
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
          result = ThemeTemplateApi.edit(state.form);
        } else {
          result = ThemeTemplateApi.add(state.form);
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
