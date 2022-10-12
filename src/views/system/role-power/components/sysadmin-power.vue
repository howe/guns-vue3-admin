<template>
  <a-row style="width: 100%">
    <!-- 管理员权限权限 -->
    <a-card :bordered="false" class="table-height" style="width: 100%">
      <!-- 顶部按钮 -->
      <div class="header-button">
        <a-space>
          <a-button type="primary" @click="addAdmin"
            ><template #icon><plus-outlined /></template>添加管理员</a-button
          >
          <a-button danger @click="deleteAdmin"
            ><template #icon><delete-outlined /></template>删除管理员</a-button
          >
        </a-space>
      </div>
      <!-- 底部内容 -->
      <a-tabs
        v-model:activeKey="activeKey"
        tab-position="left"
        animated
        @change="leftChange"
        class="left-tab"
      >
        <a-tab-pane
          :key="item.roleId"
          :tab="item.realName"
          v-for="item in userList"
          class="left-tab-list"
        >
          <div v-if="activeKey" class="right">
            <div class="right-top">
              <a-tabs v-model:activeKey="rightActiveKey" animated class="right-tab">
                <a-tab-pane key="menu" tab="菜单权限"></a-tab-pane>
              </a-tabs>
            </div>
            <div class="right-bottom">
              <a-spin :spinning="authLoading">
                <div v-if="rightActiveKey == 'menu'">
                  <a-table
                    v-if="authData && authData.length"
                    :dataSource="authData"
                    :columns="menuColumns"
                    :pagination="false"
                    rowKey="id"
                    childrenColumnName="other"
                  >
                    <!-- 头部 -->
                    <template #headerCell="{ column }">
                      <template v-if="column.dataIndex == 'menu'">
                        <a-checkbox
                          v-model:checked="checkedAll"
                          @change="(val) => selectAll(val, 'menu')"
                        ></a-checkbox>
                        一级菜单
                      </template>
                    </template>

                    <template #bodyCell="{ column, record }">
                      <template v-if="column.key === 'menu'">
                        <a-checkbox
                          v-model:checked="record.checked"
                          @change="menuCheckedGroup($event, record)"
                        >
                          {{ record.name }}
                        </a-checkbox>
                      </template>
                      <template v-else-if="column.key === 'menus'">
                        <span v-for="chilItem in record.children" :key="chilItem.id">
                          <a-checkbox
                            v-model:checked="chilItem.checked"
                            @change="menuCheckedItem($event, record, chilItem)"
                          >
                            {{ chilItem.name }}
                          </a-checkbox>
                        </span>
                      </template>
                    </template>
                  </a-table>
                </div>
              </a-spin>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- 添加管理员 -->
    <flow-pick
      v-model:visible="isShowAdd"
      v-if="isShowAdd"
      title="添加管理员"
      :showTab="['user']"
      @done="closeAdd"
      :data="allRoleData"
    ></flow-pick>
  </a-row>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, createVNode, watch, ref } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { UserPowerApi } from '/@/api/system/user-power/UserPowerApi';
  import FlowPick from '/@/components/FlowPick/index.vue';
  import { SysMenuApi } from '/@/api/common/SysMenuApi';
  import { message, Modal } from 'ant-design-vue';

  const props = defineProps<{
    // 资源类型
    resourceBizType: Number;
  }>();

  // 左侧默认选中
  const activeKey = ref<string>('');
  // 右侧默认选中
  const rightActiveKey = ref<string>('menu');
  // 左侧用户列表
  const userList = ref<string[]>([]);
  // menu权限数据
  const authData = ref<string[]>([]);
  // menu表格列配置
  const menuColumns = ref<string[]>([
    {
      title: '一级菜单',
      key: 'menu',
      width: 200,
      dataIndex: 'menu',
    },
    {
      title: '子菜单',
      key: 'menus',
      dataIndex: 'menus',
    },
  ]);
  // 右侧加载laod
  const authLoading = ref<boolean>(false);
  //是否全选
  const checkedAll = ref<boolean>(false);
  //是否显示添加管理员弹框
  const isShowAdd = ref<boolean>(false);
  //左侧所有的人员列表
  const allRoleData = ref<any>({});

  onMounted(() => {
    getRoleSelectList();
  });

  // 获取角色列表
  const getRoleSelectList = async () => {
    userList.value = await UserPowerApi.getAdminList();
    if (userList.value && userList.value.length > 0) {
      activeKey.value = userList.value[0].roleId;
      loadAuthData();
    }
  };

  // 左侧用户切换
  const leftChange = (key: string) => {
    rightActiveKey.value = 'menu';
    loadAuthData();
  };

  /**
   * 菜单查询权限数据
   *
   * @author fengshuonan
   * @date 2021/8/10 21:20
   */
  const loadAuthData = async () => {
    authData.value = [];
    authLoading.value = true;

    authData.value = await SysMenuApi.roleBindMenuList({
      roleId: activeKey.value,
      resourceBizType: props.resourceBizType,
    });

    setAuthData(authData.value, 'children', 'name', 'id');
    authLoading.value = false;
  };

  // 设置菜单权限数据
  const setAuthData = (list: string[], childrenName: string, label: string, value: string) => {
    // 资源整理成map
    for (const item of list) {
      // 获取所有的子节点
      let totalNodes = [];
      if (item[childrenName]) {
        for (const subItem of item[childrenName]) {
          totalNodes.push({ label: subItem[label], value: subItem[value] });
        }
        item.totalNodes = totalNodes;

        // 获取选中的子节点
        item.selectedNodes = item[childrenName]
          .filter((value) => {
            return value.checked;
          })
          .map((value) => value.id);
      }
    }
  };

  // 选择所有变化
  const selectAll = async (val: any, flag: string) => {
    authLoading.value = true;
    let params = {
      roleId: activeKey.value,
      totalSelectFlag: val.target.checked,
      resourceBizType: props.resourceBizType,
    };
    let res;
    if (flag == 'menu') {
      res = await SysMenuApi.grantAll(params);
      loadAuthData();
    }
    message.success(res.message);
    authLoading.value = false;
  };

  // 一级菜单选中
  const menuCheckedGroup = async (event: any, record: any) => {
    // 开启加载
    authLoading.value = true;

    //菜单选中id列表
    let grantMenuIdList = [];
    if (record.totalNodes && record.totalNodes.length > 0) {
      grantMenuIdList = record.totalNodes.map((item) => item.value);
    }
    grantMenuIdList.push(record.id);
    // 参数
    let params = {
      roleId: activeKey.value,
      selectBindFlag: record.checked,
      grantMenuIdList: grantMenuIdList,
      resourceBizType: props.resourceBizType,
    };
    let res = await SysMenuApi.grantRoleMenus(params);
    authData.value = res.data;
    setAuthData(authData.value, 'children', 'name', 'id');
    message.success(res.message);

    // 关闭加载
    authLoading.value = false;
  };

  /**
   * 子菜单选中
   * @author: nxy
   * @Date: 2022-09-30 10:10:05
   * @param {*} event 选中的结果
   * @param {*} record 当前行数据
   * @param {*} chiItem 当前选中的子菜单数据
   */
  const menuCheckedItem = async (event: any, record: any, chiItem: any) => {
    //菜单选中id列表
    let grantMenuIdList = [];
    if (event.target.checked) {
      grantMenuIdList.push(record.id);
      record.children.forEach((item) => {
        if (item.checked) {
          grantMenuIdList.push(item.id);
        }
      });
    } else {
      record.children.forEach((item) => {
        if (!item.checked) {
          grantMenuIdList.push(item.id);
        }
      });
    }

    // 参数
    let params = {
      roleId: activeKey.value,
      selectBindFlag: event.target.checked,
      grantMenuIdList: grantMenuIdList,
      resourceBizType: props.resourceBizType,
    };
    let res = await SysMenuApi.grantRoleMenus(params);
    authData.value = res.data;
    setAuthData(authData.value, 'children', 'name', 'id');
    message.success(res.message);
  };

  // 添加管理员
  const addAdmin = () => {
    let params = {
      selectUserList: [],
    };
    if (userList.value && userList.value.length > 0) {
      userList.value.forEach((item) => {
        let obj = {
          bizId: item.userId,
          name: item.realName,
        };
        params.selectUserList.push(obj);
      });
    }
    allRoleData.value = params;
    isShowAdd.value = true;
  };

  // 删除管理员
  const deleteAdmin = () => {
    if (activeKey.value) {
      let userId = '';
      userList.value.forEach((item) => {
        if (item.roleId == activeKey.value) {
          userId = item.userId;
        }
      });
      Modal.confirm({
        title: '提示',
        content: '确定要删除当前管理员吗?',
        icon: createVNode(ExclamationCircleOutlined),
        maskClosable: true,
        onOk: async () => {
          let result = await UserPowerApi.delAdmin({ userId: userId });
          message.success(result.message);
          getRoleSelectList();
        },
      });
    }
  };

  // 关闭添加弹框
  const closeAdd = (params: any) => {
    let userIdList = [];
    if (params.selectUserList && params.selectUserList.length > 0) {
      userIdList = params.selectUserList.map((item) => item.bizId);
    }
    UserPowerApi.addAdmin({ userIdList: userIdList }).then((res) => {
      if (res.code == '00000') {
        message.success(res.message);
        getRoleSelectList();
      }
    });
  };

  watch(
    () => authData.value,
    (val) => {
      if (val && val.length > 0) {
        if (val.find((item) => item.checked == false)) {
          return (checkedAll.value = false);
        } else {
          return (checkedAll.value = true);
        }
      } else {
        return (checkedAll.value = false);
      }
    },
  );
</script>

<style scoped lang="less">
  .right {
    height: calc(90vh - 108px);
    overflow-y: auto;
  }
  .right-top {
    margin-top: -10px;
  }
  .header-button {
    width: 100%;
    text-align: right;
  }
  :deep(.left-tab .ant-tabs-tab-active) {
    background: var(--primary-1);
  }
  :deep(.right-tab .ant-tabs-tab-active) {
    background: #fff;
  }
</style>
