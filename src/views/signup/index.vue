<template>
  <div id="sign-up" class="d-flex flex-jcc">
    <div class="sign-up-content">
      <div class="sign-up-title">
        <div class="title-up title-xl">
          <span>{{ $t('signup.title') }}</span>
        </div>
        <div class="title-down title-xl text-right">
          <span class="text-bold text-primary">OWL Encoder </span>
          <span>{{ $t('common.account') }}</span>
        </div>
      </div>
      <div class="sign-up-form">
        <v-form autocomplete="off" ref="signUpForm">
          <v-text-field :label="$t('common.username')" outlined color="primary" :hint="$t('signup.usernameHint')" v-model="form.username"
            :rules="rules.username" :error-messages="errors.username">
          </v-text-field>
          <v-text-field :label="$t('common.nickname')" outlined color="primary" :hint="$t('signup.nicknameHint')" v-model="form.nickname"
            :rules="rules.nickname">
          </v-text-field>
          <v-row>
            <v-col style="padding-bottom: 0" sm="8" cols="12">
              <v-text-field class="email-field" ref="emailField" :label="$t('common.email')" outlined color="primary"
                v-model="form.email" :rules="rules.email" :error-messages="errors.email">
                <template slot="append">
                  <v-btn class="send-email-btn" color="primary" absolute :disabled="!isEmailRight||emailOpts.sended"
                    @click.stop="sendAuthCode" :loading="emailOpts.authCodeLoading">{{emailOpts.emailText}}
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col class="auth-input" sm="4" cols="12">
              <v-text-field :label="$t('common.verifyCode')" outlined color="primary" v-model="form.authCode" :disabled="!isEmailRight"
                :rules="rules.authCode" :error-messages="errors.authCode">
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field :label="$t('common.password')" outlined color="primary" :hint="$t('signup.passwordHint')" autocomplete="new-password"
            v-model="form.password" :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd" :rules="rules.password">
          </v-text-field>
          <v-text-field :label="$t('signup.rePassword')" outlined color="primary" autocomplete="new-password" v-model="form.rePassword"
            :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showRePwd ? 'text' : 'password'"
            :rules="rules.rePassword" :disabled="!isPwdRight" @click:append="showRePwd = !showRePwd">
          </v-text-field>
          <v-btn block x-large color="primary" :loading="signUpLoading" @click="signUp">{{ $t('common.signup') }}</v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import regexpList from '@utils/regexp'
export default {
  name: 'SignUp',
  data() {
    return {
      showPwd: false,
      showRePwd: false,
      // emailOpts: {
      //   emailText: this.$t('signup.sendVerifyCodeButton'),
      //   emailDelay: 59,
      //   emailSendTimer: null,
      //   sended: false,
      //   authCodeLoading: false,
      // },
      errors: {
        username: [],
        authCode: [],
        email: [],
      },
      // rules: {
      //   username: [
      //     (v) => !!v || this.$t('signup.usernameRequiredTips'),
      //     (v) => (v && v.length <= 15) || this.$t('signup.usernameMaxLengthTips'),
      //     (v) => (v && regexpList.letterOrNum.test(v)) || this.$t('signup.usernameFormatTips'),
      //   ],
      //   nickname: [
      //     (v) => !!v || this.$t('signup.nicknameRequiredTips'),
      //     (v) => (v && v.length <= 25) || this.$t('signup.nicknameMaxLengthTips'),
      //   ],
      //   email: [
      //     (v) => !!v || this.$t('signup.emailRequiredTips'),
      //     (v) => (v && this.isEmailRight) || this.$t('signup.emailFormatTips'),
      //   ],
      //   authCode: [(v) => !!v || this.$t('signup.verifyCodeRequiredTips')],
      //   password: [
      //     (v) => !!v || this.$t('signup.passwordRequiredTips'),
      //     (v) =>
      //       (v && v.length >= 6 && v.length <= 12) || this.$t('signup.passwordMaxLengthTips'),
      //     (v) => (v && this.isPwdRight) || this.$t('signup.passwordFormatTips'),
      //   ],
      //   rePassword: [
      //     (v) => !!v || this.$t('signup.rePasswordRequiredTips'),
      //     (v) => (v && v === this.form.password) || this.$t('signup.rePasswordFormatTips'),
      //   ],
      // },
      form: {
        username: '',
        nickname: '',
        email: '',
        authCode: '',
        password: '',
        rePassword: '',
      },
      signUpLoading: false,
    }
  },
  computed: {
    isEmailRight() {
      return regexpList.email.test(this.form.email)
    },
    isPwdRight() {
      return regexpList.letterNumULine.test(this.form.password)
    },
    rules() { 
      return {
        username: [
          (v) => !!v || this.$t('signup.usernameRequiredTips'),
          (v) => (v && v.length <= 15) || this.$t('signup.usernameMaxLengthTips'),
          (v) => (v && regexpList.letterOrNum.test(v)) || this.$t('signup.usernameFormatTips'),
        ],
        nickname: [
          (v) => !!v || this.$t('signup.nicknameRequiredTips'),
          (v) => (v && v.length <= 25) || this.$t('signup.nicknameMaxLengthTips'),
        ],
        email: [
          (v) => !!v || this.$t('signup.emailRequiredTips'),
          (v) => (v && this.isEmailRight) || this.$t('signup.emailFormatTips'),
        ],
        authCode: [(v) => !!v || this.$t('signup.verifyCodeRequiredTips')],
        password: [
          (v) => !!v || this.$t('signup.passwordRequiredTips'),
          (v) =>
            (v && v.length >= 6 && v.length <= 12) || this.$t('signup.passwordMaxLengthTips'),
          (v) => (v && this.isPwdRight) || this.$t('signup.passwordFormatTips'),
        ],
        rePassword: [
          (v) => !!v || this.$t('signup.rePasswordRequiredTips'),
          (v) => (v && v === this.form.password) || this.$t('signup.rePasswordFormatTips'),
        ],
      }
    }, 
    emailOpts() {
      return {
        emailText: this.$t('signup.sendVerifyCodeButton'),
        emailDelay: 59,
        emailSendTimer: null,
        sended: false,
        authCodeLoading: false,
      }
    },

    // emailText() {
    //   return this.$t('signup.sendVerifyCodeButton')
    // }
  },
  watch: {
    'form.username'() {
      this.errors.username = []
    },
    'form.authCode'() {
      this.errors.authCode = []
    },
    'form.email'() {
      this.errors.email = []
    },
  },
  methods: {
    async sendAuthCode() {
      this.$refs.emailField.blur()
      // 向邮箱发送验证码 emailAuthCode
      const emailOpts = this.emailOpts
      emailOpts.authCodeLoading = true
      try {
        const res = await this.$http.emailAuthCode({ email: this.form.email })
        if (res.state) {
          this.$message.success(this.$t('signup.verifyCodeSentTips'))
          emailOpts.sended = true
          function calcEmailTime() {
            let delay = emailOpts.emailDelay
            let sentPrefix = this.$t('signup.sentPrefixTips')
            emailOpts.emailText = `${sentPrefix}（${delay}s）`
            if (--delay < 0) {
              clearInterval(emailOpts.emailSendTimer)
              Object.assign(emailOpts, {
                emailDelay: 60,
                emailSendTimer: null,
                emailText: this.$t('signup.sendVerifyCodeButton'),
                sended: false,
              })
            } else {
              emailOpts.emailDelay = delay
            }
          }
          calcEmailTime()
          emailOpts.emailSendTimer = setInterval(calcEmailTime, 1000)
        }
      } catch (err) {
        console.log(err)
      }
      emailOpts.authCodeLoading = false
    },
    validate() {
      return this.$refs.signUpForm.validate()
    },
    async signUp() {
      if (this.validate()) {
        this.signUpLoading = true
        const {
          username,
          nickname: name,
          email,
          password,
          authCode: code,
        } = this.form
        try {
          const res = await this.$http.signUp({
            username,
            name,
            email,
            password,
            code,
          })
          const { state, msg } = res
          if (state) {
            this.$message.success(this.$t('signup.signupSuccessTips'))
            this.$router.replace('/login')
          } else {
            switch (msg) {
              case 0: {
                this.errors.authCode = [this.$t('signup.verifyCodeErrorMessage')]
                break
              }
              case 1: {
                this.$message.error(this.$t('common.unknownErrorMessage'))
                break
              }
              case 2: {
                this.errors.username = [this.$t('signup.usernameDuplicatedErrorMessage')]
                break
              }
              case 3: {
                this.errors.email = [this.$t('signup.emailDuplicatedErrorMessage')]
                break
              }
            }
          }
        } catch (err) {
          // this.$message.error('啊哦！服务器出了点问题😭')
        }
        this.signUpLoading = false
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.emailOpts.emailSendTimer)
  },
}
</script>

<style lang="scss" scoped>
#sign-up {
  padding: 50px 0 100px 0;
  .sign-up-content {
    .sign-up-form {
      margin-top: 40px;
      .email-field {
        ::v-deep input {
          padding-right: 110px;
        }
        .send-email-btn {
          height: 48px;
          top: 4px;
          right: 4px;
        }
      }
    }
  }
}
@include screenXS {
  #sign-up {
    padding: 50px 10px 100px 10px;
    .auth-input {
      padding-top: 0;
    }
  }
}
@include screenSM {
  #sign-up {
    padding: 50px 10px 100px 10px;
    .sign-up-content {
      width: 480px;
    }
  }
}
@include screenLG {
  #sign-up {
    min-height: calc(100vh - 70px);
    .sign-up-content {
      width: 480px;
    }
  }
}
</style>
