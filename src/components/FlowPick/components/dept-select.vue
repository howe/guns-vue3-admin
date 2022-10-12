<!--
 * @Author: nxy
 * @Date: 2022-10-12 17:42:54
-->
<template>
  <a-row class="user-select" :gutter="16">
    <!-- 部门选择 -->
    <a-col :span="8">
      <selected-tree
        ref="selectedTreeRef"
        :orgTreeList="orgTreeList"
        :checkable="true"
        :checkStrictly="true"
        @treeCheck="treeCheck"
      ></selected-tree>
    </a-col>
    <!-- 已选列表 -->
    <a-col :span="16">
      <selected-list v-model:list="state.deptList" @delete="deleteDept" @deleteAll="deleteAll"></selected-list>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import SelectedTree from './selected-tree.vue';
import SelectedList from './selected-list.vue';
const props = defineProps({
  // 左侧树列表
  orgTreeList: Array
});

const emits = defineEmits(['selectedChange']);

const state = reactive({
  //已选列表
  deptList: []
});

// 树选择
const treeCheck = (checkedKeys: string[], checkedNodes: string[]) => {
  let arr = [];
  if (checkedNodes && checkedNodes.length > 0) {
    checkedNodes.forEach(item => {
      let obj = {
        bizId: item.id,
        name: item.name,
      }
      arr.push(obj);
    });
  }
  state.deptList = arr;
};

// 已选删除单个
const deleteDept = (record: any) => {
  state.deptList.splice(
    state.deptList.findIndex(item => item.bizId === record.bizId),
    1
  );
};

// 删除全部已选
const deleteAll = () => {
  state.deptList = [];
};

const selectedTreeRef = ref(null);

// 监听已选列表变化
watch(
  () => state.deptList,
  val => {
    let newArr = [];
    if (val && val.length > 0) {
      val.forEach(item => {
        newArr.push(item.bizId);
      });
    }
    selectedTreeRef.value.state.checkedKeys = newArr;
    emits('selectedChange');
  },
  { deep: true }
);

defineExpose({
  state,
})
</script>

<style>
.user-select {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
