<template>
    <ion-page>
    <ion-header class="toolbar-md-primary">
 
      <ion-toolbar>
        <ion-title>Add Item</ion-title>
      </ion-toolbar>
 
    </ion-header>
    <ion-content class="content">
        <div class="devicetoog">
            <div>区域</div>
        </div>
        <el-tree class="el_tree" 
            node-key="strName" 
            :default-expanded-keys="['root']" 
            :data="camdata" 
            :props="defaultProps1">
            <span slot-scope="{ node, data }" style="width:100%;">
                <span class="root">
                    <span class="iconfont1" style="color:rgb(142, 132, 132);"></span>
                    <span :class="data.iconclass" style="padding-left: 4px;">{{data.strName}}</span>
                </span>
                <div v-if="data.cam.length!=0">
                    <el-tree class="el_tree1" :data="data.cam" :props="defaultProps1" @node-click="handleNodeClick1">
                        <span slot-scope="{ node, data }">
                            <div style="width:100%;display: flex;justify-content: space-between;">
                                <span >
                                    <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                    <span  style="padding-left: 4px;">{{data.strName}}</span>
                                </span>
                                <span :class="data.iconclass2" class="black" style=""></span>
                            </div>
                        </span>
                    </el-tree>
                </div>
            </span>
        </el-tree> 
    </ion-content>
  </ion-page>
</template>

<script>
export default {

}
</script>

<style>

</style>