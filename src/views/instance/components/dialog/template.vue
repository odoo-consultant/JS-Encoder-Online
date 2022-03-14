<template>
  <v-dialog
    id="templates"
    v-model="visible"
    max-width="500"
    @click:outside="closeDialog"
    content-class="templates-dialog"
  >
    <v-card>
      <v-card-title>
        <span class="title-xs">{{ $t('instance.template.title') }}</span>
      </v-card-title>
      <v-card-text>
        <div class="templates d-flex flex-clo">
          <span class="temp-title">{{ $t('instance.template.headerTips') }}</span>
          <div class="template-list">
            <div
              class="template pointer d-flex flex-clo flex-ai flex-jcc"
              v-for="template in templateList"
              :key="template.label"
              @click="selectTemplate(template.label)"
            >
              <img :src="getTemplateIcon(template.svgName)" :alt="template.label" />
              <span class="name">{{ template.label }}</span>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      name: 'templates',
      visible: false,
      publicPath: process.env.BASE_URL,
      templatesInfo: {
        OWL: {
          preprocessor: ['OWL', 'CSS', 'JavaScript'],
          links: {
            cssLinks: [],
            JSLinks: ['https://moco.co/sgp_owl/static/lib/owl/owl.js']
          },
          code: {
            HTML: '<templates><div></div></templates>',
            CSS: '',
            JavaScript: ''
          }
        },
        QWEB: {
          preprocessor: ['QWEB', 'CSS', 'JavaScript'],
          links: {
            cssLinks: ['https://moco.co/web/static/lib/fontawesome/css/font-awesome.css',
                        'https://moco.co/web/static/lib/bootstrap/css/bootstrap.css'],
            JSLinks: ['https://moco.co/web/static/lib/jquery/jquery.js',
                      'https://moco.co/web/static/lib/popper/popper.js',
                      'https://moco.co/web/static/lib/bootstrap/js/index.js',
                      'https://moco.co/web/static/lib/bootstrap/js/util.js',
                      'https://moco.co/web/static/lib/bootstrap/js/alert.js',
                      'https://moco.co/web/static/lib/bootstrap/js/button.js',
                      'https://moco.co/web/static/lib/bootstrap/js/carousel.js',
                      'https://moco.co/web/static/lib/bootstrap/js/collapse.js',
                      'https://moco.co/web/static/lib/bootstrap/js/dropdown.js',
                      'https://moco.co/web/static/lib/bootstrap/js/modal.js',
                      'https://moco.co/web/static/lib/bootstrap/js/tooltip.js',
                      'https://moco.co/web/static/lib/bootstrap/js/popover.js',
                      'https://moco.co/web/static/lib/bootstrap/js/scrollspy.js',
                      'https://moco.co/web/static/lib/bootstrap/js/tab.js']
          },
          code: {
            HTML: '<h1>This is a template of QWEB!</h1>',
            CSS: '',
            JavaScript: ''
          }
        },     
        // Vanilla: {
        //   preprocessor: ['HTML', 'CSS', 'JavaScript'],
        //   links: {
        //     cssLinks: [],
        //     JSLinks: []
        //   },
        //   code: {
        //     HTML: '<h1>This is a template of Vanilla!</h1>',
        //     CSS: '',
        //     JavaScript: ''
        //   }
        // },
        Vue2: {
          preprocessor: ['HTML', 'CSS', 'JavaScript'],
          links: {
            cssLinks: [],
            JSLinks: ['https://cdn.staticfile.org/vue/2.6.14/vue.min.js']
          },
          code: {
            HTML: '<div id=\"app\">\n\t{{ message }}\n</div>',
            CSS: '',
            JavaScript: `var app = new Vue({\n\tel: '#app',\n\tdata: {\n\t\tmessage: 'This is a template of Vue2!'\n\t}\n})`
          }
        },
        Vue3: {
          preprocessor: ['HTML', 'CSS', 'JavaScript'],
          links: {
            cssLinks: [],
            JSLinks: ['https://cdn.staticfile.org/vue/3.2.31/vue.global.min.js']
          },
          code: {
            HTML: '<div id=\"app\">\n\t{{message}}\n</div>',
            CSS: '',
            JavaScript: `const app = {\n\tdata() {\n\t\treturn {\n\t\t\tmessage: 'This is a template of Vue3!'\n\t\t}\n\t}\n}\n\nVue.createApp(app).mount('#app')`
          }
        },
        React: {
          preprocessor: ['HTML', 'CSS', 'JSX'],
          links: {
            cssLinks: [],
            JSLinks: [
              'https://cdn.staticfile.org/react/17.0.0/umd/react.development.min.js',
              'https://cdn.staticfile.org/react-dom/17.0.0/umd/react-dom.development.min.js'
            ]
          },
          code: {
            HTML: '<div id=\"root\">\n\t{{message}}\n</div>',
            CSS: '',
            JavaScript: `ReactDOM.render(\n\t<h1>This is a template of React!</h1>,\n\tdocument.getElementById('root')\n);`
          }
        },
        // Angular: {
        //   preprocessor: ['HTML', 'CSS', 'JavaScript'],
        //   links: {
        //     cssLinks: [],
        //     JSLinks: ['https://cdn.staticfile.org/angular.js/1.8.0/angular.min.js']
        //   },
        //   code: {
        //     HTML: `<div ng-app="myApp" ng-controller="myCtrl">\n\t{{message}}\n</div>`,
        //     CSS: '',
        //     JavaScript: `var app = angular.module('myApp', [])\napp.controller('myCtrl', function ($scope) {\n\t$scope.message = 'This is a template of Angular'\n})`
        //   }
        // },
      },
      templateList: [
        { label: 'OWL', svgName: '/images/owl.svg' },
        { label: 'QWEB', svgName: '/images/qweb.svg' },
        // { label: 'Vanilla', svgName: 'Vanilla' },
        { label: 'Vue2', svgName: 'Vue' },
        { label: 'Vue3', svgName: 'Vue' },
        { label: 'React', svgName: 'React' },
        // { label: 'Angular', svgName: 'Angular' },
      ]
    }
  },
  computed: {
    ...mapState(['visibleDialogName']),
  },
  watch: {
    visibleDialogName (name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations([
      'setVisibleDialogName',
      'setAllPrep',
      'setCurTab',
      'setAllInstanceExtLinks',
      'setInstancesCode',
      'setShouldResetCode'
    ]),
    closeDialog () {
      this.setVisibleDialogName('')
    },

    getTemplateIcon(filename) {
      if (filename.startsWith('/')) {
        return require(`../../../../assets${filename}`)
      } else {
        return `/qiNiuCdn/${filename}.svg`
      }
    },

    selectTemplate (template) {
      const { preprocessor, links, code } = this.templatesInfo[template]
      this.setAllPrep(preprocessor)
      this.setCurTab(preprocessor[0])
      this.setAllInstanceExtLinks(links)
      this.setInstancesCode(code)
      this.setShouldResetCode(true)
      this.closeDialog()
    }
  }
}
</script>

<style lang="scss">
.templates-dialog {
  .temp-title {
    color: $light-2;
    margin-top: 5px;
  }
  .templates {
    .template-list {
      margin-top: 15px;
      display: grid;
      grid-template-columns: repeat(4, 100px);
      grid-template-rows: repeat(2, 120px);
      gap: 15px;
      .template {
        border-radius: 4px;
        color: $light-4;
        background-color: $deep-3;
        transition: all 0.2s ease;
        img {
          width: 50px;
        }
        .name {
          margin-top: 10px;
        }
        &:hover {
          background-color: $primary-2;
          color: $light-2;
        }
      }
    }
  }
}
</style>
