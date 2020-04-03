<template>
<div class="container">
    <div class="row">
        <div  v-if="user" class="col-md-6 mx-auto">
            <form @submit.prevent="submit">
<h1 class="h3 mb-3 font-weight-normal">Add your detaials below</h1>
<div  class=form-group>
    <label for="country">country</label>
<!-- <input type="text" v-model='country' class="form-control"> -->
<select  v-model='country' id="">
    <option value="CANADA">CANADA</option>
    <option value="USA">USA</option>
    <option value="NIGERIA">NIGERIA</option>
</select>
<!-- <select v-model="sss" value="wereq" id="">
    <option value="kids">kids</option>
    <option value="Baby">Baby</option>
    <option value="books">books</option>
    <option value="computers">computers</option>
    <option value="shoes">shoes</option>
    <option value="wea">wear</option>
    <option value="Electronics">Electronics</option>
    
</select> -->
</div>
<div  class=form-group>
    <label for="name">User Name</label>
<input type="name" v-model='userName' class="form-control">
</div>

<div  class=form-group>
    <label for="number">number</label>
<input type="number" v-model='number' class="form-control">
</div>
  <div  class=form-group>
    <label for="address">address</label>
<input type="text" v-model='address' class="form-control">
</div>
<div  class=form-group>
    <label for="postal_code">postal_code</label>
<input type="number" v-model='postal_code' class="form-control">
</div>

  <div>
      </div>
        <button class="btn btn-lg btn-primary btn-block">UPDATE DETAILS</button>
   
            </form>
        </div>
    </div>
    
</div>


</template>
<script>
// import axios from 'axios'
import Api from '../config/Api'
// import axios from 'axios'
import router from "../../router"
import {mapActions,mapGetters} from 'vuex'
export default {
    data(){
        return{
           number:'',
          country:'USA',
          postal_code:'',
           address:'',
           userName:'',
          

        }
    },
    // created(){
    //    console.log(this.user.name)
 
    // },
    computed: {
          ...mapGetters(["user"]),
      
    }
    ,
       
        methods:{
        ...mapActions(["getProfile"]),

        submit(){
        let details={number:this.number,
        country:this.country,
        postal_code:this.postal_code,
        userName:this.userName,
        address:this.address}
            
        Api().put(`/api/addDetail/${this.user._id}`,details)
        .then((res)=>{

            // this.number=res.data.number,
            // this.country=res.data.country,
            // this.postal_code=res.data.postal_code,
            // this.address=res.data.address
            if(res.data){
                router.push("/profile")
            }
              
            }
            // console.log(res.data.address)
        )
        
        }

    
        
    },
    created(){
        this.getProfile(),
        this.country=this.user.country
        this.postal_code=this.user.postal_code
        this.number=this.user.number
        this.address=this.user.address
        this.userName=this.user.userName
    
    }
    
}
</script>