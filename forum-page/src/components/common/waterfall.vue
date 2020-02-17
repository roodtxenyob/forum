<template>
  <div class="repair">
    <div id="left">
      <div id="fixedColumn">
        <slot name="fixedColumn"></slot>
      </div>
      <div id="aColumn" class="column">
        <slot name="aColumn"></slot>
      </div>
      <div id="bColumn" class="column">
        <slot name="bColumn"></slot>
      </div>
    </div>
    <div id="right">
      <div id="cColumn" class="column">
        <slot name="cColumn"></slot>
      </div>   
      <div id="dColumn" class="column">
        <slot name="dColumn"></slot>
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
export default class waterfall extends Vue{

}
</script>

<style lang="less" scoped>
.repair:after,.repair:before{
  display: table;
  content:"";
  clear: both;
}
#left,#right{
  width:50%;
}
#aColumn,#bColumn{
  margin-top: 250px; 
}
#right{
  float: left;
}
#fixedColumn{
  margin: 10px 10px;
  width: 531px;
  overflow: hidden;
  position: absolute;
  z-index: 10;
  border-radius: 10px; 
  box-shadow: #333333 0px 0px 5px 0px;
}
.column{
  width: 50%;
  background-color:#ffffff;
  float: left;
}
</style>