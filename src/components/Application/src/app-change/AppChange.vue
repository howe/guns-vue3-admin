<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import AppChangeModal from './AppChangeModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AppChange',
    setup() {
      const showModal = ref(false);
      const { t } = useI18n();

      function changeModal(show: boolean) {
        showModal.value = show;
      }

      return () => {
        return (
          <div class="p-1" onClick={changeModal.bind(null, true)}>
            <Tooltip>
              {{
                title: () => t('应用切换'),
                default: () => <appstore-outlined />,
              }}
            </Tooltip>
            <AppChangeModal onClose={changeModal.bind(null, false)} visible={unref(showModal)} />
          </div>
        );
      };
    },
  });
</script>
