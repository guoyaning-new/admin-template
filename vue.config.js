module.exports = {
    productionSourceMap: false,
    filenameHashing: true,
    assetsDir: "assets",
    css: {
        loaderOptions: {
            sass: {
                data: `
                  @import "@/assets/sass/common.scss";
                `
            }
        }
    },
    chainWebpack: config => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    }
};

