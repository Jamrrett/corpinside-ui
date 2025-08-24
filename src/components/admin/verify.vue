<template>
  <div class="myCenter verify-container">
    <div class="logo-content">
      <span>CorpInside</span>
    </div>
    <div class="verify-content">
      <div>
        <el-input v-model="account">
          <template slot="prepend">账号</template>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </div>
      <div>
        <proButton info="登录" @click.native="login()" />
      </div>
    </div>

    <DarkModeButton />
    <GoTopButton />
  </div>
</template>

<script>
import DarkModeButton from "@/components/common/dark-mode-button.vue";
import GoTopButton from "@/components/common/go-top-button.vue";
const proButton = () => import( '../common/proButton');

export default {
  components: {
    DarkModeButton,
    GoTopButton,
    proButton,
  },
  data() {
    return {
      redirect: this.$route.query.redirect,
      account: '',
      password: ''
    };
  },
  computed: {},
  created() {
    let root = document.querySelector(':root');
    root.style.setProperty('--backgroundPicture', 'url(' + this.$constant.webURL + '/images/backgroundPicture.jpg)');
  },
  methods: {
    login() {
      if (this.$common.isEmpty(this.account) || this.$common.isEmpty(this.password)) {
        this.$message({
          message: '请输入账号或密码！',
          type: 'error'
        });
        return;
      }

      let user = {
        account: this.account.trim(),
        password: this.$common.encrypt(this.password.trim()),
        isAdmin: true
      };

      this.$localRequest.post('/user/login', user, true, false)
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            localStorage.setItem('adminToken', res.data.accessToken);
            this.$store.commit('loadCurrentAdmin', res.data.user);
            this.$store.commit('loadCurrentUser', res.data.user);
            localStorage.setItem('userToken', res.data.accessToken);
            this.account = '';
            this.password = '';
            this.$router.push({ path: this.redirect || '/admin' });
          }
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          });
        });
    }
  }
};
</script>

<style scoped>

  .verify-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--backgroundPicture) center center / cover repeat;
  }

  .logo-content {
    z-index: 2;
    width: 350px;
    padding: 20px 30px;
    display: flex;
    justify-content: center;
    border-radius: 12px 12px 0 0;
    font-size: 28px;
    font-weight: 700;
    color: var(--white-content);
    background: var(--theme-background);
  }

  .verify-content {
    width: 350px;
    background: var(--content-background-color);
    padding: 35px 40px 24px;
    border-radius: 0 0 12px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

</style>
