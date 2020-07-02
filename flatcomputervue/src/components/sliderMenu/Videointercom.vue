<template>
   <div class="Videointercom">
       <!-- <ion-header class="ion-no-border"></ion-header> -->
       <ion-content class="upload-main">
          <div class="upload-content">
           <ion-grid>
               <!-- 内容头部分 -->
              <ion-row>
                  <ion-col>
                      <ion-item class="main-header" lines="none">
                          <ion-avatar slot="start" class="upload-title">
                              <img src="../../assets/imags/videoadd2x.png" alt="">
                          </ion-avatar>
                          <ion-title class="video-title">视频对讲</ion-title>
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
                <ion-col size='2'>
                    <ion-button class="intercomUsers" herf='#main' id='main' @click="openFirst()">
                        <img src="../../assets/imags/creatuser.png" alt="">
                    </ion-button>
                </ion-col>
                <ion-col size='3' offset="7">
                   <!-- <ion-button class="createdUser">
                      <ion-label>创建用户</ion-label>
                   </ion-button> -->
                </ion-col>
             </ion-row>
             <ion-row>
                <ion-col class="createdvideocol">
                    <ion-car @click="dinone()">
                       <ion-card-content class="createdvideo">
                           <video id="h5sVideoRemote" src="" class="intercomvideoplay"></video>
                           <div class="backgroundvideo">
                               <div class="bgcimg"></div>
                               <ion-label>暂无视频</ion-label>
                           </div>
                           <div class="content_h5sVideoRemote">
                               <video id="h5sVideoLocal" muted src=""></video>
                               <div></div>
                           </div>
                           <div class="content_anniu2">
                                <div class="content_anniu2_frame">
                                    <div>
                                        <span style='margin-top:10px'>通话</span>
                                        <ion-button style="--background:transparent;--box-shadow:0; padding: 0;" type="success" @click="Hangup()" icon="el-icon-close" circle size="mini">
                                          x
                                        </ion-button>
                                    </div>
                                    <div>
                                        <img src="../../assets/imags/zanwulianxibgc@2x.png"/>
                                    </div>
                                    <div>
                                        <ion-button style="--background:#46C561;" type="success" @click="AnswerVideoAudio()" shape="round" size="small">接通视频</ion-button>
                                        <ion-button style="--background:#46C561;" type="success" @click="AnswerAudio()"  shape="round" size="small">接通语音</ion-button>
                                        <ion-button style="--background:#DC4D36;" type="danger" @click="Hangup()" shape="round" size="small">挂断</ion-button>
                                    </div>
                                </div>
                            </div>
                            <ion-fab vertical="bottom" horizontal="center" slot="fixed" >
                                    <ion-fab-button class="Hangupnone" @click="Hangup()">
                                        挂断
                                    </ion-fab-button>
                            </ion-fab>
                        </ion-card-content>
                    </ion-car>
                     <!-- 侧边栏菜单 -->
                    <ion-menu side="start" menu-id="first" content-id="main" class="menu-video">
                        <ion-content class="menu-content">
                            <ion-list class="menu-list">
                                <ion-item class="menu-item" lines="none" v-for="item in data" :key="item.id">
                                    <ion-label>{{item.label}}</ion-label>
                                    <ion-button class="menu-button"  @click="CallVideoAudio(item)" >
                                        <ion-thumbnail slot="end" class="menu-thumbnail">
                                            <div class="bgcvideomenu"></div>
                                        </ion-thumbnail>
                                    </ion-button>
                                    <ion-button class="menu-button"  @click="CallAudio(item)" >
                                        <ion-thumbnail slot="end" class="menu-thumbnail">
                                            <img src="../../assets/imags/duijiang.png">
                                        </ion-thumbnail>
                                    </ion-button>
                                </ion-item>
                            </ion-list>
                        </ion-content>
                   </ion-menu>
                 </ion-col>
              </ion-row>
             </ion-grid>
           </div>
        </ion-content>
    </div>
</template>
<script>
import * as types from '@/store/types'
import '../../assets/js/adapter.js'
import '../../assets/js/platform.js'
import '../../assets/js/h5splayerhelper.js'
import '../../assets/css/h5splayer.css'
import {H5siOS,H5sPlayerCreate} from '../../assets/js/h5splayerhelper.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sRTCGetCapability,H5sPlayerAudBack,H5sConference} from '../../assets/js/h5splayer.js'
import { menuController } from '@ionic/core';
window.menuController = menuController;
export default {
  name:'Videointercom',
  data(){
      return{
      data:'',  
      name:'',
        v1:undefined,
  userInfo:'',
  userlist:'',
      name:'',
        id:"", 
      }
  },
  mounted(){
    //  this.TableInfo()
     this.tabellist()
    // 监听拨打电话过来的
    // cordova.plugins.notification.local.schedule({
    //             id: 1,
    //             title: '来点提醒',
    //             text:'用户'+msgevent.peerAdd.strId+'上线，可以视频对讲',
    //             at: new Date().getTime(),
    //      });
    //  cordova.plugins.notification.local.on('schedule', function (notification) {
    //                 alert('scheduled:' + notification.id);
    //             });
    },
  methods:{
    openFirst(){
        console.log(1)
        menuController.enable(true, 'first');
        menuController.open('first');
    }, 
    // 获取列表
    tabellist(){
        this.data=[];
        var root = process.env.API_ROOT;
        var wsroot = process.env.WS_HOST_ROOT;
        if (root == undefined){
            root = this.$store.state.protocol + '//' +this.$store.state.Useport.ip+":"+this.$store.state.Useport.port + window.location.pathname;
        }
        if (wsroot == undefined)
        {
            wsroot =this.$store.state.Useport.ip+":"+this.$store.state.Useport.port;
        }
        // console.log("11111111111111",process.env.API_ROOT)
        var conf1 = {
            localvideoid:'h5sVideoLocal',
            remotevideoid:'h5sVideoRemote',
            protocol:this.$store.state.protocol, //http: or https:
            host: wsroot, //localhost:8080
            rootpath:'/', // '/'
            callback:this.EventCB, 
            userdata: null, // user data
            user:this.$store.state.Useport.user,
            type:'media',
            session: this.$store.state.token //session got from login
        };
        console.log(conf1);
        this.v1 = new H5sConference(conf1);
        this.v1.connect();
    },
     EventCB(event, userdata){
           console.log("Event callback ", event);
            var msgevent = JSON.parse(event);
            console.log(msgevent )
            if (msgevent.type === 'CFE_EVENT_PEER_CALL')
             {   
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].id==msgevent.peerCall.strId){
                        console.log("对方id",this.data[i].label)
                        this.name=this.data[i].label;
                    }
                    cordova.plugins.notification.local.schedule({
                    id: new Date(),
                    title: '对方呼叫提醒',
                    text:'用户'+this.data[i].label+'向您发起了视频对讲',
                    at: new Date().getTime(),
                    // every: 'minute'
                });
                }
                $(".content_anniu2").css("display","block");
                this.id=msgevent.peerCall.strId;
            }
            if (msgevent.type === 'CFE_EVENT_PEER_ADD')
            {
                var newItem ={
                    label:msgevent.peerAdd.strName,
                    id:msgevent.peerAdd.strId,
                };
                // for(var i = 0; i < newItem.length; i++) {
                //     if (newItem .indexOf(newItem[i]) === -1) {
                //        this.data.push(newItem[i])
                //     }
                // }
                this.data.push(newItem);
                //通知栏
                for(var i=0;i<this.data.length;i++){
                    cordova.plugins.notification.local.schedule([{
                    id: i,
                    title: '上线提醒',
                    text:'用户'+this.data[i].id+'上线，可以视频对讲',
                    at: new Date().getTime(),
                    badge:this.data.length
                }]);
            }
           }
            if (msgevent.type === 'CFE_EVENT_PEER_DEL')
            {
               for(var i=0;i<this.data.length;i++){
                    if(this.data[i].id==msgevent.peerDel.strId){
                        this.data.splice(i,1);
                        // console.log("对方id",this.data[i].label)
                    }
                }
           }
        },
       // 拨打视频电话
       CallVideoAudio(item){
         console.log(this.data)
         this.v1.call(true,item.id);
       },
      //拨打语音电话
        CallAudio(item){
        //   this.name=data.label;
          console.log("CallAudio",item.id);
          this.v1.call(false, item.id);
       },
       //接通视频
       AnswerVideoAudio(){
            console.log("AnswerVideoAudio",this.id);
            $(".content_anniu2").css("display","none");
            this.v1.answer(true,this.id);
        },
        //接通语音
        AnswerAudio(){
            console.log("AnswerAudio",this.id);
            $(".content_anniu2").css("display","none");
            this.v1.answer(false, this.id);
        }, 
        //挂断
        Hangup(){
            console.log("Hangup");
            this.v1.hangup();
           $(".content_anniu2").css("display","none");
          },
      dinone(){
        $('.Hangupnone').toggleClass('Hangup')
        
      }
    }
}
</script>

<style scoped>
.ion-no-border{
   width: 100%;
   height: 22px;
   border: none;
   --background:transparent;
}
.upload-content{
   height: 100%;
   width: 100%;
   background-color:#333333;
   border-radius:50px 50px 0 0;
   /* padding-bottom: 50px; */
}
.upload-main{
    width: 100%;
    height: 100%;
    --background:#151515;
    --padding-top:22px ;
  }
.upload-title{
    width: 100px;
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
/* 创建用户横栏 */
.intercomUsers{
    width: 40px;
    height: 37px;
    --background: transparent;
    --box-shadow:0;
    --background-activated:#0EDBAD;
    --padding-end:0;
    --padding-start:0;
    margin-right:-170px;
    margin-top: 15px;
}
.intercomUsers img{
    display: block;
    width: 85%;
    height: 100%;
}
.createdUser{
    width:187px;
    height: 58px;
    margin-right:10px;
    --background: #0EDBAD;
    --border-radius:29px;
    font-size: 23px;
}
.createdvideocol{
   --ion-grid-column-padding:200px;
   padding-bottom: 0;
   padding-top:15px;
   box-sizing:border-box;
   
 }
.createdvideo{
    width:100%;
    height:500px;
    background-color:#272727;
    border-radius: 30px;
    position: relative;
}
.intercomvideoplay{
    width:100%;
    height: 100%;
    object-fit: fill
}
.backgroundvideo{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color:#393939;
}
.bgcimg{
    width: 148px;
    height: 161px;
    background: url('../../assets/imags/zanwulianxibgc@2x.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 12px;
}
/* 侧边滑单 */
.menu-video{
   --width: 500px;
   --background:transparent;
   margin-bottom:15px;
  
}
.menu-content{ 
    --background:#303031;
     border-radius:50px;
}
.menu-list{
   background-color:transparent;
   padding: 0;
   
}
.menu-item{
   --background:transparent; 
   margin:0;
   color:#FFFFFF; 
   border-radius:50px; 
}
.menu-thumbnail{
    width:32px;
    height: 32px;
}
.bgcvideomenu{
    width: 28px;
    height: 31px;
    background:url('../../assets/imags/videouploade.png') no-repeat;
    background-size: 100% 100%;
}
.menu-button{
   --background:transparent;
   --background-activated:#0EDBAD;
   --box-shadow:0;
   --background-activated-opacity:0.1;
   margin-right: 20px;
}
.menu-button img{
    display:block;
    width: 100%;
    height: 100%;
}
/* 本地视频 */
.content_h5sVideoRemote{
    position: absolute;
    height: 200px;
    width: 250px;
    background-color: #2b2929;
    bottom: 10px;
    right: 10px;
}
#h5sVideoLocal{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.content_anniu2{
    display:none;
    width: 100%;
    position: absolute;
    top: 0;
    text-align: center;
    background: rgba(0,0,0,0.5);
    height: 100%;
}
.content_anniu2_frame{
    width: 30%;
    text-align: center;
    margin: 14% auto 0;
    background-color: #292929;
    padding: 10px;
    color: #fff;
}
.content_anniu2_frame div:nth-child(3){
    margin-top: 20px;
}
.content_anniu2_frame div:nth-child(2) img{
    height: 154px;
    width: 140px;
}
.content_anniu2_frame div:nth-child(1){
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    justify-content: space-between;
}
.Hangupnone{
    display: none;
  
}
.Hangup{
   display: block;
  --background: red;
}
</style>