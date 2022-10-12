<!-- 图标选择器组件 license by http://eleadmin.com -->
<template>
  <a-dropdown
    v-model:visible="visible"
    :placement="placement"
    :trigger="trigger"
    :disabled="disabled">
    <div :class="['ele-icon-picker', {'disabled': this.disabled}]">
      <a-input
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        readonly>
        <template #prefix>
          <component v-if="value" :is="value"/>
        </template>
        <template #suffix>
          <div class="ele-text-placeholder ele-icon-picker-arrow">
            <close-circle-filled
              v-if="this.allowClear&&this.value&&!this.disabled"
              @click.stop="onClear"/>
            <down-outlined/>
          </div>
        </template>
      </a-input>
    </div>
    <template #overlay>
      <div class="ant-dropdown-menu ele-icon-picker-popper">
        <div @click.stop="">
          <a-tabs v-model:active-key="activeKey">
            <a-tab-pane v-for="(d, i) in result" :key="i" :tab="d.title"/>
            <template #rightExtra>
              <div v-if="allowSearch" class="ele-icon-picker-search">
                <a-input-search
                  v-model:value="keywords"
                  :placeholder="searchPlaceholder"
                  size="small"
                  @search="onSearch"/>
              </div>
            </template>
          </a-tabs>
          <div class="ele-icon-picker-pane">
            <a-menu
              v-model:selected-keys="selectedKeys"
              mode="inline">
              <a-menu-item
                v-for="(d, i) in activeList"
                :key="i">{{ d.title }}
              </a-menu-item>
            </a-menu>
            <div class="ele-icon-picker-list">
              <div
                class="ele-icon-picker-item"
                v-for="(d, i) in currentList"
                :key="i">
                <a-card hoverable>
                  <div
                    class="ele-icon-picker-item-icon"
                    :title="d"
                    @click="onChoose(d)">
                    <component :is="d"/>
                  </div>
                </a-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script>
import * as antIcons from '@ant-design/icons-vue';
import iconData from './icon.js';

export default {
  name: 'EleIconPicker',
  components: {...antIcons},
  emits: ['update:value'],
  props: {
    // dropdown属性
    trigger: {
      type: Array,
      default() {
        return ['click'];
      }
    },
    placement: {
      type: String,
      default: 'bottomLeft'
    },
    // 选中图标
    value: String,
    // 提示文本
    placeholder: String,
    // 尺寸
    size: String,
    // 是否禁用
    disabled: Boolean,
    // 是否显示清除
    allowClear: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索框
    allowSearch: {
      type: Boolean,
      default: true
    },
    // 搜索框提示文本
    searchPlaceholder: {
      type: String,
      default: '搜索..'
    },
    // 图标数据
    data: {
      type: Array,
      default() {
        return iconData;
      }
    }
  },
  data() {
    return {
      // popper是否显示
      visible: false,
      // tab选中
      activeKey: 0,
      // menu选中
      selectedKeys: [0],
      // 搜索关键字
      keywords: '',
      // 搜索后的数据
      result: this.data
    };
  },
  computed: {
    /* 当前tab数据 */
    activeList() {
      if (!this.result.length) {
        return [];
      }
      const temp = this.result[this.activeKey];
      return temp ? temp.children : [];
    },
    /* 当前显示图标数据 */
    currentList() {
      if (!this.activeList.length) {
        return [];
      }
      if (!this.selectedKeys.length) {
        return [];
      }
      const temp = this.activeList[this.selectedKeys[0]];
      return temp ? temp.icons : [];
    }
  },
  methods: {
    /* 选择图标 */
    onChoose(value) {
      this.visible = false;
      this.$emit('update:value', value);
    },
    /* 清除 */
    onClear() {
      this.$emit('update:value', '');
    },
    /* 搜索 */
    onSearch() {
      if (!this.keywords) {
        this.result = this.data;
        return;
      }
      let result = [], firstIndex = -1, activeHave = true;
      this.data.forEach((item, index) => {
        let children = [], haveIcon = false;
        item.children.forEach((child => {
          let icons = child.icons.filter(d => d.toLowerCase().indexOf(this.keywords.toLowerCase()) !== -1);
          if (icons.length) {
            haveIcon = true;
          } else if (index === this.activeKey) {
            activeHave = false;
          }
          children.push({title: child.title, icons: icons});
        }));
        if (firstIndex === -1 && haveIcon) {
          firstIndex = index;
        }
        result.push({title: item.title, children: children});
      });
      this.result = result;
      if (!activeHave && firstIndex !== -1) {
        this.activeKey = firstIndex;
      }
    }
  }
}
</script>

<style>
/* 图标选择器popper */
.ele-icon-picker-popper {
  width: 520px;
  max-width: 90vw;
  padding: 0;
}

/* tab */
.ele-icon-picker-popper .ant-tabs-bar {
  margin: 0;
}

.ele-icon-picker-popper .ant-tabs-tab {
  padding: 10px 0 !important;
  margin: 0 12px !important;
}

.ele-icon-picker-popper .ant-tabs-extra-content {
  line-height: 41px;
}

/* 搜索框 */
.ele-icon-picker-popper .ele-icon-picker-search {
  width: 110px;
  margin-right: 14px;
}

/* pane */
.ele-icon-picker-popper .ele-icon-picker-pane {
  display: flex;
  height: 360px;
}

.ele-icon-picker-popper .ele-icon-picker-pane > .ant-menu {
  width: 120px;
  height: 100%;
  flex-shrink: 0;
  overflow-x: hidden;
}

.ele-icon-picker-popper .ele-icon-picker-pane > .ant-menu .ant-menu-item {
  padding: 0 12px !important;
  margin: 12px 0 0 0 !important;
}

.ele-icon-picker-popper .ele-icon-picker-pane > .ant-menu .ant-menu-item-selected:after {
  right: 1px;
}

.ele-icon-picker-popper .ele-icon-picker-list {
  flex: 1;
  height: 100%;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 2px solid transparent;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 0;
}

/* item */
.ele-icon-picker-popper .ele-icon-picker-item {
  width: 16.6%;
  display: inline-block;
  padding: 6px 2px 6px 10px;
}

.ele-icon-picker-popper .ant-card-body {
  padding: 0;
}

.ele-icon-picker-popper .ele-icon-picker-item-icon {
  padding: 8px 0;
  font-size: 18px;
  text-align: center;
  transition: transform .1s;
}

.ele-icon-picker-popper .ele-icon-picker-item-icon:hover {
  transform: scale(1.6);
}

/* 默认风格 */
.ele-icon-picker {
  cursor: pointer;
}

.ele-icon-picker.disabled {
  cursor: not-allowed;
}

.ele-icon-picker:not(.disabled) .ant-input {
  cursor: pointer;
}

.ele-icon-picker.disabled .ant-input-prefix {
  opacity: .6;
}

.ele-icon-picker .ele-icon-picker-arrow {
  font-size: 12px;
}

.ele-icon-picker:not(:hover) .ele-icon-picker-arrow .anticon-close-circle {
  display: none;
}

.ele-icon-picker:hover .ele-icon-picker-arrow .anticon-close-circle + .anticon-down {
  display: none;
}

/* 自适应 */
@media screen and (max-width: 520px) {
  .ele-icon-picker-popper .ele-icon-picker-item {
    width: 33.3%;
  }
}
</style>
