<template>
   <div class="uploadoperation">
      <!-- <ion-header class="upload-header"></ion-header>  -->
      <ion-content class="upload-content">
          <ion-grid class="upload-main">
            <!-- 内容头部分 -->
            <ion-row>
                <ion-col>
                    <ion-item class="main-header" lines="none">
                        <ion-avatar slot="start" class="upload-title">
                            <img src="../../assets/imags/uploadimg2@2x.png" alt="">
                        </ion-avatar>
                        <ion-title class="video-title">视频上传</ion-title>
                        <ion-button class="backbtn" href='#/liveview' component='Liveview'>
                            <ion-avatar slot="end" class="main-end" >
                                <img src="../../assets/imags/fanhui-4@2x.png" alt="">
                            </ion-avatar>
                        </ion-button>
                    </ion-item>
                </ion-col>
            </ion-row>
             <!-- 内容主题 -->
            <ion-row>
                <ion-col size='8' offset="2" class="videoplay-col">
                   <video src="" class="videoplay" id="h5sVideoLocal" playsinline autoplay muted="muted"  style='object-fit: fill'></video>
                </ion-col>
           </ion-row>
            <!--操作部分 -->
            <ion-row>
                <ion-col size='5' offset="2">
                    <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Video Codec</ion-label>
                        <select name="" id="videoCodec"></select>
                    </ion-item>
                    <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Video In</ion-label>
                        <select name="" id="videoSource"></select>
                    </ion-item>
                    <ion-item lines='none' class="selectinput" style="display:none">
                        <ion-label class="videolabel">Audio In</ion-label>
                        <select name="" id="audioSource"></select>
                    </ion-item>
                    <ion-item lines='none' class="selectinput" style="display:none">
                        <ion-label class="videolabel">Audio Out</ion-label>
                        <select name="" id="audioOutput"></select>
                    </ion-item>
                    <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Resolution</ion-label>
                        <select name="" id="resolution"></select>
                    </ion-item>
                      <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Bitrate(Kpbs)</ion-label>
                        <select name="" id="bitrate"></select>
                    </ion-item>
                </ion-col>
                <ion-col size='3' class="uploadbutton">
                   <div class="uploadbtn">
                        <ion-button expand="block" class="buttonlink" @click="Connect()">
                            <ion-label>连接</ion-label>
                        </ion-button>
                        <ion-button expand="block" class="break" @click="Disconnect()">
                            <ion-label>断开</ion-label>
                        </ion-button>
                    </div>
                </ion-col>
            </ion-row>
          </ion-grid>
      </ion-content>
      <ion-footer class="upload-footer"></ion-footer>
   </div>
</template>

<script>
import '../../assets/js/jquery-3.1.1.js'
// import '../assets/js/bootstrap.js'
import '../../assets/js/adapter.js'
import '../../assets/js/platform.js'
import '../../assets/js/h5splayerhelper.js'
import '../../assets/css/h5splayer.css'
import {H5siOS,H5sPlayerCreate} from '../../assets/js/h5splayerhelper.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sRTCPush,getUserMedia,H5sRTCGetCapability} from '../../assets/js/h5splayer.js'
  
export default {
  name:'Uploadoperation',
  data(){
      return{
        confdata:{},
        option:[]
      }
  },
   created(){
    H5sRTCGetCapability(this.UpdateCapability);
  },
  mounted(){
         $('#h5sVideoLocal').get(0).volume = 0;
         $('#h5sVideoLocal').get(0).muted  = 0; 
    },
  methods:{
    UpdateCapability(capability){
        const videoCodecSelect = document.querySelector('#videoCodec');
        const videoSelect = document.querySelector('#videoSource');
        const audioInputSelect = document.querySelector('#audioSource');
        const audioOutputSelect = document.querySelector('#audioOutput');
        const resolutionSelect = document.querySelector('#resolution');
        const bitrateSelect = document.querySelector('#bitrate');
		console.log(capability);
		 for (let i = 0; i !== capability['videocodec'].length; ++i) {
            const data = capability['videocodec'][i];
            const option = document.createElement('option');
            console.log(option)
			option.value = data;
			option.text = data;
			/* Default use H264 */
			if (option.value == 'H264')
			{
				option.selected = true
			}
            videoCodecSelect.appendChild(option);
        }		
		for (let i = 0; i !== capability['videoin'].length; ++i) {
            const data = capability['videoin'][i];
            console.log(data)
            const option = document.createElement('option');
             console.log(option)
			option.value = data.id;
			option.text = data.name;
			videoSelect.appendChild(option);
		}	

		for (let i = 0; i !== capability['audioin'].length; ++i) {
			const data = capability['audioin'][0];
			const option = document.createElement('option');
			option.value = data.id;
            option.text = data.name;
             console.log(option)
			audioInputSelect.appendChild(option);
		}
		
		for (let i = 0; i !== capability['audioout'].length; ++i) {
			const data = capability['audioout'][0];
			const option = document.createElement('option');
			option.value = data.id;
			option.text = data.name;
			audioOutputSelect.appendChild(option);
		}
		
		var resolution = ['QVGA', 'VGA', 'D1', '720P', '1080P', '4K', '8K']
		for (let i = 0; i !== resolution.length; ++i) {
			const data = resolution[i];
			const option = document.createElement('option');
			option.value = data;
			option.text = data;
			/* Default use 720P */
			if (option.value == '720P')
			{
				option.selected = true
			}
			resolutionSelect.appendChild(option);
		}
		
		var bitrate = ['32', '64', '128', '256', '512', '1024', '2048', '4096']
		for (let i = 0; i !== bitrate.length; ++i) {
			const data = bitrate[i];
			const option = document.createElement('option');
			option.value = data;
			option.text = data;
			/* Default use 720P */
			if (option.value == '1024')
			{
				option.selected = true
			}
			bitrateSelect.appendChild(option);
		}
		
    },
 Connect(){
     console.log(this.$store.state.protocol,this.$store.state.Useport.ip+":"+this.$store.state.Useport.port)
        const videoCodecSelect = document.querySelector('#videoCodec');
        const videoSelect = document.querySelector('#videoSource');
        const audioInputSelect = document.querySelector('#audioSource');
        const audioOutputSelect = document.querySelector('#audioOutput');
        const resolutionSelect = document.querySelector('#resolution');
        const bitrateSelect = document.querySelector('#bitrate');
        var conf1 = {
		localvideoid:'h5sVideoLocal', //{string} - id of the local video element tag
		//localvideodom: h5svideodomlocal, //{object} - local video dom. if there has videoid, just use the videoid
        protocol: this.$store.state.protocol, //http: or https:
        host: this.$store.state.Useport.ip+":"+this.$store.state.Useport.port, //localhost:8080
        rootpath:'/', // {string} - path of the app running
		user:this.$store.state.Useport.user, // {string} - user name
		type:'media', // {string} - media or sharing
		audio: 'true', // 'true' or 'false' enable/disable audio
		callback: null, //Callback for the event
		userdata: null, // user data
		session: this.$store.state.token, //session got from login
		consolelog: 'true' // 'true' or 'false' enable/disable console.log
    };
     this.confdata=conf1
      console.log(audioInputSelect.value)
      console.log(conf1);
	  var v1 = new H5sRTCPush(conf1);
	  v1.connect(videoSelect.value, videoCodecSelect.value, bitrateSelect.value, resolutionSelect.value,audioInputSelect.value);
    },
    Disconnect()
	{   
       console.log(this.confdata)
       var v1 = new H5sRTCPush(this.confdata);
		console.log("Disconnect");
		v1.disconnect();
	}
  }
}
</script>

<style scoped>
.upload-header{
   width: 100%;
   height: 22px;
   border: none;
}
.select{
    width: 250px;
}
.upload-content{
    /* height: 100%; */
    --background:transparent;
    --padding-top: 22px;
}
.upload-main{
    width: 100%;
    height: 100%;
    background-color: #333333;
    border-radius:50px 50px 0 0;
}
.upload-title{
    width: 98px;
    height: 106px;
    --border-radius:none;
    margin-left:40px;
}
.upload-title>>>img{
    display:block;
    width: 100%;
    height: 100%;
}
.main-end{
    width: 45px;
    height: 54px;
    --border-radius:none;
}
.backbtn{
    width:70px;
    height:60px;
    --background: transparent;
    --box-shadow:0;
    --background-activated:#0EDBAD;
    margin-right: 45px;
}
.main-end>>>img{
    display:block;
    width: 100%;
    height: 100%;
    
}
.main-header{
    --min-height: 70px;
    --background:transparent;
}
.video-title{
    --color:#FFFFFF;
    font-size: 30px;
    font-weight: 600;
}
.videoplay-col{
    height: 420px;
}
.videoplay{
    width:100%;
    height: 100%;
     background-color: #272728;
    border-radius:20px;
}
.videolabel{
    width: 50px !important;
    margin: 8px;
}
.selectinput{
   --background:transparent ;
   --min-height:15px;
   --color:#D0D0D0;
   font-size: 18px;
   --inner-padding-bottom:0;
   --inner-padding-top:0;
   --padding-bottom:0;
   --padding-top:0;
   --min-height:10px;
}
.selectinput select{
   width: 280px;
   background-color:transparent;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  
}
.selectiop{
  border: 1px solid red;
}
.buttonlink{
    width: 150px;
    height: 50px;
    --border-radius:25px;
    --background:#0BE4B2;
}
.break{
    width: 150px;
    height: 50px;
    --border-radius:25px;
    margin-top: 20px;
}
.uploadbutton{
    position: relative;
}
.uploadbtn{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

</style>
<style>
.autocomplete input{
  height: 25px;
  /* width: 200px; */
  background-color: transparent !important;
  border: 1px solid #676767;
  /* margin-right: 100px; */
} 
ul li{
    list-style: none;
}
</style>