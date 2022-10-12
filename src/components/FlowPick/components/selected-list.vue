<template>
  <div class="selected">
    <!-- 已选列表 -->
    <div class="selected-top">
      <span>已选</span>
      <span class="selected-del"><delete-outlined @click="deleteAll"/></span>
    </div>
    <div class="selected-bottom">
      <div class="bottom-list">
        <!-- 空数据 -->
        <a-empty :image="state.simpleImage" v-if="list && list.length == 0" />
        <!-- 已选列表 -->
        <div v-else>
          <div class="list" v-for="(item, index) in list" :key="item.id">
            <div class="selected-name">{{ index + 1 }} {{ item.subValueName ? item.subValueName + '#' : ''}}{{ item.name }}</div>
            <div class="selected-del"><delete-outlined @click="deleteClick(item)"/></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Empty } from 'ant-design-vue';

const props = defineProps({
  // 已选列表
  list: Array
});

const emits = defineEmits(['delete', 'deleteAll']);

const state = reactive({
  //空数据的图片
  simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
});

// 点击删除单个
const deleteClick = (item: any) => {
  emits('delete', item);
}

// 删除全部已选
const deleteAll = () => {
  emits('deleteAll');
}
</script>

<style scoped lang="less">
.selected {
  width: 100%;
  margin-top: 10px;
  border: 1px solid #e8e8e8;
  .selected-top {
    width: 100%;
    padding: 0 12px;
    height: 40px;
    line-height: 40px;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
    .selected-del {
      position: absolute;
      right: 12px;
      cursor: pointer;
    }
  }
  .selected-bottom {
    padding: 12px;
    .bottom-list {
      border: 1px solid #e8e8e8;
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .list {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      padding: 0 12px;
      height: 100%;
      .selected-name {
        width: 80%;
        padding: 12px 0;
      }
      .selected-del {
        width: 20%;
        cursor: pointer;
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: right;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
