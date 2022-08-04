<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">量化交易监控</div>
      <div class="ms-content">
        <n-form
          ref="formRef"
          :show-label="false"
          size="large"
          :model="param"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="param.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <UserOutlined />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="param.password"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockOutlined />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              size="large"
              :loading="loading"
              block
              @click="submitForm"
            >
              登 录
            </n-button>
          </n-form-item>
          <p class="login-tips">Tips : 用户名和密码随便填。</p>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { UserOutlined, LockOutlined } from "@vicons/antd";

export default {
  name: "Login",
  components: { UserOutlined, LockOutlined },
  setup() {
    const router = useRouter();
    const param = reactive({
      username: "admin",
      password: "123123",
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    const formRef = ref();
    const loading = ref(false);
    const message = useMessage();
    const submitForm = () => {
      loading.value = true;
      formRef.value.validate((errors) => {
        if (!errors) {
          message.success("登录成功");
          localStorage.setItem("ms_username", param.username);
          router.push("/");
        } else {
          message.error("登录成功");
          return false;
        }
        loading.value = false;
      });
    };

    const store = useStore();
    store.commit("clearTags");

    return {
      param,
      rules,
      loading,
      formRef,
      submitForm,
    };
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/img/login-bg.jpg) center no-repeat;
  background-size: cover;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
