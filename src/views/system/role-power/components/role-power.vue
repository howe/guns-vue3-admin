<template>
  <a-row style="width: 100%">
    <!-- 角色权限 -->
    <a-card :bordered="false" class="table-height" style="width: 100%">
      <a-tabs
        v-model:activeKey="activeKey"
        tab-position="left"
        animated
        @change="leftChange"
        class="left-tab"
      >
        <a-tab-pane :key="item.roleId" :tab="item.roleName" v-for="item in userList">
          <div v-if="activeKey" class="right">
            <div class="right-top">
              <a-tabs
                v-model:activeKey="rightActiveKey"
                animated
                @change="rightChange"
                class="right-tab"
              >
                <a-tab-pane key="menu" tab="菜单权限"></a-tab-pane>
                <a-tab-pane key="button" tab="操作权限"></a-tab-pane>
                <a-tab-pane key="api" tab="分配接口"></a-tab-pane>
                <a-tab-pane key="data" tab="数据权限"></a-tab-pane>
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
                <div v-if="rightActiveKey == 'button'">
                  <a-table
                    v-if="buttonData && buttonData.length"
                    :dataSource="buttonData"
                    :columns="buttonColumns"
                    :pagination="false"
                    rowKey="id"
                    childrenColumnName="other"
                  >
                    <!-- 头部 -->
                    <template #headerCell="{ column }">
                      <template v-if="column.dataIndex == 'menu'">
                        <a-checkbox
                          v-model:checked="checkedButtonAll"
                          @change="(val) => selectAll(val, 'buttons')"
                        ></a-checkbox>
                        菜单
                      </template>
                    </template>

                    <template #bodyCell="{ column, record }">
                      <template v-if="column.key === 'menu'">
                        <a-checkbox
                          v-model:checked="record.checked"
                          @change="buttonCheckedGroup($event, record)"
                          v-if="record.buttons && record.buttons.length > 0"
                        >
                          {{ record.name }}
                        </a-checkbox>
                        <span v-else>{{ record.name }}</span>
                      </template>
                      <template v-else-if="column.key === 'buttons'">
                        <a-checkbox-group
                          :options="record.totalNodes"
                          v-model:value="record.selectedNodes"
                          @change="buttonCheckedItem($event, record)"
                        />
                      </template>
                    </template>
                  </a-table>
                </div>
                <div v-if="rightActiveKey == 'api'">
                  <a-table
                    :dataSource="dataSource"
                    :columns="apiColumns"
                    :pagination="false"
                    rowKey="code"
                    childrenColumnName="other"
                  >
                    <!-- 头部 -->
                    <template #headerCell="{ column }">
                      <template v-if="column.key == 'controller'">
                        <a-checkbox
                          v-model:checked="checkedApiAll"
                          @change="(val) => selectAll(val, 'api')"
                        ></a-checkbox>
                        接口分类
                      </template>
                    </template>

                    <template #bodyCell="{ column, record }">
                      <template v-if="column.key === 'controller'">
                        <a-checkbox
                          v-model:checked="record.checked"
                          :indeterminate="record.indeterminate"
                          @change="apiCheckedGroup($event, record)"
                        >
                          {{ record.nodeName }}
                        </a-checkbox>
                      </template>
                      <template v-else-if="column.key === 'apis'">
                        <a-checkbox-group
                          :options="record.totalNodes"
                          v-model:value="record.selectedNodes"
                          @change="apiCheckedItem($event, record)"
                        />
                      </template>
                    </template>
                  </a-table>
                </div>
                <div v-if="rightActiveKey == 'data'">
                  <a-form
                    ref="formRef"
                    :model="state.form"
                    :rules="rules"
                    style="width: 50%"
                    :label-col="{ md: { span: 3 }, sm: { span: 24 } }"
                    :wrapper-col="{ md: { span: 21 }, sm: { span: 24 } }"
                  >
                    <a-form-item label="数据范围:" name="dataScopeType">
                      <a-select
                        show-search
                        v-model:value="state.form.dataScopeType"
                        placeholder="请选择数据范围"
                        allow-clear
                      >
                        <a-select-option v-for="item in scopeData" :key="item.code">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="机构范围:" v-show="state.form.dataScopeType === 40">
                      <a-tree
                        checkable
                        :checkStrictly="true"
                        :tree-data="orgData"
                        :v-show="state.form.dataScopeType === 1"
                        :fieldNames="{ children: 'children', title: 'name', key: 'id' }"
                        v-model:expandedKeys="expandKeys"
                        v-model:checkedKeys="checkedKeys"
                      />
                    </a-form-item>
                    <div style="text-align: center">
                      <a-button type="primary" @click="saveData">保存</a-button>
                    </div>
                  </a-form>
                </div>
              </a-spin>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-row>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, nextTick, watch } from 'vue';
  import { UserPowerApi } from '/@/api/system/user-power/UserPowerApi';
  import { message } from 'ant-design-vue';
  import { SysRoleApi } from '/@/api/system/role/SysRoleApi';
  import { SysMenuApi } from '/@/api/common/SysMenuApi';
  import { eachTreeData } from '/@/utils/common/util';
  import { SysResourceApi } from '/@/api/common/SysResourceApi';
  import { OrganizationApi } from '/@/api/system/organization/OrganizationApi';

  const props = defineProps<{
    // 资源类型
    resourceBizType: Number;
  }>();
  // 左侧用户列表
  const userList = ref<string[]>([]);
  // 左侧默认选中
  const activeKey = ref<string>('');
  // 右侧默认选中
  const rightActiveKey = ref<string>('menu');
  // 右侧加载laod
  const authLoading = ref<boolean>(false);
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
  // api表格列配置
  const apiColumns = ref<string[]>([
    {
      title: '接口分类',
      key: 'controller',
      dataIndex: 'controller',
      width: 200,
    },
    {
      title: '接口列表',
      key: 'apis',
      dataIndex: 'apis',
      width: 900,
    },
  ]);
  // api表格数据接口
  const dataSource = ref<string[]>([]);
  // 表单验证规则
  const rules = reactive({
    dataScopeType: [
      {
        required: true,
        message: '请选择数据范围',
        type: 'number',
        trigger: 'blur',
      },
    ],
  });
  // 数据范围列表
  const scopeData = ref<string[]>([
    { code: 10, name: '仅本人数据' },
    { code: 20, name: '本部门数据' },
    { code: 30, name: '本部门及以下数据' },
    { code: 40, name: '指定部门数据' },
    { code: 50, name: '全部数据' },
  ]);

  const state = reactive({
    // 表单数据
    form: {},
  });
  // 权限展开的keys
  const expandKeys = ref<Array<string | number>>([]);
  // 角色权限选中的keys
  const checkedKeys = ref<Array<string | number>>([]);
  // 部门数据
  const orgData = ref<string[]>([]);
  // 菜单权限是否显示选择所有
  const checkedAll = ref<boolean>(false);
  // 按钮操作权限数据列表
  const buttonData = ref<string[]>([]);
  // 按钮操作权限表格配置
  const buttonColumns = ref<string[]>([
    {
      title: '菜单',
      key: 'menu',
      width: 200,
      dataIndex: 'menu',
    },
    {
      title: '按钮',
      key: 'buttons',
      dataIndex: 'buttons',
    },
  ]);
  // 操作权限是否全选
  const checkedButtonAll = ref<boolean>(false);
  // 分配接口是否全选
  const checkedApiAll = ref<boolean>(false);

  onMounted(() => {
    getRoleSelectList();
  });

  // 获取角色列表
  const getRoleSelectList = async () => {
    userList.value = await UserPowerApi.getRoleSelectList({ adminFlag: 'N' });
    if (userList.value && userList.value.length > 0) {
      activeKey.value = userList.value[0].roleId;
      loadAuthData();
    }
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

  /**
   * 菜单处理选中组的事件
   *
   * @author fengshuonan
   * @date 2021/8/8 23:35
   */
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
   * 菜单处理选中的节点数据
   *
   * @author fengshuonan
   * @date 2021/8/8 23:35
   */
  const menuCheckedItem = async (event: any, record: any, chilItem: any) => {
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

  /**
   * api处理选中组的事件
   *
   * @author fengshuonan
   * @date 2021/8/8 23:35
   */
  const apiCheckedGroup = async (event: any, record: any) => {
    // 如果是全选事件，则变为全选，如果是非全选事件则变为非全选
    if (event.target.checked) {
      record.indeterminate = false;
      record.selectedNodes = record.totalNodes.map((item) => item.value);
    } else {
      record.selectedNodes = [];
    }

    // 开启加载
    authLoading.value = true;

    // 将选中的资源请求后端
    let modularTotalResource = record.totalNodes.map((item) => item.value);
    let selectedResource = record.selectedNodes;
    await SysRoleApi.grantResource({
      roleId: activeKey.value,
      modularTotalResource,
      selectedResource,
    });

    // 关闭加载
    authLoading.value = false;
  };

  /**
   * api处理选中的节点数据
   *
   * @author fengshuonan
   * @date 2021/8/8 23:35
   */
  const apiCheckedItem = async (checkedValue: string[], record: any) => {
    let totalSelectFlag = true;

    // 获取当前行所有的code
    const totalNodes = record.totalNodes.map((item) => item.value);
    for (const node of totalNodes) {
      if (!record.selectedNodes.includes(node)) {
        totalSelectFlag = false;
      }
    }

    // 如果全部选中
    if (totalSelectFlag) {
      record.checked = true;
      record.indeterminate = false;
    } else {
      record.checked = false;
      record.indeterminate = true;
    }

    // 如果全部未选中
    if (record.selectedNodes.length === 0) {
      record.indeterminate = false;
    }

    // 将选中的资源请求后端
    let modularTotalResource = record.totalNodes.map((item) => item.value);
    let selectedResource = record.selectedNodes;
    SysRoleApi.grantResource({
      roleId: activeKey.value,
      modularTotalResource,
      selectedResource,
    });
  };

  /**
   * api加载资源列表
   *
   * @author fengshuonan
   * @date 2021/8/8 23:34
   */
  const loadMenuResource = async () => {
    // 开启加载
    authLoading.value = true;

    // 获取资源
    dataSource.value = await SysResourceApi.getResourceList({
      roleId: activeKey.value,
      resourceBizType: props.resourceBizType,
    });

    // 资源整理成map
    for (const item of dataSource.value) {
      // 获取所有的子节点
      let totalNodes = [];
      for (const subItem of item.children) {
        totalNodes.push({ label: subItem.nodeName, value: subItem.code });
      }
      item.totalNodes = totalNodes;

      // 获取选中的子节点
      item.selectedNodes = item.children
        .filter((value) => {
          return value.checked;
        })
        .map((value) => value.code);
    }

    // 关闭加载
    authLoading.value = false;
  };

  // 右侧tab点击
  const rightChange = (key: string) => {
    if (key == 'menu') {
      loadAuthData();
    } else if (key == 'api') {
      loadMenuResource();
    } else if (key == 'data') {
      userList.value.forEach((item) => {
        if (item.roleId == activeKey.value) {
          nextTick(() => {
            state.form = item;
          });
        }
      });
      query();
    } else if (key == 'button') {
      getRoleBindOperateList();
    }
  };

  // 数据加载tree
  const query = () => {
    let roleId = activeKey.value;
    OrganizationApi.tree({ roleId, resourceBizType: props.resourceBizType })
      .then((res) => {
        // 加载框
        authLoading.value = false;

        let treeExpandKeys = [],
          treeCheckedKeys = [];

        // 只展开组织机构树的顶级节点
        res.forEach((data) => {
          treeExpandKeys.push(data.id);
        });

        // 组织机构数据赋值
        orgData.value = res;

        // 遍历所有节点，所有选中的节点搜集起来
        eachTreeData(orgData.value, (d) => {
          if (d.checked) {
            treeCheckedKeys.push(d.id);
          }
        });

        expandKeys.value = treeExpandKeys;
        checkedKeys.value = treeCheckedKeys;
      })
      .catch((e) => {
        authLoading.value = false;
        message.error(e.message);
      });
  };

  // 保存编辑
  const saveData = async () => {
    // 校验表单
    if (!state.form.dataScopeType) return message.warning('请选择数据范围！');
    // 加载中
    authLoading.value = true;

    // 获取部门树选择数据
    let ids = checkedKeys.value?.checked;
    await SysRoleApi.grantDataScope({
      roleId: activeKey.value,
      grantOrgIdList: ids,
      dataScopeType: state.form.dataScopeType,
    })
      .then((res) => {
        // 移除加载框
        authLoading.value = false;
        if (res.success) {
          message.success(res.message);
        } else {
          message.error('操作失败：' + res.message);
        }
      })
      .catch((e) => {
        authLoading.value = false;
        message.error(e.message);
      });
  };

  // 左侧点击
  const leftChange = (key: string) => {
    rightActiveKey.value = 'menu';
    loadAuthData();
  };

  // 获取操作权限列表
  const getRoleBindOperateList = async () => {
    authLoading.value = true;
    buttonData.value = await SysMenuApi.roleBindOperateList({
      roleId: activeKey.value,
      resourceBizType: props.resourceBizType,
    });
    setAuthData(buttonData.value, 'buttons', 'name', 'id');
    authLoading.value = false;
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
    } else if (flag == 'buttons') {
      res = await SysMenuApi.grantButtonAll(params);
      getRoleBindOperateList();
    } else if (flag == 'api') {
      res = await SysMenuApi.grantResourceV2All(params);
      loadMenuResource();
    }
    message.success(res.message);
    authLoading.value = false;
  };

  // 操作权限菜单选中
  const buttonCheckedGroup = async (event: any, record: any) => {
    let selectedButtonIds = [];
    // 如果是全选
    if (event.target.checked) {
      selectedButtonIds = record.totalNodes.map((item) => item.value);
    } else {
      selectedButtonIds = [];
    }
    authLoading.value = true;
    let params = {
      roleId: activeKey.value,
      selectedButtonIds: selectedButtonIds,
      modularButtonIds: record.totalNodes.map((item) => item.value),
      resourceBizType: props.resourceBizType,
    };

    let res = await SysMenuApi.grantButton(params);
    buttonData.value = res.data;
    setAuthData(buttonData.value, 'buttons', 'name', 'id');
    message.success(res.message);
    authLoading.value = false;
  };

  // 操作权限按钮变化
  const buttonCheckedItem = async (checkedValue: string[], record: any) => {
    authLoading.value = true;
    let params = {
      roleId: activeKey.value,
      selectedButtonIds: checkedValue,
      modularButtonIds: record.totalNodes.map((item) => item.value),
      resourceBizType: props.resourceBizType,
    };

    let res = await SysMenuApi.grantButton(params);
    buttonData.value = res.data;
    setAuthData(buttonData.value, 'buttons', 'name', 'id');
    message.success(res.message);
    authLoading.value = false;
  };

  // 监听菜单权限列表，控制全选按钮
  watch(
    () => authData.value,
    (val) => {
      setCheckedValue(val, 'checkedAll');
    },
  );

  // 监听操作权限列表，控制全选按钮
  watch(
    () => buttonData.value,
    (val) => {
      if (val && val.length > 0) {
        let newArr = [];
        val.forEach((item) => {
          if (item.buttons && item.buttons.length > 0) {
            newArr.push(item);
          }
        });

        setCheckedValue(newArr, 'checkedButtonAll');
      } else {
        return (checkedButtonAll.value = false);
      }
    },
  );

  // 监听分配接口列表，控制全选按钮
  watch(
    () => dataSource.value,
    (val) => {
      setCheckedValue(val, 'checkedApiAll');
    },
  );

  // 设置全选按钮是否选中
  const setCheckedValue = (list: string[], name: string) => {
    if (list && list.length > 0) {
      if (list.find((item) => item.checked == false)) {
        return (state[name] = false);
      } else {
        return (state[name] = true);
      }
    } else {
      return (state[name] = false);
    }
  };
</script>

<style scoped lang="less">
  .right {
    height: calc(90vh - 108px);
    overflow-y: auto;
  }
  .right-top {
    margin-top: -10px;
  }
  :deep(.left-tab .ant-tabs-tab-active) {
    background: var(--primary-1);
  }
  :deep(.right-tab .ant-tabs-tab-active) {
    background: #fff;
  }
</style>
