<template>
  <div id="headContent" class="clearFloat">
    {{this.textContent}}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  @Component
  export default class headerElement extends Vue{
    @Prop({type: String,default: "default value"})
    private textContent!:string;
    //体验真的是太糟糕了
  }
</script>

<style scoped lang="less">
.clearFloat:after, .clearFloat:before{
  content:"";
  clear:both;
  display: table;
}
#headContent{
  display: inline-block;
  font-size: 12px;
  line-height: 42px;
  padding: 0px 7px;
  user-select: none;
}
#headContent:hover{
  background-color: rgb(229, 233, 236);
  cursor: pointer;
}
</style>