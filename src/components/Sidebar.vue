<template>
  <div class="layout-sidebar">
    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="250"
        :collapsed="collapse"
      >
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapse"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="items"
          :on-update:value="selectMenu"
          :indent="16"
          :value="curRoute"
        />
      </n-layout-sider>
    </n-layout>
  </div>
</template>

<script>
import { computed, h } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { NIcon } from "naive-ui";
import { HomeOutlined, ProfileOutlined } from "@vicons/antd";
export default {
  components: { HomeOutlined, ProfileOutlined },
  setup() {
    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }
    const items = [
      {
        icon: renderIcon(HomeOutlined),
        key: "/dashboard",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "Dashboard",
              },
            },
            { default: () => "系统首页" }
          ),
      },
      {
        icon: renderIcon(ProfileOutlined),
        key: "1",
        label: "策略列表",
        children: [
          {
            key: "/strategy/detail/1",
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: "StrategyDetail",
                    params: {
                      id: "1",
                    },
                  },
                },
                { default: () => "策略NO1" }
              ),
          },
        ],
      },
    ];

    const route = useRoute();
    const curRoute = route.path

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      curRoute,
      collapse,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  background-image: linear-gradient(to bottom right, #0b365e, #091b2b);
  overflow-y: scroll;
  ::v-deep(.n-menu) {
    background-color: #102d48;
    .n-menu-item-content {
      .n-menu-item-content__icon,
      .n-menu-item-content-header,
      .n-menu-item-content__arrow {
        color: #d4dae2 !important;
        a {
          color: #d4dae2;
          &.router-link-active {
            color: #33939c !important;
          }
        }
      }
      &.n-menu-item-content--selected {
        .n-menu-item-content__icon,
        .n-menu-item-content-header {
          color: #33939c !important;
        }
      }
      &.n-menu-item-content--child-active {
        .n-menu-item-content__arrow,
        .n-menu-item-content-header,
        .n-menu-item-content__icon {
          color: #33939c !important;
        }
      }
      &:hover::before,
      &.n-menu-item-content--hover::before {
        background-color: transparent;
      }
    }
  }
}
</style>
