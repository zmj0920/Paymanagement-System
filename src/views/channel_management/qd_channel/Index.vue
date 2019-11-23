<template>
  <div>
    {{ token }}
  </div>
</template>
<script>
import axios from 'axios'
import servicePath from '@/api'
export default {
  components: {

  },
  data () {
    return {
    }
  },
  methods: {
    init () {
      axios({
        url: servicePath.channels,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$store.getters.token}`
        }
      }).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
        .finally(() => {

        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less">

</style>
