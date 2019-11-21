<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <notice-icon class="action"/>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar"/>
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
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
          </a-menu-item>
          <a-menu-item key="2" @click="showModal">
            <a-icon type="setting"/>
            <span>注册</span>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-modal
        title="用户注册"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <a-form @submit="handleSubmit" :form="form">
          <a-form-item
            label="用户名"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入用户名' }]}
              ]"
              name="username"
              placeholder="用户名" />
          </a-form-item>
          <a-form-item
            label="密码"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input-password
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }]}
              ]"
              name="password"
              placeholder="输入密码" />
          </a-form-item>
          <a-form-item
            label="邮箱"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input
              v-decorator="[
                'email',
                {rules: [{ required: true, message: '请输入邮箱' }]}
              ]"
              name="email"
              placeholder="邮箱" />
          </a-form-item>

          <a-form-item
            :wrapperCol="{ span: 24 }"
            style="text-align: center"
          >
            <a-button htmlType="submit" type="primary">提交</a-button>
          </a-form-item>
        </a-form>

        <template slot="footer">

        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import { axios } from '@/utils/request'
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
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // this.ModalText = 'The modal will be closed after two seconds'
          // this.confirmLoading = true
          // setTimeout(() => {
          //   this.visible = false
          //   this.confirmLoading = false
          // }, 2000)
          // eslint-disable-next-line no-console
          axios({
            url: '/auth/local/register',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: { username: values.username, password: values.password, email: values.email }
          }).then(res => {
            console.log(res)
          })

          // axios.post('/auth/local/register', { username: values.username, password: values.password, email: values.email }).then(res => {
          //   console.log(res)
          //   this.visible = false
          // })
          console.log('Received values of form: ', values.username)
        }
      })
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
