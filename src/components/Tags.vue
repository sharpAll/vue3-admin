<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{
          item.title
        }}</router-link>
        <n-icon size="14" class="tags-li-icon" @click="closeTags(index)">
          <CloseOutlined />
        </n-icon>
      </li>
    </ul>
    <div class="tags-close-box">
      <n-dropdown trigger="hover" :options="options" @select="handleTags">
        <n-button size="small" icon-placement="right" type="primary">
          标签选项
          <template #icon>
            <n-icon size="16" color="#fff">
              <DownOutlined />
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { DownOutlined, CloseOutlined } from "@vicons/antd";
export default {
  components: { DownOutlined, CloseOutlined },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isActive = (path) => {
      return path === route.fullPath;
    };

    const store = useStore();
    const tagsList = computed(() => store.state.tagsList);
    const showTags = computed(() => tagsList.value.length > 0);

    const options = [
      {
        label: "关闭其他",
        key: "other",
      },
      {
        label: "关闭所有",
        key: "all",
      },
    ];

    // 关闭单个标签
    const closeTags = (index) => {
      const delItem = tagsList.value[index];
      store.commit("delTagsItem", { index });
      const item = tagsList.value[index]
        ? tagsList.value[index]
        : tagsList.value[index - 1];
      if (item) {
        delItem.path === route.fullPath && router.push(item.path);
      } else {
        router.push("/");
      }
    };

    // 设置标签
    const setTags = (route) => {
      const isExist = tagsList.value.some((item) => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (tagsList.value.length >= 8) {
          store.commit("delTagsItem", { index: 0 });
        }
        store.commit("setTagsItem", {
          name: route.name,
          title: route.meta.title,
          path: route.fullPath,
        });
      }
    };
    setTags(route);
    onBeforeRouteUpdate((to) => {
      setTags(to);
    });

    // 关闭全部标签
    const closeAll = () => {
      store.commit("clearTags");
      router.push("/");
    };
    // 关闭其他标签
    const closeOther = () => {
      const curItem = tagsList.value.filter((item) => {
        return item.path === route.fullPath;
      });
      store.commit("closeTagsOther", curItem);
    };
    const handleTags = (command) => {
      command === "other" ? closeOther() : closeAll();
    };

    // 关闭当前页面的标签页
    // store.commit("closeCurrentTag", {
    //     $router: router,
    //     $route: route
    // });

    return {
      isActive,
      tagsList,
      showTags,
      options,
      handleTags,
      closeTags,
    };
  },
};
</script>

<style scoped lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 2px 3px 5px #ddd;
  ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    .tags-li {
      float: left;
      margin: 3px 5px 2px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 25px;
      line-height: 23px;
      border: 1px solid #e9eaec;
      background: #fff;
      padding: 0 5px 0 12px;
      vertical-align: middle;
      color: #666;
      -webkit-transition: all 0.3s ease-in;
      -moz-transition: all 0.3s ease-in;
      transition: all 0.3s ease-in;
      &:not(.active):hover {
        background: #f8f8f8;
      }
      &.active {
        color: #fff;
        border: 1px solid #1f656c;
        background-color: #1f656c;
      }
      .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
      }
      .tags-li-icon{
        vertical-align: -3px;
      }
      &.active {
        .tags-li-title {
          color: #fff;
        }
      }
    }
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
}
</style>
