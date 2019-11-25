<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a> -->
      <!-- <notice-icon class="action"/> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar
            class="avatar"
            size="small"
            src="https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png"
          />
          <span>{{ nickname }}</span>
        </span>
        <a-menu
          slot="overlay"
          class="user-dropdown-menu-wrapper"
        >
          <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item> -->
          <!-- <a-menu-item
            key="2"
            @click="showModal"
          >
            <a-icon type="setting" />
            <span>注册</span>
          </a-menu-item> -->
          <a-menu-divider />
          <a-menu-item key="3">
            <a
              href="javascript:;"
              @click="handleLogout"
            >
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  data () {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      userName: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])

  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
