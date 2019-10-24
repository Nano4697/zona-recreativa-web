const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts');

module.exports = withFonts(withImages(withCSS({
  /* config options here */
    // distDir: 'build',

    /*Para cada pagina hay que agregar el enlace a la constante paths*/
    exportPathMap: async function() {
        const paths = {
            '/': { page: '/' },
            '/about': { page: '/about'},
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

    webpack: (config) => {
  return {
    ...config,
    node: {
      fs:
        'empty'
      }
    }
},

    env: {
        REACT_APP_API_KEY: 'AIzaSyCX8-lZo1LksguFjXp1aucpwn34QV33HUw',
        REACT_APP_AUTH_DOMAIN: 'zona-recreativa-cr.firebaseapp.com',
        REACT_APP_DATABASE_URL: 'https://zona-recreativa-cr.firebaseio.com',
        REACT_APP_PROJECT_ID: 'zona-recreativa-cr',
        REACT_APP_STORAGE_BUCKET: 'zona-recreativa-cr.appspot.com',
        REACT_APP_MESSAGING_SENDER_ID: '311140447739',
        REACT_APP_ID: '1:311140447739:web:1e629544dd2c8dff08875',
      }
})))
