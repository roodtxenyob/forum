<template>
  <div id="tourist" @click="goLogin">
    <h2>游客无权限查看帖子，请登录后再试，5秒钟后会跳转，若没有跳转请点我</h2>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    components: {

    }
  })
  export default class tourist extends Vue {
    //data
    //mounted 
    private mounted(){
      setTimeout(() => {
        this.goLogin();
      },4000);
    } 

    private goLogin(){
      this.$router.replace('/login');
    }
  }
</script>

<style scoped lang="less">
#tourist{
  margin-top: 200px; 
}

</style>