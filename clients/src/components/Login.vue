<template>
<div class="container">
    <div class="row">
        <div class="col-md-6 mx-auto">
            <form @submit.prevent="loginUser">
<h1 class="h3 mb-3 font-weight-normal">please sign in</h1>
<div  class=form-group>
    <label for="name">name</label>
<input type="text" v-model='name' class="form-control">
</div>
<!-- <div  class=form-group>
    <label for="email">email</label>
<input type="emai" v-model='email' class="form-control"></div>
   -->

  <div  class=form-group>
    <label for="password">password</label>
<input type="password" v-model="password" class="form-control"></div>
  <!-- <button class="btn btn-lg btn-primary btn-block">signin</button> -->
  <input type="submit" value="sign in" class="btn btn-primary">
  <router-link to='/register'>need an account?</router-link>
            </form>
        </div>
    </div>
</div>


</template>
<script>
// import axios from 'axios'
import {mapActions} from 'vuex'
// import Api from '@/config/Api'
// import router from "../../router"
import router from "../../router"
export default {
    data(){
        return{
            name:'',
            // email:'',
            password:''

        }
    },
    methods:{
        ...mapActions(['login']),
       loginUser(){
            let user={
                name:this.name,
                password:this.password
            };
            this.login(user)
            .then(res=>{
 if(res.data.success){
  router.push("/profile")

            }
            })
            .catch(err=>{
                console.log(err)
            })
           
        }
    }
}
</script>