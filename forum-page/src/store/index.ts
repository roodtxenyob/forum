import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
    modalIsShow:false,
    //用户权限 0未登录 9管理员 1普通用户 -1禁封用户 -2永久禁封用户
  },
  mutations: {
    updUserInfo(state,obj){
      state.userInfo = obj;
    },

    modalShow(state,isShow){
      state.modalIsShow = isShow;
    },


  },
  actions: {
    updUserInfoSync(context,obj){
      context.commit('updUserInfo',obj);
    },

    modalShowSync(context,isShow){
      context.commit('modalShow',isShow);
    },
    
  },
  modules: {
  }
})
