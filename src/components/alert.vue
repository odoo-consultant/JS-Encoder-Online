<template>
  <v-overlay class="global-alert" v-model="visible">
    <v-dialog dark persistent v-model="visible" :style="{'z-index':zIndex}" :max-width="maxWidth" :width="width">
      <v-card>
        <v-card-title class="text-h5" v-if="title">{{title}}</v-card-title>
        <v-card-text>{{content}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="showCancel" @click="cancel">
            {{cancelText}}
          </v-btn>
          <v-btn :color="okColor" :loading="loading" @click="ok">
            {{okText}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() { return this.$t('common.prompt') },
    },
    width: {
      type: Number | String,
      default: 'auto',
    },
    maxWidth: {
      type: Number | String,
      default: 500,
    },
    content: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default() { return this.$t('common.confirmButton') },
    },
    okColor: {
      type: String,
      default: 'primary',
    },
    cancelText: {
      type: String,
      default() { return this.$t('common.cancelButton') },
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      visible: true,
      loading: false,
    }
  },
  methods: {
    cancel() {
      this.close()
      this.$emit('cancel')
    },
    ok() {
      this.close()
      this.$emit('ok')
    },
    close() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.v-dialog__content {
  align-items: flex-start;
  top: 25%;
}
</style>
