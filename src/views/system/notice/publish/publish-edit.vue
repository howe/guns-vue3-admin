<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="1000"
      :visible="visible"
      title="修改通知"
      @close="updateVisible(false)"
      v-if="isUpdate"
    >
      <publish-form
        v-model:form="state.form"
        ref="formDataRef"
        :isUpdate="isUpdate"
        v-model:targetKeys="targetKeys"
        :userList="userList"
        @handleChange="handleChange"
      ></publish-form>
      <template #extra>
        <a-button type="primary" @click="save" :loading="loading">确定</a-button>
      </template>
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="1000"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建通知"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <publish-form
        v-model:form="state.form"
        ref="formDataRef"
        :isUpdate="isUpdate"
        v-model:targetKeys="targetKeys"
        :userList="userList"
        @handleChange="handleChange"
      ></publish-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { message } from 'ant-design-vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import PublishApi from '/@/api/system/notice/PublishApi';
  import { UserApi } from '/@/api/system/user/UserApi';
  import PublishForm from './publish-form.vue';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    data?: Object;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const state = reactive({
    // 表单数据
    form: {
      // all 或者是 用户id的集合逗号分割
      noticeScope: '',
      noticeTitle: '',
      noticeSummary: '',
      priorityLevel: '',
      noticeBeginTime: '',
      noticeEndTime: '',
      noticeContent: '',
    },
  });

  // 提交状态
  const loading = ref<boolean>(false);

  // 是否是修改
  const isUpdate = ref<boolean>(false);

  // 选中的人
  const targetKeys = ref<any>([]);

  // 用户列表
  const userList = ref<string[]>([]);

  // ref
  const formDataRef = ref(null);

  watch(
    () => props.data,
    (val) => {
      if (val) {
        state.form = Object.assign({}, props.data);
        isUpdate.value = true;
      } else {
        state.form = {};
        isUpdate.value = false;
      }

      // 如果是新增，则置空输入项
      if (!isUpdate.value) {
        state.form.noticeContent = '';
        state.form.noticeScopeType = 'all';
        targetKeys.value = [];
      }

      // 初始化选项和通知的人范围
      if (isUpdate.value) {
        if (props.data.noticeScope === 'all') {
          state.form.noticeScopeType = 'all';
        } else if (!props.data.noticeScope.includes(',')) {
          state.form.noticeScopeType = 'part';
          targetKeys.value = [props.data.noticeScope];
        } else if (props.data.noticeScope.includes(',')) {
          state.form.noticeScopeType = 'part';
          targetKeys.value = props.data.noticeScope.split(',');
        }
      }
    },
  );

  /**
   * 获取通知的用户列表
   *
   * @author fengshuonan
   * @date 2021/6/14 20:23
   */
  const getUserList = () => {
    UserApi.getUserList({}).then((res) => {
      userList.value = res.rows;
      userList.value = userList.value.map((item) => ({
        key: item.userId,
        title: item.nickName,
        description: item.account,
        disabled: false,
      }));
    });
  };

  /**
   * 选中人员时的监听
   *
   * @author fengshuonan
   * @date 2021/6/14 20:23
   */
  const handleChange = (arr: string[]) => {
    targetKeys.value = arr;
  };

  /**
   * 发布通知
   *
   * @author fengshuonan
   * @date 2021/6/14 20:24
   */
  const save = async () => {
    loading.value = true;

    // 如果noticeScopeType是all，则noticeScope参数填写all
    if (state.form.noticeScopeType === 'all') {
      state.form.noticeScope = 'all';
    } else {
      // 如果noticeScopeType是part，则用逗号分割每个人的id
      state.form.noticeScope = targetKeys.value.join(',');
    }

    try {
      let res;
      if (isUpdate.value) {
        res = await PublishApi.editPublish(state.form);
      } else {
        res = await PublishApi.addPublish(state.form);
      }

      loading.value = false;
      message.success(res.message);
      if (!isUpdate.value) {
        state.form = {};
      }
      updateVisible(false);
      emits('done');
    } catch (error) {
      loading.value = false;
    }
  };

  /**
   * 更新编辑界面弹框是否显示
   *
   * @author fengshuonan
   * @date 2021/6/14 20:24
   */
  const updateVisible = (value: boolean) => {
    emits('update:visible', value);
  };

  defineExpose({
    getUserList,
  });
</script>
