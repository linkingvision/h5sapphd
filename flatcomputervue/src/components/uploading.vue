<template>
    <div class="uploading">
       <ion-content class="uploading-content">
            <ion-grid class="uploading-menu">
               <ion-row>
                   <ion-col></ion-col>
                   <ion-col size='5'>
                        <div class="videoUpload">
                            <div class="videoikon"></div>
                             <ion-item button detail href="#" class="videoitem" @click="videoupload()">
                                 <ion-label style="--color:#FFFFFF">视频上传</ion-label>
                            </ion-item>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
               </ion-row>
               <ion-row>
                   <ion-col></ion-col>
                   <ion-col size='5' class="audioupload">
                       <div class="videoUpload">
                           <div class="audioikon"></div>
                           <ion-item routerAnimation detail href="#/Videointercom" component="Videointercom"  class="videoitem">
                                 <ion-label style="--color:#FFFFFF">视频对讲</ion-label>
                           </ion-item>
                       </div>
                   </ion-col>
                   <ion-col></ion-col>
               </ion-row>
            </ion-grid>
            <ion-item class="footer">
                <div class="footerbgc"></div>
            </ion-item>
        </ion-content>
    </div>
</template>

<script>
export default {
   name:"uploading",
   data(){
       return{

       }
   },
  mounted(){
    
  },    
  methods:{
   videoupload(){
      console.log('视频上传')
       this.$router.push('/Uploadoperation')
    },
  },
}
</script>

<style scoped>
.uploading{
     width: 100%;
     height: 100%;
     background-color: #282829;
     position: relative;
 }
.uploading-content{
     --background:#282829;
   }
.videoUpload{
    width: 100%;
    height:120px;
    background-color: #333333;
    border-radius:10px;
    position: relative;
}
.videoitem{
    --min-height:120px;
    margin-left:180px;
    --background:#333333;
    --background-activated:#0EDBAD;
    --background-activated-opacity:0.1;
    --detail-icon-color:rgb(253, 251, 251);
    --color:#FFFFFF;
    font-weight: 700;
    --inner-padding-start:60px;
    border-radius:10px ;
}
.videoikon{
    height:148px;
    width: 137px;
    background: url('../assets/imags/uploadimg2@2x.png');
    background-size:100% 100%;
    position: absolute;
    top: -35px;
    left: 37px;
}
.audioupload{
    margin-top:40px;
}
.audioikon{
    height:144px;
    width: 129px;
    background: url('../assets/imags/uploadimg1@2x.png');
    background-size:100% 100%;
    position: absolute;
    top: -35px;
    left: 37px;
}
.uploading-menu{
    width:100%;
    position: absolute;
    top: 50%;
    transform: translate(0,-50%);
}
.footer{
    width: 100%;
    position:absolute;
    bottom:0;
    left:0;
    --background: transparent;
}
.footerbgc{
    width: 100%;
    height: 190px;
    background: url('../assets/imags/uploadfooter@2x.png');
    background-size:100% 100%;
    
}
</style>