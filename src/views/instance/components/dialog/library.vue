<template>
  <v-dialog id="library" max-width="500" content-class="library-dialog" v-model="visible" @click:outside="closeDialog">
    <v-card>
      <v-card-title>
        <span class="title-xs">{{ $t('instance.library.title') }}</span>
      </v-card-title>
      <v-card-text>
        <v-card class="d-flex flex-ai error-tip" color="error" v-if="cdnError">
          <div class="d-flex flex-ai">
            <span>{{ $t('instance.library.CDNErrorTips') }}</span>
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn small @click="loadLibs" :loading="loadingLibs">{{ $t('instance.library.retry') }}</v-btn>
          </div>
        </v-card>
        <div class="d-flex flex-clo">
          <span class="text-md lib-title">{{ $t('instance.library.outerCss') }}</span>
          <span class="text-xs text-describe">{{ $t('instance.library.outerCssTips') }}</span>
          <v-autocomplete flat dense solo hide-details background-color="info" :label="$t('instance.library.searchingOuterCss')" return-object
            item-text="name" :no-data-text="$t('instance.library.noMatchedCDN')" :items="cssLibList"
            :menu-props="{ offsetY: true, closeOnContentClick: true}">
            <template v-slot:item="{ item }">
              <v-list-item class="d-flex text-sm" link @click="addLink('css', item)">
                <span style="margin-right:20px" class="flex-1">{{ item.name }}</span>
                <span class="text-describe flex-sh">V{{ item.version }}</span>
              </v-list-item>
            </template>
          </v-autocomplete>
          <v-text-field class="lib-input-list" solo dense flat background-color="info" hide-details
            v-model="cssUseList[index]" v-for="(item, index) in showCSSInput" :key="`css${index}`">
            <template v-slot:prepend-inner>
              <div class="pointer d-flex flex-clo" @click.prevent>
                <v-icon class="icon" small :disabled="index===0" @click="resort(index,'up','css')">mdi-chevron-up
                </v-icon>
                <v-icon class="icon" small :disabled="index===showCSSInput-1" @click="resort(index,'down','css')">
                  mdi-chevron-down
                </v-icon>
              </div>
            </template>
            <template v-slot:append>
              <v-btn icon x-small @click="delLink('css', index)">
                <v-icon class="icon">mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-btn class="add-btn" block color="info" @click="showCSSInput++">{{ $t('instance.library.addOuterCss') }}</v-btn>
          <span class="text-md lib-title">{{ $t('instance.library.outerJs') }}</span>
          <span class="text-xs text-describe">{{ $t('instance.library.outerJsTips') }}</span>
          <v-autocomplete :items="jsLibList" flat dense solo hide-details background-color="info" :label="$t('instance.library.searchingOuterJs')"
            return-object item-text="name" :menu-props="{ offsetY: true, closeOnContentClick: true}"
            :no-data-text="$t('instance.library.noMatchedCDN')">
            <template v-slot:item="{ item }">
              <v-list-item class="d-flex text-sm" link @click="addLink('js', item)">
                <span style="margin-right:20px" class="flex-1">{{ item.name }}</span>
                <span class="text-describe flex-sh">V{{ item.version }}</span>
              </v-list-item>
            </template>
          </v-autocomplete>
          <v-text-field class="lib-input-list" solo dense flat background-color="info" hide-details
            v-for="(item, index) in showJSInput" :key="`js${index}`" v-model="jsUseList[index]">
            <template v-slot:prepend-inner>
              <div class="pointer d-flex flex-clo" @click.prevent>
                <v-icon class="icon" small :disabled="index===0" @click="resort(index,'up','js')">mdi-chevron-up
                </v-icon>
                <v-icon class="icon" small :disabled="index===showJSInput-1" @click="resort(index,'down','js')">
                  mdi-chevron-down
                </v-icon>
              </div>
            </template>
            <template v-slot:append>
              <v-btn icon x-small @click="delLink('js', index)">
                <v-icon class="icon">mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-btn class="add-btn" block color="info" @click="showJSInput++">{{ $t('instance.library.addOuterJs') }}</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { httpUrl } from '@utils/regexp'
export default {
  data() {
    return {
      name: 'library',
      /* 全部列表 */
      cssLibList: [],
      jsLibList: [],
      /* 用户应用的cdn列表 */
      cssUseList: [],
      jsUseList: [],
      showCSSInput: 1,
      cssLoading: false,
      showJSInput: 1,
      visible: false,
      cdnError: false,
      loadingLibs: false
    }
  },
  mounted() {
    this.loadLibs()
    this.setLibs()
  },
  computed: {
    ...mapState(['visibleDialogName', 'instanceExtLinks']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
      if (this.visible) {
        this.setLibs()
      }
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setAllInstanceExtLinks']),
    loadLibs() {
      this.loadingLibs = true
      this.$http
        .searchCDNList()
        .then(({ results }) => {
          this.cssLibList = Object.freeze(results.filter((item) => item.fileType === 'css'))
          this.jsLibList = Object.freeze(results.filter((item) => item.fileType === 'js'))
          this.loadingLibs = false
        })
        .catch(() => {
          this.loadingLibs = false
          this.cdnError = true
        })
    },
    setLibs() {
      const { cssLinks, JSLinks } = this.instanceExtLinks
      this.cssUseList = cssLinks
      this.jsUseList = JSLinks
      this.showCSSInput = cssLinks.length
      this.showJSInput = JSLinks.length
    },
    addLink(type, item) {
      if (type === 'css') {
        const list = this.cssUseList
        const index = this.findBlankElement(list)
        if (index !== null) {
          list[index] = item.latest
        } else {
          list.push(item.latest)
          if (list.length > this.showCSSInput) this.showCSSInput++
        }
      } else {
        const list = this.jsUseList
        const index = this.findBlankElement(list)
        if (index !== null) {
          list[index] = item.latest
        } else {
          list.push(item.latest)
          if (list.length > this.showJSInput) this.showJSInput++
        }
      }
    },
    delLink(type, index) {
      if (type === 'css') {
        if (this.showCSSInput > 0) this.showCSSInput--
        this.cssUseList.splice(index, 1)
      } else {
        if (this.showJSInput > 0) this.showJSInput--
        this.jsUseList.splice(index, 1)
      }
    },
    findBlankElement(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') return i
      }
      return null
    },
    resort(index, direction, type) {
      const list = type === 'css' ? this.cssUseList : this.jsUseList
      if (direction === 'up') {
        list.splice(index - 1, 1, ...list.splice(index, 1, list[index - 1]))
      } else {
        list.splice(index + 1, 1, ...list.splice(index, 1, list[index + 1]))
      }
    },
    closeDialog() {
      const { cssUseList, jsUseList } = this
      const cssLinks = [],
        JSLinks = []
      cssUseList.forEach((item) => {
        if (httpUrl.test(item)) cssLinks.push(item)
      })
      jsUseList.forEach((item) => {
        if (httpUrl.test(item)) JSLinks.push(item)
      })
      this.setAllInstanceExtLinks({ cssLinks, JSLinks })
      this.setVisibleDialogName('')
    },
  },
}
</script>

<style lang="scss">
.library-dialog {
  .v-card .error-tip {
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  .v-label {
    font-size: 14px !important;
  }
  .lib-input-list {
    margin-top: 10px;
  }
  .icon {
    color: $light-4;
    &:hover {
      color: $light-2;
    }
  }
  .add-btn {
    margin: 10px 0;
  }
  .lib-title {
    color: $light-2;
  }
}
</style>