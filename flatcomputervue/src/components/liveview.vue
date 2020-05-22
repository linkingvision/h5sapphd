<template>
   <div class="liveview">
       <!-- 头部 -->
      <ion-header>
          <ion-toolbar  color="#151515" class="ion-toolbar" style="--min-height:64px">
             <ion-buttons slot="start" class="username">
                <ion-button>
                    <img src="../assets/imags/user5@2x.png" alt="">
                    <ion-label class="user-label" color='#FFFFFF'> {{this.$store.state.Useport.user}}</ion-label>
                </ion-button>
             </ion-buttons>
             <ion-segment value="livie" class="segment">
                    <ion-segment-button value="livie" checked>
                         <ion-label color='#C3C3C3'>实时视频</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="playback">
                         <ion-label color='#C3C3C3'>回放</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="call">
                         <ion-label color='#C3C3C3'>报警</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="all">
                         <ion-label color='#C3C3C3'>全部</ion-label>
                    </ion-segment-button>
             </ion-segment>
             <ion-buttons slot="end" class="ion-segment" id='main'>
                  <ion-menu-button 	auto-hide='false' class="ion-menu" expand="block" @click="openCustom()">
                     <div class="menubgc"></div>
                  </ion-menu-button>
             </ion-buttons>
         </ion-toolbar>
      </ion-header>
       <ion-menu side="end" menu-id="custom" class="my-custom-menu"  content-id="main"  type="overlay">
                <ion-header>
                    <ion-toolbar style="--background:#222223">
                        <ion-segment class="menu-gongneng">
                            <ion-segment-button  value="livie" checked class="Device">
                                <ion-label>设备</ion-label>
                            </ion-segment-button>
                            <ion-segment-button value="playback" class="Device">
                                <ion-label>最近浏览</ion-label>
                            </ion-segment-button>
                            <ion-segment-button value="call" class="Device">
                                <ion-label>收藏夹</ion-label>
                            </ion-segment-button>
                       </ion-segment>
                    </ion-toolbar>
                </ion-header>
                <ion-content color="#222223" class="menu-content">
                    	<div class="devicetoog">
							<div>区域</div>
						</div>
						<el-tree class="el_tree" 
							node-key="strName" 
							:default-expanded-keys="['root']" 
							:data="camdata" 
							:props="defaultProps1">
							<span slot-scope="{ node, data }" style="width:100%;">
								<span class="root">
								    <span class="iconfont1" style="color:rgb(142, 132, 132);"></span>
									<span :class="data.iconclass" style="padding-left: 4px;">{{data.strName}}</span>
								</span>
								<div v-if="data.cam.length!=0">
									<el-tree class="el_tree1" :data="data.cam" :props="defaultProps1" @node-click="handleNodeClick1">
										<span slot-scope="{ node, data }">
											<div style="width:100%;display: flex;justify-content: space-between;">
												<span >
													<span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
													<span  style="padding-left: 4px;">{{data.strName}}</span>
												</span>
												<span :class="data.iconclass2" class="black" style=""></span>
											</div>
										</span>
									</el-tree>
								</div>
							</span>
						</el-tree> 
                </ion-content>
        </ion-menu>
      <!-- content -->
      <ion-content class="ion-content" color='#151515'>
            <div class="flexvideo" id="videoPanel" slot="fixed">
                <div name='flex' style="position: relative;" class="videoColor" v-for="r in rows" :key="r">
                    <div class="palace" name="flex" v-for="c in cols" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)" :key="c">
                        <v-liveplayer v-bind:id="'h'+r+c" :h5id="'h'+r+c" :rows="rows" :cols="cols" :h5videoid="'hvideo'+r+c" >

                        </v-liveplayer>
                    </div> 
                </div>
            </div>
           
	 </ion-content>
     <!-- footer -->
     <ion-footer class="ion-footer">
         <ion-toolbar color='#1A1A1A'  class="footer-toobar" style="--min-height:50px">
              <ion-buttons class="ionfooter-button">
                 <ion-button>
                     <img src="../assets/imags/audio@2x.png" alt="">
                 </ion-button>
                 <ion-button class="quality">
                     <img src="../assets/imags/biaoqing@2x.png" alt="">
                 </ion-button>
                 <ion-button class="pause" shape="round">
                      <img src="../assets/imags/zantingtingzhi-3@2x.png" alt="">   
                 </ion-button>
                 <ion-button class="gongge">
                     <img src="../assets/imags/gongge10@2x.png" alt="">
                 </ion-button>
                 <ion-button class="close">
                     <img src="../assets/imags/guanbi-2@2x.png" alt="">
                 </ion-button> 
              </ion-buttons>
         </ion-toolbar>
              <div class="img"></div>
     </ion-footer>
     <!-- <ion-router-outlet main></ion-router-outlet> -->
  </div>
</template>
<script>
    import { menuController } from '@ionic/core';
    window.menuController = menuController;
</script>
<script>
import '../assets/js/jquery-3.1.1.js'
// import '../assets/js/bootstrap.js'
import '../assets/js/adapter.js'
import '../assets/js/platform.js'
import '../assets/js/h5splayer.js'
import '../assets/js/h5splayerhelper.js'
import '../assets/css/h5splayer.css'
import {H5siOS,H5sPlayerCreate} from '../assets/js/h5splayerhelper.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../assets/js/h5splayer.js'
import $ from 'jquery'
import Liveplayer from './liveplayer'
export default {
  name:"liveview",
  components: {
        'v-liveplayer': Liveplayer,
    },
   
  data(){
      return{
        selectCol: 1,
	    selectRow: 1,
        rows: 2,
        cols: 2,
        h5videoid:'',
        data:[],
        camdata:[],
        defaultProps: {
            children: 'children',
            label: 'label',
            token:"token",
            iconclass:"iconclass"
        },
        defaultProps1: {
            children: 'node',
            label: 'strName',
            cam:"cam",
        },
    }
  },
  mounted(){
    this.Regional()
  },
  methods:{
  // 头部右边下拉菜单
 openCustom(){
      $('.menubgc').toggleClass('menubgctogle')
        // this.menu.enable(true, 'custom');
    //   this.menu.open('custom');
      console.log(1)

  },
 //树形节点点击
 handleNodeClick1(data, checked, indeterminate){
    let _this =this;
    console.log(data)
    // var main="main"
    if (data.strToken) {
        let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
        console.log("----------------------", data.strToken,data.streamprofile, data.name,data.strName, vid);
        // return false;
        _this.$root.bus.$emit('liveplay', data.strToken,data.streamprofile, data.name,data.strName, vid);
    }
 },
 // 区域
	Regional(){
		var root = this.$store.state.callport;
		var url = root + "/api/v1/GetRegion?session="+this.$store.state.token;
		// console.log(url,this.$store.state.callport,this.Useport,root);
		this.$http.get(url).then(result=>{
            console.log(result)
			var oldarr=result.data.root;
			
			var oldarr1=result.data.src;
			var dataroot=this.getchild(oldarr,oldarr1);
			// console.log(dataroot);
			this.camdata.push(dataroot);
			// console.log(this.camdata)
		})
	},
	getchild(arr,arr1) {
		for(var i in arr.cam){
			if(!arr.cam[i].strName){
				for(var j in arr1){
					if(arr.cam[i].strToken == arr1[j].strToken){
						var node1=[{
							strToken : arr1[j].strToken,
							streamprofile : "main",
							strName :'主码流',
							name:arr1[j].strName+"--"+'主码流',
							iconclass : 'listpng',
						},{
							strToken : arr1[j].strToken,
							streamprofile : "sub",
							strName :'辅码流',
							name:arr1[j].strName+"--"+'辅码流',
							iconclass : 'listpng',
						}]
						arr.cam[i].node=node1;
						arr.cam[i].strName = arr1[j].strName;
						arr.cam[i].name=arr1[j].strName+"--"+'主码流',
						arr.cam[i].bOnline = arr1[j].bOnline;
						arr.cam[i].iconclass="listpng2"
						if(!arr1[j].bOnline)
							arr.cam[i].iconclass = 'mdi mdi-camcorder-off fa-fw';

						if(arr1[j].nConnectType == 'H5_CLOUD')
							arr.cam[i].iconclass = 'listpng2';

						if(arr1[j].bRec == true)
							arr.cam[i].iconclass2  = 'iconfont icon-radioboxfill none';
					}
				}
			}
		}
		if(arr.node && arr.node.length>0){
			for (var i = 0; i < arr.node.length; i++) {
				arr.node[i] =this.getchild(arr.node[i],arr1);
			}
		}
		return arr;
	},
   // 传递视频播放位置id 
    videoClick(r, c, $event) {
        console.log(1)
		this.selectCol = c;
		this.selectRow = r;
		 let h5video='hvideo'+r+c
         this.h5videoid=h5video
         console.log($($event.target).parent())
		console.log(r, c,$($event.target).parent().hasClass('videoClickColor'));
		if ($($event.target).parent().hasClass('videoClickColor')) {
			$($event.target).parent().removeClass('videoClickColor');
		} else {
			$('#videoPanel div[class*="videoClickColor"]').removeClass('videoClickColor');
			$('#videoPanel>div').eq(r - 1).children('div').eq(c - 1).addClass('videoClickColor');
		}
		if(document.webkitIsFullScreen){
			$(".Close_flex1").toggle();
		}
    },
    
  }
}
</script>

<style scoped>
.liveview{
    height: 100%;
    width: 100%;
    position: relative;
}
.liveview>.ion-footer .img{
    width: 100%;
    height:105px;
    background: url('../assets/imags/footer3@2x.png') no-repeat;
    background-size:100% 100% ;
    position:absolute;
    top: -53px;
    left: 50%;
    transform: translateX(-50%);
 }
.liveview>.ion-footer .img img{
    width: 17px;
    height: 19px;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.ion-content{
    background-color: #151515;
}
.my-custom-menu {
  --width: 400px;
  --background:#303031;
  --height:100% ;
  margin-top:89px;
  margin-bottom: 52px;
 }
.username img{
    display: block;
    width: 17px;
    height: 19px;
    margin-right: 10px;
    margin-left:39px ;
}
.username>>>.user-label{
    color: #FFFFFF;
    font-size: 15px;
}
.ion-toolbar .ion-menu .menubgc{
    width: 22PX;
    height: 21PX;
    background: url('../assets/imags/mesum@2x.png') no-repeat;
    background-size: 100% 100%;
}
.ion-toolbar .ion-menu .menubgctogle{
    width: 22PX;
    height: 21PX;
    background: url('../assets/imags/allxuan@2x.png') no-repeat;
    background-size: 100% 100%;
}
.ion-segment{
    margin-right:40px ;
}
.segment{
    padding:0 150px;
}
.segment .sc-ion-segment-md-hion-toolbar.ion-color:not(.ion-color).sc-ion-segment-md-s > 
ion-segment-button, ion-toolbar.ion-color .sc-ion-segment-md-h:not(.ion-color).sc-ion-segment-md-s > 
ion-segment-button {
    --color-checked:#0BE1B3;
    --color:#FFFFFF;
}
.sc-ion-segment-md-h{
    --color:#868686;
 }
.Device{
    font-size: 18px;
}
.menu-gongneng .sc-ion-segment-md-hion-toolbar:not(.ion-color):not(.ion-color).sc-ion-segment-md-s >
.segment-button-checked, ion-toolbar:not(.ion-color) .sc-ion-segment-md-h:not(.ion-color).sc-ion-segment-md-s >
.segment-button-checked{
    --color-checked:#FFFFFF;
    --background-checked:#303031;
    --color:#FFFFFF;
    font-size: 20px !important;
    border-radius:0 20px 0 0;
    
}
.flexvideo{
    width: 100%;
    height: 100%;
	/* z-index: 2014; */
}
.flexvideo .videoColor{
    background-color: rgb(73, 74, 75) !important;
}
.videoClickColor {
    /* background-color: #f55f23 !important; */
	border: 1px solid #928e8e !important;
	/* box-sizing: border-box; */
    opacity: 0.50;
}
div[name='flex'] {
    display: flex;
    flex-wrap: wrap;
    height: 50%;
    border-bottom: 0px !important;
}
.palace[name='flex']{
    position: relative;
    flex: 1 1 25%;
    height: 100%;
    /* border:1px solid black; */
}
.footer-toobar>>>img{
    display:block;
    width: 21px;
    height: 23px;
    margin-right: 10px;
    margin:0 auto;
}
.footer-toobar .ionfooter-button{
    width: 900px;
    margin: 0 auto;
    padding-left:50px ;
    position: relative;
    padding-bottom: 20px;
}
.footer-toobar>>>.quality img{
    display: block;
    width: 40px;
    height: 21px;
}
.footer-toobar .sc-ion-buttons-ios-s ion-button{
    margin-right:88px ;
}
.footer-toobar .sc-ion-buttons-md-s ion-button {
    margin:0 55px ;
    text-align: center;
}
.ion-footer{
    height: 50px;
    width: 100%;
    position: relative;
    padding-bottom: 0px;
}
.footer-toobar>>>.pause{
    padding-bottom: 20px;
    padding-right:25px;
}
/* menu */
.menu-content{
    height: 20px;
}

/* 设备 */
.iconfont1{
	display: inline-block;
	width: 17px;
	height: 17px;
	background:url('../assets/imags/area.png') no-repeat center;
	background-size:100% 100%;
}
.listpng{
	display: inline-table;
	width: 17px;
	height: 17px;
	background:url('../assets/imags/twolist.png') no-repeat center;
	background-size:100% 100%;
}
.listpng2{
	display: inline-table;
	width: 20px;
	height: 15px;
	background:url('../assets/imags/videol.png') no-repeat center;
	background-size:100% 100%;
	vertical-align: middle;
}
.devicetoog{
    /* width:100%; */
    display: flex;
    justify-content: space-between;
    padding-top:18px;
    padding-bottom:12px;
    padding-left:20px ;
    font-size: 20px;
    color: #ece5e5;
    font-weight: 600;
    background-color:transparent;
} 
.el_tree{
   color: #C3C3C3;
   font-size: 20px;
   font-weight: 500;
    /* background-color:transparent !important; */
}
.el-tree-node__content:hover{
   background-color: transparent;
}
.el_tree1{
   margin: 0;
   margin-right: 30px;
   padding-left:18px;
}
.el_tree >>> .el-tree-node__content{
   min-height: 35px;
   height: auto;
   background-color: transparent;
   margin-left: 18px;

}
.root{
   display: block;
   text-align: left;
   padding-left:10px;
   padding-bottom:8px;
   padding-top:5px;
   font-size:20px;
}
#device span{
   font-size: 20px;
}
</style>