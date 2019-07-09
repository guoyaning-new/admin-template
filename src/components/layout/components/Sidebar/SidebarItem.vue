<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="resolvePath(item.children[0].path)">
        <el-menu-item :index="resolvePath(item.children[0].path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <img  v-if="item.children[0].meta&&item.children[0].meta.icon" :src="item.children[0].meta.icon" class="icon-img mr5" :onerror="errorImg">
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.resourceName||item.path">
        <template slot="title">
          <img  v-if="item.meta&&item.meta.title" :src="item.meta.icon" class="icon-img mr5" :onerror="errorImg">
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.resourceName" :base-path="resolvePath(child.path)"></sidebar-item>

          <router-link v-else :to="resolvePath(child.path)" :key="child.resourceName">
            <el-menu-item :index="resolvePath(child.path)">
              <img  v-if="child.meta&&child.meta.title" :src="child.meta.icon" class="icon-img mr5" :onerror="errorImg">
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

  </div>
</template>

<script>
import path from "path";

export default {
  name: "SidebarItem",
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errorImg: ''
    };
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-img {
  width: 18px;
  height: 18px;
}
</style>
