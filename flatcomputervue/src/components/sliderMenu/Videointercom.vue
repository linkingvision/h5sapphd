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
                <ion-col size='2'>
                    <ion-button class="intercomUsers" herf='#'>
                        <img src="../../assets/imags/creatuser.png" alt="">
                    </ion-button>
                </ion-col>
                <ion-col size='3' offset="7">
                   <ion-button class="createdUser">
                      <ion-label>创建用户</ion-label>
                   </ion-button>
                </ion-col>
             </ion-row>
             <ion-row>
                <ion-col class="createdvideocol">
                    <ion-car>
                       <ion-card-content class="createdvideo">
                           <video src="" class="intercomvideoplay"></video>
                           <div class="backgroundvideo">
                               <div class="bgcimg"></div>
                               <ion-label>暂无联系人</ion-label>
                           </div>
                        </ion-card-content>
                    </ion-car>
                 </ion-col>
              </ion-row>
             </ion-grid>
           </div>
           <!-- 侧边栏菜单 -->
          <ion-menu side="start" menu-id="first" content-id="main">
               <ion-header>
                  <ion-toolbar color="primary">
                      <ion-buttons slot="start">
                          <ion-button>
                              <img src="../../assets/imags/creatuser.png" alt="">
                          </ion-button>
                      </ion-buttons>
                  </ion-toolbar>
                </ion-header>
                <ion-content>
                  <ion-list>
                    <ion-item>Menu Item</ion-item>
                    <ion-item>Menu Item</ion-item>
                    <ion-item>Menu Item</ion-item>
                    <ion-item>Menu Item</ion-item>
                    <ion-item>Menu Item</ion-item>
                  </ion-list>
                </ion-content>
           </ion-menu>
           <!-- <ion-router-outlet id='main'></ion-router-outlet> -->
       </ion-content>
    </div>
</template>
<script>
export default {
  name:'Videointercom',
  data(){
      return{
          
      }
  },
  mounted(){
   },
  methods:{
    openFirst(){
      console.log(1)
      this.menu.open('main');
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
   padding-bottom: 50px;
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
    margin-right: 30px;
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
   --ion-grid-column-padding:85px;
   padding-top:15px;
   box-sizing:border-box;
   
 }
.createdvideo{
    width:100%;
    height:650px;
    background-color:#272727;
    border-radius: 30px;
    position: relative;
    
    
  }
.intercomvideoplay{
    width:100%;
    height: 100%;
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
.my-custom-menu {
  --width: 500px;
}
</style>