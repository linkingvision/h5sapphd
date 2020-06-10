<template>
    <div class="uploading">
        <ion-header></ion-header>
        <ion-content class="uploading-content">
            <ion-avatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
            </ion-avatar>
            <ion-avatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
            </ion-avatar>
             <ion-thumbnail>
    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
  </ion-thumbnail>
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

 },
}
</script>

<style scoped>
 .uploading{
     width: 100%;
     height: 100%;
     background-color: #282829;
 }
 .uploading-content{
     --background:#282829;
   }
</style>