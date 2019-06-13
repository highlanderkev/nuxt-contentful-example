const config = require('./.contentful.json');

const modifyHtml = (html) => {
  // Add amp-custom tag to added css
  html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr');
  // Remove every script tag from generated HTML
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Add AMP script before </head>
  const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>';
  html = html.replace('</head>', ampScript + '</head>');
  return html;
}

module.exports = {
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  },
  modules: [
    // 'bootstrap-vue/nuxt',
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-contentful-example',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'contentful_space', content: config.CTF_SPACE_ID },
      { name: 'contentful_environment', content: config.CTF_ENVIRONMENT }
    ],
    link: [
      { rel: 'canonical', href: '/' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['~/assets/main.css'],
  loading: false, // Disable loading bar since AMP will not generate a dynamic page
  render: {
    // Disable resourceHints since we don't load any scripts for AMP
    resourceHints: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  hooks: {
    // hook is called before generatic static hmtl files for SPA mode
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    },
    'render:route': (url, page, { req, res }) => {
      page.html = modifyHtml(page.html);
    }
  }
}

