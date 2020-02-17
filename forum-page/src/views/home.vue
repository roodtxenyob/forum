<template>
  <div id="home">
    <waterfak>
      <div class="test" slot="aColumn" ref="aColumn">
        <ul>
          <li v-for="item in aList" :key="item.id">
            <discussItem :item="item" @imgLoad="getHight"></discussItem>
          </li>
        </ul>
      </div>
      <div class="test" slot="bColumn" ref="bColumn">
        <ul>
          <li v-for="item in bList" :key="item.id">
            <discussItem :item="item" @imgLoad="getHight"></discussItem>
          </li>
        </ul>
      </div>
      <div class="test" slot="cColumn" ref="cColumn">
        <ul>
          <li v-for="item in cList" :key="item.id">
            <discussItem :item="item" @imgLoad="getHight"></discussItem>
          </li>
        </ul>
      </div>
      <div class="test" slot="dColumn" ref="dColumn">
        <ul>
          <li v-for="item in dList" :key="item.id">
            <discussItem :item="item" @imgLoad="getHight"></discussItem>
          </li>
        </ul>
      </div>
      <mainSwiper slot="fixedColumn"></mainSwiper>    
    </waterfak>
    <modal>
      
    </modal>  
    <returnTop></returnTop>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { postDiscussList } from "../request/sending";
import mainSwiper from "@/components/common/mainSwiper/mainSwiper.vue";
import waterfak from "@/components/common/waterfall.vue";
import discussItem from "@/components/content/discuss/discussItem.vue";
import modal from "@/components/content/modal/modal.vue";
import returnTop from "@/components/content/returnTop/returnTop.vue";
interface disc{
  Id:number;
  text:string;
  titel:string;
  userId:number;
}

interface arr{
  [index:number]:disc;
}

@Component({
  components:{
    mainSwiper,
    waterfak,
    discussItem,
    modal,
    returnTop
  }
})
export default class home extends Vue{
  //data  
  private discussList:any = [];//请求到的帖子列表
  //下为abcd列
  private aList:any = [];
  private bList:any = [];
  private cList:any = [];
  private dList:any = [];
  //各列高度
  private listHeight:any = [];
  //请求计数
  private requestListCount:number = 1;
  //created
  private created():any{
    //请求帖子列表
    postDiscussList({
      count:this.requestListCount
    }).then((result:any) => {
      this.discussList = result.list;

      let arrContainer:any = [];
      //先渲染4个
      arrContainer = this.discussList.shift();
      this.aList.push(arrContainer);
      arrContainer = [];
      this.requestListCount ++ ;
    }).catch((error:any) => {
      console.log(error)
    })

    addEventListener('scroll',this.scrollLoading);
  }
  private scrollLoading(){
    if((Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)-
    (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)) <= 1000){
      //loading
      postDiscussList({
        count:this.requestListCount
      }).then((result:any) => {
        this.discussList = result.list;

        let arrContainer:any = [];
        //先渲染4个
        arrContainer = this.discussList.shift();
        this.aList.push(arrContainer);
        arrContainer = [];
        this.requestListCount ++ ;
      }).catch((error:any) => {
        console.log(error)
      })
    }
  }


  private getHight(){
    if(this.discussList.length != 0){ 
      let arrContainer:any = [];
    
      //获取高度
      this.listHeight = [ (this.$refs.aColumn as HTMLElement).offsetHeight + 250,
                          (this.$refs.bColumn as HTMLElement).offsetHeight + 250,
                          (this.$refs.cColumn as HTMLElement).offsetHeight,
                          (this.$refs.dColumn as HTMLElement).offsetHeight
                        ];


      //获取最小列
      let min:number = this.listHeight[0];
      let index:number = 0;
      for (let i = 0; i < this.listHeight.length; i++) {
        if (min > this.listHeight[i]) {
          min = this.listHeight[i];
          index = i;
        }
      }
      //继续向最小列里渲染
      if(index == 0){
        arrContainer = this.discussList.shift();
        this.aList.push(arrContainer);
        arrContainer = [];
      }
      if(index == 1){
        arrContainer = this.discussList.shift();
        this.bList.push(arrContainer);
        arrContainer = [];
      }
      if(index == 2){
        arrContainer = this.discussList.shift();
        this.cList.push(arrContainer);
        arrContainer = [];
      }
      if(index == 3){
        arrContainer = this.discussList.shift();
        this.dList.push(arrContainer);
        arrContainer = [];
      }
    }
  }
}
</script>

<style scoped lang="less">
  ul,li{
    padding:0;margin:0;list-style:none
  }
  #home{
    width:1101px;
    margin: 50px auto 0px auto;
  }
  
</style>