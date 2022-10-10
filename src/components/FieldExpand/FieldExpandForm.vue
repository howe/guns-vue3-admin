<!--数据拓展表单-->
<template>
  <a-form
    layout="horizontal"
    ref="form"
    :rules="rules"
    :model="dynamicFormData"
    :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
  >
    <a-spin :delay="100" :spinning="loading">
      <a-form-item :label="item.fieldName" :name="item.fieldCode" v-for="item in fieldInfoList" :key="item.fieldId">
        <!--如果是字符串类型的字段-->
        <a-input v-model:value="dynamicFormData[item.fieldCode]" allow-clear autocomplete="off" v-if="item.fieldType === 1" />

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
    </a-spin>
  </a-form>
</template>

<script>
import { nextTick, reactive, ref, toRefs } from 'vue';
import DictSelect from '/@/components/DictSelect/DictSelect.vue';
import { SysExpandApi } from '/@/api/expand/SysExpandApi';

export default {
  name: 'FieldExpandForm',
  components: { DictSelect },
  inheritAttrs: false,
  props: {
    // 拓展业务标识，对应sys_expand表的expand_code字段，用来获取这个表单的数据结构
    expandCode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 表单引用
    let form = ref(null);

    let data = reactive({
      // 拓展业务id
      expandId: '',
      // 动态表单的数据
      dynamicFormData: {},
      // 动态表单的字段元数据列表
      fieldInfoList: [
        {
          // 字段中文名
          fieldName: '',
          // 字段英文名
          fieldCode: '',
          // 字段类型：1-字符串类型，2-数字类型，3-字典类型
          fieldType: 1,
          // 是否必填：Y-必填，N-非必填
          fieldRequired: '',
          // 属性值长度，用于数字类型
          fieldLength: '',
          // 字典类型编码，用于字典类型
          fieldDictTypeCode: ''
        }
      ],
      // 表单验证规则
      rules: {},
      loading: false
    });

    /**
     * 自定义校验
     *
     * @author fengshuonan
     * @date 2022/3/31 18:51
     */
    const customValidator = async (rule, value) => {
      // 判断是否必填
      if (rule.required && !value) {
        return Promise.reject(rule.customMessage);
      }

      // 判断是否需要验证长度
      if (rule.fieldLength && value) {
        if (typeof value === 'number') {
          let tempStr = value + '';
          if (tempStr.length > rule.fieldLength) {
            return Promise.reject(`请输入指定长度：${rule.fieldLength}`);
          }
        } else if (typeof value == 'string') {
          if (value.length > rule.fieldLength) {
            return Promise.reject(`请输入指定长度：${rule.fieldLength}`);
          }
        }
      }

      return Promise.resolve();
    };

    /**
     * 加载表单信息
     *
     * @author fengshuonan
     * @date 2022/3/31 15:21
     */
    const loadForm = primaryFieldValue => {
      data.loading = true;
      let primaryValue = '';
      if (primaryFieldValue) {
        primaryValue = primaryFieldValue;
      }
      // 根据expandCode获取业务表单的元数据信息
      SysExpandApi.getByExpandCode({ expandCode: props.expandCode, primaryFieldValue: primaryValue }).then(res => {
        data.fieldInfoList = Object.assign([], res.fieldInfoList);

        // 设置expandId
        data.expandId = res.expandId;

        // 根据字段列表，进行为空校验的规则填写
        for (let item of data.fieldInfoList) {
          data.rules[item.fieldCode] = [
            {
              required: item.fieldRequired === 'Y',
              validator: customValidator,
              type: item.fieldType === 1 ? 'string' : item.fieldType === 2 ? 'number' : 'string',
              trigger: 'blur',
              // 两个自定义属性
              customMessage: `请输入${item.fieldName}`,
              fieldLength: item.fieldLength
            }
          ];
        }

        // 根据返回的数据，渲染表单
        if (res.expandData) {
          data.dynamicFormData = JSON.parse(res.expandData);
        } else {
          data.dynamicFormData = {};
        }
        data.loading = false;
      });
    };

    /**
     * 获取填写数据
     *
     * @author fengshuonan
     * @date 2022/3/31 15:21
     */
    const validate = async () => {
      await form.value.validate();
    };

    /**
     * 获取填写数据
     *
     * @author fengshuonan
     * @date 2022/3/31 15:21
     */
    const getData = () => {
      return { expandId: data.expandId, expandData: data.dynamicFormData };
    };

    return {
      form,
      ...toRefs(data),
      loadForm,
      validate,
      getData
    };
  }
};
</script>
