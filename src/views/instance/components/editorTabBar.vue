<template>
  <div id="editorTabBar" class="d-flex no-select">
    <div class="tab-list d-flex flex-1" ref="tabList">
        <template v-if="layoutPos === 'top' && topPrep.length > 0 && bottomPrep.length > 0">
          <div class="editor-tab d-flex flex-jcc flex-ai" v-if="topPrep.includes(item)" v-for="(item, index) in prep" :key="index" 
            :class="(curTab === item || lastTopTab === item) ? 'active-tab' : ''" @click="setTopTab(item)">
            <i class="icon iconfont" :class="iconMap[item]"></i>{{ item }}
          </div>
        </template>
        <template v-if="layoutPos === 'bottom' && topPrep.length > 0 && bottomPrep.length > 0">
          <div class="editor-tab d-flex flex-jcc flex-ai" v-if="bottomPrep.includes(item)" v-for="(item, index) in prep" :key="index"
            :class="(curTab === item || lastBottomTab === item) ? 'active-tab' : ''" @click="setBottomTab(item)">
            <i class="icon iconfont" :class="iconMap[item]"></i>{{ item }}
          </div>
        </template>
        <template v-if="bottomPrep.length == 0 || topPrep.length == 0">
          <div class="editor-tab d-flex flex-jcc flex-ai" v-for="(item, index) in prep" :key="index"
            :class="curTab === item ? 'active-tab' : ''" @click="setCurTab(item)">
            <i class="icon iconfont" :class="iconMap[item]"></i>{{ item }}
          </div>
        </template>
    </div>
    <div class="tools d-flex flex-sh">
      <div class="tool d-flex flex-ai flex-jcc" v-if="curTab === 'Markdown'" :class="{'active':mdToolbarVisible}"
        @click="setMdToolbarVisible(!mdToolbarVisible)">
        <i class="icon iconfont icon-gongju1"></i>
      </div>
      <div class="tool other d-flex flex-ai flex-jcc">
        <v-menu class="tools-dropdown" bottom offset-y left>
          <template v-slot:activator="{ attrs, on }">
            <v-btn height="25" width="25" icon v-bind="attrs" v-on="on">
              <i class="icon iconfont icon-menu"></i>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in toolsList" :key="item.value"
            class="d-flex flex-ai pointer text-sm" style="font-family:Consolas, Monaco" @click.native="selectTool(item.value)"
            dense link>
              <span class="flex-1">{{ $t(item.label) }}</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import WheelDirective from '@utils/editor/wheelDirective'
export default {
  props: {
    layoutPos: String,
  },  
  data() {
    return {
      iconMap: Object.freeze({
        HTML: 'icon-html',
        Markdown: 'icon-markdown',
        Pug: 'icon-pug',
        CSS: 'icon-style',
        Less: 'icon-less',
        Sass: 'icon-Sass',
        Scss: 'icon-Sass',
        Stylus: 'icon-stylus',
        JavaScript: 'icon-javascript',
        TypeScript: 'icon-typescript',
        CoffeeScript: 'icon-coffeescript',
        JSX: 'icon-jsx'
      }),
      toolsList: [{
        label: 'instance.editor.formatCode',
        value: 'format'
      }, {
        label: 'instance.editor.switchView',
        value: 'updown'
      }]
    }
  },
  created() {
    if (!this.lastTopTab) {
      this.setLastTopTab(this.topPrep.length > 0 ? this.topPrep[0] : '')
    }
    if (!this.lastBottomTab) {
      this.setLastBottomTab(this.bottomPrep.length > 0 ? this.bottomPrep[0] : '')
    }
  },
  mounted() {
    new WheelDirective(this.$refs.tabList)
  },
  computed: {
    ...mapState(['prep', 'topPrep', 'bottomPrep', 'curTab', 'lastTopTab', 'lastBottomTab', 'mdToolbarVisible']),
  },
  methods: {
    ...mapMutations(['setCurTab', 'setLastTopTab', 'setLastBottomTab', 'setMdToolbarVisible']),
    setTopTab(tab) {
      this.setLastTopTab(tab)
      this.setCurTab(tab)
    },
    setBottomTab(tab) {
      this.setLastBottomTab(tab)
      this.setCurTab(tab)
    },
    selectTool(toolName){
      this.$emit('selectTool', toolName, this.layoutPos)
    }
  },
  components: {},
}
</script>

<style lang="scss" scoped>
@include scrollBar();
#editorTabBar {
  width: 100%;
  height: 30px;
  background-color: $deep-3;
  .tab-list {
    width: 100%;
    overflow-y: hidden;
    overflow-x: overlay;
    position: relative;
    &::-webkit-scrollbar {
      outline: none;
      height: 4px;
      background-color: transparent;
      @include setTransition(all, 0.3s, ease);
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(30, 30, 30, 0);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(80, 80, 80, 0.3);
    }
    &::-webkit-scrollbar-thumb:hover {
      outline: none;
      background-color: rgba(80, 80, 80, 0.7);
    }
    .editor-tab {
      padding: 0 20px;
      color: $light-5;
      background-color: $deep-2;
      font-size: 14px;
      font-family: $code;
      cursor: pointer;
      i {
        margin-right: 5px;
        font-size: 18px;
      }
      &:not(:first-child) {
        border-left: 1px solid $deep-5;
      }
      &:hover {
        color: $light-2;
      }
    }
    .active-tab {
      background-color: $deep-4;
      color: $light-2;
    }
  }
  .tools {
    font-size: 18px;
    color: $light-5;
    .tool {
      width: 40px;
      cursor: pointer;
      &:hover {
        color: $light-2;
      }
    }
    .other {
      i {
        color: $light-5;
        cursor: pointer;
        &:hover {
          color: $light-2;
        }
      }
    }
    .active {
      color: $primary-1;
    }
  }
}
/* icon style */
.icon-html {
  color: $red-1;
}
.icon-markdown {
  color: $primary-1;
}
.icon-pug {
  color: $light-2;
}
.icon-style {
  color: $blue-1;
}
.icon-less {
  color: $light-2;
}
.icon-Sass {
  color: $pink-1;
}
.icon-stylus {
  color: $orange-1;
}
.icon-javascript {
  color: $warning-1;
}
.icon-typescript {
  color: $primary-1;
}
.icon-coffeescript {
  color: $pink-2;
}
.icon-jsx {
  color: #61dafb;
}
</style>
