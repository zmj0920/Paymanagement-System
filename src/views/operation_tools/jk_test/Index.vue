<template>
  <div>
    接口调试
    {{ this.$store.getters.userInfo }}
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {
    console.log(this.$store.getters.userInfo)
  }
}
</script>

<style scoped>
/* @import 'ant-design-vue/lib/style/themes/default.less'; */
</style>
