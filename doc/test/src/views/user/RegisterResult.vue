<template>
  <result
    :is-success="true"
    :content="false"
    :title="email"
  >
    <template slot="action">
      <a-button
        size="large"
        style="margin-left: 8px"
        @click="goHomeHandle"
      >
        返回首页
      </a-button>
    </template>
  </result>
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'RegisterResult',
  components: {
    Result
  },
  data () {
    return {
      form: {}
    }
  },
  computed: {
    email () {
      const v = this.form && this.form.username || 'xxx'
      const title = `你的账户：${v} 注册成功`
      return title
    }
  },
  created () {
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
