const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const builder = new addonBuilder({
  id: "com.fernando.stremioaddon",
  version: "1.1.0",
  name: "Mi Stremio Addon",
  description: "Addon de prueba con catálogo y reproducción directa",

  resources: [
    "catalog",
    "stream"
  ],

  types: [
    "movie"
  ],

  catalogs: [
    {
      type: "movie",
      id: "mipeliculas",
      name: "Mis Películas"
    }
  ],

  idPrefixes: [
    "tt"
  ]
});

// ================================
// CATÁLOGO
// ================================

builder.defineCatalogHandler(async () => {
  return {
    metas: [
      {
        id: "tt1254207",
        type: "movie",
        name: "Big Buck Bunny",
        poster:
          "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
      }
    ]
  };
});

// ================================
// STREAMS
// ================================

builder.defineStreamHandler(async (args) => {

  console.log("Solicitud de stream:", args);

  // Big Buck Bunny
  if (
    args.type === "movie" &&
    args.id === "tt1254207"
  ) {

    return {
      streams: [
        {
          name: "Big Buck Bunny - MP4",
          description: "Video de prueba",
          url: "https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov",
          behaviorHints: {
            filename: "big_buck_bunny_480p_h264.mov"
          }
        }
      ]
    };
  }

  // Si no conocemos el ID
  return {
    streams: []
  };
});

// ================================
// SERVIDOR
// ================================

serveHTTP(builder.getInterface(), {
  port: process.env.PORT || 7000
});
