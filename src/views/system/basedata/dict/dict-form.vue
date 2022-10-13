<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
  >
    <a-form-item label="类型名称:" name="dictTypeName">
      <a-input v-model:value="form.dictTypeName" placeholder="请输入字典类型名称" allow-clear />
    </a-form-item>
    <a-form-item label="类型编码:" name="dictTypeCode">
      <a-input
        v-model:value="form.dictTypeCode"
        placeholder="请输入字典类型编码"
        allow-clear
        :disabled="isUpdate"
      />
    </a-form-item>
    <a-form-item label="业务类型:" name="dictTypeClass">
      <a-select
        v-model:value="form.dictTypeClass"
        placeholder="请选择业务类型"
        @change="handleChange"
        allow-clear
      >
        <a-select-option :value="1">业务类型</a-select-option>
        <a-select-option :value="2">系统类型</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="业务编码:" name="dictTypeBusCode" v-show="showDictTypeBusCode">
      <a-input v-model:value="form.dictTypeBusCode" placeholder="请输入业务编码" allow-clear />
    </a-form-item>
    <a-form-item label="排序:" name="dictTypeSort">
      <a-input-number
        style="width: 100%"
        v-model:value="form.dictTypeSort"
        placeholder="请输入字典类型排序"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="描述信息:" name="dictTypeDesc">
      <a-input
        v-model:value="form.dictTypeDesc"
        placeholder="请输入描述信息"
        allow-clear
        autocomplete="off"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  const props = defineProps<{
    form: Object;
    isUpdate: Boolean;
  }>();

  // 验证规则
  const rules = reactive({
    dictTypeName: [{ required: true, message: '请输入字典名称', type: 'string', trigger: 'blur' }],
    dictTypeCode: [{ required: true, message: '请输入字典编码', type: 'string', trigger: 'blur' }],
    dictTypeClass: [{ required: true, message: '请选择业务类型', type: 'number', trigger: 'blur' }],
    dictTypeSort: [{ required: true, message: '请输入字典顺序', type: 'number', trigger: 'blur' }],
  });

  // 是否显示code
  const showDictTypeBusCode = ref<boolean>(false);

  /**
   * 监听业务类型选择
   *
   * @author fengshuonan
   * @date 2022/5/9 22:24
   */
  const handleChange = (value: number) => {
    if (value === 1) {
      showDictTypeBusCode.value = true;
    } else {
      showDictTypeBusCode.value = false;
    }
  };
</script>

<style></style>
