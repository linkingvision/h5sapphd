<template>
   <div class="liveview">
       <!-- 头部 -->
      <ion-header>
          <ion-toolbar  color="#151515" class="ion-toolbar" style="--min-height:64px">
             <ion-buttons slot="start" class="username">
                <el-dropdown trigger="click">
                    <ion-button>
                        <img src="../assets/imags/user5@2x.png" alt="">
                        <ion-label class="user-label" color='#FFFFFF'> {{this.$store.state.Useport.user}}</ion-label>
                    </ion-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >
                            <ion-button @click="logout()" class="logbtn">
                                <span class="logout"></span>
                                <ion-label>退出登录</ion-label>
                            </ion-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <ion-button @click="about()" class="logbtn" >
                               <span class="about"></span>
                               <ion-label color='#FFFFF'  >关于</ion-label>
                            </ion-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                 </el-dropdown>
             </ion-buttons>
             <ion-segment value="livie"  class="segment">
                    <ion-segment-button value="livie" checked>
                         <ion-label color='#C3C3C3'>实时视频</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="upload">
                         <ion-label color='#C3C3C3'>上传</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="call">
                         <ion-label color='#C3C3C3'>搜索</ion-label>
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
                    <ion-segment class="menu-gongneng" :value='segmentChecked' @ionChange="segmentChecked=$event.target.value" >
                        <ion-segment-button  value="livie" checked class="Device" >
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
                 <!--设备 -->
                 <div v-if="segmentChecked==='livie'">
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
                </div>
                <!-- 最近浏览 -->
                 <div v-if="segmentChecked==='playback'">
                    <ion-list class="Recent-browse">
                       <ion-item lines="none" class="RecentBrowse"  v-for="(item, index) in viewHistory" :key="index"  @click="changePanelhistory(item)">
                            <ion-thumbnail slot="end" class="browseimg">
                                <video width="100%" height="100%" autoplay  style="background-color:#222223;border-radius:15px;" :poster='item.Screenshotimg'></video>
                            </ion-thumbnail>
                            <ion-label  class="browseLabel">{{item.label}}</ion-label>
                            <ion-label position="stacked" class="browseLabel2">2020.5.28.26</ion-label>
                       </ion-item>
                    </ion-list>
                 </div>
                <!--收藏夹 -->
                 <div v-if="segmentChecked==='call'">
                    <ion-label color='#FFFFF'> 暂无收藏夹</ion-label>
                </div>
            </ion-content>
        </ion-menu>
      <!-- content -->
      <ion-content class="ion-content" color='#151515'>
          <ion-slides pager="true" :options="slideOpts" @ionSlideNextStart='slidechangenone()'  @ionSlideReachStart='slidechangeblock()'>
            <!-- 实时视频 -->
            <ion-slide  class="videoslide">
                <div class="flexvideo" id="videoPanel" slot="fixed">
                    <div name='flex' style="position: relative;" class="videoColor" v-for="r in rows" :key="r">
                        <div class="palace" name="flex" v-for="c in cols" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)" :key="c">
                            <v-liveplayer v-bind:id="'h'+r+c" :h5id="'h'+r+c" :rows="rows" :cols="cols" :h5videoid="'hvideo'+r+c" >
                            </v-liveplayer>
                        </div> 
                    </div>
                  
                </div>
                  
                <!-- ptz menu -->
                <ion-fab horizontal="start" slot="fixed" class="ptzmenu">
                    <ion-fab-button class="btzleft">
                        <img src="../assets/imags/luxiang.png" alt="">
                    </ion-fab-button >
                    <ion-fab-button class="btzleft">
                        <img src="../assets/imags/xiangji@2x.png" alt="">
                    </ion-fab-button>
                    <ion-fab-button class="btzleft" @click='ptzcloud()'>
                        <img src="../assets/imags/yuntai.png" alt="">
                    </ion-fab-button>
                </ion-fab>
                    <!-- ptz button -->
                        <!-- 中心圆 -->
                  <ion-content class="ptzcontent">  
                    <ion-fab vertical="center" horizontal="end" slot="fixed" class="centre">
                        <ion-fab-button class="porint"></ion-fab-button >
                    </ion-fab>
                        <!--速度滑条-->
                    <ion-fab vertical="center" horizontal="end" slot="fixed" class="fab-range">
                        <ion-label class="lablerange" >{{labelinputvalue}}x</ion-label>
                        <input type="range" orient="vertical" class="ne-range" name="slider" min="0.1" max="1" step="0.1" id="slider" value="0.5"  @input="change($event)" @change="change($event)"/>
                    </ion-fab>   
                        <!--ptz方向按键-->
                    <ion-fab vertical="center" horizontal="end" slot="fixed" class="ptzbuton">
                        <ion-grid class="ptzbutongrid">
                            <ion-row class="ptzrow-one">
                                <ion-col size='auto' offset="5"  class="ptzrow-one-col">
                                    <ion-fab-button class="fab-col-button"  show  id='fabptzup'>
                                        <img src="../assets/imags/top.png" alt="">
                                    </ion-fab-button>
                                </ion-col>
                            </ion-row>
                            <ion-row class="ptzrow-two">
                                <ion-col class="ptzbtn2" size='7'>
                                    <ion-fab-button show class="fab-col-button">
                                        <img src="../assets/imags/lefttop.png" alt="">
                                    </ion-fab-button>
                                </ion-col>
                                <ion-col size='auto'>
                                    <ion-fab-button class="fab-col-button" show>
                                        <img src="../assets/imags/righttop.png" alt="">
                                    </ion-fab-button>
                                </ion-col>
                                </ion-row>
                                <ion-row class="ptzrow-center">
                                    <ion-col>
                                        <ion-fab-button class="fab-col-button" show @touchstart ="PtzActionLeft($event)" @touchend="PtzActionStop($event)">
                                            <img src="../assets/imags/left.png" alt="">
                                        </ion-fab-button>
                                    </ion-col>
                                    <ion-col size='auto'>
                                        <ion-fab-button class="fab-col-button" show @touchstart ="PtzActionRight($event)" @touchend="PtzActionStop($event)">
                                            <img src="../assets/imags/right.png" alt="">
                                        </ion-fab-button>
                                    </ion-col>
                                </ion-row>
                                <ion-row >
                                <ion-col class="ptzbtn2" size='7'>
                                    <ion-fab-button show class="fab-col-button">
                                        <img src="../assets/imags/leftbottom.png" alt="">
                                    </ion-fab-button>
                                </ion-col>
                                <ion-col size='auto'>
                                    <ion-fab-button class="fab-col-button" show>
                                        <img src="../assets/imags/rightbottom.png" alt="">
                                    </ion-fab-button>
                                </ion-col>
                            </ion-row>
                            <ion-row class="ptzrow-end">
                                <ion-col size='auto' offset="5" class="ptzrow-dowon">
                                    <ion-fab-button class="fab-col-button" show  @touchstart ="PtzActionDown($event)" @touchend="PtzActionStop($event)">
                                        <img src="../assets/imags/bottom.png" alt="">
                                    </ion-fab-button>
                                </ion-col>
                            </ion-row>
                        </ion-grid>  
                    </ion-fab>
                    <!--预定位 -->
                    <ion-fab vertical="center"   horizontal="end" slot="fixed" class="pretarget">
                        <ion-fab-button class="pretargetBtn">预支位</ion-fab-button>
                    </ion-fab>
                    <!--ptz放大放小 -->
                    <ion-fab vertical="center" horizontal="end" slot="fixed" class="pretargeting">
                        <ion-fab-button class="pretargeting-jia"  @touchstart ="PtzActionZoomIn($event)" @touchend="PtzActionStop($event)">
                            <!-- <img src="../assets/imags/pretargeting-jia.png" alt=""> -->
                            +
                        </ion-fab-button>
                        <ion-fab-button class="pretargeting-jia" @touchstart ="PtzActionZoomOut($event)" @touchend="PtzActionStop($event)">
                            <!-- <img src="../assets/imags/pretargeting-jian.png" alt="">  -->
                            _
                        </ion-fab-button>
                    </ion-fab>
                </ion-content>
             </ion-slide> 
             <!-- 上传 -->
             <ion-slide>
                 <ion-uploading></ion-uploading>
             </ion-slide>
              <!--搜索 -->
             <ion-slide>
                 <div>搜索</div>
             </ion-slide>
               <!--全部-->
             <ion-slide>
                 <div>全部</div>
            </ion-slide>
          </ion-slides>
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
                 <ion-button class="close" @click="close()">
                     <img src="../assets/imags/guanbi-2@2x.png" alt="">
                 </ion-button> 
              </ion-buttons>
         </ion-toolbar>
             <div class="img"></div>
     </ion-footer>
     <!-- <ion-router-outlet main></ion-router-outlet> -->
   </div>
</template>
<script type="text/javascript">
   import { menuController, configFromSession } from '@ionic/core';
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
import * as types from '@/store/types'
import {H5siOS,H5sPlayerCreate} from '../assets/js/h5splayerhelper.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../assets/js/h5splayer.js'
import $ from 'jquery'
import Liveplayer from './liveplayer'
import Uploading from './uploading'
export default {
  name:"liveview",
  components: {
        'v-liveplayer': Liveplayer,
        'ion-uploading':Uploading
    },
   
  data(){
      return{
        customPopoverOptions:[],
        labelinputvalue:0.5,
        segmentChecked:'livie',
        segmentupload:'upload',
        visible: false,
        selectCol: 1,
        selectRow: 1,
        rc:13,
        h5id:'',
        rows: 2,
        cols: 2,
        h5videoid:'',
        data:[],
        camdata:[],
        tokenshow:'',
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
        viewHistory:'',
        slideOpts:{
            initialSlide: 1,
            speed: 400
          },
      }
  },
  created(){
    this.historyimg()
   },
  mounted(){
    console.log(this.$store.state.protocol)
    this.Regional()
    // $('.ptzmenu').hide()
    $('.ptzcontent').hide()
    // $('#fabptzup').on('touchstart',function(){
    //   alert('可以')
    // })
   },
  methods:{
 
     // 滚动条
   slidechangenone(){
      $('.ion-footer').hide()
   },
   slidechangeblock(){
      $('.ion-footer').show() 
   },
    //  头部菜单
   segmentChanged(event){
     console.log(event)
    },
   change(e){
        this.labelinputvalue=e.target.value
        console.log(e.target.value)
    },
    // ptz
    ptzcloud(){
      console.log(1)
      $('.ptzcontent').toggle();
    },
    about(){
      console.log(1)
     },
    logout(){
        this.$store.commit(types.LOGOUT);
        var root = this.$store.state.callport;
        var url = root + "/api/v1/Logout?session="+this.$store.state.token;
        this.$http.get(url).then(result=>{
            if(result.status==200){
            this.$router.push('/Login')
            }else{
            this.$router.push('/Login')
         }
      })
    },
    // 头部左边边下拉菜单
    presentPopover(ev) {
        const popover = Object.assign(document.createElement('ion-popover'), {
        component: 'popover-example-page',
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true
    });
        document.body.appendChild(popover);
        return popover.present();
   },
    // 头部右边下拉菜单
    openCustom(){
        $('.menubgc').toggleClass('menubgctogle')
        console.log(1)
    },
    // 传递视频播放位置id 
    videoClick(r, c, $event) {
        this.selectCol = c;
        this.selectRow = r;
        this.h5id='h'+r+c;
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
        //树形节点点击
        handleNodeClick1(data, checked, indeterminate){
            let _this =this;
            console.log(data)
            // var main="main"
        _this.tokenshow=data.strToken
            if (data.strToken) {
                let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
                console.log("----------------------", data.strToken,data.streamprofile, data.name,data.strName, vid);
                // return false;
                _this.$root.bus.$emit('liveplay', data.strToken,data.streamprofile, data.name,data.strName, vid);
            }
        setTimeout(function(){
            for(var i=1;i<=this.rows;i++){
                for(var c=1;c<=this.cols;c++){
                    var video= document.getElementById("hvideo"+i+c)
                    console.log('video.paused',video);
                    if(video.paused){
                        this.selectCol = c;
                        this.selectRow =i;
                        $('#videoPanel div[class*="videoClickColor"]').removeClass('videoClickColor');
                        $("#h"+this.selectRow+this.selectCol).addClass('videoClickColor');
                        console.log('video.paused1',video.paused,i,c);
                        return false
                    }else{
                        console.log('video.paused1',video.paused);
                    }
                }
            }
            
        }.bind(this),1000)
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

            //关闭
            close(){
                console.log("关闭");
                let vid = 'h' + this.$data.selectRow + this.$data.selectCol;
                let playid = 'hvideo' + this.$data.selectRow + this.$data.selectCol;
                this.$root.bus.$emit('liveplayclose',vid,playid);
            },
            PtzActionZoomIn(event)
        {
            console.log("PtzActionZoomIn");
            this.PtzActionfather('zoomin');
            event.stopPropagation();
            event.preventDefault()
        },
            PtzActionZoomOut(event)
        {
            this.PtzActionfather('zoomout');
        },
            PtzActionLeft(event)
        {
            this.PtzActionfather('left');
            },
            PtzActionRight(event)
        {
            this.PtzActionfather('right');
        },
            PtzActionUp(event)
        {
            this.PtzActionfather('up');
            event.stopPropagation();
            event.preventDefault()
        },
        PtzActionDown(event)
        {
            this.PtzActionfather('down');
        },
        PtzActionStop(event)
        {
            console.log("PtzActionStop");
            this.PtzActionfather('stop');
        },
        // PTZ方法   
        PtzActionfather(action)
        {    
            console.log(1)
            let vid = 'h' + this.$data.selectRow + this.$data.selectCol;
            let playid = 'hvideo' + this.$data.selectRow + this.$data.selectCol;
            let inputvalue=this.labelinputvalue
            this.$root.bus.$emit('ptzcloud', vid,playid,action,inputvalue);
            },
        //历史记录
        historyimg(){
        // 储存抓图
        let srcimg=[]
        let Screen=JSON.parse(localStorage.getItem("flatviewHistory"))
            Screen.forEach((value,index,arr)=>{
                let token=value.token
                console.log(token )
            // return false
                let Screenshotsurl=this.$store.state.callport+ "/api/v1/GetImage?token=" +token + "&session=" + this.$store.state.token;
                console.log(Screenshotsurl)
                this.$http({
                    url: Screenshotsurl,
                    methods: 'get',
                    responseType: 'blob',//接收的值类型
                    }).then((res) => {
                    let blob=res.data
                    let src = window.URL.createObjectURL(blob)//转换为图片路径
                    console.log(src)
                        // srcimg.push(src)+"<br/>"
                        srcimg.splice(0,0,src) 
                        this.$nextTick(() => {
                        console.log(srcimg)
                        let dataimg=Screen.map(function(item,index,array){
                            return {
                                    hlsver: item.hlsver,
                                    host: item.host,
                                    label:item.label,
                                    protocol:item.protocol,
                                    rootpath:item.rootpath,
                                    session:item.session,
                                    token: item.token,
                                    videoid: item.videoid,
                                    Screenshotimg:srcimg[index]
                                }
                        })
                    this.viewHistory=dataimg
                    console.log(dataimg)
                })
            }).catch(err=>{console.log(1)})
	    })
       },
        // 历史记录播放
        changePanelhistory(item) {
            console.log(item)	
            let _this = this;
            let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
            let playid = 'hvideo' + this.$data.selectRow + this.$data.selectCol;
            _this.$root.bus.$emit('liveplay', item.token,item.streamprofile, item.label,item.strName, vid);
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = this.$store.state.callport + window.location.pathname;
            }
            let conf = {
                    videoid: 'playid',
                    protocol:"http:", //http: or https:
                    host: item.host, //localhost:8080
                    streamprofile:item.streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                    rootpath:item.rootpath, // '/'
                    token: item.token,
                    hlsver: item.hlsver, //v1 is for ts, v2 is for fmp4
                    session: item.session, //session got from login,
                    label: item.label,
                    };
        this.h5handler = new H5sPlayerRTC(conf);
        $("#"+this.rtcid).addClass("rtc_new");
        this.h5handler = new H5sPlayerWS(conf);
        this.h5handler.connect();
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
/* 滑板 */
ion-slides {
  height: 100%;
}
.ion-content{
  background-color: #151515;
}
/* ptz定位 */
.ptzmenu{
   background-color: rgba(49, 49, 48, 0.5);
   border-radius:22px;
   height: 220px;
   width: 44px;
   padding:20px 0;
   margin-left:50px;
   border:1px solid #3C3C3C;
  }
.ptzmenu .btzleft{
    --background:transparent;
    --box-shadow:0;
    height: 44px;
    width: 44px;
    margin:10px auto;
 }
.ptzmenu>>>img{
    display:block;
    width: 25px;
    height: 25px;
    margin: 0 auto;
}
.ptzcontent{
    width: 100%;
    height: 100%;
}
.ptzbuton{
    width: 200px;
    height: 200px;
    border-radius:50% ;
    background-color: rgba(49, 49, 48, 0.5);
    margin-right: 100px;
    margin-top:50px;
}

.ptzbtn2{
    margin-left:20px;
}
.ptzrow-one{ 
    
    height: 25px;
}
.ptzrow-center{
    margin: 10px 0;
}
.fab-col-button{
    width: 23px;
    height: 23px;
    --background:transparent;
    --box-shadow:0;
}
.fab-col-button img{
    display: block;
}
.ptzrow-end{
    height: 25px;
}
/* 速度条 */
.range{
    width: 300px;
    --bar-height:16px;
    --bar-border-radius:8px;
}
.fab-range{
    /* transform:rotate(-90deg); */
    margin-right:380px;
    margin-top:50px;
}
.fab-range input[type=range][orient=vertical]{
	 writing-mode: bt-lr; /* IE */
	 outline: 0;
	 -webkit-appearance:slider-vertical;
	 box-shadow: 0px 2px 10px 25px rgb(5, 5, 5) inset,
                 0 0px 1px #0CE4AD inset; 
     margin-top: 2px;
     border-radius: 20px;
	 width: 15px;
	 height: 200px;
	 background-color: rgba(252, 252, 19, 0.5)!important;
     border: 1PX solid #0CE4AD;
	 padding: 0 5px;
     background: -webkit-linear-gradient(top, rgb(5, 156, 250), rgb(5, 156, 250)) 0% 0% / 27% 100% no-repeat;
    
    }
.fab-range input[type=range]::-webkit-slider-thumb {
	-webkit-appearance:none;
     -moz-appearance: none;
     appearance: none;
	outline: none;
	margin-left: -10px !important; 
	border-radius: 50%;
	box-shadow: 25px 25px 25px 25px #0EDBAD inset,
	            0 0px 1px rgba(0, 0, 0, 0.986) inset;; /*添加底部阴影*/
	border: solid 1px #0EDBAD;
	background: url('../assets/imags/righttop.png') ;
	/* cursor: default; */
	
 }
input[type=range]::-webkit-slider-runnable-track {
	
	width: 15px;
    border-radius: 20px; /*将轨道设为圆角的*/
	/* box-shadow: 0 1px 1px #4FBAFF, inset 0 .12em .12em #4FBAFF; */
	background-color:rgba(49, 49, 48, 0);
    border:1px solid  #0CE4AD;
}
.fab-range .lablerange{
    color: #0BEBAC;
    position: absolute;
    right:30px;
}
/* 中心圆 */
.centre{
   margin-right: 173px;
   margin-top: 125px;
}
.porint{
    width: 50px;
    height: 50px;
    --background: rgba(185, 185, 177, 0.5);
  }
/* 预定位 */
.pretargeting{
   background-color: rgba(49, 49, 48, 0.5);
   border:1px solid #3C3C3C;
   height:170px;
   width:44px;
   border-radius: 22px;
   margin-right: 8px;
}
.pretarget{
  margin-top:-110px;
}
.pretargetBtn{
    width: 60px;
    height: 60px;
    font-size:15px;
    --background: rgba(49, 49, 48, 0.5);
    --color: #0EDBAD;
}
.pretargeting .pretargeting-jia{
    --background:transparent;
    --box-shadow:0;
    width:25px;
    font-size:30px;
    margin:0 auto ;
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
/* 头部退出登录 */
.el-dropdown-menu{
    background-color: #303031;
    left: 10px !important;
    border-radius:10px ;
    padding: 10px;
}
.el-dropdown-menu>>>li{
    cursor: pointer;
    list-style: none;
    background-color: #303031;
    width:150px;
    height:50px;
    line-height: 50px;
    color: #FFFFFF;
  }
.logout{
    display: inline-block;
    height: 17px;
    width: 17px;
    background: url('../assets/imags/tuichudenglu@2x.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
}
.logbtn{
    --color:#FFFFFF;
}
.about{
    display: inline-block;
    height: 17px;
    width: 17px;
    background: url('../assets/imags/guanyu-3@2x.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
}
.demonstration {
    display: block;
    color: #61676e;
    font-size: 14px;
    margin-bottom: 20px;
  }
.my-custom-class .popover-wrapper .popover-content {
    background: #222;
    --height: 23px !important;
}
.my-custom-class {
    --background: #222;
  
}
.popover-content.sc-ion-popover-md{
    height: 23px !important;
}
.popover-viewport.sc-ion-popover-md{
     --height: 23px !important;
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
	border: 1px solid #0B8CFA !important;
    /* opacity: 0.50; */
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
/*最近浏览 */
.Recent-browse{
   background-color:transparent;
}
.Recent-browse .RecentBrowse{
   --background:transparent;
   padding: 5px 0;
   padding-left: 25px;
 }
.Recent-browse .browseLabel{
  --color:#FFFFFF;
  font-size: 15px; 
  padding-top:20px;
  margin: 0;
}

.Recent-browse .browseLabel2{
   --color:#868686;
   font-size: 15px;
   padding-bottom:0px;
   margin-bottom:35px ;
}
.browseimg{
   --border-radius:20px !important;
   width: 150px ;
}

</style>