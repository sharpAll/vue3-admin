<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <n-icon v-if="!collapse" size="26" color="#fff">
        <MenuFoldOutlined />
      </n-icon>
      <n-icon v-else size="26" color="#fff">
        <MenuUnfoldOutlined />
      </n-icon>
    </div>
    <div class="logo">量化交易监控</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <span class="text-base">
          {{ username }}
        </span>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon
              class="ml-5 cursor-pointer"
              size="24"
              color="#fff"
              @click="logOut"
            >
              <LogoutOutlined />
            </n-icon>
          </template>
          退出
        </n-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@vicons/antd";
export default {
  components: { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined },
  setup() {
    const dialog = useDialog();
    const username = localStorage.getItem("ms_username");

    const store = useStore();
    const collapse = computed(() => store.state.collapse);
    // 侧边栏折叠
    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
    };

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
    });

    // 退出登录
    const router = useRouter();
    function logOut() {
      dialog.success({
        title: "温馨提醒",
        content: "确定要退出登录吗？",
        positiveText: "确定",
        negativeText: "取消",
        showIcon: false,
        onPositiveClick: () => {
          localStorage.removeItem("ms_username");
          router.push("/login");
        },
      });
    }
    return {
      username,
      collapse,
      collapseChage,
      logOut,
    };
  },
};
</script>
<style scoped lang="scss">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #0c2135;
  .collapse-btn {
    float: left;
    padding: 22px 21px 0;
    cursor: pointer;
  }
  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }
  .header-right {
    float: right;
    padding-right: 20px;
    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;
      .user-avator {
        margin-right: 10px;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
