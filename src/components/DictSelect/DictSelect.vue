<!--
 * @Author: nxy
 * @Date: 2022-10-10 10:00:39
-->
<!--字典选择组件-->
<template>
  <!--带多选-->
  <a-select v-model:value="value" @change="changeOption" mode="multiple" v-if="multiple">
    <a-select-option
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-select-option>
  </a-select>
  <!--不带多选-->
  <a-select v-model:value="value" @select="selectOption" v-else>
    <a-select-option
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-select-option>
  </a-select>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { SysDictTypeApi } from '/@/api/system/basedata/SysDictTypeApi';

export default {
  name: 'DictSelect',
  emits: ['update:value', 'change'],
  props: {
    // 字典类型编码，通过字典类型编码来获取下拉选择的字典
    dictTypeCode: {
      type: String,
      required: false
    },
    // 字典类型id，通过字典类型id来获取下拉选择的字典
    dictTypeId: {
      type: String,
      required: false
    },
    // 传递进来的字典值
    value: {
      required: true
    },
    // 传递进来的值是字典编码还是字典id
    valueType: {
      type: String,
      required: true,
      default: 'dictCode'
    },
    // 是否可以多选
    multiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, context) {
    const data = reactive({
      dictList: null
    });

    onMounted(async () => {
      // 如果传递了字典编码，则根据字典编码查询
      if (props.dictTypeCode) {
        data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeCode: props.dictTypeCode });
      }

      // 如果传递了字典类型的id，则根据字典类型id查询
      if (props.dictTypeId) {
        data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeId: props.dictTypeId });
      }
    });

    const selectOption = value => {
      context.emit('update:value', value);
    };

    const changeOption = value => {
      context.emit('update:value', value);
    };

    return {
      ...toRefs(data),
      selectOption,
      changeOption
    };
  }
};
</script>
