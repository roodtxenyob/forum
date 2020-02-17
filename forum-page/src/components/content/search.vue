<template>
  <div id="search">
    <input type="text" v-model="searchText" id="searchInput" :placeholder="text"/>
    <button id="submitSearch">
      <div class="icon-search"></div>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class search extends Vue {
	@Prop({ type:String, default:"站内搜索" })
	private text!:string;

  private searchText: string | any = "";
}
</script>

<style scoped lang="less">
#search{
	display: inline-block;
	#submitSearch {
		background-color: #e7e7e7;
		width: 29px;
		height: 29px;
		outline: none; 
		border: 1px solid transparent; 
		display: inline-block;
		position: relative;
		top: 6px;
		color: #505050;
	}
	#submitSearch:hover {
		color: #00a1d6;
	}
	#searchInput{
		padding: 3px 10px;
		border: #e7e7e7 1px solid;
		border-radius: 3px 0px 0px 3px;
		outline: none;
		display: inline-block;
	}
}

.icon-search {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 2px solid currentcolor;
	position: relative;
	top: -1px;
	left: -3px;
}
.icon-search:after{
	content: "";
	transform: rotate(45deg);
	width:8px;
	height: 2px;
	position: absolute;
	top:11px;
	left:9px;
	background-color: currentcolor;
}
</style>