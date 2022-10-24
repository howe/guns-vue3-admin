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

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import { SysConfigApi } from '/@/api/system/basedata/SysConfigApi';
  import { message } from 'ant-design-vue';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'InitPage',
    components: {},
    setup() {
      let data = reactive({
        // 页面加载中标识
        loading: true,
        // 表单数据
        form: {},
        // 系统初始化的系统配置列表
        configList: [],
      });

      const userStore = useUserStore();

      onMounted(async () => {
        // 判断系统是否已经初始化过
        let initConfigFlag = await SysConfigApi.getInitConfigFlag();

        // 如果已经初始化过，则跳转到首页
        if (initConfigFlag) {
          router.push(userStore?.userInfo?.homePath);
          return;
        }

        // 关闭加载中
        data.loading = false;

        // 获取需要初始化的系统配置
        data.configList = await SysConfigApi.getInitConfigList();
        for (const item of data.configList) {
          // 替换主机名为url的访问地址
          if (item.configCode === 'SYS_SERVER_DEPLOY_HOST') {
            data.form[item.configCode] = item.configValue.replace(
              'localhost:8080',
              window.location.host + '/api',
            );
          } else if (item.configCode === 'WEB_SOCKET_WS_URL') {
            data.form[item.configCode] = item.configValue.replace(
              'localhost:8080',
              window.location.host + '/api',
            );
          } else {
            data.form[item.configCode] = item.configValue;
          }
        }
      });

      // 提交初始化配置
      const onSubmit = async () => {
        let params = { sysConfigs: data.form };
        let result = await SysConfigApi.initConfig(params);
        message.success(result.message);

        // 跳转到首页
        router.push(userStore?.userInfo?.homePath);
      };

      // 重置数据
      const onReset = async () => {
        // 加载中标识
        data.loading = true;

        // 获取需要初始化的系统配置
        data.configList = await SysConfigApi.getInitConfigList();

        // 加载中标识关闭
        data.loading = false;

        for (const item of data.configList) {
          data.form[item.configCode] = item.configValue;
        }
      };

      return {
        ...toRefs(data),
        onSubmit,
        onReset,
      };
    },
  });
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
