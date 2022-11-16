<template>
  <div>
    <!-- 编辑 -->
    <common-drawer
      :width="1100"
      :visible="visible"
      title="修改菜单"
      v-if="isUpdate"
      @close="updateVisible(false)"
      :isShowTab="isShowTab"
      :activeKey="activeKey"
      :tabList="state.tabList"
      @tabChange="tabChange"
    >
      <!-- 基本信息 -->
      <menu-form
        v-model:form="state.form"
        :menuList="menuList"
        ref="formRef"
        :appList="appList"
        v-if="activeKey == '1'"
      ></menu-form>
      <!-- 按钮管理 -->
      <menu-button
        v-if="activeKey == '2'"
        :data="data"
        @openBindResource="openBindResource"
      ></menu-button>
      <!-- 权限管理 -->
      <menu-resource ref="resourceBindRef" v-if="activeKey == '3'" />
      <template #extra>
        <div style="height: 32px">
          <a-button type="primary" @click="save" :loading="loading" v-show="activeKey == '1'"
            >确定</a-button
          >
        </div>
      </template>
    </common-drawer>

    <!-- 新增 -->
    <a-modal
      :width="800"
      :visible="visible"
      :confirm-loading="loading"
      :forceRender="true"
      :maskClosable="false"
      title="新建菜单"
      :body-style="{ paddingBottom: '8px' }"
      @update:visible="updateVisible"
      @ok="save"
      v-else
      @close="updateVisible(false)"
    >
      <menu-form
        v-model:form="state.form"
        :menuList="menuList"
        ref="formRef"
        :appList="appList"
      ></menu-form>
    </a-modal>

    <!-- 按钮管理权限弹窗 -->
    <menu-resource ref="buttonResourceBindRef" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch, nextTick, onMounted } from 'vue';
  import CommonDrawer from '/@/components/CommonDrawer/index.vue';
  import { message } from 'ant-design-vue';
  import { MenuApi } from '/@/api/system/menu/MenuApi';
  import MenuForm from './menu-form.vue';
  import MenuButton from './components/button/menu-button.vue';
  import MenuResource from '/@/views/system/menu/components/resource/menu-resource.vue';

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean;
    // 修改回显的数据
    data?: Object;
    // 默认选中
    defaultKey: String;
  }>();

  const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'done'): void;
  }>();

  const state = reactive({
    form: {},
    // tab栏列表
    tabList: [
      {
        key: '1',
        name: '基本信息',
      },
      {
        key: '2',
        name: '按钮管理',
      },
      {
        key: '3',
        name: '绑定接口',
      },
    ],
  });

  // 提交状态
  const loading = ref<boolean>(false);
  // 是否是修改
  const isUpdate = ref<boolean>(false);
  // 菜单树
  const menuList = ref<string[]>([]);
  // 应用列表
  const appList = ref<string[]>([]);
  // tab默认选中
  const activeKey = ref<string>('1');

  // 是否显示tab栏
  const isShowTab = ref<boolean>(false);

  // ref
  const formRef = ref(null);
  const buttonResourceBindRef = ref(null);
  const resourceBindRef = ref(null);

  onMounted(async () => {
    isUpdate.value = props.data ? true : false;
    // 查询菜单节点
    menuList.value = await MenuApi.getMenuTree();

    // 查询应用
    appList.value = await MenuApi.getAppDropList();
    setData();
  });

  // 设置基础数据
  const setData = () => {
    if (props.data) {
      // 是否显示tab栏
      if (props.data.leafFlag) {
        isShowTab.value = true;
      } else {
        isShowTab.value = false;
      }
      tabChange(props.defaultKey);
    } else {
      state.form = {
        antdvLinkOpenType: 0,
        antdvFrontType: 1,
        isShow: true,
      };
    }
    if (activeKey.value == '1' && formRef.value && formRef.value.$refs.formRef) {
      formRef.value.$refs.formRef.clearValidate();
    }
  };

  watch(
    () => props.data,
    (val) => {
      isUpdate.value = props.data ? true : false;
      setData();
    },
  );

  // 打开按钮资源抽屉
  const openBindResource = (row: any) => {
    buttonResourceBindRef.value.openWindow('按钮名称：' + row.buttonName, 2, row.buttonId, true);
  };

  // tab切换
  const tabChange = (key: string) => {
    activeKey.value = key;
    if (key == '1') {
      state.form = Object.assign(props.data, {
        menuParentId: props.data.menuParentId === 0 ? null : props.data.menuParentId,
        antdvLinkOpenType: props.data.antdvLinkOpenType === null ? 0 : props.data.antdvLinkOpenType,
        isShow: props.data.antdvVisible === 'Y' ? true : false,
      });
    } else if (key == '2') {
    } else if (key == '3') {
      nextTick(() => {
        resourceBindRef.value.openWindow(
          '绑定接口资源：' + props.data.appName + '-' + props.data.menuName,
          1,
          props.data.menuId,
          false,
        );
      });
    }
  };

  /**
   * 保存和编辑菜单
   *
   * @author jiawei
   * @date 2021/4/8 12:00
   */
  const save = () => {
    // 校验表单
    formRef.value.$refs.formRef.validate().then((valid) => {
      if (valid) {
        // 校验内链/外链格式
        if (state.form.antdvLinkOpenType === 0) {
          if (!(state.form.antdvRouter && state.form.antdvRouter.startsWith('/'))) {
            message.error('路由地址格式错误');
            return;
          }
        } else if (state.form.antdvLinkOpenType === 1) {
          if (!(state.form.antdvRouter && state.form.antdvRouter.startsWith('/'))) {
            message.error('路由地址格式错误');
            return;
          }
          if (!isUrl(state.form.antdvComponent)) {
            message.error('内链格式错误');
            return;
          }
        } else if (state.form.antdvLinkOpenType === 2) {
          if (!isUrl(state.form.antdvRouter)) {
            message.error('外链格式错误');
            return;
          }
          state.form.antdvComponent = '';
        }

        // 是否可见
        state.form.visible = state.form.isShow ? 'Y' : 'N';

        // 修改加载框为正在加载
        loading.value = true;

        let result = null;

        // 执行编辑或修改菜单方法
        if (isUpdate.value) {
          //
          result = MenuApi.editMenu(state.form);
        } else {
          result = MenuApi.addMenu(state.form);
        }
        result
          .then((result) => {
            // 移除加载框
            loading.value = false;

            // 提示添加成功
            message.success(result.message);

            // 如果是新增菜单，则form表单置空
            if (!isUpdate.value) {
              state.form = {};
            }
            // 关闭弹框，通过控制visible的值，传递给父组件
            updateVisible(false);
            // 触发父组件done事件
            emits('done');
          })
          .catch(() => {
            loading.value = false;
          });
      }
    });
  };

  /**
   * 更新编辑菜单界面的弹框是否显示
   *
   * @param value true-显示，false-隐藏
   * @author jiawei
   * @date 2021/4/7 12:00
   */
  const updateVisible = (value: boolean) => {
    emits('update:visible', value);
  };

  /**
   * 判断是否是网址
   *
   * @author fengshuonan
   * @date 2022/5/31 11:21
   */
  const isUrl = (url: string) => {
    return (
      url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('://'))
    );
  };
</script>
