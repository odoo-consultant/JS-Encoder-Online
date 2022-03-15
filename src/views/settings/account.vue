<template>
  <div id="account">
    <div class="account-item account-third d-flex flex-clo">
      <span class="item-title title-xs">{{ $t('settings.account.title') }}</span>
      <span class="text-sm text-describe">{{ $t('settings.account.headerTips') }}</span>
      <div class="item-content">
        <div class="d-flex flex-ai third-list">
          <i class="icon iconfont icon-github title-lg"></i>
          <span>GitHub</span>
          <v-spacer></v-spacer>
          <v-btn color="error" text disabled v-if="curUserDetail.githubId" :loading="githubLoading"
            @click="unbindTip('github')">{{ $t('settings.account.unbindButton') }}
          </v-btn>
          <v-btn color="primary" text disabled v-else :loading="githubLoading" @click="bindGithub">{{ $t('settings.account.bindButton') }}</v-btn>
        </div>
        <div class="d-flex flex-ai third-list">
          <i class="icon iconfont icon-gitee title-lg"></i>
          <span>Gitee</span>
          <v-spacer></v-spacer>
          <v-btn color="error" text v-if="curUserDetail.giteeId" :loading="giteeLoading" @click="unbindTip('gitee')">
            {{ $t('settings.account.unbindButton') }}
          </v-btn>
          <v-btn color="primary" text v-else :loading="giteeLoading" @click="bindGitee">{{ $t('settings.account.bindButton') }}</v-btn>
        </div>
      </div>
    </div>
<!--     <div class="account-item account-email d-flex flex-clo">
      <span class="item-title title-xs">{{ $t('settings.account.bindEmailButton') }}</span>
      <span class="text-sm text-describe">{{ $t('settings.account.bindEmailTips') }}</span>
      <div class="text-md bound-email item-content">
        <v-row align="center">
          <v-col cols="9">
            {{ $t('settings.account.currentEmailLabel') }}: {{curUserDetail.email}}
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" block @click="setVisibleDialogName('modifyBindEmail')">{{ $t('common.modifyButton') }}</v-btn>
          </v-col>
        </v-row>
      </div>
    </div> -->
    <div class="account-item account-delete d-flex flex-clo">
      <span class="item-title title-xs">{{ $t('settings.account.deleteAccountButton') }}</span>
      <span class="text-sm text-describe">{{ $t('settings.account.deleteAccountTips') }}</span>
      <div class="item-content">
        <v-btn class="col-6" color="error" x-large disabled>{{ $t('settings.account.deleteAccountButton') }}</v-btn>
      </div>
    </div>
    <modify-bind-email></modify-bind-email>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { randomCSRFToken } from '@utils/tools'
import cookie from '@utils/cookie'
import oauthCONFIG from '@utils/oauthConfig'
import baseUrl from '@service/env'
import qs from 'qs'

import ModifyBindEmail from '@components/dialog/modifyBindEmail'
export default {
  data() {
    return {
      giteeLoading: false,
      githubLoading: false,
    }
  },
  computed: {
    ...mapState(['loginInfo', 'curUserDetail']),
  },
  methods: {
    ...mapMutations(['setUserBindInfo', 'setVisibleDialogName']),
    unbindTip(type) {
      this.$alert({
        content: this.$t('settings.account.unbindConfirmTips'),
        okColor: 'error',
        okText: this.$t('settings.account.unbindButton'),
      }).then((isUnbind) => {
        if (isUnbind) {
          if (type === 'gitee') {
            this.unbindGitee()
          } else {
            this.unbindGithub()
          }
        }
      })
    },
    async unbindGitee() {
      try {
        const res = await this.$http.unbindGitee({
          username: this.loginInfo.username,
        })
        if (res.state) {
          this.$message.success(this.$t('settings.account.unbindSuccessTips'))
          this.setUserBindInfo({ key: 'giteeId', val: '' })
        } else {
          this.$message.error(this.$t('settings.account.unbindErrorMessage'))
        }
      } catch (err) {
        console.log(err)
      }
    },
    unbindGithub() {
      const formData = new FormData()
      formData.append('username', this.loginInfo.username)
      this.$http.unbindGithub(formData).catch((err) => {
        console.log(err)
        this.$message.error(this.$t('settings.account.unbindErrorMessage'))
      })
    },
    bindGithub() {},
    bindGitee() {
      const csrfT = randomCSRFToken()
      const requireStr = qs.stringify({
        client_id: oauthCONFIG.gitee.clientID,
        redirect_uri: `${baseUrl.client}/?type=gitee`,
        response_type: 'code',
        state: csrfT,
      })
      cookie.set('CSRF_TOKEN', csrfT, 60 * 10)
      window.open(`https://gitee.com/oauth/authorize?${requireStr}`, '_self')
    },
  },
  components: {
    ModifyBindEmail,
  },
}
</script>

<style lang="scss" scoped>
#account {
  .account-item {
    margin-bottom: 15px;
    .item-title {
      margin-bottom: 10px;
    }
    .item-content {
      margin-top: 25px;
    }
  }
  .account-third {
    .third-list {
      margin-bottom: 15px;
      .icon {
        margin-right: 25px;
      }
    }
  }
  .account-email {
    .bound-email {
      margin-top: 15px;
      margin-bottom: 25px;
      color: $light-5;
    }
  }
}
</style>
