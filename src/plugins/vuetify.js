import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// replace jsdelivr cdn: http://www.mxthink.com.cn/archives/118
import '@mdi/font/css/materialdesignicons.css' // 引入本地的Material Design Icons资源

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#1980ff',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#E53935',
        info: '#272727',
        success: '#7CB342',
        warning: '#FFB300',
      }
    }
  },
  icons:{
    iconfont: 'mdi', // 设置使用本地的icon资源
  }
});
