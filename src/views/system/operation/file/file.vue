<template>
  <div class="guns-body">
    <!-- 搜索表单 -->
    <div class="block-interval">
      <a-card :bordered="false">
        <a-form layout="inline" :model="where">
          <a-row>
            <a-form-item label="存储位置:">
              <a-select v-model:value="where.fileLocation" style="width: 205px">
                <a-select-option value="">全部</a-select-option>
                <a-select-option :value="1">阿里云</a-select-option>
                <a-select-option :value="2">腾讯云</a-select-option>
                <a-select-option :value="3">minio</a-select-option>
                <a-select-option :value="4">本地</a-select-option>
                <a-select-option :value="5">数据库</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="文件名称:">
              <a-input v-model:value.trim="where.fileOriginName" allow-clear />
            </a-form-item>
            <a-form-item class="ele-text-center">
              <a-space>
                <a-button type="primary" @click="reload">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-row>
        </a-form>
      </a-card>
    </div>

    <!-- 表格 -->
    <div>
      <a-card :bordered="false" class="table-height">
        <BasicTable
          :canResize="false"
          ref="tableRef"
          :api="FileApi.findPage"
          :where="where"
          :columns="columns"
          showTableSetting
          rowKey="fileId"
          :rowSelection="{
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
          }"
        >
          <!-- table上边工具栏 -->
          <template #toolbar>
            <div class="table-toolbar">
              <a-space>
                <a-upload
                  name="file"
                  :multiple="true"
                  :action="fileUploadUrl"
                  :headers="headers"
                  @change="afterUpload"
                  :showUploadList="false"
                >
                  <a-button type="primary">
                    <template #icon>
                      <CloudUploadOutlined />
                    </template>
                    <span>上传文件</span>
                  </a-button>
                </a-upload>
                <a-upload
                  name="file"
                  :multiple="true"
                  :action="FileUploadUrlToDb"
                  :headers="headers"
                  :before-upload="beforeUpload"
                  @change="afterUpload"
                  :showUploadList="false"
                >
                  <a-button>
                    <template #icon>
                      <CloudUploadOutlined />
                    </template>
                    <span>上传到数据库（1MB限制）</span>
                  </a-button>
                </a-upload>
              </a-space>
            </div>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'fileOriginName'">
              <a @click="detail(record)">{{ record.fileOriginName }}</a>
            </template>

            <!-- table列表状态栏 -->
            <!-- table存储位置列 -->
            <template v-if="column.key === 'fileLocation'">
              <a-tag color="orange" v-if="record.fileLocation === 1">阿里云</a-tag>
              <a-tag color="blue" v-if="record.fileLocation === 2">腾讯云</a-tag>
              <a-tag color="red" v-if="record.fileLocation === 3">minio</a-tag>
              <a-tag color="green" v-if="record.fileLocation === 4">本地</a-tag>
              <a-tag color="cyan" v-if="record.fileLocation === 5">数据库</a-tag>
            </template>

            <!-- 图片预览 -->
            <template v-else-if="column.key === 'filePreview'">
              <a-image :width="30" :src="record.fileUrl" />
            </template>

            <!-- table操作栏按钮 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="download(record)">下载</a>
                <a-divider type="vertical" />
                <a @click="detail(record)">详情</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除此文件吗？" @confirm="remove(record)">
                  <a class="guns-text-danger">删除</a>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </BasicTable>
      </a-card>
    </div>

    <!-- 编辑弹窗 -->
    <file-detail v-model:visible="showEdit" :data="current" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { BasicColumn, BasicTable, TableActionType } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import FileDetail from './file-detail.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { FileApi, FileUploadUrl } from '/@/api/system/operation/FileApi';

  // 查询条件
  const where = reactive({
    fileLocation: '',
    fileOriginName: '',
  });

  // 表格配置
  const columns = ref<BasicColumn[]>([
    {
      title: '文件id',
      dataIndex: 'fileId',
    },
    {
      title: '文件名称',
      dataIndex: 'fileOriginName',
    },
    {
      title: '图片预览',
      key: 'filePreview',
      dataIndex: 'fileUrl',
    },
    {
      title: '存储位置',
      key: 'fileLocation',
      dataIndex: 'fileLocation',
    },
    {
      title: '是否机密',
      dataIndex: 'secretFlag',
      customRender: function ({ text }) {
        if ('Y' === text) {
          return '是';
        } else {
          return '否';
        }
      },
    },
    {
      title: '文件大小',
      dataIndex: 'fileSizeInfo',
    },
    {
      title: '文件后缀',
      dataIndex: 'fileSuffix',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      align: 'center',
    },
  ]);

  // 多选选中列表
  const checkedKeys = ref<Array<string | number>>([]);

  // 当前行数据
  const current = ref<any>(null);

  // 是否显示新增编辑弹框
  const showEdit = ref<boolean>(false);

  // 表格实例
  const tableRef = ref<Nullable<TableActionType>>(null);

  const userStore = useUserStore();

  // token
  const token = computed(() => {
    return userStore.getToken;
  });

  // 上传文件的url
  const fileUploadUrl = ref<string>(
    `${import.meta.env.VITE_GLOB_API_URL}${FileUploadUrl}?secretFlag=N`,
  );
  // 上传文件的url（上传到数据库）
  const FileUploadUrlToDb = ref<string>(
    `${import.meta.env.VITE_GLOB_API_URL}${FileUploadUrl}?secretFlag=N&fileLocation=5`,
  );
  const headers = reactive({
    Authorization: token.value,
  });

  /**
   * 点击查询
   * @author: nxy
   * @Date: 2022-10-12 09:38:18
   */
  const reload = () => {
    checkedKeys.value = [];
    tableRef.value?.reload({
      page: 1,
    });
  };

  /**
   * 点击重置
   * @author: nxy
   * @Date: 2022-10-12 09:38:29
   */
  const reset = () => {
    where.fileLocation = '';
    where.fileOriginName = '';
    reload();
  };

  /**
   * 删除单个
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const remove = async (row: any) => {
    const result = await FileApi.delete({ fileCode: row.fileCode });
    message.success(result.message);
    reload();
  };

  /**
   * 下载文件
   *
   * @author fengshuonan
   * @date 2021/4/12 22:11
   */
  const download = (row: any) => {
    FileApi.download({
      fileId: row.fileId,
      secretFlag: row.secretFlag,
      token: token.value,
    });
  };

  /**
   * 打开详情界面
   *
   * @author fengshuonan
   * @date 2021/4/12 22:29
   */
  const detail = (row: any) => {
    current.value = row;
    showEdit.value = true;
  };

  /**
   * 控制上传到数据库的图片不能超过1M
   *
   * @author fengshuonan
   * @date 2021/4/12 22:29
   */
  const beforeUpload = (file: any) => {
    const isLt1M = file.size / 1024 / 1024 <= 1;
    if (!isLt1M) {
      message.error('上传图片不能超过1MB');
    }
    return isLt1M;
  };

  /**
   * 上传成功的回调
   *
   * @author fengshuonan
   * @date 2021/4/2 17:03
   */
  const afterUpload = ({ file }) => {
    if (file.response) {
      message.success('上传成功');
      reload();
    }
  };
</script>

<style></style>
