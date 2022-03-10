<template>
  <v-dialog id="loginVerify" max-width="500" v-model="visible" persistent>
    <v-card>
      <v-card-title class="info">
        <span class="title-md">{{ $t('signin.verify.title') }}</span>
      </v-card-title>
      <v-card-text>
        <div class="content">
          <span class="title-xs">{{ $t('signin.verify.headerTips') }}</span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="toLogin">{{ $t('signin.verify.yesToSignin') }}</v-btn>
        <v-btn color="primary" @click="toSignUp">{{ $t('signin.verify.noToSignup') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      name: 'loginVerify',
      visible: false,
    }
  },
  created() {
    this.visible = this.name === this.visibleDialogName
  },
  computed: {
    ...mapState(['visibleDialogName']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
    toLogin() {
      this.$router.push({ name: 'Login' })
      this.closeDialog()
    },
    toSignUp() {
      this.$router.push({ name: 'Signup' })
      this.closeDialog()
    },
    closeDialog() {
      this.setVisibleDialogName('')
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
}
</style>
