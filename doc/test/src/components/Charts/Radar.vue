<template>
  <v-chart
    :force-fit="true"
    height="400"
    :data="data"
    :padding="[20, 20, 95, 20]"
    :scale="scale"
  >
    <v-tooltip />
    <v-axis
      :data-key="axis1Opts.dataKey"
      :line="axis1Opts.line"
      :tick-line="axis1Opts.tickLine"
      :grid="axis1Opts.grid"
    />
    <v-axis
      :data-key="axis2Opts.dataKey"
      :line="axis2Opts.line"
      :tick-line="axis2Opts.tickLine"
      :grid="axis2Opts.grid"
    />
    <v-legend
      data-key="user"
      marker="circle"
      :offset="30"
    />
    <v-coord
      type="polar"
      radius="0.8"
    />
    <v-line
      position="item*score"
      color="user"
      :size="2"
    />
    <v-point
      position="item*score"
      color="user"
      :size="4"
      shape="circle"
    />
  </v-chart>
</template>

<script>
const axis1Opts = {
  dataKey: 'item',
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null
    },
    hideFirstLine: false
  }
}
const axis2Opts = {
  dataKey: 'score',
  line: null,
  tickLine: null,
  grid: {
    type: 'polygon',
    lineStyle: {
      lineDash: null
    }
  }
}

const scale = [
  {
    dataKey: 'score',
    min: 0,
    max: 80
  }, {
    dataKey: 'user',
    alias: '类型'
  }
]

export default {
  name: 'Radar',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      axis1Opts,
      axis2Opts,
      scale
    }
  }
}
</script>

<style scoped>

</style>
