<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator">
    </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class swiper extends Vue{
  //data
  private slideCount:number = 0;//元素个数
  private totalWidth:number = 0;//swiper的宽度
  private swiperStyle:any = {};//swiper样式
  private currentIndex:number = 1;///当前的index
  private scrolling:boolean = false;//当前是否在滚动
  private playTimer:any = null;//定时器容器
  private distance:any = null; 
  private currentX:any = null;
  private startX:any = null;
  //prop
  @Prop({type:Number,default:3000})
  private interval:number = 3000;
  @Prop({type:Number,default:300})
  private animDuration:number = 300;
  @Prop({type:Number,default:0.18})
  private moveRatio:number = 0.18;
  @Prop({type:Boolean,default:true})
  private showIndicator:boolean = true;

  //methods
  private startTimer():void{
    this.playTimer = window.setInterval(() => {
      this.currentIndex++;
      this.scrollContent(-this.currentIndex * this.totalWidth);
    },this.interval)
  }

  private stopTimer():void{
    window.clearInterval(this.playTimer);
  }

  private scrollContent(currentPosition:any):void{
    // 0.设置正在滚动
    this.scrolling = true;

    // 1.开始滚动动画
    this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
    this.setTransform(currentPosition);

    // 2.判断滚动到的位置
    this.checkPosition();

    // 4.滚动完成
    this.scrolling = false
  }

  private checkPosition():void{
    window.setTimeout(() => {
      // 1.校验正确的位置
      this.swiperStyle.transition = '0ms';
      if (this.currentIndex >= this.slideCount + 1) {
        this.currentIndex = 1;
        this.setTransform(-this.currentIndex * this.totalWidth);
      } else if (this.currentIndex <= 0) {
        this.currentIndex = this.slideCount;
        this.setTransform(-this.currentIndex * this.totalWidth);
      }

      // 2.结束移动后的回调
      this.$emit('transitionEnd', this.currentIndex-1);
    }, this.animDuration);
  }

  private setTransform(position:any):void{
    this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
    this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
    this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
  }

  private handleDom():void{
    // 1.获取要操作的元素
    let swiperEl:any = document.querySelector('.swiper');
    let slidesEls:any = swiperEl.getElementsByClassName('slide');

    // 2.保存个数
    this.slideCount = slidesEls.length;

    // 3.如果大于1个, 那么在前后分别添加一个slide
    if (this.slideCount > 1) {
      let cloneFirst = slidesEls[0].cloneNode(true);
      let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
      swiperEl.insertBefore(cloneLast, slidesEls[0]);
      swiperEl.appendChild(cloneFirst);
      this.totalWidth = swiperEl.offsetWidth;
      this.swiperStyle = swiperEl.style;
    }

    // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
    this.setTransform(-this.totalWidth);
  }

  private touchStart(e:any):void{
    // 1.如果正在滚动, 不可以拖动
    if (this.scrolling) return;

    // 2.停止定时器
    this.stopTimer();

    // 3.保存开始滚动的位置
    this.startX = e.touches[0].pageX;
  }

  private touchMove(e:any):void{
    // 1.计算出用户拖动的距离
    this.currentX = e.touches[0].pageX;
    this.distance = this.currentX - this.startX;
    let currentPosition = -this.currentIndex * this.totalWidth;
    let moveDistance = this.distance + currentPosition;

    // 2.设置当前的位置
    this.setTransform(moveDistance);
  }

  private touchEnd(e:any):void{
    // 1.获取移动的距离
    let currentMove = Math.abs(this.distance);

    // 2.判断最终的距离
    if (this.distance === 0) {
      return
    } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
      this.currentIndex--
    } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
      this.currentIndex++
    }

    // 3.移动到正确的位置
    this.scrollContent(-this.currentIndex * this.totalWidth);

    // 4.移动完成后重新开启定时器
    this.startTimer();
  }

  private previous():void{
    this.changeItem(-1);
  }

  private next():void{
    this.changeItem(1);
  }

  private changeItem(num:any):void{
    // 1.移除定时器
    this.stopTimer();

    // 2.修改index和位置
    this.currentIndex += num;
    this.scrollContent(-this.currentIndex * this.totalWidth);

    // 3.添加定时器
    this.startTimer();
  }

  //mounted
  private mounted():any{
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
    }, 1000)
  }
}
</script>

<style scoped lang="less">
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>