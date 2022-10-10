<template>
  <div>
    <div class="card-title card-title-background">基础信息</div>
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ md: { span: 7 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
    >
      <a-row :gutter="8">
        <a-col :md="12" :sm="24" :xs="24">
          <a-form-item label="账号:" name="account">
            <a-input v-model:value="form.account" placeholder="请输入账号" allow-clear autocomplete="off" />
          </a-form-item>
          <a-form-item v-if="!isUpdate" label="登录密码:" name="password">
            <a-input-password v-model:value="form.password" placeholder="请输入登录密码" autocomplete="new-password" />
          </a-form-item>
          <a-form-item v-if="!isUpdate" label="确认密码:" name="repeatPassword">
            <a-input-password v-model:value="form.repeatPassword" placeholder="请输入确认密码" autocomplete="off" />
          </a-form-item>
          <a-form-item label="机构:" name="orgId">
            <a-tree-select
              v-model:value="form.orgId"
              style="width: 100%"
              :tree-data="orgList"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择上级机构"
              :fieldNames="{ children: 'children', label: 'title', key: 'id', value: 'id' }"
              allow-clear
              tree-default-expand-all
            />
          </a-form-item>
          <a-form-item label="职位:" name="positionId">
            <a-select
              show-search
              v-model:value="form.positionId"
              placeholder="请选择职务"
              style="width: 100%"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              allow-clear
            >
              <a-select-option v-for="item in positionList" :key="item.positionId">
                {{ item.positionName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="手机号:" name="phone">
            <a-input v-model:value="form.phone" placeholder="请输入手机号" allow-clear />
          </a-form-item>
          <a-form-item label="邮箱:" name="email" v-if="isUpdate">
            <a-input v-model:value="form.email" placeholder="请输入邮箱" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24" :xs="24">
          <a-form-item label="姓名:" name="realName">
            <a-input v-model:value="form.realName" placeholder="请输入姓名" allow-clear />
          </a-form-item>
          <a-form-item label="昵称:" name="nickName">
            <a-input v-model:value="form.nickName" placeholder="请输入昵称" allow-clear />
          </a-form-item>
          <a-form-item label="性别:" name="sex">
            <a-select v-model:value="form.sex" placeholder="请选择性别" allow-clear>
              <a-select-option value="M">男</a-select-option>
              <a-select-option value="F">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="出生日期:" name="birthday">
            <a-date-picker v-model:value="form.birthday" value-format="YYYY-MM-DD" placeholder="请选择出生日期" class="ele-fluid" />
          </a-form-item>
          <a-form-item label="邮箱:" name="email" v-if="!isUpdate">
            <a-input v-model:value="form.email" placeholder="请输入邮箱" allow-clear autocomplete="off" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <div class="card-title card-title-background">详细信息</div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { UserApi } from '/@/api/system/user/UserApi';
export default defineComponent({
  props: {
    form: {
      type: Object,
      default: {}
    },
    rules: Object,
    // 组织机构列表
    orgList: Array,
    // 新增还是编辑
    isUpdate: Boolean
  },
  setup() {
    const state = reactive({
      // 职位列表
      positionList: []
    });
    onMounted(() => {
      getPositionList();
    });

    const getPositionList = async () => {
      state.positionList = await UserApi.getPositionDropList();
    };

    return {
      ...toRefs(state),
      getPositionList
    };
  }
});
</script>

<style lang="less" scoped>
.card-title {
  border-left: 5px solid;
  border-color: #2a7dc9;
  padding-left: 10px;
}

.card-title-background {
  background-color: #f5f5f5;
  height: 2em;
  line-height: 2em;
  margin-bottom: 2em;
}
</style>
