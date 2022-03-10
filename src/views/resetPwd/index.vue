<template>
  <div id="resetPwd" class="d-flex flex-jcc">
    <div class="reset-pwd-content">
      <div class="reset-pwd-title d-flex flex-clo">
        <span class="title-xl">{{ $t('settings.resetPassword.title') }}</span>
        <span class="text-sm text-describe">{{ $t('settings.resetPassword.headerTips') }}</span>
      </div>
      <div class="reset-pwd-form">
        <v-form autocomplete="off" ref="form">
          <v-text-field :label="$t('common.password')" autocomplete="new-password" color="primary" :hint="$t('settings.resetPassword.passwordMaxLengthTips')"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showPwd ? 'text' : 'password'" outlined
            v-model="form.password" :rules="rules.password" @click:append="showPwd = !showPwd">
          </v-text-field>
          <v-text-field :label="$t('signup.rePassword')" autocomplete="new-password" outlined color="primary" v-model="form.rePassword"
            :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showRePwd ? 'text' : 'password'"
            :rules="rules.rePassword" :disabled="!isPwdRight" @click:append="showRePwd = !showRePwd">
          </v-text-field>
          <v-btn color="primary" block x-large :loading="loading" @click="reset">{{$t('settings.resetPassword.resetButton')}}</v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import regexpList from '@utils/regexp'
import cookie from '@utils/cookie'
export default {
  name: 'resetPwd',
  data() {
    return {
      showPwd: false,
      showRePwd: false,
      loading: false,
      form: {
        password: '',
        rePassword: '',
      },
      rules: {
        password: [
          (v) => !!v || this.$t('settings.resetPassword.passwordRequiredTips'),
          (v) =>
            (v && v.length >= 6 && v.length <= 12) || this.$t('settings.resetPassword.passwordMaxLengthTips'),
          (v) => (v && this.isPwdRight) || this.$t('settings.resetPassword.passwordFormatTips'),
        ],
        rePassword: [
          (v) => !!v || this.$t('settings.resetPassword.rePasswordRequiredTips'),
          (v) => (v && v === this.form.password) || this.$t('settings.resetPassword.rePasswordFormatTips'),
        ],
      },
    }
  },
  created() {
    const token = this.$route.query.token
    cookie.set('TMP_EMAIL_TOKEN', token)
    if (this.loginState || !token) {
      // 如果已经登录了就跳回主页
      this.$router.replace({ name: 'Home' })
    }
    history.replaceState({}, '', '/')
  },
  computed: {
    ...mapState(['loginState']),
    isPwdRight() {
      return regexpList.letterNumULine.test(this.form.password)
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    async reset() {
      if (!this.validate()) return void 0
      const tmpToken = cookie.get('TMP_EMAIL_TOKEN')
      console.log(tmpToken)
      const config = { headers: { token: tmpToken } }
      this.loading = true
      // _4c2b139460q
      try {
        const res = await this.$http.resetPwd(
          { password: this.form.password },
          config
        )
        if (res.state) {
          this.$message.success(this.$t('settings.resetPassword.resetSuccessTips'))
          cookie.del('TMP_EMAIL_TOKEN')
          this.$router.replace({ path: '/login' })
        } else {
          this.$message.error(this.$t('settings.resetPassword.resetErrorMessage'))
        }
      } catch (err) {
        console.log(err)
        // this.$message.error('未知错误！')
      }
      this.loading = false
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#resetPwd {
  padding: 50px 0 100px 0;
  .reset-pwd-content {
    width: 480px;
    .reset-pwd-form {
      margin-top: 40px;
    }
  }
}
@include screenXS {
  #resetPwd {
    .reset-pwd-content {
      width: 350px;
    }
  }
}
</style>
