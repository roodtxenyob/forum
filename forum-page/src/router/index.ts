import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index'

Vue.use(VueRouter)

let home:any = ():any => {return import('views/home.vue')};
let register:any = ():any => {return import('views/register.vue')};
let login:any = ():any => {return import('views/login.vue')};
let tourist:any = ():any => {return import('views/tourist.vue')}
let noPage:any = ():any => {return import('views/noPage.vue')}

let discussDetails:any = ():any => {return import('components/content/discussDetails/discussDetails.vue')};


const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    component: register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    component: login,
    meta: {
      requiresAuth: false
    }
  },  
  {
    path: '/tourist',
    component: tourist,
    meta: {
      requiresAuth: false
    }
  },    
  {
    path: '/discussDetails/:discussID',
    name: 'discussDetails',
    component:discussDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    component:noPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to ,from ,next) => {
  if(to.meta.requiresAuth){
    if(localStorage.token != null){
      next();
    }else{
      router.replace('/tourist');
    }
  }else{
    next();
  }  
});

export default router
