<template>
  <a-spin :spinning="loading">
    <div class="ele-body" style="background-color: #fafafa">
      <a-card>
        <a-row>
          <a-col :span="16" :offset="4" class="content">
            <div class="content-top">
              <h5>首次安装程序</h5>
            </div>
            <a-form :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
              <a-form-item v-for="(item, index) in configList" :key="index">
                <template #label>
                  <a-tooltip>
                    <template #title>{{ item.configDescription }}</template>
                    {{ item.configName }}
                  </a-tooltip>
                </template>
                <a-input
                  :name="item.configCode"
                  v-model:value="form[item.configCode]"
                  :placeholder="item.configDescription"
                />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">提交</a-button>
                <a-button @click="onReset" style="margin-left: 10px">重置</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </a-spin>
</template>

<script name="InitPage" lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';
  import { message } from 'ant-design-vue';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';
  import { ConfigInitItem, ConfigInitRequest } from '/@/api/system/basedata/model/SysConfigModel';

  const userStore = useUserStore();

  // 页面加载中标识
  const loading = ref<boolean>(true);
  // 表单数据
  const form = reactive({});
  // 系统初始化的系统配置列表
  const configList = ref<ConfigInitItem[]>([]);

  onMounted(async () => {
    // 判断系统是否已经初始化过
    let initConfigFlag = await SysConfigApi.getInitConfigFlag();

    // 如果已经初始化过，则跳转到首页
    if (initConfigFlag) {
      router.push(userStore?.userInfo?.homePath ?? '/');
      return;
    }

    // 关闭加载中
    loading.value = false;

    // 获取需要初始化的系统配置
    configList.value = await SysConfigApi.getInitConfigList();
    for (const item of configList.value) {
      // 替换主机名为url的访问地址
      if (item.configCode === 'SYS_SERVER_DEPLOY_HOST') {
        form[item.configCode] = item.configValue?.replace(
          'localhost:8080',
          window.location.host + '/api',
        );
      } else if (item.configCode === 'WEB_SOCKET_WS_URL') {
        form[item.configCode] = item.configValue?.replace(
          'localhost:8080',
          window.location.host + '/api',
        );
      } else {
        form[item.configCode] = item.configValue;
      }
    }
  });

  // 提交初始化配置
  const onSubmit = async () => {
    let param: ConfigInitRequest = {};
    param.sysConfigs = form;
    let result = await SysConfigApi.initConfig(param);
    message.success(result.message);

    // 跳转到首页
    router.push(userStore?.userInfo?.homePath ?? '/');
  };

  // 重置数据
  const onReset = async () => {
    // 加载中标识
    loading.value = true;

    // 获取需要初始化的系统配置
    configList.value = await SysConfigApi.getInitConfigList();

    // 加载中标识关闭
    loading.value = false;

    for (const item of configList.value) {
      form[item.configCode] = item.configValue;
    }
  };
</script>

<style scoped>
  .content {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .content-top {
    text-align: center;
    height: 32px;
    line-height: 32px;
    background: #ccc;
    margin-bottom: 10px;
  }
</style>
