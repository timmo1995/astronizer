// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  srcDir: './src',
  build: {
    transpile: ['@vuepic/vue-datepicker']
}
})
