<template>
  <!-- 新增 -->
  <a-modal
    :width="600"
    :visible="visible"
    :confirm-loading="loading"
    :forceRender="true"
    :maskClosable="false"
    title="新建字典类型"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ md: { span: 5 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
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
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { message } from 'ant-design-vue/es';
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  import { SysDictTypeApi } from '/@/api/system/basedata/SysDictTypeApi';
  import useFormData from '/@/utils/common/use-form-data';
  import { DictTypeRequest, SysDictType } from '/@/api/system/basedata/model/SysDictTypeModel';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    // 弹窗是否打开
    visible: boolean;
    // 修改回显的数据
    data?: SysDictType | null;
  }>();

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 提交状态
  const loading = ref<boolean>(false);
  // 是否是修改
  const isUpdate = ref<boolean>(false);
  // 是否显示字典业务代码
  const showDictTypeBusCode = ref<boolean>(false);

  // 表单数据
  const { form, resetFormFields } = useFormData<DictTypeRequest>({
    dictTypeId: undefined,
    dictTypeClass: undefined,
    dictTypeBusCode: undefined,
    dictTypeCode: undefined,
    dictTypeName: undefined,
    dictTypeDesc: undefined,
    dictTypeSort: undefined,
  });

  // 验证规则
  const rules = reactive<Record<string, Rule[]>>({
    dictTypeName: [{ required: true, message: '请输入字典名称', type: 'string', trigger: 'blur' }],
    dictTypeCode: [{ required: true, message: '请输入字典编码', type: 'string', trigger: 'blur' }],
    dictTypeClass: [{ required: true, message: '请选择业务类型', type: 'number', trigger: 'blur' }],
    dictTypeSort: [{ required: true, message: '请输入字典顺序', type: 'number', trigger: 'blur' }],
  });

  watch(
    () => props.visible,
    () => {
      if (!props.visible) {
        resetFormFields();
        formRef.value?.clearValidate();
      }
    },
  );

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

  /**
   * 保存和编辑
   *
   * @author chenjinlong
   * @date 2021/4/7 11:00
   */
  const save = () => {
    // 校验表单
    if (!formRef.value) {
      return;
    }
    formRef.value.validate().then(() => {
      // 修改加载框为正在加载
      loading.value = true;

      SysDictTypeApi.add(form)
        .then((res) => {
          // 移除加载框
          loading.value = false;
          // 提示添加成功
          message.success(res.message);
          // 关闭弹框，通过控制visible的值，传递给父组件
          updateVisible(false);
          // 触发父组件done事件
          emit('done');
        })
        .catch(() => {
          loading.value = false;
        });
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
    emit('update:visible', value);
  };
</script>
