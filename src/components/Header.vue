<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
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
        <el-tooltip effect="dark" content="退出" placement="bottom">
          <i class="ml-5 cursor-pointer el-icon-lx-exit" @click="logOut"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
export default {
  setup() {
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
      ElMessageBox.confirm("确定要退出登录吗？", "退出登录", {
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("ms_username");
          router.push("/login");
        })
        .catch(() => {});
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
  background-color: #0C2135;
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
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
