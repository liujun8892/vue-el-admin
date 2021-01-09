<template>
  <div>
    <el-container style="height: 100vh; overflow: hidden">
      <el-header style="background-color: #545c64">
        <el-menu
          :default-active="headerActiveIndex"
          class="el-menu-demo d-flex align-items-center"
          mode="horizontal"
          @select="handleHeaderSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <a
            href=""
            class="h5 mb-0 mr-auto text-light text-decoration-none border-0"
            >{{ logo }}</a
          >
          <el-menu-item
            :index="index | numToStr"
            v-for="(item, index) in headerList"
            :key="index"
            >{{ item.name }}</el-menu-item
          >
          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="medium"
                :src="circleUrl"
                class="mr-1"
              ></el-avatar>
              liujun
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%">
        <el-aside width="200px" style="height: 100%">
          <el-menu
            :default-active="subActiveMenu.subActive"
            class="el-menu-vertical-demo h-100"
            @select="handleSliderSelect"
            active-text-color="#17a2b8"
          >
            <el-menu-item
              :index="index | numToStr"
              v-for="(item, index) in submenu"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main class="bg-light">
          <!-- 面包屑导航 -->
          <div
            class="border-bottom bg-white"
            style="padding: 0 0 20px 20px; margin: 0 -20px"
            v-if="breadData.length > 0"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                :to="{ path: item.path }"
                v-for="(item, index) in breadData"
                :key="index"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <!-- 子路由 -->
          <router-view />
          <!--  -->
          <div style="height: 2000px"></div>
          <!-- 返回顶部 -->
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="
                 {
                  height: 100%;
                  width: 100%;
                  background-color: #f2f5f6;
                  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                  text-align: center;
                  line-height: 40px;
                  color: #1989fa;
                }
              "
            >
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from '../comon/mixins/common'
export default {
  name: 'layout',
  mixins: [common],
  computed: {
    subActiveMenu: {
      get() {
        return this.headerList[this.headerActiveIndex]
      },
      set(val) {
        this.headerList[this.headerActiveIndex].subActive = val
      },
    },
    submenu() {
      return this.subActiveMenu.submenu
    },
  },
  created() {
    // 初始化菜单
    this.headerList = this.$config.menu
    this.logo = this.$config.logo
    // 初始化路由选中
    this.__initNavSelected()
    // 获取路由面包屑
    this.getRouteBread()
  },
  watch: {
    $route(to, from) {
      // 记录导航索引
      localStorage.setItem(
        'navIndex',
        JSON.stringify({
          top: this.headerActiveIndex,
          left: this.subActiveMenu.subActive || '0',
        })
      )
      this.getRouteBread()
    },
  },
  data() {
    return {
      logo: '',
      // header激活索引
      headerActiveIndex: '0',
      // 头像地址
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      // header数据列表
      headerList: [],
      // 面包屑数据
      breadData: [],
    }
  },
  methods: {
    // 刷新初始化路由
    __initNavSelected() {
      let obj = localStorage.getItem('navIndex')
      console.log('obj==>', obj)
      if (obj) {
        let navIndex = JSON.parse(obj)
        this.headerActiveIndex = navIndex.top
        this.subActiveMenu.subActive = navIndex.left
      }
    },
    // 获取路由面包屑
    getRouteBread() {
      // 获取路由
      let routes = this.$route
      // 获取有名字的路由
      let routeFilter = routes.matched.filter((v) => v.name)
      let arr = []
      routeFilter.forEach((v) => {
        // 过滤首页和布局ye
        if (v.name === 'layout' || v.name === 'index') return
        arr.push({
          path: v.path,
          name: v.name,
          title: v.meta.title,
        })
      })
      // 追加首页
      if (arr.length > 0) {
        arr.unshift({
          path: '/index',
          name: 'index',
          title: '后台首页',
        })
      }
      this.breadData = arr
    },
    // header选项切换
    handleHeaderSelect(key, keyPath) {
      if (key === '100-1' || key === '100-2') return
      this.headerActiveIndex = key
      console.log('subActiveMenu==>', this.subActiveMenu)
      this.$router.push({
        name: this.submenu[this.subActiveMenu.subActive].pathname,
      })
      console.log(key, keyPath)
    },
    // Slider选项切换
    handleSliderSelect(key, keyPath) {
      this.subActiveMenu = key
      console.log('submenu==>', this.submenu[key])
      this.$router.push({ name: this.submenu[key].pathname })
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border: none;
}
</style>
