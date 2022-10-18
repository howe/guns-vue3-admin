<template>
  <div class="ele-body">
    <a-row>
      <a-col :span="12" class="block-space-right">
        <a-card title="CPU信息" class="card-width">
          <a-table row-key="key" :columns="cpuColumns" :data-source="cpuData" :pagination="false" />
        </a-card>
      </a-col>
      <a-col :span="12" class="block-space-left">
        <a-card title="内存信息" class="card-width">
          <a-table
            row-key="key"
            :columns="memoryColumns"
            :data-source="memoryData"
            :pagination="false"
          />
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="block-space-top">
        <a-card title="JAVA虚拟机信息" class="card-width">
          <a-descriptions bordered :column="2">
            <a-descriptions-item label="jvm名称">{{ systemInfo.jvm.name }}</a-descriptions-item>
            <a-descriptions-item label="java版本">{{ systemInfo.jvm.version }}</a-descriptions-item>
            <a-descriptions-item label="启动时间">{{
              systemInfo.jvm.startTime
            }}</a-descriptions-item>
            <a-descriptions-item label="运行时长">{{ systemInfo.jvm.runTime }}</a-descriptions-item>
            <a-descriptions-item label="安装路径" :span="2">{{
              systemInfo.jvm.home
            }}</a-descriptions-item>
            <a-descriptions-item label="项目路径">{{ systemInfo.sys.userDir }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="block-space-top">
        <a-card title="服务器信息" class="card-width">
          <a-descriptions bordered :column="2">
            <a-descriptions-item label="服务器名称">{{
              systemInfo.sys.computerName
            }}</a-descriptions-item>
            <a-descriptions-item label="操作系统">{{ systemInfo.sys.osName }}</a-descriptions-item>
            <a-descriptions-item label="服务器IP">{{
              systemInfo.sys.computerIp
            }}</a-descriptions-item>
            <a-descriptions-item label="系统架构">{{ systemInfo.sys.osArch }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="block-space-top">
        <a-card title="磁盘信息" class="card-width">
          <a-table
            row-key="dirName"
            :columns="diskColumns"
            :data-source="systemInfo.sysFiles"
            :pagination="false"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
  import { MonitorApi } from '/@/api/system/monitor/MonitorApi';
  import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue';

  export default defineComponent({
    name: 'Monitor',
    setup() {
      let data = reactive({
        cpuColumns: [
          {
            title: '属性',
            dataIndex: 'key',
          },
          {
            title: '值',
            dataIndex: 'value',
          },
        ],
        memoryColumns: [
          {
            title: '属性',
            dataIndex: 'key',
          },
          {
            title: '内存',
            dataIndex: 'value',
          },
          {
            title: 'jvm',
            dataIndex: 'jvm',
          },
        ],
        diskColumns: [
          {
            title: '盘符路径',
            dataIndex: 'dirName',
          },
          {
            title: '文件系统',
            dataIndex: 'sysTypeName',
          },
          {
            title: '盘符类型',
            dataIndex: 'typeName',
          },
          {
            title: '总大小',
            dataIndex: 'total',
          },
          {
            title: '可用大小',
            dataIndex: 'free',
          },
          {
            title: '已用大小',
            dataIndex: 'used',
          },
          {
            title: '已用百分比',
            dataIndex: 'usage',
          },
        ],
        cpuData: [],
        memoryData: [],
        diskData: [],
        systemInfo: {
          cpu: {},
          mem: {},
          jvm: {},
          sys: {},
          sysFiles: [],
        },
      });

      onBeforeMount(async () => {
        let systemInfo = await MonitorApi.getSystemInfo();
        data.systemInfo = systemInfo;

        data.cpuData[0] = { key: '核心数', value: systemInfo.cpu.cpuNum };
        data.cpuData[1] = { key: '用户使用率', value: systemInfo.cpu.used };
        data.cpuData[2] = { key: '系统使用率', value: systemInfo.cpu.sys };
        data.cpuData[3] = { key: '当前空闲率', value: systemInfo.cpu.free };

        data.memoryData[0] = {
          key: '总内存',
          value: systemInfo.mem.total,
          jvm: systemInfo.jvm.total,
        };
        data.memoryData[1] = {
          key: '已用内存',
          value: systemInfo.mem.used,
          jvm: systemInfo.jvm.used,
        };
        data.memoryData[2] = {
          key: '剩余内存',
          value: systemInfo.mem.free,
          jvm: systemInfo.jvm.free,
        };
        data.memoryData[3] = {
          key: '使用率',
          value: systemInfo.mem.usage,
          jvm: systemInfo.jvm.usage,
        };
      });

      return {
        ...toRefs(data),
      };
    },
  });
</script>

<style scoped>
  .block-space-top {
    /*上右下左*/
    padding: 10px 0 0 0;
  }

  .block-space-right {
    padding: 0 5px 0 0;
  }

  .block-space-left {
    padding: 0 0 0 5px;
  }

  .card-width {
    width: 100%;
  }
</style>
