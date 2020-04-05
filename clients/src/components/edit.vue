<template>
    <div>



<div class="row">
        <div class="col-md-6 mx-auto">
        <form @submit.prevent="updateItem" >
            
<h1 class="h3 mb-3 font-weight-normal">Add Items</h1>
<div  class=form-group>
    <label for="image">image</label>
    <!-- <select name="" v-model="image" id="" v-for="(index,file) in files " :key="index">
        <option value="">{{file.image.file}}</option> -->
    <!-- </select> -->
<input type="text" v-model='image' class="form-control">

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
   <select  v-model="category" id="">

       <option value="Shoes">Shoes</option>
       <option value="Electronics">Electronics</option>
       <option value="Baby">Baby</option>
       <option value="Movies">Movies</option>
       <option value="Kids">Kids</option>
       <option value="BOOKS">BOOKS</option>
       <option value="Computers"> Computers</option>
       
   </select>



</div>
  <div  class=form-group>
<button class="btn" type="submit">update</button>
      
</div>
 </form>
    </div>
        
    </div>

    </div>

</template>

<script>
import Api from "@/config/Api"
export default {
    props:['id'],

    data(){
        return{
products:{},
name:'',
price:'',
category:'Baby',
image:'',
description:''
        }
    },
    created(){
        // console.log(this.id)
        // console.log(this.$route.params.id)
        Api().get(`/categories/edit/${this.id}`)
        .then(res=>{
            
this.products=res.data.products

this.description=this.products.description
this.image=this.products.image
this.category=res.data.products.category
this.price=this.products.price
this.name=this.products.name
        })
    },
    methods:{
        updateItem(){

 let item= {
            name:this.name,
             price:this.price,
              category:this.category,
            description:this.description,
            image:this.image,
           
           
            }
            Api().put(`/categories/edit/${this.id}`,item)
            .then(res=>{
                if(res.data){
               this.$router.push(

        {
            name:"product",
            // id:`${this.id}`,
            params: { id: this.id }
        }           
               )
            }
            })
        }
    }
}
</script>
<style scoped>

</style>