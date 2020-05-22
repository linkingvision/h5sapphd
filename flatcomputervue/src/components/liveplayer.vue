<template>
    <div class="h5container">
        <video class="h5video1" :id="videoid" muted webkit-playsinline playsinline style= "object-fit: fill;">
        </video>
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
          confimg:''
       }
   },
   mounted(){
     let _this=this;
    _this.$root.bus.$on('liveplay', function(token,streamprofile,label,name, id){
        console.log(token,streamprofile,label,name, id)
           if (_this.h5id != id)
            {
                return;
            }
            _this.PlayVideo(token,streamprofile,label,name);
            _this.tokenshou=token;
            console.log(1)
       })
   },
   methods:{
     PlayVideo(token,streamprofile,label,name){
         console.log(1)
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
                label:label,
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
            console.log("*******************",conf,this.h5handler)
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
</style>