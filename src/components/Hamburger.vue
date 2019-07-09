<template>
  <div>
    <i @click="toggleClick" class="hamburger" :class="{'is-active':isActive,'el-icon-menu fs20':true}"></i>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
};
</script>

<style scoped>
.hamburger {
  cursor: pointer;
  transform: rotate(90deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}
.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
