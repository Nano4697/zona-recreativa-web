const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts');

const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv(withFonts(withImages(withCSS({
  /* config options here */
    // distDir: 'build',

    /*Para cada pagina hay que agregar el enlace a la constante paths*/
    exportPathMap: async function(
            defaultPathMap,
            { dev, dir, outDir, distDir, buildId }
        ) {
        const paths = {
            '/': { page: '/' },
            '/about': { page: '/about'},
            '/adminLogin': { page: '/adminLogin'},
            '/adminMain': { page: '/adminMain'},
            '/adminPackages': { page: '/adminPackages'},
            '/adminSeguros': { page: '/adminSeguros'},
            '/catalogo': { page: '/catalogo'},
            '/contact': { page: '/contact'},
            '/galeria': { page: '/galeria'},
            '/informacion': { page: '/informacion'},
            '/proveedores': { page: '/proveedores'},
        };
        // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
        // const data = await res.json();
        // const shows = data.map(entry => entry.show);
        //
        // shows.forEach(show => {
        //     paths[`/show/${show.id}`] = { page: '/show/[id]', query: { id: show.id } };
        // });

        return paths;
    },

    // webpack: (config) => {
    //     return {
    //         ...config,
    //         node: {
    //             fs: 'empty'
    //         }
    //     }
    // },

    // env: {
        // REACT_APP_API_KEY:
        // REACT_APP_AUTH_DOMAIN:
        // REACT_APP_DATABASE_URL:
        // REACT_APP_PROJECT_ID:
        // REACT_APP_STORAGE_BUCKET:
        // REACT_APP_MESSAGING_SENDER_ID:
        // REACT_APP_ID:
      // }
}))))
