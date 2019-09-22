<template>
  <div class="set-password user-box">
    <div class="user-box-title">
      <span><i class="el-icon-menu"></i> 修改密码</span>
    </div>

    <div class="set-password-form">
      <el-form :model="passwordForm" ref="passwordForm" :rules="rules" class="" label-width="100px">
        <el-form-item label="旧密码：" prop="passOld">
          <el-input type="password" v-model="passwordForm.passOld" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="passNew">
          <el-input type="password" v-model="passwordForm.passNew" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="passRep">
          <el-input type="password" v-model="passwordForm.passRep" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="set-password-btn">
      <el-button type="primary" @click="setPassword">提 交</el-button>
      <el-button type="warning" @click="resetForm('passwordForm')">重 置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SetPassword",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    var validateComplex = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度6-12位'));
      } else if (value.length > 12) {
        callback(new Error('密码长度6-12位'));
      } else if (!value.match(/[0-9]/)) {
        callback(new Error('必须包含字母和数字'));
      } else if (!value.match(/[a-zA-Z]/)) {
        callback(new Error('必须包含字母和数字'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.passwordForm.passNew) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        passOld: '',
        passNew: '',
        passRep: '',
      },
      rules: {
        passOld: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        passNew: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validateComplex, trigger: 'blur' },
        ],
        passRep: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: ['blur', 'change'] },
        ]
      }
    }
  },
  methods: {
    setPassword() {
      let self = this;
      self.$axios({
        url: 'user/password',
        type: 'post',
        data: {
          loginName: self.userInfo.loginName,
          newPassword: self.passwordForm.passNew,
          password: self.passwordForm.passOld,
        },
        success: function (res) {
          if(res.code == '2000') {
            self.message('success', '修改成功');
          } else {
            self.message('error', res.msg);
          }
        },
        error: function (err) {
          self.message('error', err);
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    message(type, msg) {
      let self = this;
      self.$message({
        showClose: true,
        center: true,
        message: msg,
        type: type
      });
    }
  }
}
</script>
