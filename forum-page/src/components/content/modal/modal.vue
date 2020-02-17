<template>
  <div id="modalbgc" v-if="$store.state.modalIsShow">
    <div id="modalBox">
      <div id="modalMain">
        <slot name="modalHead">
          <div id="modalHead" class="clearFloat">
            <img src="../../../assets/img/tx.png" id="avatar" />
            <input type="text" placeholder="写下你的标题" id="discussTitle" v-model="fdata.title"/>
          </div>
        </slot>
        <slot name="modalBody">
          <div id="modalBody">
            <textarea id="modalBodyText" v-model="fdata.text"></textarea>
            <input type="file" accept="image/*" ref="img"/>
          </div>
        </slot>
        <slot name="modalFoot">
          <div id="modalFoot" class="clearFloat">
            <button @click="posting">发布讨论</button>
          </div>
        </slot>
      </div>
      <button id="close" @click="closeModal">+</button>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Vue, Component, Prop} from 'vue-property-decorator';
  import { postDiscuss } from '../../../request/sending';
  import store from '../../../store';

  @Component
  export default class modal extends Vue{
    //Prop


    //data
    private fdata:any = {
      "title":"",
      "text":"",
    }



    //methods
    private posting():void{
      
      let formdata = new FormData();
      formdata.append("img",(this.$refs.img as any).files[0],(this.$refs.img as any).files[0].name);
      formdata.append("title",this.fdata.title);
      formdata.append("text",this.fdata.text);
      formdata.append("userId",(store.state as any).userInfo[0].Id);
      postDiscuss(
        formdata
      ).then((result:any) => {
        console.log(result);
      }).catch((error:any) => {
        console.log(error);
      })
      
    }

    private closeModal(){
      this.$store.dispatch('modalShowSync',false);
    }

  }
</script>

<style lang="less" scoped>
.clearFloat:after, .clearFloat:before{
  content:"";
  clear:both;
  display: table;
}

#modalbgc{
  background-color: rgba(22, 22, 22, 0.589);
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1000;
  #modalBox{
    width: 520px;
    height: 400px;
    position: absolute;
    top: 50%;
    bottom: 50%;
    right: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    background-color: #ffffff;
    #close{
      position: absolute;
      top: 4px;
      left: 526px;
      background-color: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 31px;
      transform: rotate(45deg);
      font-weight: lighter;
      -webkit-font-smoothing: antialiased;
      user-select: none;
    }
    #modalMain{
      padding: 36px 25px;
      position: relative;
      height: 328px;
      #modalHead{
        #avatar{
          width: 40px;
          height: 40px;
          border-radius: 3px;
          display: block;
          float: left;
        }
        #discussTitle{
          margin-left: 20px; 
          border: none;
          float: left;
          display: block;
          outline: none;
        }
      }
      #modalBodyText{
        width: 100%;
        height: 200px;
        resize: none;
        box-sizing: border-box;
        margin-top: 10px;

      }
      #modalFoot{
        position: absolute;
        left: -26px;
        right: 0px;
        bottom: 36px;
        width: 100%;
        button{
          float: right;
          background-color: rgb(0,119,230);
          color: #ffffff;
          border: transparent;
          border-radius: 3px;
          padding: 10px 20px; 
          font-size: 14px;
        }
      }
    }
  }
}
</style>