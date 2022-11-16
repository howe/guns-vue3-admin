<template>
  <div>
    <!-- 表格 -->
    <a-card :bordered="false" class="left-menu-height">
      <a-space size="middle">
        <a-tooltip placement="top">
          <template #title>
            <span>新建组织机构</span>
          </template>
          <a-button type="primary" @click="openAdd()">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip placement="top">
          <template #title>
            <span>修改组织机构</span>
          </template>
          <a-button type="primary" @click="openEdit()">
            <template #icon>
              <EditOutlined />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip placement="top">
          <template #title>
            <span>删除组织机构</span>
          </template>
          <a-button danger @click="deleteOrg()">
            <template #icon>
              <delete-outlined />
            </template>
          </a-button>
        </a-tooltip>
      </a-space>

      <a-tree
        v-model:selectedKeys="currentSelectKeys"
        @select="selectNode"
        v-if="orgList.length"
        :tree-data="orgList"
        :fieldNames="{ children: 'children', title: 'name', key: 'id' }"
        style="margin-top: 15px"
        :default-expand-all="true"
      />
    </a-card>

    <!-- 编辑弹窗 -->
    <org-edit
      v-model:visible="showEdit"
      :isUpdate="updateOrg"
      v-if="showEdit"
      :data="currentOrgInfo"
      @done="reload"
      :org-list="orgList"
      defaultKey="1"
    />
  </div>
</template>

<script lang="ts" setup>
  import { UserApi } from '/@/api/system/user/UserApi';
  import { ref, onMounted, nextTick, createVNode } from 'vue';
  import OrgEdit from '/@/views/system/organization/org-edit.vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { message, Modal } from 'ant-design-vue';
  const props = defineProps<{
    orgList: Array;
    currentSelectOrgId: String;
  }>();
  const emits = defineEmits<{
    (e: 'update:currentSelectOrgId', selectedKeys: string): void;
    (e: 'changeNodeSelect'): void;
    (e: 'closeCompanyEdit'): void;
    (e: 'updateOrgList'): void;
  }>();
  // 当前选中的数据
  const currentSelectKeys = ref<string[]>([]);
  //组织机构信息详情
  const currentOrgInfo = ref<any>(null);
  //是否显示编辑弹窗
  const showEdit = ref<boolean>(false);
  // 是否是更新组织机构
  const updateOrg = ref<boolean>(false);

  onMounted(() => {
    setTimeout(() => {
      if (props.orgList.length > 0) {
        currentSelectKeys.value = [props.orgList[0].id];
        UserApi.getOrgDetail({ orgId: currentSelectKeys.value[0] }).then((res) => {
          nextTick(() => {
            currentOrgInfo.value = res;
          });
        });
      }
    }, 200);
  });

  /**
   * 打开新增弹窗
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const openAdd = () => {
    currentOrgInfo.value = {};
    showEdit.value = true;
    updateOrg.value = false;
  };

  /**
   * 打开编辑弹窗
   *
   * @author fengshuonane
   * @date 2021/4/2 17:03
   */
  const openEdit = () => {
    if (currentSelectKeys.value.length == 0) return message.error('请选择一个公司或部门');
    showEdit.value = true;
    updateOrg.value = true;
    emits('closeCompanyEdit');
  };

  /**
   * 删除组织机构
   *
   * @author fengshuonan
   * @date 2021/4/12 14:22
   */
  const deleteOrg = async () => {
    showEdit.value = false;
    emits('closeCompanyEdit');
    if (currentSelectKeys.value.length <= 0) {
      message.warn('请选择一个公司');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: '确定要删除选中的组织机构吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: async () => {
        message.success('删除公司成功');
        await UserApi.deleteOrg({ orgId: currentSelectKeys.value[0] });
        reload();
      },
    });
  };

  // 选中的节点
  const selectNode = (selectedKeys) => {
    emits('update:currentSelectOrgId', selectedKeys[0]);
    emits('changeNodeSelect');
    if (currentSelectKeys.value && currentSelectKeys.value.length > 0) {
      UserApi.getOrgDetail({ orgId: currentSelectKeys.value[0] }).then((res) => {
        nextTick(() => {
          currentOrgInfo.value = res;
        });
      });
    }
  };

  const reload = () => {
    emits('updateOrgList');
  };

  defineExpose({
    showEdit,
  });
</script>
