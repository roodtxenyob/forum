<template>
  <transition name="fade">
    <div id="returnTop" @click="backTop" v-show="isShowReturnTop">
      <p>TOP</p>
    </div>
  </transition>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    components: {
    }
  })
  export default class returnTop extends Vue {
    //data
    private isShowReturnTop = false;
    private mounted(){
      window.addEventListener('scroll',this.scroll);
    }
    
    private destroyed(){
      window.removeEventListener('scroll',this.scroll);
    }
    private scroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop > 300){
        this.isShowReturnTop = true;
      }else{
        this.isShowReturnTop = false;
      }
    }
    private backTop(){
      document.documentElement.scrollTop = 0;
    }
  }
</script>

<style scoped lang="less">
#returnTop{
  width: 50px;
  height: 50px;
  border: 1px solid #dfd0d0;
  background-color: rgb(136,160,199);
  position: fixed;
  bottom: 20px;
  right: 150px;
  text-align: center;
  color: rgb(236,242,252)
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>