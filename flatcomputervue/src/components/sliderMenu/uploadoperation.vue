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
                        <ion-avatar slot="end" class="main-end">
                            <img src="../../assets/imags/fanhui-4@2x.png" alt="">
                        </ion-avatar>
                    </ion-item>
                </ion-col>
            </ion-row>
             <!-- 内容主题 -->
            <ion-row>
                <ion-col size='8' offset="2" class="videoplay-col">
                    <video src="" class="videoplay"></video>
                </ion-col>
            </ion-row>
            <!--操作部分 -->
            <ion-row>
                <ion-col size='5' offset="2">
                    <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Video Codec</ion-label>
                        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" class="autocomplete">
                        </el-autocomplete>
                    </ion-item>
                    <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Video In</ion-label>
                        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" class="autocomplete">
                        </el-autocomplete>
                    </ion-item>
                       <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Audio In</ion-label>
                        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" class="autocomplete">
                        </el-autocomplete>
                    </ion-item>
                       <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Audio Out</ion-label>
                        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" class="autocomplete">
                        </el-autocomplete>
                    </ion-item>
                    <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Resolution</ion-label>
                        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" class="autocomplete">
                        </el-autocomplete>
                    </ion-item>
                      <ion-item lines='none' class="selectinput">
                        <ion-label class="videolabel">Bitrate(Kpbs)</ion-label>
                        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" class="autocomplete">
                        </el-autocomplete>
                    </ion-item>
                </ion-col>
                <ion-col size='3' class="uploadbutton">
                   <div class="uploadbtn">
                        <ion-button expand="block" class="buttonlink">
                            <ion-label>连接</ion-label>
                        </ion-button>
                        <ion-button expand="block" class="break">
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
export default {
  name:'Uploadoperation',
  data(){
      return{
          
      }
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style scoped>
.upload-header{
   width: 100%;
   height: 22px;
   border: none;
}

.upload-content{
    height: 100%;
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
    margin-right: 47px; 
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
    /* height: 323px; */
}
.videoplay{
    width:100%;
    /* height: 100%; */
    height: 323px;
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
    transform: translate(-10%,-50%);
}

</style>
<style>
.autocomplete input{
  height: 25px;
  /* width: 200px; */
  background-color: transparent !important;
  border: 1px solid #676767;
  margin-right: 100px;
} 
ul li{
    list-style: none;
}
</style>