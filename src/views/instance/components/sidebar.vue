<template>
  <div id="sidebar" class="borbox">
    <div class="tool-list">
      <v-tooltip color="info" transition="scroll-x-transition" right v-for="(item, index) in menuList" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <div class="tool d-flex flex-ai flex-jcc" v-bind="attrs" v-on="on" @click="setVisibleDialogName(item.name)">
            <i class="icon iconfont" :class="item.icon"></i>
          </div>
        </template>
        <span>{{ $t(item.text)}}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      menuList: Object.freeze([
        {
          text: 'instance.sidebar.templates',
          name: 'templates',
          icon: 'icon-template'
        },
        {
          text: 'instance.sidebar.prep',
          name: 'prep',
          icon: 'icon-shalou',
        },
        {
          text: 'instance.sidebar.library',
          name: 'library',
          icon: 'icon-ku',
        },
        {
          text: 'instance.sidebar.settings',
          name: 'settings',
          icon: 'icon-kongzhitai',
        },
        {
          text: 'instance.sidebar.upload',
          name: 'upload',
          icon: 'icon-yunduanshangchuan',
        },
        {
          text: 'instance.sidebar.download',
          name: 'download',
          icon: 'icon-xiazai1',
        },
        {
          text: 'instance.sidebar.shortcut',
          name: 'shortcut',
          icon: 'icon-kuaijiejian1',
        },
      ]),
    }
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  width: 41px;
  height: 100%;
  background-color: $deep-2;
  border-right: 1px solid $deep-5;
  .tool-list {
    width: 100%;
    .tool {
      width: 100%;
      height: 40px;
      cursor: pointer;
      &:hover {
        background-color: $deep-4;
        .icon {
          color: $light-2;
        }
      }
      .icon {
        font-size: 24px;
        color: $light-5;
      }
    }
  }
}
</style>