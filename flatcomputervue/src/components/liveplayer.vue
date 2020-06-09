<template>
    <div class="h5container">
        <video class="h5video1" :id="videoid" muted webkit-playsinline playsinline style= "object-fit: fill;">
        </video>
         <!-- 全屏 -->
        <ion-fab vertical="top" horizontal="end" slot="fixed" class="videofull" :id='videofullid'>
           <ion-fab-button class="collect">
               <img src="../assets/imags/collect@2x.png" alt="">
           </ion-fab-button>
           <ion-fab-button class="collect" @click='FullScreen($event)'>
               <img src="../assets/imags/fullscreen@2x.png" alt="">
           </ion-fab-button>
        </ion-fab>
          <!-- ptz menu -->
          <ion-fab vertical="center" horizontal="start" slot="fixed" class="ptzmenu-left">
              <ion-fab-button class="btzleft">
                  <img src="../assets/imags/luxiang.png" alt="">
              </ion-fab-button >
              <ion-fab-button class="btzleft">
                  <img src="../assets/imags/xiangji@2x.png" alt="">
              </ion-fab-button>
              <ion-fab-button class="btzleft" @click='PtzControlShow($event)'>
                  <img src="../assets/imags/yuntai.png" alt="">
              </ion-fab-button>
          </ion-fab>
          <div class="ioncontent">
                <!--中心圆 -->
            <ion-fab vertical="center" horizontal="end" slot="fixed" class="centre">
                <ion-fab-button class="porint"></ion-fab-button >
            </ion-fab>
                <!--速度滑条-->
            <ion-fab vertical="center" horizontal="end" slot="fixed" class="fab-range">
                <ion-label class="lablerange">{{Preset_value}}x</ion-label>
                <input type="range" orient="vertical" class="ne-range" name="slider" min="0.1" max="1" step="0.1" id="slider" value="0.5" @input="onchange($event)" @change="onchange($event)"/>
            </ion-fab> 
                <!--ptz方向按键-->
            <ion-fab vertical="center" horizontal="end" slot="fixed" class="ptzbuton">
                <ion-grid class="ptzbutongrid">
                    <ion-row class="ptzrow-one">
                        <ion-col size='auto' offset="5"  class="ptzrow-one-col">
                            <ion-fab-button class="fab-col-button"  show @touchstart ="PtzActionUp($event)" @touchend="PtzActionStop($event)">
                                <img src="../assets/imags/top.png" alt="">
                            </ion-fab-button>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ptzrow-two">
                        <ion-col class="ptzbtn2" size='7'>
                            <ion-fab-button show class="fab-col-button" >
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
                                <img src="../assets/imags/righttop.png" alt="">
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
                <IonVuePage :title="'Alert'">
                <ion-fab-button class="pretargetBtn" @click="presentAlert">预知位</ion-fab-button>
                </IonVuePage>
            </ion-fab>
            <!--ptz放大放小 -->
            <ion-fab vertical="center" horizontal="end" slot="fixed" class="pretargeting">
                <ion-fab-button class="pretargeting-jia" @touchstart ="PtzActionZoomIn($event)" @touchend="PtzActionStop($event)">
                    <!-- <img src="../assets/imags/pretargeting-jia.png" alt=""> -->
                    +
                </ion-fab-button>
                <ion-fab-button class="pretargeting-jia" @touchstart ="PtzActionZoomOut($event)" @touchend="PtzActionStop($event)">
                    <!-- <img src="../assets/imags/pretargeting-jian.png" alt="">  -->
                    _
                </ion-fab-button>
            </ion-fab>
           </div>  
        <div :id="rtcid" class=""></div>
    </div>
</template>

<script>
import '../assets/js/adapter.js'
import {H5sPlayerWS,H5sPlayerRTC} from '../assets/js/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../assets/js/h5splayerhelper.js'
import $ from 'jquery'
export default {
   name:'liveplayer',
   props:['h5id', 'h5videoid',"cols","rows"],
   data(){
       return{
          videoid: this.h5videoid,
          rtcid:"rtc"+this.h5videoid,
          h5handler: undefined,//视频内容
          audioback: undefined,
          currtoken: undefined,
          tokenshou:"",
          Preset_value:0.5,//镜头转换速度
          ptzshow:false,
          playHistory:[{}],//历史记录
          playConf:[],
          captchapath:'',
          curronRadio:'',
          confimg:'',
          videofullid:'videofullid'+this.h5videoid
       }
   },
  beforeDestroy() {
        //console.log(this.h5id, "beforeDestroy");
        if (this.h5handler != undefined)
        {
            this.h5handler.disconnect();
            delete this.h5handler;
            this.h5handler = undefined;
        }
            this.currtoken = undefined;
    },
   mounted(){
     let $container = $("#"+this.h5id);
     let $controls = $container.children(".ptzmenu-left");
     let $ptzbutton = $container.children(".ioncontent");
     let _this=this;
     console.log(this.h5videoid)
    _this.$root.bus.$on('liveplay', function(token,streamprofile,label,name, id){
        console.log(token,streamprofile,label,name, id)
           if (_this.h5id != id)
            {   
               return;
            }
            _this.PlayVideo(token,streamprofile,label,name);
            _this.tokenshou=token;
            console.log(1)
       });
    this.$root.bus.$on('liveplayclose', function(vid,playid){
       console.log(vid,playid,_this.videoid);
        if(playid==_this.h5videoid){
            console.log("deng")
            _this.playclose();
        }else{
            console.log("budeng")
            return false
        }
    });
     this.$root.bus.$on('ptzcloud', function(vid,playid,action,inputvalue){
       console.log(vid,playid,_this.videoid);
        if(playid==_this.h5videoid){
            console.log("deng")
            _this.Preset_value=inputvalue
           _this.PtzAction(action)
        }else{
            console.log("budeng")
            return false
            }
    });
    $container.on("click", function(e) {
        console.log(e)
        // $controls.css('display',e.type=='touchstart'?'block':'none');
        // $controls.toggle()
    });
    $('#'+this.videofullid).addClass('videofullnone')
    },
   methods:{
     PlayVideo(token,streamprofile,label,name){
         console.log(label)
            $('#'+this.videofullid).removeClass('videofullnone')
            if (this.h5handler != undefined)
            {
                console.log("////////////")
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            this.currtoken = token;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = "http://"+this.$store.state.Useport.ip+":"+this.$store.state.Useport.port + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = this.$store.state.Useport.ip+":"+this.$store.state.Useport.port;
            }
            let conf = {
                videoid: this.videoid,
                protocol:"http:", //http: or https:
                host: wsroot, //localhost:8080
                streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                rootpath: '/', // '/'
                token: token,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: this.$store.state.token, //session got from login,
                label:name,
                };
             console.log(H5siOS())
            // var curronRadio=JSON.parse(localStorage.getItem("radio"))
            
            if (H5siOS() === true)
            {
               this.h5handler = new H5sPlayerRTC(conf);
            }else { 
                // 判断是否选中ws播放或者是rtc
                this.h5handler = new H5sPlayerWS(conf);
            }
                this.h5handler.connect();
               // 历史记录
                let confitem = {
                    videoid: this.videoid,
                    protocol:"http:", //http: or https:
                    host: wsroot, //localhost:8080
                    streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                    rootpath: '/', // '/'
                    token: token,
                    hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                    session: this.$store.state.token, //session got from login,
                    label:name,
                    Screenshotimg:'',
                    };
                 let confarr=[confitem]
                 console.log(confarr)
                if(localStorage.getItem('flatviewHistory')==null){
                        // 存储 
                        localStorage.setItem("flatviewHistory",JSON.stringify(confarr));
                        }else{
                        // 取值
                        let playHistory= JSON.parse(localStorage.getItem("flatviewHistory"))
                        // 去除重复的
                        let playHistorylist= playHistory.filter(item => item.host == confitem.host);
                            playHistory= playHistorylist.filter(item => item.token !== confitem.token);
                        console.log(playHistory)
                        playHistory.unshift(confitem)
                        // 判断是否越界
                        if(playHistory.length>6){
                        playHistory.pop()
                    }
                    // 在把数组转化成字符串传回本地
                    localStorage.setItem("flatviewHistory",JSON.stringify(playHistory));
                }
            },
     playclose(){
        if (this.h5handler !== undefined)
        {   let _this=this
            console.log("////////////",$("#" + this.h5videoid).get(0).load())
            this.h5handler.disconnect();
            $('#'+this.videofullid).addClass('videofullnone')
            delete this.h5handler;
            this.h5handler = undefined;
            $("#" + this.h5videoid).get(0).load();
            $("#" + this.h5videoid).get(0).poster = '../assets/imags/blank.png';
        }
      },
     // 全屏
     FullScreen(event)
    {  
        let $container = $("#"+this.h5id);
        let $controls = $container.children(".ptzmenu-left");
        let $controlsbtn = $container.children(".ioncontent");
         $controls.toggle()
        //    $('.fab-range').toggle()
        console.log(1)
       var elem = $("#"+this.h5id).get(0);
        //var elem = $("#videoPanel");
        console.log('panelFullScreen', event);
        if (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
        ) {
            if (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            ) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                   document.webkitExitFullscreen() ;
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                 console.log("========  updateUIExitFullScreen");
                 this.updateUIExitFullScreen();
                 $controlsbtn.css("display", "none");
                  $('.ptzmenu').show()
            } else {
                    console.log('panelFullScreen3');
                   if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            }
        } else {
            console.log('Fullscreen is not supported on your browser.');
             $('.ptzmenu').hide()
             $controlsbtn.css("display", "block");
      }
   },
    updateUIExitFullScreen(){
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
        {   
            $('div[name="flex"]').height(this.contentHeight / this.rows);
        }
   },
   // ptz
  presentAlert() {
      return this.$ionic.alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: 'Subtitle',
          message: 'This is an alert message.',
          buttons: ['OK'],
        })
        .then(a => a.present())
    },
  PtzControlShow(event){ 
      console.log(1)
      var $container = $("#"+this.h5id);
      var $controls = $container.children(".ioncontent");
      var cors=this.cols*this.rows;
      if (this.ptzshow == false)
          {
              $controls.css("display", "block");
              this.ptzshow = true;
            }else
            {
                $controls.css("display", "none");
                this.ptzshow = false;
         }
    },
  onchange(e){
     this.Preset_value=e.target.value
      console.log(e.target.value)
  },
  PtzActionZoomIn(event)
  {
    console.log("PtzActionZoomIn");
    this.PtzAction('zoomin');
     event.stopPropagation();
	 event.preventDefault()
   },
  PtzActionZoomOut(event)
  {
    this.PtzAction('zoomout');
  },
   PtzActionLeft(event)
  {
    this.PtzAction('left');
   },
   PtzActionRight(event)
  {
    this.PtzAction('right');
  },
   PtzActionUp(event)
  {
    this.PtzAction('up');
    event.stopPropagation();
	event.preventDefault()
  },
  PtzActionDown(event)
  {
    this.PtzAction('down');
  },
  PtzActionStop(event)
  {
    console.log("PtzActionStop");
    this.PtzAction('stop');
  },
  // PTZ方法   
  PtzAction(action)
  {
        if (this.h5handler == undefined)
        {
            return;
        }
        let _this =this;
        var root = process.env.API_ROOT;
        if (root == undefined){
           root = "http://"+this.$store.state.Useport.ip+":"+this.$store.state.Useport.port + window.location.pathname;
        }

        var ptzcmd = "token=" + this.currtoken + "&action=" + action + "&speed="+this.Preset_value+"";
        console.log("ptzcmd", ptzcmd);

        var url = root + "/api/v1/Ptz?" + ptzcmd  + "&session="+ this.$store.state.token;

        this.$http.get(url).then(result => {
            console.log(result);
            if (result.status == 200)
            {

            }
        }).catch(error => {
            console.log('ptz failed!', error);
        });
    },
    pretarget(){
        console.log('预知位')
    }
 }
}
</script>

<style scoped>
.h5container{
    width: 100% ;
    height: 100%;
    }
.h5video1{
    width: 100%;
    height: 100%;
    background-color:transparent !important;
    box-sizing: border-box;
    background: none;
    border: none;
    border-bottom:1px solid rgb(44, 43, 43) !important;
    border-right:1px solid rgb(44, 43, 43) !important;
    }
.videofull{
   transform:rotate(-90deg);
   height:10px;
   margin-right:25px;
   
}
.videofullnone{
  display: none;
}
.collect{
  --background:transparent;
  --box-shadow:0;
  margin-right:50px;
  margin-bottom:10px;
  margin-left:25px;
  width:40px;
  height: 40px;
  transform:rotate(90deg);
  --color-activated:#0BEBAB;
}
.ptzmenu-left{
    display: none;
}
.ioncontent{
    display: none;
}
/* ptz定位 */
.ptzmenu-left{
   background-color: rgba(49, 49, 48, 0.5);
   border-radius:22px;
   height: 220px;
   width: 44px;
   padding:20px 0;
   margin-left:50px;
   border:1px solid #3C3C3C;
   /* margin-bottom: 100px; */
  }
.ptzmenu-left .btzleft{
    --background:transparent;
    --box-shadow:0;
    height: 44px;
    width: 44px;
    margin:10px auto;
 }
.ptzmenu-left>>>img{
    display:block;
    width: 25px;
    height: 25px;
    margin: 0 auto;
}
/* ptz */
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
.ptzrow-end{
    height: 25px;
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
   margin-right: 20px;
}
.pretarget{
   margin-top:-110px;
}
.pretargetBtn{
    width: 60px;
    height: 60px;
    font-size:15px;
    --background: rgba(49, 49, 48, 0.5);
    margin-right: 18px;
     --color: #0EDBAD;
}
.pretargeting .pretargeting-jia{
    --background:transparent;
    --box-shadow:0;
    width:25px;
    font-size:30px;
    margin:0 auto ;
}
/* 速度条 */
.range{
    width: 250px;
    --bar-height:16px;
    --bar-border-radius:8px;
}
.fab-range{
    /* transform:rotate(-90deg); */
    margin-right:360px;
    margin-top:45px;
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
	 height: 180px;
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
	box-shadow:0 0px 2px;/*添加底部阴影*/
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
}
.my-custom-class {
  --background: #e5e5e5;
}
</style>