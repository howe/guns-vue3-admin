<template>
  <!-- 编辑 -->
  <common-drawer :width="800" :visible="visible" title="查看详情" @close="updateVisible(false)">
    <div class="card-title card-title-background">基础信息</div>
    <a-form
      ref="formRef"
      :model="form"
      :label-col="{ md: { span: 5 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
    >
      <a-form-item label="业务表:" name="primaryTableName">
        <a-input v-model:value="form.expandInfo.primaryTableName" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="主键字段：" name="primaryFieldName">
        <a-input v-model:value="form.expandInfo.primaryFieldName" allow-clear autocomplete="off" />
      </a-form-item>
      <a-form-item label="主键ID值:" name="primaryFieldValue">
        <a-input v-model:value="form.primaryFieldValue" allow-clear autocomplete="off" />
      </a-form-item>
    </a-form>

    <div class="card-title card-title-background">拓展信息</div>
    <a-form
      layout="horizontal"
      ref="form"
      :model="form"
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item
        :label="item.fieldName"
        :name="item.fieldCode"
        v-for="item in form.fieldInfoList"
        :key="item.fieldId"
      >
        <!--如果是字符串类型的字段-->
        <a-input
          v-model:value="dynamicFormData[item.fieldCode ?? '']"
          allow-clear
          autocomplete="off"
          v-if="item.fieldType === 1"
        />

        <!--如果是数字类型的字段-->
        <a-input-number
          v-model:value="dynamicFormData[item.fieldCode ?? '']"
          allow-clear
          autocomplete="off"
          v-if="item.fieldType === 2"
          style="width: 100%"
        />

        <!--如果是字符串类型的字段-->
        <dict-select
          v-model:value="dynamicFormData[item.fieldCode ?? '']"
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

<script name="SysExpandDataDetail" lang="ts" setup>
  import { ref, watch } from 'vue';
  import DictSelect from '/@/components/DictSelect/DictSelect.vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import type { FormInstance } from 'ant-design-vue/es/form';
  import useFormData from '/@/utils/common/use-form-data';
  import { SysExpandData } from '/@/api/expand/model/SysExpandDataModel';
  import { SysExpandDataApi } from '/@/api/expand/SysExpandDataApi';

  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    visible: boolean;
    // 当前行数据
    data?: SysExpandData | null;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 提交状态
  const loading = ref<boolean>(false);

  // 表单数据
  const { form, resetFormFields, assignFormFields } = useFormData<SysExpandData>({
    expandDataId: '',
    primaryFieldValue: undefined,
    expandData: undefined,
    expandId: undefined,
    fieldInfoList: undefined,
    expandInfo: {
      /**
       * 主键id
       */
      expandId: '',
      /**
       * 拓展业务名称
       */
      expandName: undefined,
      /**
       * 拓展业务唯一编码
       */
      expandCode: undefined,
      /**
       * 状态：1-启用，2-禁用
       */
      expandStatus: undefined,
      /**
       * 主业务表，例如：sys_user
       */
      primaryTableName: undefined,
      /**
       * 业务主键id字段名，例如：user_id
       */
      primaryFieldName: undefined,
      /**
       * 业务主键id字段名驼峰法，例如：userId
       */
      primaryFieldCamel: undefined,
    },
  });

  // 动态表单数据
  const dynamicFormData = ref<any>({});

  watch([() => props.visible, () => props.data], (visible) => {
    if (visible) {
      if (props.data) {
        loadDetail(props.data.expandDataId);
      }
    } else {
      resetFormFields();
    }
  });

  /**
   * 加载详情
   *
   * @author fengshuonan
   * @date 2022/3/31 11:52
   */
  const loadDetail = async (expandDataId: string) => {
    let result: SysExpandData = await SysExpandDataApi.detail({ expandDataId: expandDataId });
    assignFormFields(result);
    dynamicFormData.value = JSON.parse(form.expandData ?? '');
  };

  // 确定
  const save = () => {
    updateVisible(false);
  };

  /**
   * 更新编辑界面弹框是否显示
   *
   * @author yxx
   * @date 2022/6/14 20:24
   */
  const updateVisible = (value) => {
    emit('update:visible', value);
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
