<template>
  <div id="discussDetails" class="clearFloat" ref="mainElement">
    <div id="left" class="clearFloat">
      <div id="title" class="clearFloat">
        <p class="clearFloat">{{detail.titel}}</p>
        <div id="operation">
          <button class="btn m10" @click="star">收藏</button>
          <button class="btn m10" @click="addReply">回复</button>
        </div>
      </div>
      <div class="firstFloor clearFloat">
        <div class="userInfo clearFloat">
          <div class="delta">
            <p class="louzhu">楼主</p>
          </div>
          <img src="~assets/img/tx.png" alt="">
          <p>{{detail.userName}}</p>
        </div>
        <div class="text clearFloat">
          <p class="textBody">
            {{detail.text}}
          </p>
          <p class="textDetails">1楼 {{detail.replyDate | CLDateTime}}</p>
        </div>
      </div>
      <div v-for="(item,index) in replyDetails" :key="index" class="firstFloor clearFloat bd">
        <div class="userInfo clearFloat">
          <div class="delta" v-if="detail.userId == item[0].userId">
            <p class="louzhu">楼主</p>
          </div>
          <img src="~assets/img/tx.png" alt="">
          <p>{{item[0].nickName}}</p>
        </div>
        <div class="text clearFloat">
          <p class="textBody">
            {{item[0].text}}
          </p>
          <p class="textDetails">
            <button @click="del(item[0].floor)" class="btn" v-if="detail.userId == item[0].userId">删除</button>
            {{item[0].floor}}楼 {{item[0].dataTime}}
          </p>
        </div>
      </div>
      <div id="replyFrom">
        <p>发表回复</p>
        <textarea name="" id="replytext" cols="30" rows="10" v-model="replytext"></textarea>
        <button class="btn" @click="postTextReply">发表</button>
      </div>
      <div style="height: 200px;"><h2>暂时不想写的底部版权之类的</h2></div>
    </div>
    <div id="right" class="clearFloat">
      <div v-for="(item,index) in hot" :key='index' class="hotItem">
        {{index+1}}
        {{item.topic_name}}
      </div>
    </div>
    <returnTop></returnTop>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { postDiscussDetail , getHot ,postReply ,postReplyText ,postdelf} from "../../../request/sending";
  import returnTop from "@/components/content/returnTop/returnTop.vue";


  @Component({
    components: {
      returnTop
    },
    filters: {
      CLDateTime(dataTime:string){
        if(dataTime){
          return dataTime.replace('T',' ').replace('.000Z','');
        }       
      },
    }
  })
  export default class discussDetails extends Vue {
    //data
    private detail:any = {};
    private hot:any = [];
    private replyDetails:any = {};
    private replytext:string = "";
    //created
    private created() {
      postDiscussDetail({
        discussID:this.$route.params.discussID
      }).then((result:any) => {
        this.detail = result[0];
      }).catch((error:any) => {
        console.log(error);
      });

      getHot().then((result:any) => {
        this.hot = result.data.bang_topic.topic_list
      }).catch((error:any) => {
        console.log(error);
        this.hot = [{'topic_name':'热搜加载失败'}];
      });

      postReply(this.$route.params.discussID).then((result:any) => {
        this.compactObj(result, this.isEmpty)

        this.replyDetails = result;
      }).catch((error:any) => {
        console.log(error);
      })
    }
    
    private compactObj (obj:any, fn:any):any {
      for (let i in obj) {
        if (typeof obj[i] === 'object') {
          this.compactObj(obj[i], fn)
        }
        if (fn(obj[i])) {
          delete obj[i]
        }
      }
    }
 
    private isEmpty (foo:any):any {
        if (typeof foo === 'object') {
          for (let i in foo) {
            return false
          }
          return true
        } else {
          return foo === '' || foo === null || foo === undefined
        }
    }

    private addReply(){
      document.documentElement.scrollTop = (this.$refs.mainElement as any).scrollHeight;
    }

    private postTextReply(){
      postReplyText({
        replytext:this.replytext,
        userInfo:this.$store.state.userInfo[0],
        detailId:this.detail.Id
      }).then((result:any) => {
        console.log(result);
      }).catch((error:any) => {
        console.log(error)
      })
    }

    private star(){
      console.log('收藏');
    }

    private del(f:any){
      postdelf({
        f,
        userInfo:this.$store.state.userInfo[0],
        detailId:this.detail.Id
      }).then((result:any) => {
        console.log(result)
      }).catch((error:any) => {
        console.log(error)
      })
    }
  }
</script>

<style scoped lang="less">
  .clearFloat:after, .clearFloat:before{
    content:"";
    clear:both;
    display: table;
  }
  #discussDetails{ 
    width: 1080px;
    margin: 50px auto 0 auto;
    #left{
      width: 810px;
      float: left;
      border: 1px solid #e6e6e6;   
      background-color: rgb(251,251,253);     
      #title{
        font-size: 18px;
        padding: 20px;
        border-bottom: 1px solid #e6e6e6;
        background-color: #ffffff;
        p{
          margin: 0;
          float: left;
        }
        #operation{
          float: right;
          
        }
      }
      .firstFloor{
        width: 100%;
        .userInfo{
          width: 130px; 
          float: left;        
          img{
            display: block;
            height: 90px;
            margin: 20px;
          }
          p{
            text-align: center;
          }
        }
        .text{
          width: 679px;
          float: left;
          border-left: 1px solid #e6e6e6; 
          background-color: #fff;
          min-height: 167px;
          position: relative;
          .textBody{
            margin: 25px 20px;
            line-height: 24px;
            font-size: 14px;
          }
          .textDetails{
            margin: 15px 13px;
            font-size: 12px;
            float: right;
            position: absolute;
            bottom: 0px;
            right: 0px;
          }
        }
      }
    }
    #right{
      width: 266px;
      float: left;
      color: rgb(102,102,102);
      border: 1px solid rgb(230,230,230);
      .hotItem{
        margin: 5px;
      }
    }
  }
  .delta{
			width: 0px;
			height: 0px;
			border: solid 18px;
      border-color: rgb(85,139,246) rgb(85,139,246) transparent transparent;
      float: right;
	}
  .louzhu{
    color: #ffffff;
    display: inline-block;
    width: 40px;
    transform: rotate(45deg);
    position: relative;
    top: -25px;
    left: -14px;
    font-size: 12px;
  }
  .bd{
    border: 1px solid #e6e6e6; 
  }
  #replyFrom{
    background-color:rgb(230,230,230);
    border: 2px solid rgb(184, 180, 180); 
    padding: 0 20px;
    #replytext{
       height: 246px; 
       width: 760px;
       resize: none;
       border: 1px solid #5c5a5a;
       outline: none;
    }
  }
  .btn{
    height: 26px;
    font-size: 12px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 2px; 
    outline: none;
  }
  .m10{
    margin: 0 10px;
  }
</style>