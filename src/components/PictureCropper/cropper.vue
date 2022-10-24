<template>
  <locale-receiver component-name="ele">
    <div class="ele-cropper">
      <div class="ele-cropper-group">
        <div class="ele-cropper-img-group">
          <img ref="eleCropperImg" :src="imgSrc" style="max-width: 100%" alt="" />
        </div>
        <div
          v-if="showPreview"
          ref="eleCropperPreviews"
          :style="pStyle"
          class="ele-cropper-preview-group"
        >
          <div :style="pItemStyle1" class="ele-cropper-preview"> </div>
          <div v-if="aspectRatio === 1" :style="pItemStyle2" class="ele-cropper-preview"> </div>
          <div v-if="aspectRatio !== 1" :style="pItemStyle3" class="ele-cropper-preview"> </div>
          <div v-if="aspectRatio !== 1" :style="pItemStyle4" class="ele-cropper-preview"> </div>
        </div>
      </div>
      <div v-if="tools" class="ele-cropper-tool">
        <a-button-group
          v-for="(item, index) in toolGroup"
          :key="index"
          class="ele-cropper-tool-item"
        >
          <template v-for="(btn, i) in item">
            <template v-if="btn === 'zoomIn'">
              <a-button
                :key="i"
                @click="onAction"
                title="放大"
                data-method="zoom"
                data-option="0.1"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <zoom-in-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'zoomOut'">
              <a-button
                :key="i"
                @click="onAction"
                title="缩小"
                data-method="zoom"
                data-option="-0.1"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <zoom-out-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'moveL'">
              <a-button
                :key="i"
                @click="onAction"
                title="左移"
                data-method="move"
                data-option="-10"
                data-option2="0"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <arrow-left-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'moveR'">
              <a-button
                :key="i"
                @click="onAction"
                title="右移"
                data-method="move"
                data-option="10"
                data-option2="0"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <arrow-right-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'moveT'">
              <a-button
                :key="i"
                @click="onAction"
                title="上移"
                data-method="move"
                data-option="0"
                data-option2="-10"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <arrow-up-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'moveB'">
              <a-button
                :key="i"
                @click="onAction"
                title="下移"
                data-method="move"
                data-option="0"
                data-option2="10"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <arrow-down-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'rotateL'">
              <a-button
                :key="i"
                @click="onAction"
                title="向左旋转"
                data-method="rotate"
                data-option="-45"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <rotate-left-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'rotateR'">
              <a-button
                :key="i"
                @click="onAction"
                title="向右旋转"
                data-method="rotate"
                data-option="45"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <rotate-right-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'scaleX'">
              <a-button
                :key="i"
                @click="onAction"
                title="左右翻转"
                data-method="scaleX"
                data-option="-1"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <swap-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'scaleY'">
              <a-button
                :key="i"
                @click="onAction"
                title="上下翻转"
                data-method="scaleY"
                data-option="-1"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <swap-outlined style="transform: rotate(90deg)" />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'reset'">
              <a-button
                :key="i"
                @click="onAction"
                title="重置"
                data-method="reset"
                type="primary"
                class="ele-cropper-tool-btn"
              >
                <template #icon>
                  <sync-outlined />
                </template>
              </a-button>
            </template>
            <template v-else-if="btn === 'upload'">
              <a-upload
                :key="i"
                :before-upload="onUpload"
                :accept="accept"
                :show-upload-list="false"
              >
                <a-button
                  title="选择图片"
                  type="primary"
                  class="ele-cropper-tool-btn"
                  style="border-top-right-radius: 2px; border-bottom-right-radius: 2px"
                >
                  <template #icon>
                    <upload-outlined />
                  </template>
                </a-button>
              </a-upload>
            </template>
            <template v-else-if="btn === 'crop'">
              <a-button
                :key="i"
                @click="onAction"
                type="primary"
                data-method="getCroppedCanvas"
                data-option='{"maxWidth":4096,"maxHeight":4096}'
              >
                <template #icon>
                  <check-outlined />
                </template>
                <span>{{ okText || '完成' }}</span>
              </a-button>
            </template>
          </template>
        </a-button-group>
      </div>
    </div>
  </locale-receiver>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, computed, onMounted, nextTick } from 'vue';
  import LocaleReceiver from 'ant-design-vue/es/locale-provider/LocaleReceiver';
  import Cropper from 'cropperjs';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'EleCropper',
    components: {
      LocaleReceiver,
    },
    props: {
      // 图片地址
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
    },
    emits: ['done'],
    setup(props, { emit }) {
      const state = reactive({
        // cropper实例
        ins: null,
        // 图片base64数据
        imgSrc: '',
        // 当前图片类型
        imgType: 'image/jpeg',
        // 预览组件宽度
        previewWidth: 120,
      });
      // 预览组件样式
      const pStyle = computed(() => {
        return `width: ${state.previewWidth + 20}px;text-align: right;font-size: 0;`;
      });
      const pItemStyle1 = computed(() => {
        const h = state.previewWidth / (props.aspectRatio || 1);
        return `width: ${state.previewWidth}px;height: ${h}px;`;
      });
      const pItemStyle2 = computed(() => {
        return pItemStyle1.value + 'border-radius: 50%;margin-top: 10px;';
      });
      const pItemStyle3 = computed(() => {
        const w = (state.previewWidth / 3) * 2 - 10,
          h = w / (props.aspectRatio || 1);
        return `width: ${state.previewWidth}px;height: ${h}px;margin-top: 10px;`;
      });
      const pItemStyle4 = computed(() => {
        const w = state.previewWidth / 3,
          h = w / (props.aspectRatio || 1);
        return `width: ${state.previewWidth}px;height: ${h}px;margin: 10px 0 0 10px;`;
      });
      const toolGroup = computed(() => {
        if (typeof props.tools === 'string') {
          let tool = [];
          props.tools.split('|').forEach((g) => {
            tool.push(g.split(',').map((b) => b.trim()));
          });
          return tool;
        } else if (props.tools) {
          return [
            ['zoomIn', 'zoomOut'],
            ['moveL', 'moveR', 'moveT', 'moveB'],
            ['rotateL', 'rotateR'],
            ['scaleX', 'scaleY'],
            ['reset', 'upload'],
            ['crop'],
          ];
        }
        return [];
      });

      // ref
      const eleCropperPreviews = ref(null);
      const eleCropperImg = ref(null);

      onMounted(() => {
        // ie兼容
        if (
          props.src &&
          props.src.indexOf('data:image') !== 0 &&
          (!!window.ActiveXObject || 'ActiveXObject' in window)
        ) {
          let req = new window.XMLHttpRequest();
          req.open('GET', props.src, true);
          req.responseType = 'arraybuffer';
          req.onload = () => {
            if ([200, 201].indexOf(req.status) === -1) {
              console.error('cropper', req);
              return;
            }
            let bytes = new Uint8Array(req.response),
              binary = '';
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            state.imgSrc = 'data:image/jpeg;base64,' + window.btoa(binary);
            nextTick(() => {
              render();
            });
          };
          req.send();
        } else if (props.src) {
          state.imgSrc = props.src;
          nextTick(() => {
            render();
          });
        } else {
          render();
        }
      });

      /* 渲染 */
      const render = () => {
        if (state.ins) {
          state.ins.destroy();
        }
        let options = {};
        if (props.showPreview) {
          options.preview = eleCropperPreviews.value.children;
        }
        state.ins = new Cropper(eleCropperImg.value, options);
      };

      /* 操作按钮点击事件 */
      const onAction = (e: any) => {
        let method = getDataset(e.currentTarget, 'method'),
          option = getDataset(e.currentTarget, 'option'),
          secondOption = getDataset(e.currentTarget, 'option2');
        if (!state.ins || !method) {
          return;
        }
        let cropped = state.ins.cropped,
          result;
        switch (method) {
          case 'rotate':
            if (cropped && props.viewMode > 0) {
              state.ins.clear();
            }
            break;
          case 'getCroppedCanvas':
            option = JSON.parse(option || '{}') || {};
            if (state.imgType === 'image/jpeg') {
              option.fillColor = '#fff';
            }
            break;
        }
        result = state.ins[method](option, secondOption);
        switch (method) {
          case 'rotate':
            if (cropped && props.viewMode > 0) {
              state.ins.crop();
            }
            break;
          case 'scaleX':
          case 'scaleY':
            setDataset(e.currentTarget, 'option', -option);
            break;
          case 'getCroppedCanvas':
            if (result) {
              if (props.toBlob) {
                result.toBlob((blob) => {
                  emit('done', blob);
                }, state.imgType);
              } else {
                emit('done', result.toDataURL(state.imgType));
              }
            } else {
              message.error('裁剪失败');
            }
            break;
        }
      };

      /* 图片上传处理 */
      const onUpload = (file: any) => {
        state.imgType = file.type;
        let reader = new FileReader();
        reader.onload = (e) => {
          state.ins.replace(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
      };

      /* 获取dataset属性 */
      const getDataset = (elem: any, key: any) => {
        if (elem.dataset) {
          return elem.dataset[key];
        } else {
          return elem.getAttribute('data-' + key);
        }
      };

      /* 设置dataset属性 */
      const setDataset = (elem: any, key: any, value: any) => {
        if (elem.dataset) {
          elem.dataset[key] = value;
        } else {
          elem.setAttribute('data-' + key, value);
        }
      };

      return {
        ...toRefs(state),
        pStyle,
        render,
        onUpload,
        onAction,
        toolGroup,
        getDataset,
        setDataset,
        pItemStyle1,
        pItemStyle2,
        pItemStyle3,
        pItemStyle4,
        eleCropperImg,
        eleCropperPreviews,
      };
    },
  });
</script>

<style lang="less">
  @import 'cropperjs/dist/cropper.css';

  .ele-cropper .ele-cropper-group {
    display: flex;
  }

  .ele-cropper .ele-cropper-img-group {
    flex: 1;
  }

  .ele-cropper .ele-cropper-preview {
    display: inline-block;
    border: 1px solid hsla(0, 0%, 80%, 0.6);
    vertical-align: top;
    overflow: hidden;
  }

  /* 操作按钮 */
  .ele-cropper .ele-cropper-tool {
    margin-top: 10px;
  }

  .ele-cropper .ele-cropper-tool-item {
    margin: 10px 18px 0 0;
  }

  .ele-cropper .ele-cropper-tool-item:last-child {
    margin-right: 0 !important;
  }

  .ele-cropper .ele-cropper-tool-btn {
    width: auto;
    padding: 0 10px;
  }

  .ele-cropper .ele-cropper-tool-item > .ant-btn + span {
    vertical-align: -1px;
  }

  /* 小屏幕适应 */
  @media screen and (max-width: 768px) {
    .ele-cropper .ele-cropper-preview-group {
      display: none;
    }

    .ele-cropper .ele-cropper-tool-item {
      margin-right: 6px;
    }
  }
</style>
