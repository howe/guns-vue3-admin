<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="{ md: { span: 7 }, sm: { span: 24 } }"
    :wrapper-col="{ md: { span: 17 }, sm: { span: 24 } }"
  >
    <a-row :gutter="16">
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item label="上级菜单" name="menuParentId">
          <a-tree-select
            v-model:value="form.menuParentId"
            style="width: 100%"
            :tree-data="menuList"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择上级菜单"
            :fieldNames="{ children: 'children', label: 'title', key: 'id', value: 'id' }"
            allow-clear
            tree-default-expand-all
          />
        </a-form-item>
        <a-form-item label="菜单编号" name="menuCode">
          <a-input allow-clear placeholder="请输入菜单编号" v-model:value="form.menuCode" />
        </a-form-item>
        <a-form-item label="菜单名称" name="menuName">
          <a-input allow-clear placeholder="请输入菜单名称" v-model:value="form.menuName" />
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item label="所属应用:" name="appCode">
          <a-select
            show-search
            v-model:value="form.appCode"
            placeholder="请选择所属应用"
            style="width: 100%"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            allow-clear
          >
            <a-select-option v-for="item in appList" :key="item.appCode">
              {{ item.appName }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="打开方式">
          <a-radio-group v-model:value="form.antdvLinkOpenType">
            <a-radio :value="0">组件</a-radio>
            <a-radio :value="1">内链</a-radio>
            <a-radio :value="2">外链</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item>
          <template #label>
            <a-tooltip
              title="菜单的显示类型，目前Guns系统分前台菜单和后台菜单，通过右上角个人头像图标进行切换。前台菜单：可以添加一些用户的业务菜单，后台菜单：例如Guns的角色管理，菜单管理，定时任务等这些可以设置为后台菜单。"
            >
              <question-circle-outlined style="vertical-align: -2px; margin-right: 4px" />
            </a-tooltip>
            <span>显示类型</span>
          </template>
          <a-radio-group v-model:value="form.antdvFrontType">
            <a-radio :value="1">前台</a-radio>
            <a-radio :value="2">后台</a-radio>
            <a-radio :value="3">都显示</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <div style="margin-bottom: 22px">
      <a-divider />
    </div>
    <a-row :gutter="16">
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item label="菜单图标">
          <icon-picker v-model:value="form.antdvIcon" placeholder="请选择菜单图标"></icon-picker>
        </a-form-item>

        <a-form-item name="antdvRouter">
          <template #label>
            <a-tooltip
              v-if="form.antdvLinkOpenType === 2"
              title="需要以`http://`、`https://`、`//`开头"
            >
              <question-circle-outlined style="vertical-align: -2px; margin-right: 4px" />
            </a-tooltip>
            <a-tooltip v-if="form.antdvLinkOpenType !== 2" title="路由地址必须以`/`开头">
              <question-circle-outlined style="vertical-align: -2px; margin-right: 4px" />
            </a-tooltip>
            <span>{{ form.antdvLinkOpenType === 2 ? '外链地址' : '路由地址' }}</span>
          </template>
          <a-input
            allow-clear
            v-model:value="form.antdvRouter"
            :placeholder="form.antdvLinkOpenType === 2 ? '请输入外链地址' : '请输入路由地址'"
          />
        </a-form-item>
        <a-form-item
          name="antdvComponent"
          v-if="form.antdvLinkOpenType === 0 || form.antdvLinkOpenType === 1"
        >
          <template #label>
            <a-tooltip
              v-if="form.antdvLinkOpenType === 1"
              title="需要以`http://`、`https://`、`//`开头"
            >
              <question-circle-outlined style="vertical-align: -2px; margin-right: 4px" />
            </a-tooltip>
            <a-tooltip
              v-if="form.antdvLinkOpenType === 0"
              title="组件路径对应`views`目录下具体文件的路径，例如 /personal/info 对应个人信息界面的组件路径。(一级菜单且包含子菜单可为空，组件路径不能有中横线-，可以有下划线_）"
            >
              <question-circle-outlined style="vertical-align: -2px; margin-right: 4px" />
            </a-tooltip>
            <span>{{ form.antdvLinkOpenType === 1 ? '内链地址' : '组件路径' }}</span>
          </template>
          <a-input
            allow-clear
            v-model:value="form.antdvComponent"
            :disabled="form.antdvLinkOpenType === 2"
            :placeholder="form.antdvLinkOpenType === 1 ? '请输入内链地址' : '请输入组件路径'"
          />
        </a-form-item>
        <a-form-item name="antdvActiveUrl" v-if="form.antdvLinkOpenType === 0">
          <template #label>
            <a-tooltip title="打开本界面时激活的菜单路由，这里需要填写需要激活的菜单的路由地址">
              <question-circle-outlined style="vertical-align: -2px; margin-right: 4px" />
            </a-tooltip>
            <span>激活地址</span>
          </template>
          <a-input
            allow-clear
            v-model:value="form.antdvActiveUrl"
            placeholder="例如: /system/user"
          />
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item label="排序号:" name="menuSort">
          <a-input-number
            :min="0"
            class="ele-fluid"
            placeholder="请输入排序号"
            v-model:value="form.menuSort"
          />
        </a-form-item>
        <a-form-item label="是否可见">
          <a-switch checked-children="是" un-checked-children="否" v-model:checked="form.isShow" />
          <a-tooltip title="选择不可见只注册路由不显示在侧边栏，比如添加页面应该选择不可见">
            <question-circle-outlined style="vertical-align: -3px; margin-left: 16px" />
          </a-tooltip>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import IconPicker from '/@/components/icon-picker/main.vue';

  const props = defineProps<{
    form: Object;
    // 上级列表
    menuList: Array;
    // 所属应用列表
    appList: Array;
  }>();

  // 验证规则
  const rules = reactive({
    menuParentId: [{ required: true, type: 'string', message: '请选择上级菜单', trigger: 'blur' }],
    appCode: [{ required: true, type: 'string', message: '请选择所属应用', trigger: 'blur' }],
    menuCode: [{ required: true, type: 'string', message: '请输入菜单编码', trigger: 'blur' }],
    menuName: [{ required: true, type: 'string', message: '请输入菜单名', trigger: 'blur' }],
    menuSort: [{ required: true, type: 'number', message: '请输入排序号', trigger: 'blur' }],
  });
</script>

<style></style>
