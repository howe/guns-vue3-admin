<template>
  <div class="guns-body guns-body-card">
    <a-row :gutter="16">
      <a-col :lg="6" :md="8" :sm="24" :xs="24">
        <a-card :bordered="false" class="table-height">
          <div class="ele-text-center">
            <div class="user-info-avatar-group" @click="showCropper = true">
              <a-avatar :size="110" :src="loginUser?.avatar" />
              <upload-outlined class="user-info-avatar-icon" />
            </div>
            <h1>{{ loginUser?.realName }}</h1>
          </div>
          <div class="user-info-list">
            <div class="ele-cell">
              <user-outlined />
              <div class="ele-cell-content">stylefeng开源技术</div>
            </div>
            <div class="ele-cell">
              <home-outlined />
              <div class="ele-cell-content">某某公司 - 某某事业群 - 某某技术部</div>
            </div>
            <div class="ele-cell">
              <environment-outlined />
              <div class="ele-cell-content">中国 • 北京</div>
            </div>
          </div>
          <a-divider dashed />
          <h6>标签</h6>
          <div class="user-info-tags">
            <a-tag>Guns</a-tag>
            <a-tag>Roses</a-tag>
            <a-tag>Spring Boot</a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :lg="18" :md="16" :sm="24" :xs="24">
        <a-card :bordered="false" class="user-info-tabs table-height">
          <a-tabs v-model:active-key="active" size="large">
            <a-tab-pane tab="基本信息" key="info">
              <a-form
                ref="formRef"
                :model="form"
                :rules="rules"
                :label-col="{ md: { span: 6 }, sm: { span: 24 } }"
                :wrapper-col="{ md: { span: 18 }, sm: { span: 24 } }"
              >
                <a-form-item label="账号:" name="account">
                  <a-input
                    v-model:value="form.account"
                    placeholder="请输入账号"
                    allow-clear
                    disabled
                  />
                </a-form-item>
                <a-form-item label="性别:" name="sex">
                  <a-select v-model:value="form.sex" placeholder="请选择性别" allow-clear>
                    <a-select-option value="M">男</a-select-option>
                    <a-select-option value="F">女</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="邮箱:" name="email">
                  <a-input v-model:value="form.email" placeholder="请输入邮箱" allow-clear />
                </a-form-item>
                <a-form-item label="姓名:" name="realName">
                  <a-input v-model:value="form.realName" placeholder="请输入个人简介" />
                </a-form-item>
                <a-form-item label="生日:" name="birthday">
                  <a-date-picker
                    v-model:value="form.birthday"
                    format="YYYY-MM-DD"
                    valueFormat="YYYY-MM-DD"
                    style="width: 399px"
                  />
                </a-form-item>
                <a-form-item label="电话:" name="phone">
                  <a-input v-model:value="form.phone" placeholder="请输入电话" allow-clear />
                </a-form-item>
                <a-form-item :wrapper-col="{ md: { offset: 6 } }">
                  <a-button type="primary" @click="save" :loading="loading">
                    {{ loading ? '保存中..' : '保存更改' }}
                  </a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane tab="账号绑定" key="account">
              <div class="user-account-list">
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保手机</div>
                    <div class="ele-cell-desc">已绑定手机：138****0000</div>
                  </div>
                  <a>去修改</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保邮箱</div>
                    <div class="ele-cell-desc">已绑定邮箱：sn93@qq.com</div>
                  </div>
                  <a>去修改</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保问题</div>
                    <div class="ele-cell-desc">未设置密保问题</div>
                  </div>
                  <a>去设置</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <qq-outlined class="user-account-icon" />
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定QQ</div>
                    <div class="ele-cell-desc">当前未绑定QQ账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <wechat-outlined class="user-account-icon" />
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定微信</div>
                    <div class="ele-cell-desc">当前未绑定绑定微信账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
                <a-divider />
                <div class="ele-cell">
                  <alipay-outlined class="user-account-icon" />
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定支付宝</div>
                    <div class="ele-cell-desc">当前未绑定绑定支付宝账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
    <!-- 头像裁剪弹窗 -->
    <cropper-modal
      v-model:visible="showCropper"
      :src="loginUser?.avatar"
      :to-blob="true"
      @done="onCrop"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  import useFormData from '/@/utils/common/use-form-data';
  import { emailReg } from '/@/utils/common/validate';
  import { PersonInfoApi } from '/@/api/personInfo/PersonInfoApi';
  import { FileApi } from '/@/api/system/operation/FileApi';
  import { useUserStore } from '/@/store/modules/user';
  import CropperModal from '/@/components/PictureCropper/index.vue';
  import { SysUserRequest } from '/@/api/system/user/model/UserModel';

  // tab页选中
  const active = ref<string>('info');

  // 表单实例
  const formRef = ref<FormInstance | null>(null);

  // 表单数据
  const { form, assignFormFields } = useFormData<SysUserRequest>({
    userId: undefined,
    account: undefined,
    sex: undefined,
    email: undefined,
    realName: undefined,
    birthday: undefined,
    phone: undefined,
  });

  // 表单验证规则
  const rules = reactive<Record<string, Rule[]>>({
    realName: [{ required: true, message: '请输入姓名', type: 'string', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', type: 'string', trigger: 'blur' }],
    email: [
      { required: true, message: '请输入邮箱', type: 'string', trigger: 'blur' },
      {
        pattern: emailReg,
        message: '邮箱格式不正确',
        type: 'string',
        trigger: 'blur',
      },
    ],
  });

  // 保存按钮loading
  const loading = ref<boolean>(false);
  // 是否显示裁剪弹窗
  const showCropper = ref<boolean>(false);

  onMounted(async () => {
    let result = await PersonInfoApi.getCurrentLoginUserInfo();
    assignFormFields(result);
  });

  const userStore = useUserStore();
  // 用户信息
  const loginUser = computed(() => {
    return userStore.userInfo;
  });

  /**
   * 更新个人信息
   *
   * @author fengshuonan
   * @date 2021/4/13 17:50
   */
  const save = () => {
    if (!formRef.value) {
      return;
    }
    formRef.value
      .validate()
      .then(async () => {
        loading.value = true;
        // 更新个人信息
        const result = await PersonInfoApi.updateUserInfo(form);
        updateLoginUser(form);
        loading.value = false;
        // 提示更新成功
        message.success(result.message);
      })
      .catch(() => {});
  };

  /**
   * 头像裁剪完成回调
   *
   * @author fengshuonan
   * @date 2021/4/13 17:50
   */
  const onCrop = async (blob) => {
    // blob转base64
    let reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      // loginUser.value.avatar = reader.result;
      updateLoginUser({ avatar: reader.result });
    };

    // 关闭剪裁窗口
    showCropper.value = false;

    // 调用更新头像的接口
    const formData = new FormData();
    formData.append('file', blob, 'avatar.jpg');
    formData.append('secretFlag', 'Y');

    // 更新头像
    const uploadResult = await FileApi.commonUpload(formData);
    const result = await PersonInfoApi.updateAvatar({ avatar: uploadResult.data.fileId });
    message.success(result.message);
  };

  /**
   * 修改登录用户信息
   * @param obj
   */
  const updateLoginUser = (obj: Record<string, any>) => {
    let target = { ...loginUser.value };
    Object.keys(target).forEach((key) => {
      target[key] = obj[key];
    });
    userStore.setUserInfo(target);
  };
</script>

<style scoped lang="less">
  .ele-text-center {
    text-align: center;
  }
  .ant-divider-horizontal {
    margin: 0;
  }
  /* 单元格 */
  .ele-cell {
    display: flex;
    &:not(.ele-cell-align-top) {
      align-items: center;
    }

    &.ele-cell-align-bottom {
      align-items: flex-end;
    }

    & > .ele-cell-content {
      flex: 1;
      box-sizing: border-box;
    }

    & > * + .ele-cell-content {
      padding-left: 10px;
    }

    .ele-cell-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 15px;
    }

    .ele-cell-desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 13px;
      margin-top: 4px;
    }
  }
  /* 用户资料卡片 */
  .user-info-avatar-group {
    margin: 16px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  .user-info-avatar-group .user-info-avatar-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 30px;
    display: none;
    z-index: 2;
  }

  .user-info-avatar-group:hover .user-info-avatar-icon {
    display: block;
  }

  .user-info-avatar-group:hover:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .user-info-avatar-group + h1 {
    margin-bottom: 8px;
  }

  /* 用户信息列表 */
  .user-info-list {
    margin: 52px 0 32px 0;
  }

  .user-info-list .ele-cell + .ele-cell {
    margin-top: 16px;
  }

  .user-info-list + .ant-divider {
    margin-bottom: 16px;
  }

  /* 用户标签 */
  .user-info-tags {
    margin: 16px 0 4px 0;
  }

  .user-info-tags .ant-tag {
    margin: 0 12px 8px 0;
  }

  /* 右侧卡片 */
  .user-info-tabs :deep(.ant-card-body) {
    padding: 0;
  }

  .user-info-tabs :deep(.ant-tabs-tab) {
    padding-left: 4px;
    padding-right: 4px;
    margin: 0 12px 0 28px !important;
  }

  .user-info-tabs .ant-form {
    max-width: 580px;
    margin-top: 20px;
    padding: 0 24px;
  }

  /* 用户账号绑定列表 */
  .user-account-list {
    margin-bottom: 27px;
  }

  .user-account-list > .ele-cell {
    padding: 18px 34px;
  }

  .user-account-list .user-account-icon {
    color: #fff;
    padding: 8px;
    font-size: 26px;
    border-radius: 50%;
  }

  .user-account-list .user-account-icon.anticon-qq {
    background: #3492ed;
  }

  .user-account-list .user-account-icon.anticon-wechat {
    background: #4daf29;
  }

  .user-account-list .user-account-icon.anticon-alipay {
    background: #1476fe;
  }
</style>
