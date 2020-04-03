<template>
    <div class="container">


     
        <div class="jumbotron mt-5">
            <div class="col-sm-8 mx-auto">
                <h1 class='text-center'>PROFILE</h1>
            </div>
            <div class='card' v-if="user">
                <ul class='list-group'>
                <li class='list-group-item'>NAME: {{user.userName}}</li>
                <li class='list-group-item'>EMAIL: {{user.email}}</li>
                <li class='list-group-item'>COUNTRY: {{user.country}} </li>
                <li class='list-group-item'>PHONE NUMBER: {{user.number}} </li>
                <li class='list-group-item'>ADDRESS: {{user.address}}</li>
                <li class='list-group-item'>postal_code: {{user.postal_code}}</li>
                  
                    <router-link v-if="isLoggedIn"
                     tag="a" :to = "{name: 'details'}" class="nav-link">Update your details
                     </router-link>
               
            </ul>
            </div>
            
        </div>
    </div>
</template>
<script>

import {mapActions,mapGetters} from 'vuex'
export default {
    
    
     computed: {
          ...mapGetters(["user","isLoggedIn"]),
      
    }
    ,

    methods:{
        ...mapActions(["getProfile"])
    },
    created(){
        this.getProfile()
        
    }
}
</script>