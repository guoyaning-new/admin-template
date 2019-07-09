<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#393d49"
      text-color="#c2c2c2"
      active-text-color="#fff"
    >
      <sidebar-item v-for="route in newRoutes" :key="route.resourceName" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  data() {
    return {
      newRoutes: []
    };
  },
  mounted() {
    this.newRoutes = this.$router.options.routes
    console.log(this.newRoutes)
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
