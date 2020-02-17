<template>
  <div id="itemBox" @click="goDiscussDetails">
    <div id="box">
      <img :src="'http://127.0.0.1:11010/discussImg/'+item.imgName" @load="imgLoad"/>
      <p id="title">{{item.titel}}</p>
      <div id="dividingLine"></div>
      <p id="text">{{item.text}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

interface disc{
  Id:number;
  text:string;
  titel:string;
  userId:number;
}

@Component
export default class discussItem extends Vue{
  //prop
  @Prop({type:Object,default(){return {}}})
  private item!:disc[];

  //created
  private created(){
    //console.log(this.item);
  }
  @Emit('imgLoad')
  private imgLoad(){
    return null
  }

  //methods
  private goDiscussDetails(){
    this.$router.push({name:'discussDetails',params:{"discussID":(this.item as any).Id,"userId":(this.item as any).userId}})
  }
}
</script>

<style lang="less" scoped>
p{
  margin: 0px;
}
img{
  width: 100%;
  user-select: none;
}
#itemBox{
  padding: 10px;
  #box{
    border-radius: 10px;
    overflow: hidden; 
    box-shadow: #333333 0px 0px 5px 0px;
    #title{
      background-color: #ffffff;
      display: inline-block;
      border-radius: 5px; 
      padding: 4px;
      color:#333333;
      user-select: none;
    }
    #dividingLine{
      margin: 3px 0px;
      height: 1px;
      background-color: hsl(0, 0%, 65%);
    }
    #text{
      padding: 5px;
      font-size: 10px;
      color:#333333;
      height: 44px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      user-select: none;
    }
  }
}
</style>