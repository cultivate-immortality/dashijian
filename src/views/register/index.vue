<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <!-- <el-form ref="form" :model="form" label-width="80px">，label-width="80px" 控制左侧标签的宽度 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            type="password"
          />
        </el-form-item>

        <el-form-item prop="repassword">
          <el-input
            placeholder="请再次输入密码"
            v-model="form.repassword"
            type="password"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="registerFn" class="btn-reg"
            >注册</el-button
          >
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index'
export default {
  name: 'my-register',
  data () {
    // 注意：必须在data函数里定义此箭头函数，才能确保this.form使用
    const samePwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致')) // 如果验证失败，则调用回调函数时，指定一个Error对象
      } else {
        callback() // 如果验证成功，则直接调用callback回调函数即可
      }
    }
    return {
      form: {
        username: '', // 用户名
        password: '', // 密码
        repassword: '' // 确认密码
      },
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          // 正则已经满足不了二次校验所以使用自定义函数校验
          { validator: samePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册的点击事件
    registerFn () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 通过校验
          const { data } = await registerAPI(this.form)
          // 注册失败，提示用户
          // elementUI还在Vue的原型链上添加了弹窗提示，$message属性
          if (data.code !== 0) return this.$message.error(data.message) // 用户名被占用等报错
          this.$message.success(data.message) // 注册成功，提示用户
          this.$router.push('/login') // 跳转到登录页
        } else {
          // return的结果表示 验证是否通过，通过了返回ture，不通过返回false
          return false // 阻止默认提交行为
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%; // 百分比参照的是父级的高度,如果父级没有高度那么自己也没有

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
