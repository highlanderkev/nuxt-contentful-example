<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        nuxt-contentful-example
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
        <nuxt-link to="posts">Posts</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

console.log("this is bad")
throw new Error("Error");

export default {
  components: {
    AppLogo
  }
}
</script>

