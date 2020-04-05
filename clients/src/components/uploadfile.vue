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
        <form @submit.prevent="sendFile"   enctype="multipart/form-data" >
            
<h1 class="h3 mb-3 font-weight-normal">please register</h1>
<div  class=form-group>
    <label for="image">image</label>
<input type="file"
  class="file-input"
    @change.prevent="selectFile"
     ref="file" name="file" id=""/>
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
         file:'',
         message:'',
         description:'',
         category:'',
         name:'',
         price:'',

        }
          },
        methods:{
            selectFile(){
                const file=this.$refs.file.files[0];
                // this.file=this.$refs.file.files[0];
                const max_size=200000;
                const tooLarge=file.size>max_size
                
                const allowatypes=    ['image/jpeg','image/jpg','image/gif','image/png']
              if(allowatypes.includes(file.type) && !tooLarge){
                            console.log(this.file)
                this.error=false,
                this.message='',
                this.file=file
              }else{
                  this.error=true
                  this.message=tooLarge ?
                   `Too large.Max size is ${max_size/1000}kb`:
                    "only images are allowed"
              }
              
            },
            async sendFile(){


                const formData = new FormData()
                formData.append('file',this.file)
                    formData.append('name',this.name)
            //   let  description=this.description;
            //   let category =this.category;
            //   let price =this.price;
            //   let name =this.name;
        
                // let all={
                    
                //     description,
                //     category,
                //      name,
                //      price
                // }
                try{
                    
                    await Api().post('/api/uploadFile',formData)
                    // await Api().post('/api/uploadFile',all)
                 this.error=false;
                   this.message='file has been uploaded  '
                       this.file=""
                }catch(err){
                       
                 this.error=true;
                   this.message=err.response.data.error
                    // console.log(err)   
                      }
            }
        }
    
}
</script>


<style scoped>
.image{
    width:20%;
    height: 20%;
}
</style>