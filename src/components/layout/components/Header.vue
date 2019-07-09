<template>
  <div class="header-container flex pr10">
    <div class="name-side-toggle relative pl20">
      <router-link to="/">
        <div class="name">后台管理系统</div>
      </router-link>
      <hamburger class="hamburger-container absolute" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    </div>
    <div class="user-info text-right">
      <el-dropdown trigger="click" class="white">
        <span class="pointer">
          {{realName}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <a v-if="fromUserCenter" target="_blank" :href="modifyPwdUrl">
          <el-dropdown-item divided>
            修改密码
          </el-dropdown-item>
        </a>
        <router-link v-else to="/sys/modifyPwd/index">
          <el-dropdown-item divided>
            修改密码
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Common from "@/assets/js/common";

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      realName: "1231",
      modifyPwdUrl: "",
      fromUserCenter: false
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "isFromUserCenter"])
  },
  mounted() {
    let userLoginInfo = Common.getStorage("userLoginInfo");
    if (userLoginInfo) {
      this.realName = userLoginInfo.userName;
      if (userLoginInfo.isFromUserCenter) {
        this.fromUserCenter = true;
        this.modifyPwdUrl = userLoginInfo.modifyPwdUrl;
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        //FedLogOut 为前端登出 LogOut为接口登出
        let ssoLogoutUrl = Common.getStorage("userLoginInfo").ssoLogoutUrl;
        if (this.fromUserCenter) {
          Common.delStorage("userLoginInfo");
          location.href = ssoLogoutUrl;
        } else {
          Common.delStorage("userLoginInfo");
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 60px;
  line-height: 60px;
  color: #fff;
  background: #23262e;
  .name-side-toggle {
    width: 180px;
  }
  .user-info {
    flex: 1;
  }
  .hamburger-container {
    top: 0;
    right: -20px;
  }
}
</style>
