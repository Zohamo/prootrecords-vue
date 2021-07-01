import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      light: {
        background: colors.grey.lighten5,
        primary: colors.purple.darken2,
      },
      dark: {
        background: colors.grey.darken4,
        primary: colors.purple.lighten2,
      },
    },
  },
});
