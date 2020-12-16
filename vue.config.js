module.exports = {
  pwa: {
    name: "The Geospatial Hub",
    themeColor: "#0e67ec",
    msTileColor: "#0e67ec",
    appleMobileWebAppCapable: "no",
    appleMobileWebAppStatusBarStyle: "black",

    manifestOptions: {
      short_name: "The Geospatial Hub"
    },
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      //   // swSrc is required in InjectManifest mode.
      swSrc: "dev/service-worker.js",
      swDest: "service-worker.js",
      //   // ...other Workbox options...
      exclude: [/_redirects/]
      // exclude: [/\.map$/, /_redirects/],
    }
  }
};
