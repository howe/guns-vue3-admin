<template>
  <locale-receiver component-name="ele">
    <a-modal
      :visible="visible"
      :title="title || '裁剪图片'"
      :width="width"
      :centered="centered"
      :closable="closable"
      :destroy-on-close="destroyOnClose"
      :force-render="forceRender"
      :keyboard="keyboard"
      :mask="mask"
      :mask-closable="maskClosable"
      :mask-style="maskStyle"
      :wrap-class-name="wrapClassName"
      :z-index="zIndex"
      :dialog-style="dialogStyle"
      :dialog-class="dialogClass"
      :footer="null"
      @update:visible="updateVisible"
      @cancel="onClosed"
    >
      <template #title>
        <slot name="title" />
      </template>
      <ele-cropper
        v-if="show"
        :src="src"
        :aspect-ratio="aspectRatio"
        :view-mode="viewMode"
        :accept="accept"
        :to-blob="toBlob"
        :tools="tools"
        :show-preview="showPreview"
        :ok-text="okText"
        @done="onDone"
      />
    </a-modal>
  </locale-receiver>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue';
  import LocaleReceiver from 'ant-design-vue/es/locale-provider/LocaleReceiver';
  import EleCropper from './cropper.vue';

  export default defineComponent({
    name: 'EleCropperModal',
    components: { LocaleReceiver, EleCropper },
    props: {
      visible: Boolean,
      // cropper参数
      src: String,
      // 裁剪比例
      aspectRatio: {
        type: Number,
        default: 1,
      },
      // 裁剪组件模式
      viewMode: Number,
      // 是否返回blob数据
      toBlob: Boolean,
      // 允许上传的图片类型
      accept: {
        type: String,
        default: 'image/*',
      },
      // 操作按钮布局
      tools: {
        type: [Boolean, String],
        default: true,
      },
      // 是否显示预览组件
      showPreview: {
        type: Boolean,
        default: true,
      },
      // 完成按钮文字
      okText: String,
      // 弹窗参数
      centered: Boolean,
      closable: {
        type: Boolean,
        default: true,
      },
      destroyOnClose: Boolean,
      forceRender: Boolean,
      keyboard: {
        type: Boolean,
        default: true,
      },
      mask: {
        type: Boolean,
        default: true,
      },
      maskClosable: {
        type: Boolean,
        default: true,
      },
      maskStyle: Object,
      title: String,
      width: {
        type: String,
        default: '680px',
      },
      wrapClassName: String,
      zIndex: {
        type: Number,
        default: 1000,
      },
      dialogStyle: Object,
      dialogClass: String,
    },
    emits: ['done', 'open', 'closed', 'update:visible'],
    setup(props, { emit }) {
      const state = reactive({
        show: true,
      });

      onMounted(() => {
        if (props.visible) {
          onOpen();
        }
      });

      /* 裁剪完成 */
      const onDone = (result: any) => {
        emit('done', result);
      };

      /* 更新visible */
      const updateVisible = (value: boolean) => {
        emit('update:visible', value);
      };

      /* 弹窗打开回调 */
      const onOpen = () => {
        state.show = true;
        emit('open');
      };

      /* 弹窗关闭回调 */
      const onClosed = () => {
        if (props.destroyOnClose) {
          state.show = false;
        }
        emit('closed');
      };

      watch(
        () => props.visible,
        (val) => {
          if (val) {
            onOpen();
          } else {
            onClosed();
          }
        },
      );

      return {
        ...toRefs(state),
        onDone,
        onOpen,
        onClosed,
        updateVisible,
      };
    },
  });
</script>
