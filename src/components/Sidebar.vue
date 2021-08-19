<template>
  <div class="layout-sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#102d48"
      text-color="#d4dae2"
      active-text-color="#33939c"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const items = [
      {
        icon: "el-icon-lx-home",
        index: "/dashboard",
        title: "系统首页",
      },
      {
        icon: "el-icon-lx-calendar",
        index: "1",
        title: "策略列表",
        subs: [
          {
            index: "/strategy/detail/1",
            title: "策略NO1",
          },
        ],
      },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style lang="scss">
.layout-sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .el-menu-item,
  .el-submenu__title {
    i {
      color: #d4dae2;
      margin-top: -2px;
    }
    &.is-active i {
      color: #33939c;
    }
  }
  & > ul {
    height: 100%;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
