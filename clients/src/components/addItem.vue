<template>
    <div  class='container'>
        <!-- <img  class='image' src="../../../public/uploads/file-1585926110331.jpg" alt="" > -->
         <div class="" v-if='message'
   :class="`message' ${error ? 'is-danger':'is-success'}`"
   >
       <div class="messag-body">{{message}}</div>
   </div>

<div class="row">
        <div class="col-md-6 mx-auto">
        <form @submit.prevent="sendFile" >
            
<h1 class="h3 mb-3 font-weight-normal">Add Items</h1>
<div  class=form-group>
    <label for="image">image</label>
    <select name="" v-model="files" id="" v-for="(index,file) in files " :key="index">
        <option value="">{{file.image.file}}</option>
    </select>
</div>

<div  class=form-group>
    <label for="name">NAME</label>
<input type="text" v-model='name' class="form-control">
</div>
  <div  class=form-group>
    <label for="price">PRICE</label>
<input type="text" v-model='price' class="form-control">
</div>
<div  class=form-group>
    <label for="description">DESCRIPTION</label>
<input type="text" v-model='description' class="form-control">
</div>
<div  class=form-group>
     <label for="categories">CATEGORIES</label>
   <select name="categories"  v-model="category" id="">
       <option value="">Shoes</option>
       <option value="">electronics</option>
       <option value="">Baby</option>
       <option value="">Movies</option>
       <option value="">KID</option>
       <option value="">BOOKS</option>
       <option value=""> Computers</option>
       
   </select>
</div>
  <div  class=form-group>
<button class="btn" type="submit">send</button>
      
</div>
 </form>
     </div></div>
        
      


    </div>
</template>





<script>
import Api from '@/config/Api';  
export default {
    name:'simpleupload',
    data(){
        return{
         files:'',
         message:'',
         description:'',
         category:'',
         name:'',
         price:'',

        }
          },
          created(){
                Api().get('/api/getFile')
                .then(response=>{
                    console.log(response)
                            this.files=response.data
                })
          },
        methods:{
           
           
        }
    
}
</script>


<style scoped>
.image{
    width:20%;
    height: 20%;
}
</style>