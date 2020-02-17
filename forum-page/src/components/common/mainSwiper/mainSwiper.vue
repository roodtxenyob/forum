<template>
    <swiper>
      <swiperItem>
        <a>
          <img src="../../../assets/img/t1.jpg">
        </a>
      </swiperItem>
      <swiperItem>
        <a>
          <img src="../../../assets/img/t2.jpg">
        </a>
      </swiperItem>
      <swiperItem>
        <a>
          <img src="../../../assets/img/t3.jpg">
        </a>
      </swiperItem>
    </swiper>
</template>

<script>
  import { Component, Vue, Prop } from "vue-property-decorator";
  import swiper from "components/content/swiper/swiper.vue";
  import swiperItem from "components/content/swiper/swiperItem.vue";
  @Component({
    components:{
      swiper,
      swiperItem
    }
  })
  export default class mainSwiper extends Vue {
  
  }
</script>

<style scoped>
  .fix:after,.fix:before{
    content: "";
    display: table;
    clear: both;
  }
  img {
    vertical-align: bottom;
  }
</style>
