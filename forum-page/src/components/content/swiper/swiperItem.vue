<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  @Component
  export default class swiperItem extends Vue{
    
  }
</script>

<style scoped lang="less">
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
