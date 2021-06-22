module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Proot records &#9729; frivolous and original music";
      return args;
    });
  },
};
