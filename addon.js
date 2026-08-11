const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const builder = new addonBuilder({
  id: "com.fernando.stremioaddon",
  version: "1.0.0",
  name: "Mi Stremio Addon",
  description: "Mi primer addon de Stremio",
  resources: ["catalog"],
  types: ["movie"],
  catalogs: [
    {
      type: "movie",
      id: "mipeliculas",
      name: "Mis Películas"
    }
  ],
  idPrefixes: ["tt"]
});

builder.defineCatalogHandler(async () => {
  return {
    metas: [
      {
        id: "tt1254207",
        type: "movie",
        name: "Big Buck Bunny",
        poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
      }
    ]
  };
});

serveHTTP(builder.getInterface(), {
  port: process.env.PORT || 7000
});
