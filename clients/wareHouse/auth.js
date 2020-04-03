import Vuex from 'vuex'
import Vue from 'vue'
// import router from '../router'
import Api from '@/config/Api'

import axios from "axios"
import router from '../router'
Vue.use(Vuex)
const state={
token:localStorage.getItem('token') || '',
user:{},
status:'',
error:null
};
const getters={
isLoggedIn:state=>!!state.token,
authStatus:state=>state.status,
user:state=>state.user,
error:state=>state.error
};

const actions={
   async login({
        commit
    },user){
        commit("auth_request");
       try{
        let res = await Api().post('/api/login',user)
    
        if(res.data.success){
    const token = res.data.token;
    const user = res.data.user;
    localStorage.setItem('token',token);
    axios.defaults.headers.common["Authorization"] = token;
    commit("auth_success",token,user)
        }
        return res
        
       }catch(err){
commit('auth_error',err)
       }
      
    },
    //adding items to the store
async add({
    commit
},product){
    try{
        // commit("register_request");
        let res = await Api().post('/api/postItems',product)
       
        if(res.data.success==true){
    commit("item_success")
        }
        return res;
    }catch(err){
        commit('item_error',err)
    }
},
    async register({
        commit
    },userData){
        try{
            commit("register_request");
        let res = await Api().post('/api/register',userData)
      
        if(res.data.success!==undefined){
    commit("register_success")
        }
        return res;
        }catch(err){
            commit('register_error',err)
        }
    },
    async getProfile({
        commit
    }){
        commit('profile_request');
        let  res =  await Api().get('/api/profile')
        commit('user_profile',res.data.user)
        // let User=res.data.user
        // console.log(User.name)
        return res;

    },
    // async updateDetails({
    //     commit
    // },userData,userid){
    //     commit('profile_request');
    //     let  res =  await Api().put(`/api/addDetail/${userid}`,userid,userData)
    //     // commit('user_profile',res.data.user)
    //     // let User=res.data.user
    //     // console.log(User.name)
    //     return res;

    // },
    // add your detail like address
    
    //logout func
   async logout({    
        commit
    }){
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common["Authorization"];
        router.push('/login')
        return
    },
};
const mutations={
 
auth_request(state){
    state.status='loading'
    state.error=null
},
auth_success(state,token,user){
    state.token=token
    state.user=user
    state.error=null
    state.status="success"
    
},
register_success(state){
    state.error=null
    state.status="success"
},
register_request(state){
    state.error=null
    state.status="loading"
},
logout(state){
    state.error=null
    state.status=""
    state.token=""
    state.user=""
},
user_profile(state,user){
  
    state.user=user
 
},
profile_request(state){
    state.status='loading'
},
register_error(state,err){
    state.error=err.response.data.msg
},
auth_error(state,err){
    state.error=err.response.data.msg
},
item_error(state,err){
    state.error=err.response.data.msg
},
item_success(state){
    state.error=null
    state.status="success"
},
details_profile(state){
    state.error=null
    state.status="loading"
},
details_request(state){
    state.error=null
    state.status="success"
},
};

export default({
    
    state,
    mutations,
    getters,
    actions
});