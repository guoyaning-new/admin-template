<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  text-align: left;
  padding: 76px 20px 64px 20px;
  min-height: calc(100vh - 60px);
  position: relative;
  overflow: hidden;
}
</style>
