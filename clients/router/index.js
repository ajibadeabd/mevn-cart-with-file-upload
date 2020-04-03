import VueRouter from 'vue-router';
import Products from '@/components/Products'
import Product from '@/components/Product'
import Category from '@/components/Category'
import Checkout from '@/components/Checkout'
import Thakyou from '@/components/Thakyou'
import profile from '@/components/profile'
import register from '@/components/register'
import details from '@/components/details'
import Login from '@/components/Login'
import store from '../store'
import uploadfile from '@/components/uploadfile'


const routes = [
    {
        path: '/',
        name:'home',
        component: Products
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile,
        // meta:{
        //     requiresAuth:true
        // }
    },
    {
        path:'/details',
        name: 'details',
        component: details,
        meta:{
            requiresAuth:true
        }
       
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta:{
            requiresGuest:true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            requiresGuest:true
        }
    },
    {
        path: '/product/:id',
        name: 'product',
        component: Product,
        props: true
    },
    {
        path: '/category/:category',
        name: 'category',
        component: Category,
        props: true
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/thankyou',
        name: 'thankyou',
        component: Thakyou,
    },
    {
        path: '/uploadfile',
        name: 'uploadfile',
        component: uploadfile,
    }


];

const router = new VueRouter({
    routes,
    mode: 'history',
    // base:process.env.BASE_URL
});

router.beforeEach((to,from,next)=>{
    if(to.matched.some(record=>record.meta.requiresAuth)){
  if(!store.getters.isLoggedIn){
      next("/login")

  }else{
      next();
  }
}else if(to.matched.some(record=>record.meta.requiresGuest)){
  if(store.getters.isLoggedIn){
      next("/profile")

  }else{
      next();
  }
}else{
  next()
}

});
export default router;
