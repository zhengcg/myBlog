<template>
    <div class="sidebar">
        
      <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
            <a href="javascript:;" class="collapseBtn" :class="{active:collapse}" @click="$emit('isHide')">
                <span @click="collapse=!collapse">
                    <i class="el-icon-menu" ></i>
                </span>
                
            </a>
            <template v-for="item in nav">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i> <span slot="title">{{ item.title }}</span>
                            <em class="el-icon-caret-left" v-show="!collapse"></em>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"><span style="display: inline-block;width:10px;"></span>
                            {{ subItem.title }}
                            <em class="el-icon-caret-left" v-show="!collapse"></em>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        <em class="el-icon-caret-left" v-show="!collapse"></em>
                    </el-menu-item>
                </template>
            </template>
      </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                collapse:false,
                nav:[
                    {
                        icon: 'fa fa-bullhorn fa-fw',
                        index: 'aboutme',
                        title: '关于我'
                    },
                    {
                        icon: 'fa fa-bullhorn fa-fw',
                        index: 'work',
                        title: '作品管理'
                    },
                    
                    {
                        icon: 'fa fa-bullhorn fa-fw',
                        index: 'notice',
                        title: '公告管理'
                    }

                ]
            
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            
        }
    }
</script>

<style scoped  lang="scss">
@import "../../assets/css/nav.scss"
</style>
