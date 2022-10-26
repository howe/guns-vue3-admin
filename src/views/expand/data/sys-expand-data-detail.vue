<template>
  <!-- 编辑 -->
  <common-drawer :width="800" :visible="visible" title="查看详情" @close="updateVisible(false)">
    <div class="card-title card-title-background">基础信息</div>
    <a-form
      ref="formRef"
      :model="state.form"
      :label-col="{ md: { span: 5 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
    >
      <a-form-item label="业务表:" name="primaryTableName">
        <a-input
          v-model:value="state.form.expandInfo.primaryTableName"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="主键字段：" name="primaryFieldName">
        <a-input
          v-model:value="state.form.expandInfo.primaryFieldName"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="主键ID值:" name="primaryFieldValue">
        <a-input v-model:value="state.form.primaryFieldValue" allow-clear autocomplete="off" />
      </a-form-item>
    </a-form>

    <div class="card-title card-title-background">拓展信息</div>
    <a-form
      layout="horizontal"
      ref="form"
      :model="state.form"
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item
        :label="item.fieldName"
        :name="item.fieldCode"
        v-for="item in state.form.fieldInfoList"
        :key="item.fieldId"
      >
        <!--如果是字符串类型的字段-->
        <a-input
          v-model:value="dynamicFormData[item.fieldCode]"
          allow-clear
          autocomplete="off"
          v-if="item.fieldType === 1"
        />

        <!--如果是数字类型的字段-->
        <a-input-number
          v-model:value="dynamicFormData[item.fieldCode]"
          allow-clear
          autocomplete="off"
          v-if="item.fieldType === 2"
          style="width: 100%"
        />

        <!--如果是字符串类型的字段-->
        <dict-select
          v-model:value="dynamicFormData[item.fieldCode]"
          v-if="item.fieldType === 3"
          value-type="dictCode"
          :dict-type-code="item.fieldDictTypeCode"
        />
      </a-form-item>
    </a-form>

    <template #extra>
      <a-button type="primary" @click="save" :loading="loading">确定</a-button>
    </template>
  </common-drawer>
</template>

<script lang="ts" setup name="SysExpandDataDetail">
  import { ref, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import DictSelect from '/@/components/DictSelect/DictSelect.vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import type { FormInstance } from 'ant-design-vue/es/form';
  import { SysExpandData } from '/@/api/expand/model/SysExpandDataModel';
  import { SysExpandDataApi } from '/@/api/expand/SysExpandDataApi';

  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    visible: boolean;
    // 当前行数据
    data?: SysExpandData;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 提交状态
  const loading = ref<boolean>(false);

  const state = reactive({
    form: {
      expandInfo: {},
      fieldInfoList: [],
    },
  });

  // 动态表单数据
  const dynamicFormData = ref<any>({});

  watch([() => props.visible, () => props.data], () => {
    if (props.visible) {
      loadDetail(props.data.expandDataId);
    }
  });

  /**
   * 更新编辑界面弹框是否显示
   *
   * @author yxx
   * @date 2022/6/14 20:24
   */
  const updateVisible = (value) => {
    emit('update:visible', value);
  };

  // 确定
  const save = () => {
    updateVisible(false);
  };

  /**
   * 加载详情
   *
   * @author fengshuonan
   * @date 2022/3/31 11:52
   */
  const loadDetail = async (expandDataId: string) => {
    let result = await SysExpandDataApi.detail({ expandDataId: expandDataId });
    state.form = Object.assign(state.form, result);
    dynamicFormData.value = JSON.parse(state.form.expandData);
  };
</script>

<style lang="less" scoped>
  .card-title {
    border-left: 5px solid;
    border-color: #1890ff;
    padding-left: 10px;
  }
  .card-title-background {
    background-color: #f5f5f5;
    height: 2em;
    line-height: 2em;
    margin-bottom: 2em;
  }
</style>
