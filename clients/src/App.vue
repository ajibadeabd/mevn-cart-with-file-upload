<template>
  <div id="app">
    <Navbar />
    <error v-if="error" :msg='error'/>

      <router-view />
  </div>
</template>

<script>
// import Products from './components/Products.vue'
import Navbar from './components/Navbar.vue'
import error from './components/error.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
    // Products,
    Navbar,
   error,

  },
   computed:{
    ...mapGetters(['error'])
  }
  
}
  

</script>

<style>

</style>
