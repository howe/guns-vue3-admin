<!--
 * @Author: nxy
 * @Date: 2022-10-12 17:42:54
-->
<template>
  <a-card :bordered="false" style="height: 100%">
    <a-tree
      :show-line="true"
      v-if="orgTreeList.length"
      :tree-data="orgTreeList"
      v-model:selectedKeys="state.selectedKeys"
      v-model:checkedKeys="state.checkedKeys"
      :defaultExpandAll="true"
      :checkStrictly="checkStrictly"
      :checkable="checkable"
      :fieldNames="fieldNames"
      @select="treeSelect"
      @check="treeCheck"
    >
    </a-tree>
  </a-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const props = defineProps({
  // 树选择列表
  orgTreeList: Array,
  // 是否显示多选框
  checkable: {
    type: Boolean,
    default: false
  },
  //父子节点选中状态不再关联
  checkStrictly: {
    type: Boolean,
    default: false
  },
  //替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段
  fieldNames: {
    type: Object,
    default: { children: 'children', title: 'name', key: 'id' }
  },
});

const emits = defineEmits(['treeSelect', 'treeCheck']);

const state = reactive({
  // 当前点击列表
  selectedKeys: [],
  //多选列表
  checkedKeys: []
});

// 树选择
const treeSelect = (selectedKeys: string[], info: any) => {
  state.selectedKeys = [info.node.key];
  emits('treeSelect', state.selectedKeys, info);
};

// 多选事件
const treeCheck = (checkedKeys: string[], { checkedNodes }) => {
  emits('treeCheck', checkedKeys, checkedNodes);
};

defineExpose({
  state,
})
</script>

<style></style>
