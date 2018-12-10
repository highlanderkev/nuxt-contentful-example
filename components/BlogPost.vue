<template>
  <div class="card no-body mb-1">
    <div class="card-header p-1" role="tab">
      <h3 class="button btn block info" :data-toggle="`accordion-${index}`">{{post.fields.title}}</h3>
    </div>
    <div class="collapse" :id="`accordion-${index}`" data-accordion="blog-accordion" role="tabpanel">
      <div class="card-body">
        <p class="card-text">{{post.fields.description}}</p>
      </div>
      <amp-img
        class="card-img fluid bottom"
        :src="post.fields.heroImage.fields.file.url"
        :alt="post.fields.heroImage.fields.title"
        width="300"
        height="150"
        layout="responsive"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number
    },
    post: {
      type: Object
    }
  }
};
</script>
