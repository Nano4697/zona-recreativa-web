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
    }
})))
