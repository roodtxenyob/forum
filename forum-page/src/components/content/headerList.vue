<template>
  <div id="head">
    <div id="navbar">
        <img src="@/assets/logo.png" alt="" class="clearFloat">
        <headerElement textContent=" "></headerElement>
        <headerElement textContent="首页" @click.native="goHome"></headerElement>
        <headerElement textContent="下载APP"></headerElement>
        <search text="搜索站内"></search>
        <div id="change" v-if="!loginFlag" >
          <headerElement textContent="登录" @click.native="goLogin"></headerElement>
          <headerElement textContent="注册" @click.native="goRegister"></headerElement>
        </div>
        <div id="change"  v-else>
          <headerElement textContent="消息"></headerElement>
          <headerElement textContent="收藏"></headerElement>
          <headerElement textContent="历史"></headerElement>
          <headerElement textContent="个人中心"></headerElement>
          <headerElement textContent="发帖" @click.native="openModal"></headerElement>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { postIsLogin } from "@/request/sending";
import headerElement from "@/components/common/headerElement.vue";
import search from "@/components/content/search.vue";
@Component({
  components:{
    headerElement,
    search
  }
})
export default class headerList extends Vue {
  private loginFlag:any = false;

  private created():any{
    let token:string|null = localStorage.getItem("token");
    postIsLogin({
      token
    }).then((result:any) => {
      if(result.statusCode == 1){
        this.loginFlag = true;
        this.$store.dispatch('updUserInfoSync',result.userInfo);
      }
      if(result.statusCode == 2){
        this.loginFlag = false;
      }
    }).catch((error:any) => {
      console.log(error);
    })
  }

  private goHome(){
    this.$router.replace("/home");
  }

  private goLogin(){
    this.$router.replace("/login");
  }

  private goRegister(){
    this.$router.replace("/register");
  }

  
  //methods
  private openModal(){
    this.$store.dispatch('modalShowSync',true);
  }
}
</script>

<style scoped lang="less">
.clearFloat:after, .clearFloat:before{
  content:"";
  clear:both;
  display: table;
}
#head{
  width:100%;
  position: fixed;
  top: 0px;
  z-index: 999;
  margin: 0px auto;
  height: 42px;
  box-shadow: #505050 0px 1px 4px -1px;
  background-color: #ffffff;
  #navbar{
    width: 980px;
    height: 100%;
    margin: 0px auto;
    background-color: white;
    position: relative;
    img{
      display: inline-block;
      height: 15px;
      width: 15px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }
    #change{
      float: right;
    }
  }
}
</style>
