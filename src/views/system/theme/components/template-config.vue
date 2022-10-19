<template>
  <a-spin :spinning="loading">
    <a-row class="myTransfer">
      <a-col :span="20" :offset="4">
        <a-transfer
          :data-source="sourceField"
          :titles="['未选', '已选']"
          :target-keys="targetField"
          :render="(item) => item.title"
          @change="handleChange"
        />
      </a-col>
    </a-row>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ThemeTemplateFieldApi } from '/@/api/system/theme/ThemeTemplateFieldApi';
  import { ThemeTemplateRelApi } from '/@/api/system/theme/ThemeTemplateRelApi';
  import { reactive, ref } from 'vue';

  // 页面标题
  const title = ref<string>('主题属性绑定');

  // 模板ID
  const templateId = ref<string>('');

  // 页面是否加载中，用在获取数据时
  const loading = ref<boolean>(false);

  // 未选数据
  const sourceField = ref<Array<string | number>>([]);

  // 已选数据
  const targetField = ref<Array<string | number>>([]);

  // 弹窗显示
  const visible = ref<boolean>(false);

  /**
   * 打开配置
   *
   * @author fengshuonan
   * @date 2021/12/28 09:13:28
   */
  const openConfig = (templateIds: string) => {
    visible.value = true;
    templateId.value = templateIds;

    // 获取属性数据
    loadFieldResource();
  };

  /**
   * 加载数据
   *
   * @author fengshuonan
   * @date 2021/12/28 09:19:59
   */
  const loadFieldResource = async () => {
    // 开启加载
    loading.value = true;

    // 获取数据
    let sourceData = await ThemeTemplateFieldApi.findNotRelList({ templateId: templateId.value });
    let targetData = await ThemeTemplateFieldApi.findRelList({ templateId: templateId.value });

    sourceField.value = [];
    targetField.value = [];
    // 只获取属性编码
    if (sourceData != null) {
      for (const item of sourceData) {
        sourceField.value.push({
          key: item.fieldCode,
          title: item.fieldName,
        });
      }
    }

    if (targetData != null) {
      for (const item of targetData) {
        sourceField.value.push({
          key: item.fieldCode,
          title: item.fieldName,
        });
        targetField.value.push(item.fieldCode);
      }
    }

    // 关闭加载
    loading.value = false;
  };

  /**
   * 处理两栏之间的移动
   *
   * @author fengshuonan
   * @date 2021/12/28 15:59:01
   */
  const handleChange = async (nextTargetKeys: any, direction: any, moveKeys: any) => {
    if (direction === 'left') {
      await ThemeTemplateRelApi.del({ templateId: templateId.value, fieldCodes: moveKeys });
    } else {
      await ThemeTemplateRelApi.add({ templateId: templateId.value, fieldCodes: moveKeys });
    }

    loadFieldResource();
  };

  defineExpose({
    openConfig,
  })
</script>

<style lang="less" scoped>
:deep(.myTransfer) {
  .ant-transfer-list {
    width: 240px;
    height: 400px;
  }
}
</style>
