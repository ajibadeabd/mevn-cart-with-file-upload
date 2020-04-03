<template>
<div class="container">
    <div class="row">
        <div class="col-md-6 mx-auto">
            <form @submit.prevent="registeruser">
<h1 class="h3 mb-3 font-weight-normal">please register</h1>
<div  class=form-group>
    <label for="email">email</label>
<input type="email" v-model='email' class="form-control">
</div>
<div  class=form-group>
    <label for="name">name</label>
<input type="text" v-model='name' class="form-control">
</div>
  <div  class=form-group>
    <label for="userName">userName</label>
<input type="text" v-model='userName' class="form-control">
</div>
<div  class=form-group>
    <label for="conpassword">conpassword</label>
<input type="password" v-model='conpassword' class="form-control">
</div>

  <div  class=form-group>
    <label for="password">password</label>
<input type=
"password" v-model='password' class="form-control"></div>
  <button class="btn btn-lg btn-primary btn-block">register</button>
   <router-link to='/login'>Already have an account?</router-link>
            </form>
        </div>
    </div>
</div>


</template>
<script>
// import axios from 'axios'
// import Api from '../config/Api'
import router from "../../router"
import {mapActions} from 'vuex'
export default {
    data(){
        return{
            email:'',
            password:'',
            name:'',
            userName:'',
            conpassword:''

        }
    },
    methods:{
        ...mapActions(["register"]),
        registeruser(){
          
                 let user = { 
                      email:this.email,
                    password:this.password,
                   conpassword:this.conpassword,
                      userName:this.userName,
                    name:this.name
                    }
        this.register(user).then((res)=>{
            if(res.data.success){
               router.push("/login")
            }

        })
     },
     
          
        }
    
}
</script>