<template>
  <a-modal
    :width="800"
    :visible="visible"
    :confirm-loading="loading"
    :forceRender="true"
    :maskClosable="false"
    title="新建数据源"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @ok="save"
    @close="updateVisible(false)"
  >
    <a-form
      layout="horizontal"
      ref="formRef"
      :model="state.form"
      :rules="rules"
      :label-col="{ md: { span: 4 }, sm: { span: 24 } }"
      :wrapper-col="{ md: { span: 20 }, sm: { span: 24 } }"
    >
      <a-form-item label="数据库名称:" name="dbName">
        <a-input
          v-model:value="state.form.dbName"
          placeholder="请输入数据库名称"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item label="JDBC驱动:" name="jdbcDriver">
        <a-select v-model:value="state.form.jdbcDriver" defaultActiveFirstOption>
          <a-select-option value="com.mysql.cj.jdbc.Driver">Mysql</a-select-option>
          <a-select-option value="oracle.jdbc.OracleDriver">Oracle</a-select-option>
          <a-select-option value="net.sourceforge.jtds.jdbc.Driver">Sql Server</a-select-option>
          <a-select-option value="org.postgresql.Driver">Postgre SQL</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="JDBC账号:" name="username">
        <a-input
          v-model:value="state.form.username"
          placeholder="请输入JDBC账号"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item label="JDBC密码:" name="password">
        <a-input
          v-model:value="state.form.password"
          placeholder="请输入JDBC密码"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item label="JDBC URL:" name="jdbcUrl">
        <a-input
          v-model:value="state.form.jdbcUrl"
          placeholder="请输入URL"
          allow-clear
          autocomplete="off"
        />
        <a-tooltip v-for="(url, index) in urlList" :key="index + 'url'">
          <template #title>{{ url.title }}</template>
          <a-tag class="urltag" @click="urlClick(url.title)">{{ url.name }}</a-tag>
        </a-tooltip>
      </a-form-item>

      <a-form-item label="数据源备注:" name="remarks">
        <a-input
          v-model:value="state.form.remarks"
          placeholder="请输入数据源备注"
          allow-clear
          autocomplete="off"
        />
      </a-form-item>
    </a-form>

    <template #extra>
      <a-button type="primary" @click="save" :loading="loading">确定</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, toRefs, reactive, watch, nextTick, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { DataSourceApi } from '/@/api/system/operation/DataSourceApi';

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
    form: {},
  });

  // 提交状态
  const loading = ref<boolean>(false);
  //   是否是修改
  const isUpdate = ref<boolean>(false);

  // ref
  const formRef = ref(null);
  //   地址列表
  const urlList = ref<string>([
    {
      title:
        'jdbc:mysql://127.0.0.1:3306/guns?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=CONVERT_TO_NULL&useSSL=false&serverTimezone=CTT',
      name: 'mysql',
    },
    {
      title: 'jdbc:oracle:thin:@127.0.0.1:1521:ORCLCDB',
      name: 'oracle',
    },
    {
      title: 'jdbc:jtds:sqlserver://127.0.0.1:1433;DatabaseName=guns',
      name: 'sql server',
    },
    {
      title: 'jdbc:postgresql://127.0.0.1:5432/guns',
      name: 'postgre sql',
    },
  ]);
  // 验证规则
  const rules = reactive({
    dbName: [{ required: true, message: '请输入数据源名称', type: 'string', trigger: 'blur' }],
    jdbcDriver: [{ required: true, message: '请选择数据源驱动', type: 'string', trigger: 'blur' }],
    username: [{ required: true, message: '请输入jdbc账号', type: 'string', trigger: 'blur' }],
    password: [{ required: true, message: '请输入jdbc密码', type: 'string', trigger: 'blur' }],
    jdbcUrl: [{ required: true, message: '请输入url', type: 'string', trigger: 'blur' }],
  });

  watch(
    () => props.data,
    (val) => {
      state.form = {};
      if (formRef.value) {
        formRef.value.clearValidate();
      }
    },
  );

  /**
   * 保存和编辑
   *
   * @author fengshuonan
   * @date 2021/4/8 13:33
   */
  const save = () => {
    // 校验表单
    formRef.value.validate().then((valid) => {
      if (valid) {
        // 修改加载框为正在加载
        loading.value = true;

        // 执行编辑或修改
        DataSourceApi.add(state.form)
          .then((result) => {
            // 移除加载框
            loading.value = false;

            // 提示添加成功
            message.success(result.message);

            // 如果是新增，则form表单置空
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
   * 更新编辑界面弹框是否显示
   *
   * @author fengshuonan
   * @date 2021/6/14 20:24
   */
  const updateVisible = (value: boolean) => {
    emits('update:visible', value);
  };

  /**
   * 点击jdbc url实现添加路径
   */
  const urlClick = (url: string) => {
    state.form.jdbcUrl = url;
  };
</script>
