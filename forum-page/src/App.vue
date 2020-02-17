<template>
  <div id="app">
    <headerList></headerList>
    <router-view></router-view> 
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  import headerList from "@/components/content/headerList.vue";

  @Component({
    components: {
      headerList
    }
  })
  export default class App extends Vue {
    //data
    //mounted 
    
    
  }
</script>

<style scoped lang="less">
@import "assets/css/normalize.css";

</style>