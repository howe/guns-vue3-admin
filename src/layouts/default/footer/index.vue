<template>
  <Footer :class="prefixCls" v-if="getShowLayoutFooter" ref="footerRef">
    <div :class="`${prefixCls}__links`">
      <a @click="openWindow(GUNS_URL)">{{ t('layout.footer.website') }}</a>

      <a @click="openWindow(GUNS_URL)" :class="`${prefixCls}__github`">{{
        t('layout.footer.document')
      }}</a>

      <a @click="openWindow(GUNS_URL)">{{ t('layout.footer.authorization') }}</a>
    </div>
    <div
      >{{ themeInfo.gunsMgrFooterText }}&nbsp;&nbsp;<a
        :href="themeInfo.gunsMgrBeiUrl"
        target="_blank"
        >{{ themeInfo.gunsMgrBeiNo }}</a
      ></div
    >
  </Footer>
</template>

<script lang="ts">
  import { computed, defineComponent, unref, ref, onMounted } from 'vue';
  import { Layout } from 'ant-design-vue';

  import { GithubFilled } from '@ant-design/icons-vue';

  import { GUNS_URL } from '/@/settings/siteSetting';
  import { openWindow } from '/@/utils';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useRouter } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLayoutHeight } from '../content/useContentViewHeight';
  import { useSystemStore } from '/@/store/modules/system';

  export default defineComponent({
    name: 'LayoutFooter',
    components: { Footer: Layout.Footer, GithubFilled },
    setup() {
      const { t } = useI18n();
      const { getShowFooter } = useRootSetting();
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-footer');

      const footerRef = ref<ComponentRef>(null);
      const { setFooterHeight } = useLayoutHeight();

      const getShowLayoutFooter = computed(() => {
        if (unref(getShowFooter)) {
          const footerEl = unref(footerRef)?.$el;
          setFooterHeight(footerEl?.offsetHeight || 0);
        } else {
          setFooterHeight(0);
        }
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
      });

      // 信息
      const themeInfo = ref<any>({});

      onMounted(async () => {
        // 从store获取数据
        let systemStore = useSystemStore();
        let result = await systemStore.loadThemeInfo();
        themeInfo.value = result;
      });

      return {
        getShowLayoutFooter,
        prefixCls,
        themeInfo,
        t,
        GUNS_URL,
        openWindow,
        footerRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(0, 0, 0, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;

    &__links {
      margin-bottom: 8px;

      a {
        color: @normal-color;

        &:hover {
          color: @hover-color;
        }
      }
    }

    &__github {
      margin: 0 30px;

      &:hover {
        color: @hover-color;
      }
    }
  }
</style>
