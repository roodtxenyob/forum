<template>
  <div id="register">
    <h1 id="titel">我的论坛</h1>
    <div id="loginForm">
      <p class="loginMethods">账号注册</p>
      <form action="" @submit.prevent="registerFormSubmit">
        <input type="text" class="text" 
        v-model="formData.username"
        placeholder="你想要的账号" />

        <input type="password" class="text" 
        v-model="formData.password" 
        placeholder="你心里想的密码" autocomplete />

        <input type="password" class="text" 
        v-model="formData.rePassword" 
        placeholder="在想一次密码" autocomplete />

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
  import { postRegister } from '../request/sending';
  @Component
  export default class register extends Vue{
    //data

    private formData:any = {
      username : "",
      password : "",
      rePassword: ""
    }
    //methods
    private registerFormSubmit(){
      if(this.testing()){
        alert('两次密码不一致');
        return
      }
      postRegister({
        formData:this.formData
      }).then((result:any) => {
        console.log(result);
      }).catch((error:any) => {
        console.log(error);
      });
    }
    

    private testing(){
      if(this.formData.password == this.formData.rePassword){
        return false;
      }
        return true;
    }
  }
</script>

<style lang="less" scoped>
  #register{
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
          margin-top: 30px; 
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