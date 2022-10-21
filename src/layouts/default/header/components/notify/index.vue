<!-- 顶栏消息通知 -->
<template>
  <div :class="prefixCls">
    <a-dropdown
      v-model:visible="visible"
      placement="bottom"
      :trigger="['click']"
      :overlay-style="{ padding: '0 10px' }"
    >
      <a-badge :count="unreadNum" class="ele-notice-trigger" :offset="[6, 4]">
        <bell-outlined style="padding: 8px 0" />
      </a-badge>
      <template #overlay>
        <div class="ant-dropdown-menu ele-notice-pop">
          <div @click.stop="">
            <a-tabs v-model:active-key="active" :centered="true">
              <a-tab-pane key="notice" :tab="noticeTitle">
                <a-list item-layout="horizontal" :data-source="notice">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta
                        :title="item.messageTitle"
                        :description="item.messageSendTime"
                        @click="noticeDetail(item)"
                      >
                        <template #avatar>
                          <a-avatar :style="{ background: '#60B2FC' }">
                            <template #icon>
                              <component :is="'NotificationFilled'" />
                            </template>
                          </a-avatar>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>
                <div v-if="notice.length" class="ele-cell ele-notice-actions">
                  <div class="ele-cell-content" @click="clearNotice">清空通知</div>
                  <a-divider type="vertical" />
                  <div @click="lookMore" class="ele-cell-content">查看更多</div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </template>
    </a-dropdown>

    <!--消息详情对话框-->
    <a-modal
      v-model:visible="noticeDetailShow"
      :title="noticeDetailObject.messageTitle"
      @ok="closeDetail"
      :footer="null"
      :maskClosable="false"
    >
      <p>{{ noticeDetailObject.messageContent }}</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="HeaderNotice">
  import { computed, ref } from 'vue';
  import { NoticeApi } from '/@/api/system/notice/NoticeApi';
  import { useNoticeStore } from '/@/store/modules/notice';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRouter } from 'vue-router';

  const { prefixCls } = useDesign('header-notify');
  let noticeStore = useNoticeStore();
  let router = useRouter();

  // 是否显示消息详情对话框
  const noticeDetailShow = ref<boolean>(false);

  // 通知详情的内容
  const noticeDetailObject = ref<any>({
    messageTitle: '',
    messageContent: '',
  });

  // 是否显示
  const visible = ref<boolean>(false);
  // 选项卡选中
  const active = ref<string>('notice');
  // 通知数据
  const notice = computed(() => noticeStore.$state.unReadNoticeList);

  // 通知标题
  const noticeTitle = computed(() => {
    return '通知' + (notice.value.length ? `(${notice.value.length})` : '');
  });

  // 未读数量
  const unreadNum = computed(() => {
    return notice.value.length;
  });

  /* 查询数据 */
  const query = async () => {
    // 获取用户所有的未读消息
    let noticeList = await NoticeApi.getUnReadMessages();
    noticeStore.setNotice(noticeList);
  };

  /* 清空通知 */
  const clearNotice = () => {
    noticeStore.setNotice([]);

    // 调用接口，全部标记为已读
    NoticeApi.messageSetRead();
  };

  /* 查看详情 */
  const noticeDetail = (messageObject: any) => {
    noticeDetailObject.value.messageTitle = messageObject.messageTitle;
    noticeDetailObject.value.messageContent = messageObject.messageContent;
    noticeDetailShow.value = true;

    // 更新消息为已读状态
    let param = { messageIdList: [messageObject.messageId] };
    NoticeApi.batchUpdateReadFlag(param);

    // 移除数组中已读消息
    noticeStore.removeMessage(messageObject.messageId);
  };

  /* 清空通知 */
  const closeDetail = () => {
    noticeDetailShow.value = false;
  };

  /* 查看更多通知 */
  const lookMore = () => {
    router.push('/notice/mynotice');
    visible.value = false;
  };

  // 查询未读消息
  query();
</script>

<style lang="less">
  .ele-notice-trigger.ant-badge {
    color: inherit;
  }

  .ele-notice-pop {
    &.ant-dropdown-menu {
      padding: 0;
      width: 336px;
      max-width: 100%;
      margin-top: 11px;
    }

    // 内容
    .ant-list-item {
      padding-left: 24px;
      padding-right: 24px;
      transition: background-color 0.3s;
      cursor: pointer;

      &:hover {
        background: hsla(0, 0%, 60%, 0.05);
      }
    }

    .ant-tag {
      margin: 0;
    }

    // 操作按钮
    .ele-notice-actions {
      border-top: 1px solid hsla(0, 0%, 60%, 0.15);

      & > .ele-cell-content {
        line-height: 46px;
        text-align: center;
        transition: background-color 0.3s;
        cursor: pointer;
        color: inherit;

        &:hover {
          background: hsla(0, 0%, 60%, 0.05);
        }
      }
    }

    .ant-tabs-nav {
      margin-bottom: 0;
    }
  }
</style>
