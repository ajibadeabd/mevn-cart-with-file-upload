<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-8">
        <img :src="product.image" :alt="product.name" class="img-fluid">
        <h5>{{ product.name }}</h5>
        <p><span class="font-weight-bold">Category</span>: {{ product.category }}</p>
        <p class="text-danger font-weight-bold">${{product.price}}</p>
        <p>
          {{ product.description }}
        </p>
        <button class="btn btn-outline-primary mb-5" @click="addToCart(product)">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/config/Api'
// import axios from 'axios'
import mixins from '@/mixins/mixins'

export default {
  props: ['id'],
  mixins: [mixins],
  data(){
    return {
      product: {}
    }
  },
  created() {
    // console.log(this.id)
       Api().get(`/products/${this.id}`)
              .then(response => {
                // console.log(response.data)
                this.product = response.data
              });
  },
  methods: {
        checkout(e) {
            e.preventDefault();
            this.$router.push({ name: 'checkout' });
            // console.log(e);
        }
    }
}
</script>

<style>

</style>
