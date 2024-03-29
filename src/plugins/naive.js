import {
  create,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NForm,
  NFormItem,
  NButton,
  NIcon,
  NMenu,
  NDropdown,
  NLayoutSider,
  NLayout,
  NTable,
  NDataTable,
  NDivider,
  NModal,
  NDatePicker,
  NGrid,
  NGridItem,
  NRadioGroup,
  NRadioButton,
  NInput,
  NInputNumber,
  NSelect,
  NTooltip,
} from "naive-ui";

const naive = create({
  components: [
    NConfigProvider,
    NMessageProvider,
    NDialogProvider,
    NForm,
    NFormItem,
    NButton,
    NIcon,
    NMenu,
    NDropdown,
    NLayoutSider,
    NLayout,
    NTable,
    NDataTable,
    NDivider,
    NModal,
    NDatePicker,
    NGrid,
    NGridItem,
    NRadioGroup,
    NRadioButton,
    NInput,
    NInputNumber,
    NSelect,
    NTooltip,
  ],
});

export function installNaiveUI(app) {
  app.use(naive);
}
