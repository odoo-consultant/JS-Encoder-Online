<template>
  <div id="profile">
    <v-form autocomplete="off" ref="form">
      <div class="profile-item profile-avatar d-flex flex-clo">
        <span class="item-title title-xs">{{ $t('settings.profile.title') }}</span>
        <!-- <span class="text-sm text-describe">{{ $t('settings.profile.headerTips') }}</span> -->
        <div class="item-content d-flex flex-ai">
          <v-avatar size="150" color="primary">
            <img v-if="form.avatar||imgUrl" :src="imgUrl" />
            <span class="white--text text-h3" v-else>{{form.nickname|preNickname}}</span>
          </v-avatar>
          <v-btn class="upload-btn" color="info" v-show="false">
            <a class="upload-a" href="javascript:;" @change="chooseFile">
              <input class="upload-input pointer" ref="fileInput" type="file" accept="image/png,image/jpg,image/jpeg"
                multiple="multiple" />{{ $t('settings.profile.uploadButton') }}
            </a>
          </v-btn>
        </div>
      </div>
      <v-dialog persistent max-width="350" v-model="cropDialogVisible">
        <v-card>
          <v-card-title class="text-h5">{{ $t('settings.profile.cropImageButton') }}</v-card-title>
          <cropper ref="cropper" v-if="cropConf.cropVisible" :src="cropConf.cropUrl"></cropper>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="closeCrop">{{ $t('common.cancelButton') }}</v-btn>
            <v-btn color="primary" text @click="crop">{{ $t('common.confirmButton') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="profile-item profile-nickname d-flex flex-clo">
        <span class="item-title title-xs">{{ $t('common.nickname') }}</span>
        <v-text-field solo :label="$t('settings.profile.nicknameRequiredTips')" :hint="$t('settings.profile.nicknameMaxLengthTips')" background-color="info" v-model="form.nickname"
          :rules="rules.nickname"></v-text-field>
      </div>
      <div class="profile-item profile-about d-flex flex-clo">
        <span class="item-title title-xs">{{ $t('settings.profile.about') }}</span>
        <v-textarea solo :label="$t('settings.profile.aboutTips')" background-color="info" max-length="150" counter="150" rows="3" no-resize
          v-model="form.about" :rules="rules.about">
        </v-textarea>
      </div>
<!--       <div class="profile-item profile-about d-flex flex-clo">
        <span class="item-title title-xs">{{ $t('common.email') }}</span>
        <v-text-field solo :label="$t('settings.profile.emailTips')" background-color="info" v-model="form.email" :rules="rules.email">
        </v-text-field>
      </div> -->
      <v-btn color="primary" block x-large :loading="loading" @click="save">{{ $t('common.saveButton') }}</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import regexpList from '@utils/regexp'
import Cropper from '@components/cropper'
import cookie from '@utils/cookie'
import * as qiNiu from '@utils/qiNiu'
import { qiNiuImgLink } from '@utils/publicData'
export default {
  data() {
    return {
      qiNiuImgLink,
      imgUrl: '',
      form: {
        avatar: '',
        nickname: '',
        about: '',
        email: '',
      },
      rules: {
        nickname: [
          (v) => !!v || this.$t('settings.profile.nicknameRequiredTips'),
          (v) => (v && v.length <= 25) || this.$t('settings.profile.nicknameMaxLengthTips'),
        ],
        about: [(v) => !v || v.length <= 150 || this.$t('settings.profile.abountMaxLengthTips')],
        email: [(v) => !v || regexpList.email.test(v) || this.$t('settings.profile.emailFormatTips')],
      },
      loading: false,
      cropDialogVisible: false,
      cropConf: {
        cropUrl: '',
        cropVisible: false,
      },
    }
  },
  created() {
    const { avatar, nickname, about, contactEmail } = this.curUserDetail
    this.imgUrl = avatar ? avatar : ''
    this.form = {
      avatar,
      nickname,
      about,
      email: contactEmail,
    }
  },
  computed: {
    ...mapState(['curUserDetail', 'loginInfo']),
  },
  methods: {
    ...mapMutations(['setCurUserDetail', 'setLoginInfoItem']),
    chooseFile() {
      // 获取上传文件，判断文件是否满足要求，打开裁切窗口
      const input = this.$refs.fileInput
      const files = input.files
      if (!files.length) return void 0
      const file = files[0]
      if (!this.judgeFormatAndSize(file)) return void 0
      this.cropConf.cropUrl = URL.createObjectURL(file)
      this.cropDialogVisible = true
      this.cropConf.cropVisible = false
      this.$nextTick(() => {
        this.cropConf.cropVisible = true
      })
    },
    judgeFormatAndSize(file) {
      /**
       * 检测图片的格式和大小是否满足要求
       * 格式：jpg/png
       * 大小：小于等于2MB
       */
      const formatList = ['image/jpeg', 'image/png', 'image/jpg']
      const allow = formatList.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 <= 2
      if (!allow) {
        this.$alert({
          content: this.$t('settings.profile.fileFormatTips'),
          showCancel: false,
        })
      } else if (!isLt2M) {
        this.$alert({
          content: this.$t('settings.profile.imageMaxSizeTips'),
          showCancel: false,
        })
      }
      return allow && isLt2M
    },
    getCroppedImage(sourceCanvas) {
      /**
       * 获取裁切好的图片
       * 将图片分辨率变成150*150(分辨率比这低就不做处理)
       */
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const [width, height] = [150, 150]
      canvas.width = width
      canvas.height = height
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(sourceCanvas, 0, 0, width, height)
      ctx.globalCompositeOperation = 'destination-in'
      ctx.beginPath()
      ctx.rect(0, 0, width, height)
      ctx.fill()
      return canvas.toDataURL('image/webp', 0.8)
    },
    crop() {
      this.clearInputFiles()
      const sourceCanvas = this.$refs.cropper.$children[0].getCroppedCanvas()
      const image = this.getCroppedImage(sourceCanvas)
      this.imgUrl = image
      this.cropConf.cropUrl = ''
      this.cropDialogVisible = false
    },
    closeCrop() {
      this.clearInputFiles()
      this.cropDialogVisible = false
      this.cropUrl = ''
    },
    clearInputFiles() {
      this.$refs.fileInput.value = null
    },
    validate() {
      return this.$refs.form.validate()
    },
    async save() {
      if (!this.validate()) return void 0
      this.loading = true
      try {
        const { avatar, nickname, about, email } = this.form
        // const imgKey = await this.uploadAvatar()
        const imgKey = false
        const userInfo = {
          username: this.loginInfo.username,
          description: about,
          // contactEmail: email,
          name: nickname,
          // userPicture: imgKey || avatar,
          // oldImg: imgKey ? avatar : '',
        }
        const res = await this.$http.updateUserInfo(userInfo)
        if (res.state) {
          this.$message.success(this.$t('settings.profile.saveSuccessTips'))
          // 用户信息更新成功之后更新前端数据
          this.setCurUserDetail({
            nickname,
            about,
            // email,
            // avatar: imgKey,
          })
          // if (imgKey) {
          //   this.setLoginInfoItem({ key: 'avatar', val: imgKey })
          //   this.form.avatar = imgKey
          //   imgKey && (this.imgUrl = qiNiuImgLink + imgKey)
          // }
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    async uploadAvatar() {
      // 如果imgUrl既不是空也不是/images开头，说明换了新头像
      const imgUrl = this.imgUrl
      if (imgUrl === '' || /^\/images/.test(imgUrl)) return void 0
      let token = cookie.get('QI_NIU_TOKEN')
      // 如果没有token需要获取七牛云token
      if (!token) {
        token = await qiNiu.getToken()
        cookie.set('QI_NIU_TOKEN', token, 50 * 60)
      }
      try {
        const res = await qiNiu.sendImgToQiNiu(this.imgUrl, token)
        return res.data.key
      } catch (err) {
        console.log(err)
        // this.$message.error('上传头像失败！')
      }
    },
  },
  components: {
    Cropper,
  },
}
</script>

<style lang="scss">
.cropper {
  width: 350px;
  height: 200px;
}
.cropper-bg {
  background-repeat: repeat !important;
}
.cropper-view-box,
.cropper-face {
  border-radius: 50%;
}
</style>
<style lang="scss" scoped>
#profile {
  .profile-item {
    margin-bottom: 15px;
    .item-title {
      margin-bottom: 10px;
    }
    .item-content {
      margin-top: 25px;
    }
  }
  .profile-avatar {
    .upload-btn {
      padding: 0;
      margin-left: 50px;
      .upload-a {
        display: inline-block;
        padding: 0 40px;
        height: 40px;
        line-height: 40px;
        background-color: transparent;
        .upload-input {
          width: 100%;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          opacity: 0;
        }
      }
    }
  }
}
</style>
