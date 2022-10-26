<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div :class="getClass" @click.stop v-if="visible">
        <div :class="`${prefixCls}-content`" v-click-outside="handleClose">
          <div :class="`${prefixCls}-input__wrapper`"> </div>

          <div :class="`${prefixCls}-not-data`" v-show="getIsNotData">
            {{ t('暂无应用') }}
          </div>

          <ul :class="`${prefixCls}-list`" v-show="!getIsNotData" ref="scrollWrap">
            <li
              :ref="setRefs(index)"
              v-for="(item, index) in menuList"
              :key="item.path"
              :data-index="index"
              @click="handleEnter(item, index)"
              :class="[
                `${prefixCls}-list__item`,
                {
                  [`${prefixCls}-list__item--active`]: activeIndex === index,
                },
              ]"
            >
              <div :class="`${prefixCls}-list__item-icon`">
                <component :is="item.icon" :size="20" />
              </div>
              <div :class="`${prefixCls}-list__item-text`">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
  import { computed, unref, ref, watch, nextTick } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import Icon from '/@/components/Icon';
  // @ts-ignore
  import vClickOutside from '/@/directives/clickOutside';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRefs } from '/@/hooks/core/useRefs';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useUserStore } from '/@/store/modules/user';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { router } from '/@/router';
  import { RouteRecordRaw } from 'vue-router';
  import { formatMenus } from '/@/utils/common/util';

  const props = defineProps({
    visible: { type: Boolean },
  });

  const emit = defineEmits(['close']);

  const scrollWrap = ref(null);
  const userStore = useUserStore();

  const { t } = useI18n();
  const { prefixCls } = useDesign('app-search-modal');
  const [refs, setRefs] = useRefs();
  const { getIsMobile } = useAppInject();
  const permissionStore = usePermissionStore();

  // 菜单列表
  const menuList = ref<Array<string | number>>([]);
  //当前选中
  const activeIndex = ref<number>(-1);

  const getIsNotData = computed(() => unref(menuList).length === 0);

  const getClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--mobile`]: unref(getIsMobile),
      },
    ];
  });

  watch(
    () => props.visible,
    (visible: boolean) => {
      if (userStore.allMenuList && userStore.allMenuList.length > 0) {
        menuList.value = userStore.allMenuList;
        userStore.allMenuList.forEach((item, index) => {
          if (item.path == userStore.menuList[0].path) {
            activeIndex.value = index;
          }
        });
      } else {
        menuList.value = [];
      }
    },
  );

  // 应用点击
  const handleEnter = async (item: any, index: number) => {
    let arr = JSON.parse(JSON.stringify(item));
    activeIndex.value = index;
    if (arr.path != userStore.menuList[0].path) {
      //存入当前菜单列表
      userStore.setMenuList(arr);
      // 如果路由列表中不存在
      if (!router.getRoutes().find((item) => item.path == arr.children[0].path)) {
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });
      } else {
        permissionStore.setBackMenuList(userStore.menuList[0].children);
      }
    }

    // 跳转页面
    const { homePath } = formatMenus(item.children);
    await router.replace(homePath);

    // 关闭弹框
    handleClose();
  };

  // esc 关闭弹框
  function handleClose() {
    menuList.value = [];
    emit('close');
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-search-modal';
  @footer-prefix-cls: ~'@{namespace}-app-search-footer';
  .@{prefix-cls} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background-color: rgb(0 0 0 / 25%);
    justify-content: center;

    &--mobile {
      padding: 0;

      > div {
        width: 100%;
      }

      .@{prefix-cls}-input {
        width: calc(100% - 38px);
      }

      .@{prefix-cls}-cancel {
        display: inline-block;
      }

      .@{prefix-cls}-content {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }

      .@{footer-prefix-cls} {
        display: none;
      }

      .@{prefix-cls}-list {
        height: calc(100% - 80px);
        max-height: unset;

        &__item {
          &-enter {
            opacity: 0% !important;
          }
        }
      }
    }

    &-content {
      position: relative;
      width: 632px;
      margin: 0 auto auto;
      background-color: @component-background;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
      flex-direction: column;
    }

    &-input__wrapper {
      display: flex;
      padding: 14px 14px 0;
      justify-content: space-between;
      align-items: center;
    }

    &-input {
      width: 100%;
      height: 48px;
      font-size: 1.5em;
      color: #1c1e21;
      border-radius: 6px;

      span[role='img'] {
        color: #999;
      }
    }

    &-cancel {
      display: none;
      font-size: 1em;
      color: #666;
    }

    &-not-data {
      display: flex;
      width: 100%;
      height: 100px;
      font-size: 0.9;
      color: rgb(150 159 175);
      align-items: center;
      justify-content: center;
    }

    &-list {
      max-height: 472px;
      padding: 0 14px;
      padding-bottom: 20px;
      margin: 0 auto;
      margin-top: 14px;
      overflow: auto;

      &__item {
        position: relative;
        display: flex;
        width: 100%;
        height: 56px;
        padding-bottom: 4px;
        padding-left: 14px;
        margin-top: 8px;
        font-size: 14px;
        color: @text-color-base;
        cursor: pointer;
        background-color: @component-background;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        align-items: center;

        > div:first-child,
        > div:last-child {
          display: flex;
          align-items: center;
        }

        &--active {
          color: #fff;
          background-color: @primary-color;

          .@{prefix-cls}-list__item-enter {
            opacity: 100%;
          }
        }

        &-icon {
          width: 30px;
        }

        &-text {
          flex: 1;
        }

        &-enter {
          width: 30px;
          opacity: 0%;
        }
      }
    }
  }
</style>
