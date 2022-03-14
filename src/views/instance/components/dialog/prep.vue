<template>
  <v-dialog id="prep" max-width="450" v-model="visible" @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-xs">{{ $t('instance.preprocess.title') }}</span>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-clo prep">
          <div class="prep-item d-flex flex-ai" v-for="(item,index) in prepTitle" :key="index">
            <span class="flex-sh">{{item}}</span>
            <v-select solo hide-details dense background-color="info" v-model="prepList[index]"
              :items="defPrepOpts[item]"
              :menu-props="{ offsetY: true, transition:'slide-y-transition',closeOnClick:true }"
              @change="prepChange(index)">
            </v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { defPrepOpts } from '@utils/publicData'
import { judgeMode } from '@utils/editor/judgeMode'
export default {
  data() {
    return {
      name: 'prep',
      visible: false,
      defPrepOpts: Object.freeze(defPrepOpts),
      prepList: null,
      prepTitle: Object.freeze(['HTML', 'CSS', 'JavaScript']),
    }
  },
  created() {
    this.prepList = [...this.prep]
  },
  computed: {
    ...mapState(['visibleDialogName', 'prep', 'curTab', 'topPrep', 'bottomPrep']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
    visible(newState) {
      if(newState){
        this.prepList = [...this.prep]
      }
    }
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setPrep', 'setCurTab', 'setTopPrep', 'setBottomPrep']),
    prepChange(index) {
      // reset topPrep & bottomPrep
      if (this.topPrep.length > 0 && this.bottomPrep.length > 0) {
        // let newPrep2 = []
        // let dirty = false

        // this.topPrep.forEach(item => {
        //   if (item == this.curTab) {
        //     newPrep2.push(newPrep)
        //     dirty = true
        //   } else {
        //     newPrep2.push(item)
        //   }
        // })

        // if (dirty) {
        //   this.setTopPrep(newPrep2)
        // } else {
        //   newPrep2 = []
        //   this.bottomPrep.forEach(item => {
        //     if (item == this.curTab) {
        //       newPrep2.push(newPrep)
        //       dirty = true
        //     } else {
        //       newPrep2.push(item)
        //     }
        //   })
        //   this.setBottomPrep(newPrep2)
        // }
        this.setTopPrep([])
        this.setBottomPrep([])
      }
      
      const newPrep = this.prepList[index]
      this.setPrep({ index, newPrep })
      if (judgeMode(newPrep) === judgeMode(this.curTab)) {
        this.setCurTab(newPrep)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* main style */
.prep {
  .prep-item {
    &:not(:first-child) {
      margin-top: 10px;
    }
    & > span {
      color: $light-2;
      width: 100px;
    }
  }
}
</style>
