<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card title="登录日志" class="project-list" style="margin-bottom: 24px;" :bordered="false">
          <a slot="extra">全部日志</a>
        </a-card>
        <a-card style="margin-bottom: 24px" title="操作记录" :bordered="false">
          <a slot="extra">全部记录</a>
          <div>操作记录</div>
        </a-card>
      </a-col>

      <a-col
        style="padding: 0 12px"
        :xl="8"
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24">
        <a-card
          title="数据维护"
          style="margin-bottom: 24px"
          :bordered="false"
          :body-style="{padding: 0}"
        >
          <div>数据维护</div>
        </a-card>
        <a-card
          title="站点设置"
          style="margin-bottom: 24px"
          :bordered="false"
          :body-style="{padding: 0}"
        >
          <div>站点设置</div>
        </a-card>
      </a-col>
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="接口白名单"
          :body-style="{ padding: 0 }"
        >
          <a slot="extra">全部接口</a>
          <div>登录日志</div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Workplace',
  components: {},
  data () {
    return {

    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
