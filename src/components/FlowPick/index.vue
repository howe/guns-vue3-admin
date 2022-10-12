<template>
  <a-modal
    width="90%"
    :visible="visible"
    :confirm-loading="state.loading"
    :title="title"
    style="top: 40px"
    :body-style="{ paddingBottom: '8px', height: 'calc(90vh - 110px)' }"
    @ok="save"
    @cancel="updateVisible(false)"
    :maskClosable="false"
  >
    <div class="box">
      <!-- 已选 -->
      <div class="box-header">已选：{{ state.userGroupDetailName }}</div>
      <!-- tab栏 -->
      <div class="box-tab">
        <a-tabs v-model:activeKey="state.activeKey" @change="tabChange">
          <a-tab-pane :key="tabItem.key" :tab="tabItem.name" v-for="tabItem in state.tabList"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="box-content">
        <!-- 用户选择 -->
        <user-select
          v-show="state.activeKey == 'user'"
          :orgTreeList="state.orgTreeList"
          ref="userRef"
          @selectedChange="selectedChange"
        ></user-select>
        <!-- 部门选择 -->
        <dept-select
          v-show="state.activeKey == 'dept'"
          :orgTreeList="state.orgTreeList"
          ref="deptRef"
          @selectedChange="selectedChange"
        ></dept-select>
        <!-- 审批人选择 -->
        <approver-select
          v-show="state.activeKey == 'approver'"
          :orgTreeList="state.orgTreeList"
          ref="approverRef"
          @selectedChange="selectedChange"
        ></approver-select>
        <!-- 角色选择 -->
        <role-select v-show="state.activeKey == 'role'" ref="roleRef" @selectedChange="selectedChange"></role-select>
        <!-- 职位选择 -->
        <position-select v-show="state.activeKey == 'position'" ref="positionRef" @selectedChange="selectedChange"></position-select>
        <!-- 关系选择 -->
        <relation-select v-show="state.activeKey == 'relation'" ref="relationRef" @selectedChange="selectedChange"></relation-select>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { FlowPickApi } from '/@/api/system/flow-pick/FlowPickApi';
import ApproverSelect from './components/approver-select.vue';
import PositionSelect from './components/position-select.vue';
import RelationSelect from './components/relation-select.vue';
import RoleSelect from './components/role-select.vue';
import UserSelect from './components/user-select.vue';
import DeptSelect from './components/dept-select.vue';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';

const props = defineProps({
  // 弹框状态
  visible: Boolean,
  // 弹框标题
  title: {
    type: String,
    default: '流程选人'
  },
  // 左侧组织机构树限制
  orgIdLimit: {
    type: Array,
    default: []
  },
  // 查看详情时传递的组id
  userGroupId: {
    type: String,
    default: ''
  },
  // 需要显示的tab列表，有 user; dept; approver; role; position; relation; 默认是全部显示
  showTab: {
    type: Array,
    default: []
  },
  // 总的数据
  data: {
    type: Object,
    default: {}
  }
});

const emits = defineEmits(['update:visible', 'done']);

// ref
const userRef = ref(null);
const deptRef = ref(null);
const approverRef = ref(null);
const roleRef = ref(null);
const positionRef = ref(null);
const relationRef = ref(null);
// 基本变量
const state = reactive({
  // 弹框加载状态
  loading: false,
  //tab默认选中
  activeKey: 'user',
  //tab栏列表
  tabList: [],
  // 所有的tab列表
  allTablist: [
    {
      key: 'user',
      name: '用户'
    },
    {
      key: 'dept',
      name: '部门'
    },
    {
      key: 'approver',
      name: '部门审批人'
    },
    {
      key: 'role',
      name: '角色'
    },
    {
      key: 'position',
      name: '职位'
    },
    {
      key: 'relation',
      name: '关系'
    }
  ],
  // 组织机构树列表
  orgTreeList: [],
  // 已选组合名称
  userGroupDetailName: ''
});

onMounted(() => {
  getTabList();
  getOrgTreeList();
  getDetail();
});

// 获取当前需要展示的tab列表
const getTabList = () => {
  if (props.showTab) {
    if (props.showTab.length == 0) {
      state.tabList = state.allTablist;
    } else if (props.showTab.length > 0) {
      let newTabList = [];
      state.allTablist.forEach(tabItem => {
        if (props.showTab.find(item => item == tabItem.key)) {
          newTabList.push(tabItem);
        }
      });
      state.tabList = newTabList;
    }

    state.activeKey = state.tabList[0].key;
  }
};

// 获取详情列表
const getDetail = () => {
  // 如果存在id，并且不传数据
  if (props.userGroupId && JSON.stringify(props.data) == '{}') {
    FlowPickApi.detail({ userGroupId: props.userGroupId }).then(res => {
      if (res.code == '00000') {
        setData(res.data);
      }
    });
  } else if (JSON.stringify(props.data) != '{}') {
    setData(props.data);
  }
};

// tab切换
const tabChange = (key: string) => {
  state.activeKey = key;
};

// 设置初始化数据
const setData = (data: any) => {
  userRef.value.state.userList = data.selectUserList ? data.selectUserList : [];
  deptRef.value.state.deptList = data.selectOrgList ? data.selectOrgList : [];
  approverRef.value.state.approverList = data.selectOrgApproverTypeList ? data.selectOrgApproverTypeList : [];
  roleRef.value.state.roleList = data.selectRoleList ? data.selectRoleList : [];
  positionRef.value.state.positionList = data.selectPositionList ? data.selectPositionList : [];
  relationRef.value.state.relationList = data.selectRelationList ? data.selectRelationList : [];
  selectedChange();
};

// 保存
const save = () => {
  state.loading = true;
  let params = {
    selectUserList: userRef.value.state.userList, //选中的用户列表
    selectOrgList: deptRef.value.state.deptList, //选中的组织机构列表
    selectOrgApproverTypeList: approverRef.value.state.approverList, //选中的部门审批人类型列表
    selectRoleList: roleRef.value.state.roleList, //选中的角色列表
    selectPositionList: positionRef.value.state.positionList, //选中的职位列表
    selectRelationList: relationRef.value.state.relationList, //选中的关系列表
    userGroupDetailName: state.userGroupDetailName, //组合名称
    userGroupId: props.userGroupId
  };
  state.loading = false;
  // 关闭弹框
  updateVisible(false);
  emits('done', params);
};

// 关闭弹框
const updateVisible = (value: boolean) => {
  emits('update:visible', value);
};

// 获取左侧组织机构列表
const getOrgTreeList = () => {
  FlowPickApi.getOrgTreeList({ orgIdLimit: props.orgIdLimit }).then(res => {
    state.orgTreeList = res.data;
  });
};

// 已选改变
const selectedChange = () => {
  let userName = getName(userRef.value.state.userList, 'user');
  let deptName = getName(deptRef.value.state.deptList, 'dept');
  let approverName = getName(approverRef.value.state.approverList, 'approver');
  let roleName = getName(roleRef.value.state.roleList, 'role');
  let positionName = getName(positionRef.value.state.positionList, 'position');
  let relationName = getName(relationRef.value.state.relationList, 'relation');
  state.userGroupDetailName = userName + deptName + approverName + roleName + positionName + relationName;
};

// 获取名字
const getName = (list: string[], flag: string) => {
  let name = '';
  if (list && list.length > 0) {
    list.forEach(item => {
      if (flag == 'approver') {
        name += item.subValueName + '#' + item.name + ';';
      } else {
        name += item.name + ';';
      }
    });
    let addName = '';
    if (flag == 'user') {
      addName = '【用户】';
    } else if (flag == 'dept') {
      addName = '【部门】';
    } else if (flag == 'approver') {
      addName = '【部门审批人】';
    } else if (flag == 'role') {
      addName = '【角色】';
    } else if (flag == 'position') {
      addName = '【职位】';
    } else if (flag == 'relation') {
      addName = '【关系】';
    }

    name = addName + name;
  }
  return name;
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  .box-header {
    border: 1px solid #e8e8e8;
    color: rgba(0, 0, 0, 0.65);
    padding: 12px;
  }
  .box-tab :deep(.ant-tabs-tab) {
    padding: 12px 16px !important;
  }
  .box-content {
    width: 100%;
    height: 60vh;
  }
}
</style>
