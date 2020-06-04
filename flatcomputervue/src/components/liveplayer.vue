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
          playHistory:[{}],//历史记录
          playConf:[],
          captchapath:'',
          curronRadio:'',
          confimg:'',
          videofullid:'videofullid'+this.h5videoid
       }
   },
   mounted(){
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
    }
   },
    updateUIExitFullScreen(){
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
        {
            $('div[name="flex"]').height(this.contentHeight / this.rows);
        }
   },
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
</style>