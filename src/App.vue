<!--
 * @Author: nxy
 * @Date: 2022-10-08 14:28:29
-->
<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import { useSystemStore } from '/@/store/modules/system';

  import 'dayjs/locale/zh-cn';
  import { onMounted, nextTick } from 'vue-demi';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();

  onMounted(async () => {
    const systemStore = useSystemStore();
    let result = await systemStore.loadThemeInfo();
    let faviconUrl = result.gunsMgrFavicon;
    await nextTick();
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  });
</script>
