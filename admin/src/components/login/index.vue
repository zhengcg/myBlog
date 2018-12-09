<template>
	<div id="login">
    <div class="header">
      <em class="role"><i class="fa fa-user-circle"></i>博客管理后台</em>
    </div>
    <div id="loginBox">
    <el-card class="box-card loginBox">
      <p style="text-align: center;margin-bottom: 22px;">用户登录</p>
    	<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" class="demo-ruleForm">
    	  <el-form-item label="用户名" prop="name">
		    <el-input v-model="ruleForm2.name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" @keyup.enter.native="submitForm('ruleForm2')" placeholder="8~20位密码，不能为纯数字和纯字母"></el-input>
		  </el-form-item>		  
		  <el-form-item class="btnBox">
		    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
		  </el-form-item>
		</el-form>
	</el-card>
    </div>
  <div id="bottom">
    <div class="bot">BCAdmin - Web Application Framework © 2017-2019</div>
  </div>
	</div>
</template>
<script>
import api from '../../api'
export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          
            if (value.length < 2) {
              callback(new Error('用户名至少2位'));
            } else {
              callback();
            }
          
        }, 500);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!checkPass(value)){
          callback(new Error('密码需8~20位，不能为纯数字和纯字母'));
        } else {     
          callback();
        }
      };
      function checkPass(pwd){
        let pwdCheck=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
        return pwdCheck.test(pwd);

      };
      return {
        ruleForm2: {
          pass: '',
          name: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },

    created(){     
      this.$store.commit("logout");
      console.log(`session-id:${this.$store.state.token}`)
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login(){
        var self=this;
        const loading=self.$loading({
          lock: true,
          text: '请求中……',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let params = new URLSearchParams();   
        params.append("username", self.ruleForm2.name);
        params.append("password", self.ruleForm2.pass);
        self.axios.post(api.login,params).then(function (res) {
            loading.close();
            if(res.data.code==0){
                  self.$store.commit('login',res.data.data.token);
                  self.$router.push({
                         name:'aboutme'
                        })                 

              }else{
                self.$message({
                  message:res.data.message,
                  type: 'warning'
                });  
                
              }
                  
          }).catch(function (error) {
            loading.close();
          　self.$message({
              message:error,
              type: 'warning'
            }); 
          });   
      }


    }
  }
</script>
<style lang="scss" scoped>
@import "../../assets/css/login.scss"
</style>