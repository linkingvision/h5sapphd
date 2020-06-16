<template>
  <div class="login">
     <ion-page class="ion-page">
       <div class="logintheme">
        <ion-item color="#000000" class="ion-item" lines="none">
           <ion-thumbnail slot="start" class="ion-thumbnail">
              <img src="../assets/imags/h5sslabimg@2x.png">
           </ion-thumbnail>
             <ion-label>欢迎登录H5S视频平台</ion-label>
         </ion-item>
         <ion-grid>
            <ion-row>
              <ion-col class="ion-col-left">
                 <div class="bgLoginImage"></div>
              </ion-col>
              <ion-col class="ion-col-right">
                  <div class="bgLoginTitle"></div>
                  <ion-item color='#42b983' class="username">
                    <ion-label><img src="../assets/imags/user@2x.png" alt=""></ion-label>
                    <ion-input  placeholder="请输入用户名" :value='Useport.user'  @ionChange="Useport.user=$event.target.value"></ion-input>
                    <ion-badge slot="end"></ion-badge>
                  </ion-item>
                  <ion-item color='#42b983' class="username">
                    <ion-label><img src="../assets/imags/password@2x.png" alt=""></ion-label>
                    <ion-input  placeholder="请输入密码" type='password' :value='Useport.psw'  @ionChange="Useport.psw=$event.target.value"></ion-input>
                  </ion-item>
                 
                  <ion-item color='#42b983' class="serveconfig" lines="none" @click="dropdown">
                    <ion-label>服务器配置</ion-label>
                    <ion-thumbnail slot="end" class="ion-dropdown">
                        <img src="../assets/imags/xiala-3@2x.png">
                    </ion-thumbnail>
                  </ion-item>
                      
                  <ion-row class="ion-config">
                      <ion-col>
                          <ion-item color='#42b983' class="ion-ip">
                            <ion-label><img src="../assets/imags/user@2x.png" alt=""></ion-label>
                            <ion-input  placeholder="请输入IP" :value='Useport.ip' @ionChange="Useport.ip=$event.target.value"></ion-input>
                            <ion-badge slot="end"></ion-badge>
                          </ion-item>
                      </ion-col>
                      <ion-col>
                          <ion-item color='#42b983' class="ion-port">
                              <ion-label class="ion-line">|</ion-label>
                              <ion-input  placeholder="端口"  :value='Useport.port'  @ionChange="Useport.port=$event.target.value"></ion-input>
                              <ion-badge slot="end"></ion-badge>
                          </ion-item>
                      </ion-col>
                 </ion-row>
                 <ion-row>
                   <ion-col size='auto' class="logcol">
                      <ion-item color='#42b983' lines="none" class="remember-item">
                        <ion-label>记住用户名和密码</ion-label>
                        <ion-checkbox slot="start" checked :value="checked" @ionChange="checked=$event.target.checked" class="rememberpass"></ion-checkbox>
                      </ion-item>
                    </ion-col>
                    <ion-col size='auto' class="logcol">
                      <ion-item color='#42b983' lines="none">
                        <ion-label>HTTPS</ion-label>
                        <ion-checkbox slot="start" checked  :value="checkedhttps" @ionChange="checkedhttps=$event.target.checked" class="rememberpass"></ion-checkbox>
                      </ion-item>
                    </ion-col>
                 </ion-row>
                  <!-- declare  var $: any; -->
                 <ion-row class="ion-loginbutton">
                    <div class="ion-activatable ripple-parent" @click="loginin(), presentLoading()">
                        <img src="../assets/imags/h5sslabbutton@2x.png" alt="">
                        <ion-ripple-effect type="unbounded" slot="end"></ion-ripple-effect>
                    </div> 
                 </ion-row>
               </ion-col>
            </ion-row>
         </ion-grid>
        </div>
     </ion-page>
  </div>
</template>

<script>
import $ from 'jquery'
import '../assets/js/jQuery.md5.js'
import Vue from 'vue'
import * as types from '@/store/types'

export default {
   props: {
    timeout: { type: Number, default: 1000 },
  },
  name: 'Login',
   data(){
    return{
    checked:true,
    checkedhttps:true,
    callport:this.$store.state.callport,//使用端口号//使用端口号
    value:'hah',
    session:'',
    activeNames:[''],
    Useport:[{
        ip:'',
        port:'',
        user:'',
        psw:''
        }],//端口号
     protocol:'',
    }
  },
  created(){
    this.getStorage()
  },

  mounted(){
     $('.ion-config').hide()
  },
  methods: {
    dropdown(){
     $('.ion-config').slideToggle();
    },
   
    loginin(){
      console.log(this.Useport.user)
      console.log(this.Useport.ip)
      console.log(this.Useport.psw)
      console.log(this.Useport.user)
      console.log(this.checked)
      // 保存账号
        let username=this.Useport.user
        // 保存的密码
        let password=this.Useport.psw
        // 保存的IP
        let Ip=this.Useport.ip
        // 保存的端口
        let Port=this.Useport.port
        //判断复选框是否被勾选 勾选则调用配置方法
        if(this.checked==true){
          //传入账号名，密码，和保存天数3个参数
         this.setStorage(username,password,Ip,Port)
        //   this.setCookie(username,password,Ip,Port,7);
        }else{
        //   this.setCookie("","","","",-1);
          localStorage.clear('flatuserName')
          this.checked=false
        }
        // console.log(this.$store.state.Useport.ip)
        this.$store.commit(types.USEPORTIP, this.Useport.ip)
        this.$store.commit(types.USEPORTPORT, this.Useport.port);
        this.$store.commit(types.USEPORTUSER, this.Useport.user);
        this.$store.commit(types.USEPORTPSW, this.Useport.psw);
        let _this =this;
        if(_this.checkedhttps==true){
          this.protocol='https:'
        }else{
          this.protocol='http:'
        }
        this.$store.commit(types.PROTOCOL, this.protocol);
        var url =_this.protocol+ "//"+_this.Useport.ip+":"+_this.Useport.port
        this.callport=url;
        this.$store.commit(types.USEPORT, url);
        var baseurl = _this.callport + "/api/v1/Login?user=" +_this.Useport.user + "&password=" + $.md5(_this. Useport.psw);
        console.log(baseurl)
        this.$http.get(baseurl).then(result => {
            console.log(result)
            var data = result.data;
            if (data.bStatus == true){
                this.$store.commit(types.LOGIN, data["strSession"]);
                // this.$store.state.token=data["strSession"];
               _this.$router.push('/liveview');
            }
         }).catch((err)=>{console.log(1)
          })
     },
    // 懒加载
   presentLoading() {
      return this.$ionic.loadingController
        .create({
          message: '正在登录',
          duration: this.timeout,
        })
        .then(loading => {
          setTimeout(function() {
            loading.dismiss()
          }, this.timeout)
          return loading.present()
        })
    },
  //历史记录存储localstorage
  setStorage(username,password,Ip,Port){
    let loginfo=[ username, password, Ip, Port]
    localStorage.setItem("flatuserName",JSON.stringify(loginfo))
},
  // 取值
  getStorage(){
     let login= JSON.parse(localStorage.getItem("flatuserName"))
     console.log(login)
    if(login.length>0){
       for(var i=0;i<login.length;i++){
           this.Useport.user=login[0];
           this.Useport.psw=login[1]
           this.Useport.ip=login[2]
           this.Useport.port=login[3]
       }
    }else{
      console.log('无历史数据')
    }
  },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ripple-parent {
   position: relative;
   overflow: hidden;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login{
  height:100%;
  background-color: #232629;
  position: relative;
}
img{
  width:100%;
  height:100%;
} 

.ion-page{
  width: 900px;
  height: 634px;
  background-color: #151515;
  /* margin: 65px auto; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius:10px;
}

.item-native {
  background-color: #151515;
  margin: 0;
}

.ion-color{
  color: #9E9E9E;
  font-size: 15px;
  font-weight: 500;
}
.ion-item{
  margin-left:50px;
  margin-top: 15px;
  padding: 0;
}

/* 服务器配置 */
.username{
  width:320px;
}
.ion-config .hydrated{
  padding-left:0;
  padding-right:0;
}
.ion-ip{
  width:220px;
  --inner-padding-end:0px;
 }
.ion-port{
  width:100px;
  /* --inner-padding-start:none */
  --padding-start:0px;
}
.ion-port .item-native{
  padding-left: 0;
}
.ion-thumbnail{
  margin: 0;
}
.ion-col-left{
  padding-top:105px;
  margin-left:100px;
}
.ion-col-right{
  padding-top:55px;
  padding-right: 65px;
}
.bgLoginImage{
  width: 305px;
  height: 278px;
  background: url('../assets/imags/loginconten.png') no-repeat;
  background-size:100% 100%;
}
.bgLoginTitle{
  width: 186px;
  height: 40px;
  background: url('../assets/imags/h5sslab@2x.png') no-repeat;
  background-size:100% 100%;
  margin-bottom:20px;
}
.ion-col-right>>>img{
  width:18px;
  height: 18px;
}
.serveconfig{
  padding-right:220px;
}
.serveconfig .ion-dropdown{
  width: 6px;
  height: 8px;
  margin-bottom: 15px;
}
.serveconfig .ion-dropdown>img{
  width:100%;
  height:100%;
}
.ion-config{
  /* display block; */
  /* border-bottom:1px solid red; */
  text-align: right;
}
.ion-port{
  margin-right:0;
}
.ion-loginbutton{
  position: relative;
  /* margin-top:30px; */
}
.ion-loginbutton .ion-activatable{
  position: absolute;
  top:-8px;
  right: 15px;
  width:60px;
  height: 60px;

}
.ion-loginbutton img{
  width: 100%;
  height: 100%;
}
.rememberpass{
  --background:#5D5D5D;
  --border-radius:50%;
  --background-checked:#5D5D5D;
  --border-color:#5D5D5D;
  --border-color-checked:#5D5D5D;
  --checkmark-color:#42b983;
  padding: 0;
  margin-right:20px;
}
.remember-item{
  padding:0;
}
.logcol{
  height:40px;
  margin-right:10px ;
}
</style>
