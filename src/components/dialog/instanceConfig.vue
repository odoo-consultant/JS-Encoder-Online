<template>
  <v-dialog id="instanceConfig" max-width="500" v-model="visible" @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-sm">{{ $t('instance.config.title') }}</span>
      </v-card-title>
      <v-card-text style="padding-bottom:0">
        <v-form class="form d-flex flex-clo" ref="form">
          <span class="form-item-title">{{ $t('instance.config.workNameLabel') }}</span>
          <v-text-field class="form-item-input" solo :label="$t('instance.config.inputWorkNameTips')" background-color="info" v-model="form.title"
            :rules="rules.title">
          </v-text-field>
          <span class="form-item-title">{{ $t('instance.config.workTag') }}</span>
          <span class="text-describe">{{ $t('instance.config.workTagTips') }}</span>
          <v-combobox class="form-item-input" background-color="info" clearable multiple chips solo label="$t('instance.config.inputWorkTagTips')"
            hide-selected v-model="form.tags" :items="tagList" :disable-lookup="form.tags.length>=3" :rules="rules.tags"
            @change="tagsChange">
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip color="#1a1a1a" close v-bind="attrs" :input-value="selected" @click="select"
                @click:close="removeTag(item)">
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>
          <span class="form-item-title">{{ $t('instance.config.workVisibility') }}</span>
          <span class="text-describe">{{ $t('instance.config.workVisibilityTips') }}</span>
          <v-radio-group v-model="form.ispublic" row mandatory>
            <v-radio :label="$t('instance.config.visibilityPublic')" :value="true"></v-radio>
            <v-radio :label="$t('instance.config.visibilityPrivate')" :value="false"></v-radio>
          </v-radio-group>
        </v-form>
      </v-card-text>
      <v-card-actions style="padding-bottom:20px">
        <v-btn class="save-btn" color="primary" block :loading="loading" @click="saveConfig">{{ $t('common.saveButton') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      name: 'instanceConfig',
      visible: false,
      form: {
        title: '',
        tags: [],
        ispublic: true,
      },
      // rules: {
      //   title: [(v) => !!v || '请填写实例标题！'],
      //   tags: [
      //     (v) => {
      //       for (let i = v.length - 1; i >= 0; i--) {
      //         if (v[i].length > 15) {
      //           return '每个标签长度不能大于15！'
      //         }
      //       }
      //       return true
      //     },
      //   ],
      // },
      tagList: [],
      loading: false,
    }
  },
  created() {
    const { title, tags, ispublic } = this.curInstanceDetail
    this.form = {
      title,
      tags: tags ? tags.split(',') : [],
      ispublic,
    }
  },
  computed: {
    ...mapState(['visibleDialogName', 'curInstanceDetail']),
    rules() {
      return {
        title: [(v) => !!v || this.$t('instance.config.titleRequiredTips')],
        tags: [
          (v) => {
            for (let i = v.length - 1; i >= 0; i--) {
              if (v[i].length > 15) {
                return this.$t('instance.config.tagMaxLengthTips')
              }
            }
            return true
          },
        ],
      }
    },
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setCurInstanceDetail']),
    validate() {
      return this.$refs.form.validate()
    },
    async saveConfig() {
      if (!this.validate()) return void 0
      this.loading = true
      try {
        const { title, tags, ispublic } = this.form
        const { id, ispublic: oldIspublic } = this.curInstanceDetail
        const reqObj = {
          exampleId: id,
          label: tags.toString(),
          exampleName: title,
        }
        if (ispublic !== oldIspublic) {
          reqObj.ispublic = ispublic
        }
        const res = await this.$http.configWork(reqObj)
        if (res.state) {
          this.setVisibleDialogName('')
          this.setCurInstanceDetail({ title, tags: tags.toString() })
          this.$message.success(this.$t('instance.config.configSuccessTips'))
        } else {
          switch (res.msg) {
            case 1: {
              this.$message.error(this.$t('instance.config.noMorePrivateWorks'))
              break
            }
            default: {
              this.$message.error(this.$t('instance.config.configErrorMessage'))
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    tagsChange(list) {
      const len = list.length
      if (len > 3) {
        this.removeTag(list[list.length - 1])
      }
    },
    removeTag(item) {
      const form = this.form
      form.tags.splice(form.tags.indexOf(item), 1)
      form.tags = [...form.tags]
    },
  },
}
</script>

<style lang="scss" scoped>
.form-item-input {
  margin-top: 10px;
}
</style>
