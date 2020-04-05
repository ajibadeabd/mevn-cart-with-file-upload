<template>
    <div>
  <span v-if='images' class="card-image">
      {{images}}
        <!-- <img  class='image' src="../../../public/uploads/file-1585926110331.jpg" alt="" > -->
<div 
 class="container">
   
  <ul  v-for="product in images" :key="product._id">
    <li>
       {{product.file}} 
            <img class="card-img-top" :src="'../../../public/uploads/'+product.file" alt="">

       <!-- <img class='image' :src="images[0].file" alt="k" /> -->
    </li>
</ul>
</div>
  </span>
    </div>
</template>
<script>
import Api from '@/config/Api';  

export default {
    data(){
        return{
            images:''
        }
    },
    methods:{

    },
    mounted(){

    },
    
    created(){
         Api().get('/api/getFile')
         .then(response=>{
             console.log(response.data)
this.images=response.data.image
         })
        
    }
    ,
    computed:{
        
    }
}
</script>
<style scoped>
.image{
    width:20%;
    height: 20%;
}
</style>