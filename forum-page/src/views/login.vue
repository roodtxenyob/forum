<template>
  <div id="login">
    <h1 id="titel">我的论坛</h1>
    <div id="loginForm">
      <p class="loginMethods">账号登录</p>
      <p class="loginMethods">其他登录</p>
      <form action="" @submit.prevent="loginFormSubmit">
        <input type="text" class="text" 
        v-model="formData.username"
        @blur="usernameBulr" 
        placeholder="你的账号" />
        <p class="tips" :class="{'hide':!formStatus.isTipsNameShow}">请输入注册时的用户名呀</p>
        <input type="password" class="text" 
        v-model="formData.password" 
        @blur="passwordBulr" 
        placeholder="你的密码" autocomplete />
        <p class="tips" :class="{'hide':!formStatus.isTipsPasswordShow}">请输入注册时的密码呀</p>
        <div id="buttonBox">
          <input type="submit" id="loginButton" value="登录" />
          <input type="button" id="registerButton" value="注册" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Vue, Component} from 'vue-property-decorator';
  import { postLogin } from '@/request/sending';
  @Component
  export default class login extends Vue{
    //data
    private formStatus:any = {
      isTipsNameShow : false,
      isTipsPasswordShow : false
    }
    private formData:any = {
      username : "",
      password : "" 
    }
    //methods
    private usernameBulr():any{
      if(this.formData.username == ""){
        this.formStatus.isTipsNameShow = true;
      }else{
        this.formStatus.isTipsNameShow = false;
      }
    }
    private passwordBulr():any{
      if(this.formData.password == ""){
        this.formStatus.isTipsPasswordShow = true;
      }else{
        this.formStatus.isTipsPasswordShow = false;
      }
    }
    
    private loginFormSubmit():any{
      postLogin({
        username: this.formData.username,
        password: this.formData.password
      }).then((result:any) => {
        localStorage.setItem("token",result.token);
        this.$store.dispatch('updUserInfoSync',result.userInfo);
        this.$router.replace('/home');
      }).catch((error:any) => {
        console.log(error);
      }) 
    }
  }
</script>

<style lang="less" scoped>
  #login{
    margin-top: 100px; 
    #titel{
      text-align: center;
      color: black;
    }
    #titel:before ,#titel:after{
      content:"";
      width: 30%;
      height: 1px;
      background-color: #dddddd;
      display: inline-block;
      margin: 0px 20px;
      vertical-align: middle;
    }
    #loginForm{
      margin: 0px auto;
      padding: 30px;
      width: 440px;
      height: 340px;
      .loginMethods{
        display: inline-block;
        color: #555555;
        margin: 10px
      }
      form{
        .text{
          background-color: #fff8c5;
          border: 1px solid #FFe6b8;
          border-radius: 3px;
          width: 388px;
          height: 18px;
          padding: 10px;
          margin: 0px 10px;
          outline: none;
          color: #bca986;
        }
        .tips{
          margin: 10px 10px;
          color: #f66495;
          font-size: 12px;
        }
        .hide{
          visibility: hidden;
        }
        #buttonBox{
          margin: 10px;
          width: 410px;
          #loginButton{
            display: inline-block;
            background-color: #00a7de;
            border: #0381aa 1px solid;
            width: 180px;
            height: 36px;
            color: #ffffff;
            border-radius: 3px;
            margin-right: 50px;
            outline: none;
          }
          #registerButton{
            display: inline-block;
            background-color: #ffffff;
            border: #cccccc 1px solid;
            width: 180px;
            height: 36px;
            color: #555555;
            border-radius: 3px;
            outline: none;
          }
        }
      }
    }
  }
</style>