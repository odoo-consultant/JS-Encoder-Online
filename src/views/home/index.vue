<template>
  <div id="home" class="d-flex flex-clo" v-once>
    <div class="introduce d-flex">
      <div class="preview">
        <img class="preview1-img" :src="`${qiNiuImgLink}preview1.svg?2`" alt="">
        <img class="preview2-img" :src="`${qiNiuImgLink}preview2.svg`" alt="">
      </div>
      <div class="main-content">
        <div class="slogan d-flex flex-clo">
          <span class="slogan-1 title-xl">{{ $t('home.slogan1') }}</span>
          <span class="slogan-2 title-m">{{ $t('home.slogan2') }}</span>
        </div>
        <div class="btn-opt">
          <v-btn class="btn-create" x-large color="primary" @click="newWork">{{ $t('home.createNow') }}</v-btn>
          <v-btn class="btn-offline" x-large outlined color="primary" @click="goToOffline">{{ $t('home.viewDocument') }}</v-btn>
        </div>
      </div>
    </div>
    <div class="features">
      <div class="features-question">
        <span class="logo-text">OWL Encoder</span>
        <span class="title-xl"> {{ $t('home.whatisOOE') }}</span>
      </div>
      <ul class="features-list">
        <li class="d-flex flex-clo" v-for="(item, index) in featuresList" :key="index">
          <div>
            <i class="icon iconfont" :class="item.icon" :style="{color:item.color}"></i>
            <span class="feature-title">{{ $t(item.title) }}</span>
          </div>
          <span class="feature-content">{{ $t(item.content) }}</span>
        </li>
      </ul>
    </div>
    <login-verify></login-verify>
  </div>
</template>

<script>
import loginVerify from '@components/dialog/loginVerify'
import { qiNiuImgLink } from '@utils/publicData'
export default {
  name: 'Home',
  data() {
    return {
      qiNiuImgLink,
      featuresList: Object.freeze([
        {
          icon: 'icon-yuncunchu',
          title: 'home.features.cloudStorage',
          content: 'home.features.cloudStorageDesc',
          color: '#1296db',
        },
        {
          icon: 'icon-daorudaochu',
          title: 'home.features.importExport',
          content: 'home.features.importExportDesc',
          color: '#d81e06',
        },
        {
          icon: 'icon-gexinghuapeizhi',
          title: 'home.features.customizable',
          content: 'home.features.customizableDesc',
          color: '#d4237a',
        },
        {
          icon: 'icon-bianma',
          title: 'home.features.codeSyntax',
          content: 'home.features.codeSyntaxDesc',
          color: '#1890ff',
        },
        {
          icon: 'icon-markdown1',
          title: 'home.features.markdown',
          content: 'home.features.markdownDesc',
          color: '#05104b',
        },
        {
          icon: 'icon-console1',
          title: 'home.features.console',
          content: 'home.features.consoleDesc',
          color: '#1afa29',
        },
      ]),
    }
  },
  // computed: {
  //   slogan1() {
  //     console.log(this.$t('home.slogan1'))
  //     return this.$t('home.slogan1')
  //   }
  // },

  methods: {
    newWork() {
      this.$router.push({ name: 'NewWork' })
    },
    goToOffline() {
      window.open('http://jsencoder.lliiooiill.cn/')
    },
  },
  components: {
    loginVerify,
  },
}
</script>

<style lang="scss" scoped>
#home {
  position: relative;
  .introduce {
    margin: 0 auto;
    width: 100%;
    position: relative;
    .preview {
      .preview1-img,
      .preview2-img {
        width: 460px;
        position: absolute;
        opacity: 0;
      }
      .preview1-img {
        top: 40%;
        right: 0;
        transform: translateY(-50%);
        box-shadow: $shadow-1;
        @include animation(fade-left, 0.3s, 0.3s, ease, forwards);
      }
      .preview2-img {
        top: 55%;
        right: 6%;
        box-shadow: $shadow-2;
        @include animation(fade-left, 0.3s, 0.5s, ease, forwards);
      }
    }
    .main-content {
      margin: 200px 0 0 0;
      .slogan {
        margin-bottom: 100px;
        .slogan-1,
        .slogan-2 {
          opacity: 0;
          @include animation(fade-right, 0.3s, 0.3s, ease, forwards);
        }
        .slogan-1 {
          margin-bottom: 25px;
        }
      }
      .btn-opt {
        .btn-create,
        .btn-offline {
          opacity: 0;
          @include animation(fade-right, 0.3s, 0.5s, ease, forwards);
        }
        .btn-create {
          margin-right: 25px;
        }
      }
    }
  }
  .features {
    .features-question {
      margin: 0 auto;
      .logo-text {
        color: #1980ff;
        font-size: 48px;
      }
    }
    .features-list {
      display: grid;
      grid-gap: 100px 100px;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      margin: 0 auto;
      margin-top: 50px;
      padding: 50px 0 150px 0;
      .icon {
        font-size: 40px;
        text-shadow: 0 1px 3px $deep-6;
      }
      .feature-title {
        margin-left: 10px;
        font-size: 20px;
      }
      .feature-content {
        color: $light-4;
        margin-top: 10px;
      }
    }
  }
}
@include Mobile {
  #home {
    .introduce {
      min-height: calc(100vh - 70px);
      .main-content {
        width: 100%;
        margin: 0;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
@include PC {
  #home {
    .introduce {
      height: calc(100vh - 70px);
      min-height: 700px;
      max-width: 1150px;
    }
    .features {
      min-height: 80vh;
      .features-list,
      .features-question {
        max-width: 1150px;
      }
    }
  }
}
@include screenXS {
  #home {
    .introduce {
      min-height: 800px;
      .preview {
        .preview1-img,
        .preview2-img {
          width: 85%;
          max-width: 350px;
        }
        .preview1-img {
          top: 40%;
        }
        .preview2-img {
          top: 45%;
        }
      }
      .main-content {
        .slogan {
          align-items: center;
          margin-bottom: 450px;
          .slogan-1 {
            font-size: 24px;
          }
        }
        .btn-opt {
          width: 85%;
          display: flex;
          flex-direction: column;
          .btn-create {
            margin-right: 0;
            margin-bottom: 15px;
          }
        }
      }
    }
    .features {
      margin-top: 100px;
      .features-list,
      .features-question {
        width: 85%;
      }
    }
  }
}
@include screenSM {
  #home {
    padding-bottom: 100px;
    .introduce {
      min-height: 100vh;
      .preview {
        .preview1-img,
        .preview2-img {
          width: 65%;
          max-width: 450px;
        }
        .preview1-img {
          top: 45%;
        }
        .preview2-img {
          top: 51%;
        }
      }
      .main-content .slogan {
        margin-bottom: 80%;
      }
    }
  }
  .features {
    margin-top: 100px;
    .features-list,
    .features-question {
      width: 85%;
    }
  }
}
@include screenMD {
  #home {
    .introduce {
      .preview {
        .preview1-img,
        .preview2-img {
          width: 350px;
        }
      }
      .main-content {
        margin: 150px 0 0 50px;
      }
    }
    .features-list,
    .features-question {
      width: 85%;
    }
  }
}
@include screenLG {
  #home {
    .introduce {
      .main-content {
        margin: 150px 0 0 0;
      }
    }
  }
}
</style>
