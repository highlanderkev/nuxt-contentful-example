<template>
  <section class="container">
    <div class="jumbotron header author">
      <h1>{{person.fields.name}}</h1>
      <a class="primary" href="#">Contact</a>
    </div>
    <ul>
      <div v-for="(post, index) in posts" v-bind:key="post.fields.title" role="tablist">
        <blog-post :post="post" v-if="post" :index="index"></blog-post>
      </div>
    </ul>
  </section>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";
import BlogPost from "~/components/BlogPost.vue";

const client = createClient();

export default {
  components: {
    BlogPost
  },
  asyncData({ env }) {
    return Promise.all([
      client.getEntry(env.CTF_PERSON_ID),
      client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: "-sys.createdAt"
      })
    ])
      .then(([entry, posts]) => {
        return {
          person: entry,
          posts: posts.items
        };
      })
      .catch(console.error);
  }
};
</script>
