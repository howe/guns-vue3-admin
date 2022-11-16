<template>
  <a-spin :spinning="dataLoading">
    <div style="height: 30vh" class="ele-scrollbar-hover">
      <a-tree
        checkable
        :tree-data="roleData"
        :fieldNames="{ children: 'children', title: 'name', key: 'id' }"
        v-model:checkedKeys="checkedKeys"
        @check="treeCheck"
      />
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { UserApi } from '/@/api/system/user/UserApi';

  const props = defineProps<{
    // 当前用户数据
    data?: Object;
  }>();

  // 角色数据
  const roleData = ref<string[]>([]);
  // 数据请求状态
  const dataLoading = ref<boolean>(false);
  // 提交状态
  const loading = ref<boolean>(false);
  // 角色选中的keys
  const checkedKeys = ref<Array<string | number>>([]);

  onMounted(() => {
    query();
  });

  /**
   * 获取角色信息
   *
   * @author fengshuonan
   * @date 2021/4/7 16:54
   */
  const query = async () => {
    roleData.value = [];
    checkedKeys.value = [];
    if (!props.data) {
      return;
    }
    dataLoading.value = true;

    // 获取系统的所有角色列表
    roleData.value = await UserApi.getRoleDropList();

    // 获取用户所有的角色
    let userId = props.data.userId;
    let userRoles = await UserApi.getUserRoles({ userId });
    checkedKeys.value = userRoles.map((data) => data.roleId);

    // 关闭loading
    dataLoading.value = false;
  };

  // 树选中
  const treeCheck = () => {
    save();
  };

  /**
   * 保存角色信息
   *
   * @author fengshuonan
   * @date 2021/4/7 16:57
   */
  const save = async () => {
    // 获取当前登录用户和选择的角色
    let userId = props.data.userId;
    let grantRoleIdList = checkedKeys.value;

    // 显示加载中
    loading.value = true;

    // 分配角色
    const result = await UserApi.grantRoles({ userId, grantRoleIdList });
    message.success(result.message);

    // 移除加载中
    loading.value = false;
  };
</script>
