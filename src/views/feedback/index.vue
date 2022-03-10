<template>
  <div id="feedback" class="d-flex flex-jcc">
    <div class="feedback-list d-flex borbox" v-if="showList">
      <article class="feedback-item borbox d-flex flex-clo" v-for="(item, index) in feedbackList" :key="index">
        <span class="title-sm">{{item.title}}</span>
        <span class="item-content">{{item.content}}</span>
        <div class="item-footer d-flex flex-jcb">
          <span>{{expList[item.emoji]}}</span>
          <span>By {{item.username}}</span>
        </div>
      </article>
    </div>
    <div class="feedback-box" v-else>
      <div class="title-xl">
        <span>{{ $t('feedback.title') }}</span>
      </div>
      <div class="feedback-content d-flex flex-clo">
        <v-form ref="form">
          <v-text-field autocomplete="off" :label="$t('feedback.title2')" background-color="info" solo required v-model="form.title"
            :rules="rules.title">
          </v-text-field>
          <v-textarea :label="$t('feedback.content')" background-color="info" solo maxlength="200" counter="200" rows="8" no-resize
            required v-model="form.content" :rules="rules.content"></v-textarea>
        </v-form>
      </div>
      <div class="feedback-footer d-flex flex-jcb">
        <div class="exp">
          <v-btn-toggle tile group borderless active-class="selected-exp" v-model="form.emoji">
            <v-btn v-for="(exp, index) in expList" :key="index" class="">
              <span class="title-xs">{{exp}}</span>
            </v-btn>
          </v-btn-toggle>
        </div>
        <v-btn color="primary" :loading="loading" @click="submitSuggestion">{{ $t('feedback.submitButton') }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Feedback',
  data() {
    return {
      expList: Object.freeze(['😁', '😊', '😐', '😕', '😡']),
      form: {
        title: '',
        content: '',
        emoji: 0,
      },
      rules: {
        title: [
          (v) => !!v || this.$t('feedback.titleRequiredTips'),
          (v) => (v && v.length <= 25) || this.$t('feedback.titleMaxLengthTips'),
        ],
        content: [(v) => !!v || this.$t('feedback.contentRequiredTips')],
      },
      loading: false,
      feedbackList: [],
      showList: false,
    }
  },
  created() {
    if (this.loginInfo.username === 'root') {
      this.showList = true
      this.$http.getFeedbacks().then(({ state, data }) => {
        if (state) {
          this.$message.success(this.$t('feedback.fetchFeedbackSuccessTips'))
          this.feedbackList = data
        }
      })
    }
  },
  computed: {
    ...mapState(['loginInfo', 'loginState']),
  },
  methods: {
    selectExp(index) {
      this.form.emoji = index
    },
    async submitSuggestion() {
      if (!this.validate()) return void 0
      this.loading = true
      try {
        const username = this.loginInfo.username
        const res = await this.$http.sendFeedback({ ...this.form, username })
        if (res.state) {
          this.$message.success(this.$t('feedback.feedbackSuccessTips'))
          this.reset()
        } else {
          this.$message.error(this.$t('feedback.feedbackErrorMessage'))
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
#feedback {
  padding: 60px 0 200px 0;
  .feedback-box {
    .feedback-content {
      margin-top: 40px;
    }
    .feedback-footer {
      .exp {
        height: 40px;
        padding: 0 15px;
        border-radius: 20px;
        background-color: $deep-4;
        box-shadow: $shadow-1;
        .v-btn {
          height: 36px;
          min-width: 36px;
          padding: 0;
          border-radius: 50%;
        }
      }
    }
  }
  .feedback-list {
    display: flex;
    flex-flow: column wrap;
    &::before,
    &::after {
      content: '';
      flex-basis: 100%;
      width: 0;
      order: 2;
    }
    .feedback-item {
      padding: 15px;
      width: calc(100% / 3 - 15px);
      margin: 0 7.5px 15px 7.5px;
      background-color: $deep-4;
      border-radius: 4px;
      box-shadow: $shadow-1;
      &:nth-child(3n + 1) {
        order: 1;
      }
      &:nth-child(3n + 2) {
        order: 2;
      }
      &:nth-child(3n) {
        order: 3;
      }
      .item-content {
        margin-top: 5px;
        color: $light-4;
      }
      .item-footer {
        margin-top: 10px;
      }
    }
  }
}

@include PC {
  #feedback {
    .feedback-box {
      width: 50%;
    }
  }
}
</style>
