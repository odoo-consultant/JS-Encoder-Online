<template>
  <v-dialog id="settings" v-model="visible" max-width="500" @click:outside="closeDialog"
    content-class="settings-dialog">
    <v-card>
      <v-card-title>
        <span class="title-xs">{{ $t('instance.settings.title') }}</span>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-clo">
          <span class="lib-title">{{ $t('instance.settings.executeDelayTime') }}</span>
          <span class="text-xs text-describe">{{ $t('instance.settings.executeDelayTimeTips') }}</span>
          <div class="d-flex flex-ai delay">
            <input-number v-model="settings.delayTime" :hideDetails="true" :min="200" :step="50"></input-number>
            <span class="unit">(ms)</span>
          </div>
          <v-checkbox dense :label="$t('instance.settings.autoExecute')" hide-details v-model="settings.autoExecute"></v-checkbox>
          <span class="text-xs text-describe">{{ $t('instance.settings.autoExecuteTips') }}</span>
          <v-checkbox dense :label="$t('instance.settings.autoComplete')" hide-details v-model="settings.autoComplete"></v-checkbox>
          <span class="text-xs text-describe">{{ $t('instance.settings.autoCompleteTips') }}</span>
          <v-checkbox dense :label="$t('instance.settings.lint')" hide-details v-model="settings.lint"></v-checkbox>
          <span class="text-xs text-describe">{{ $t('instance.settings.lintTips') }}</span>
          <v-checkbox dense :label="$t('instance.settings.lineWrap')" hide-details v-model="settings.lineWrap"></v-checkbox>
          <span class="lib-title">{{ $t('instance.settings.codeIndent') }}</span>
          <v-checkbox dense :label="$t('instance.settings.replaceTabWithSpace')" hide-details v-model="settings.indent.replace"></v-checkbox>
          <div class="d-flex flex-ai">
            <span class="sub-title text-white">{{ $t('instance.settings.codeIndentNumber') }}: {{settings.indent.width}}</span>
            <v-slider color="primary" thumb-label hide-details ticks="always" step="2" v-model="settings.indent.width"
              :max="8">
            </v-slider>
          </div>
          <span class="lib-title">{{ $t('instance.settings.fontFamily') }}</span>
          <div class="d-flex flex-ai sub">
            <span class="sub-title text-white flex-sh">{{ $t('instance.settings.fontFamily') }}</span>
            <v-select class="family-select" solo hide-details background-color="info" dense :items="fontFamList"
              :menu-props="{ offsetY: true }" v-model="settings.font.family">
            </v-select>
          </div>
          <div class="d-flex flex-ai sub">
            <span class="sub-title text-white flex-sh">{{ $t('instance.settings.fontSize') }}</span>
            <v-select class="family-select" solo hide-details background-color="info" dense :items="fontSizeList"
              :menu-props="{ offsetY: true }" v-model="settings.font.size">
            </v-select>
          </div>
          <span class="lib-title">{{ $t('instance.settings.metaTags') }}</span>
          <v-textarea class="head-textarea" solo :label="$t('instance.settings.metaTagsTips')" hide-details
            background-color="info" rows="3" v-model="settings.headTags">
          </v-textarea>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import InputNumber from '@components/inputNumber.vue'
import { fontFamList, fontSizeList } from '@utils/publicData'
export default {
  data() {
    return {
      name: 'settings',
      settings: {
        delayTime: 500,
        autoExecute: true,
        autoComplete: true,
        lint: true,
        lineWrap: true,
        indent: {
          replace: true,
          width: 2,
        },
        font: {
          family: fontFamList[0],
          size: 14,
        },
        headTags: '',
      },
      visible: false,
      fontFamList,
      fontSizeList,
    }
  },
  created() {
    this.settings = JSON.parse(JSON.stringify(this.instanceSetting))
  },
  computed: {
    ...mapState(['visibleDialogName', 'instanceSetting']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setAllInstanceSetting']),
    closeDialog() {
      const settings = { ...this.settings }
      if (settings.lint) {
        settings.lint = { options: { esversion: 2021 } }
      }
      this.setAllInstanceSetting(settings)
      this.setVisibleDialogName('')
    },
  },
  components: {
    InputNumber,
  },
}
</script>

<style lang="scss">
.settings-dialog {
  .delay {
    width: 200px;
    margin-top: 5px;
    .unit {
      margin-left: 5px;
    }
  }
  .v-input--selection-controls {
    margin-top: 5px;
  }
  .lib-title {
    color: $light-2;
    margin-top: 5px;
  }
  .v-label {
    color: $light-2;
    font-size: 14px;
  }
  .sub {
    margin-top: 10px;
  }
  .sub-title {
    width: 150px;
    display: inline-block;
  }
  .head-textarea {
    font-family: $code;
    margin-top: 5px;
  }
}
</style>
