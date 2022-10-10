<template>
  <a-modal
    :width="900"
    :visible="visible"
    :confirm-loading="loading"
    :title="title"
    :body-style="{ paddingBottom: '8px' }"
    @ok="save"
    @cancel="updateVisible(false)"
    :maskClosable="false"
  >
    <div class="header">
      <div class="tabs">
        <div
          v-for="(tabItem, tabIndex) in tabList"
          :key="tabIndex"
          :class="selectTab == tabItem.key ? 'tabcolor' : ''"
          @click="tabChange(tabItem)"
        >
          {{ tabItem.name }}
        </div>
      </div>
      <div class="search">
        <div>
          <a-input v-model:value="searchValue" class="input" :placeholder="getPlaceholder()" @pressEnter="search">
            <template #suffix>
              <search-outlined class="icon" @click="search" />
            </template>
          </a-input>
        </div>
      </div>
    </div>
    <div class="box">
      <a-spin :spinning="spinning" :delay="100">
        <!-- 条件-->
        <div v-if="selectTab == '1'">
          <a-checkbox
            v-model:checked="checkAll"
            class="all"
            @change="val => checkAllChange(val, 'userListByConditionsList')"
            v-if="userListByConditionsList.length > 0"
            >全选</a-checkbox
          >
          <a-checkbox-group v-model:value="valueList" style="width: 100%">
            <a-checkbox
              :value="userItem"
              name="type"
              class="checkbox"
              v-for="(userItem, userIndex) in userListByConditionsList"
              :key="userIndex"
              >{{ userItem.name }}</a-checkbox
            >
          </a-checkbox-group>
        </div>
      </a-spin>
    </div>
    <!-- 已选列表 -->
    <div>
      已选：<a-tag
        closable
        @close="logClose(valItem, getIdOrName(selectTab, 1, ''))"
        color="blue"
        v-for="valItem in valueList"
        :key="valItem[getIdOrName(selectTab, 1, '')]"
        >{{ valItem[getIdOrName(selectTab, '', 1)] }}</a-tag
      >
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
import { OrganizationApi } from '/@/api/system/organization/OrganizationApi';
export default defineComponent({
  props: {
    // 弹窗是否打开
    visible: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      defalut: '标题'
    }
  },
  setup(props, context) {
    const data = reactive({
      // 弹框加载动画
      loading: false,
      spinning: false,
      //   搜索条件
      searchValue: '',
      // tab切换列表
      tabList: [
        {
          key: '1',
          name: '条件'
        }
      ],
      //   默认选中tab
      selectTab: '1',
      // 条件列表
      userListByConditionsList: [],
      // 选中的数据
      valueList: [],
      // 全选按钮
      checkAll: false
    });

    onMounted(() => {
      getUserListByConditions();
    });

    // 获取条件列表
    const getUserListByConditions = async () => {
      let params = {
        searchText: data.searchValue
      };
      data.userListByConditionsList = await OrganizationApi.selector(params);
    };

    // 关闭弹框
    const updateVisible = value => {
      context.emit('update:visible', value);
    };

    // 保存
    const save = () => {
      context.emit('done', data.valueList);
      updateVisible(false);
    };

    // tab切换
    const tabChange = tabItem => {
      if (tabItem.key != data.selectTab) {
        // 为tab赋值
        data.selectTab = tabItem.key;
        // 关闭全选
        data.checkAll = false;
        // 清空已选中的值
        data.valueList = [];
        // 清空搜索条件
        data.searchValue = '';
        getUserListByConditions();
      }
    };

    // 搜索提示
    const getPlaceholder = () => {
      return '请输入搜索内容';
    };

    // 搜索
    const search = () => {
      getUserListByConditions();
    };

    // 用户，角色，项目角色全选按钮变化
    const checkAllChange = ({ target }, flag) => {
      if (target.checked) {
        data.valueList = data[flag];
      } else {
        data.valueList = [];
      }
    };

    /**
     * 获取id或名字
     * @selectTab 当前tab类型
     * @id 当前tab所需要的id
     * @name 当前tab所需要的name
     */
    const getIdOrName = (selectTab, id, name) => {
      if (id) {
        if (selectTab == '1' || selectTab == '2') return 'id';
        if (selectTab == '3') return 'roleId';
        if (selectTab == '4') return 'projectRoleId';
      } else if (name) {
        if (selectTab == '1' || selectTab == '2') return 'name';
        if (selectTab == '3') return 'roleName';
        if (selectTab == '4') return 'projectRoleName';
      }
    };

    // 删除valueList的数据
    const logClose = (valItem, id) => {
      let arr = [...data.valueList];
      arr.forEach((item, index) => {
        if (valItem[id] == item[id]) {
          arr.splice(index, 1);
        }
      });
      data.valueList = arr;
      data.checkAll = false;
    };

    // 用户，角色，项目角色改变全选按钮
    const changeCheckAll = (arr, flag) => {
      if (arr.length > 0) {
        if (arr.length == data[flag].length) {
          data.checkAll = true;
        } else {
          data.checkAll = false;
        }
      }
    };

    // 监听已选值的变化，主要用于删除
    watch(
      () => data.valueList,
      newval => {
        if (data.selectTab == '1') {
          changeCheckAll(newval, 'userListByConditionsList');
        }
      }
    );

    return {
      ...toRefs(data),
      updateVisible,
      changeCheckAll,
      logClose,
      search,
      getUserListByConditions,
      save,
      getIdOrName,
      checkAllChange,
      tabChange,
      getPlaceholder
    };
  }
});
</script>

<style scoped lang="less">
.box {
  width: 100%;
  height: 300px;
  overflow: auto;
  border: 1px solid #eee;
}
.header {
  height: 32px;
  display: flex;
  position: relative;
  margin-bottom: 10px;
  .tabs {
    display: flex;
    width: calc(200px);
    div {
      height: 32px;
      line-height: 22px;
      border: 1px solid #ccc;
      padding: 5px 20px;
      cursor: pointer;
    }
    div:hover {
      color: var(--primary-5);
    }
  }
  .search {
    width: calc(100% - 200px);
    display: flex;
    justify-content: right;
    div {
      margin-left: 5px;
    }
    .input {
      width: 300px;
      border-radius: 5px;
    }
  }
}
.icon {
  cursor: pointer;
}
.tabcolor {
  border: 1px solid var(--primary-5) !important;
  color: var(--primary-5);
}
.checkbox:first {
  margin: 0px 0 0 20px;
}
.checkbox {
  width: 100%;
  margin: 10px 0 0 20px;
}
.checkbox:hover {
  background: #bae7ff;
}
.all {
  margin: 10px 0 0 20px;
}
.treeAll {
  margin: 10px 0 0 24px;
}
:deep(.ant-select-selector) {
  border-radius: 5px;
}
</style>
