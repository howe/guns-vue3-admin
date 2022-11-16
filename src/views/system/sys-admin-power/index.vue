<template>
  <div>
    <!-- 管理员权限 -->
    <sys-power :resourceBizType="2" />
  </div>
</template>

<script setup lang="ts">
  import SysPower from '/@/views/system/role-power/components/index.vue';
</script>
