<template>

      <div class="login" v-loading="listLoading"  ref="login">
        <div class="login_header">
            <div class="row">
                <div class="col-sm padding">
                    <div class="logo">
                        <img src="../assets/img/logo.png" alt="">
                        <h2>食安先第三方云追溯管理平台</h2>
                    </div>
                </div>
                <div class="col-sm"></div>
                <div class="col-sm"></div>
            </div>
        </div>
        <div class="login_centent">
            <div class="centent">
                <div class="login_k">
                    <div></div>
                    <div :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="frame">
                        <span class="account">&nbsp;</span><input value=""  ref="account"  type="text" placeholder="请输入用户名">
                        <br>    
                        <span class="pad">&nbsp;</span><input value=""  @keydown="keydown($event)" ref="password"  type="password" placeholder="请输入密码">
                        <br>
                        <div>
                            <input v-model="checked" type="checkbox" name="mm"><span class="mm">记住密码</span><a href="#" class="wj">忘记密码</a> 
                        </div>
                        <br>
                        <button  @click="handleSubmit2" >登录</button>
                    </div>
                </div>
                <div class="Link_exchange">
                    <div class="img_div" v-for="time in data">
                        <div :class="time.url"></div>
                        <p>{{ time.msg }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="login_footer">{{ msgs }}</div>
      </div>
</template>

<script>
  import api from "../api/api.js";
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        data:[{url:"aaa",msg:"上海市质量追溯与防伪行业协会会长单位"},{url:"sss",msg:"政府单位认证第三方追溯服务公共平台"},{url:"ddd",msg:"国家质量追溯与防伪数据中心"}],
        msgs:"版权所有：上海质尊溯源电子科技有限公司",
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
        listLoading:false,
      };
    },
    created() {

    },
    computed: {

    },
    mounted: function () {

    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this
        this.listLoading = true;
        //NProgress.start();
        var loginParams = {username:this.$refs.account.value,password:this.$refs.password.value};
        api.Login(loginParams).then(res => {
            debugger
            //2018-10-31 修改为res.data
            let userId = res.data.id;
            let companyId = res.data.companyId;
            if (res.status == 200) {
                sessionStorage.setItem('userId', JSON.stringify(userId));
                sessionStorage.setItem('companyId', JSON.stringify(companyId));
                this.$router.push({ path: '/userManagement' });
            } else {
                alert(res.msg);
            }
        });
      },
      keydown(e){
          if(e.keyCode == 13){
            this.handleSubmit2();
          }
      }
    },
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .demo-ruleForm{
     padding: 0 2rem 1rem 0;
    padding-top: 2rem;
    position: relative;   
  }
      .login a{
        color: #FFFFFF;
    }
    .login{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1111111;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
    }
    .login .padding{
        padding: 2rem;
    }
    .login .login_header{
        width: inherit;
    }
    .login .logo{
        height: 5rem;
        width: 42rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .login .logo h2{
        float: right;
        font-size: 2.8rem;
        margin-left: 1rem;
    }
    .login .login_centent{
        width: inherit;
    }
    .login_centent .centent{
        height: 74vh;
        background: url("../assets/img/bg.png");
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .centent .login_k{
    height: 28rem;
    width: 69rem;
    display: flex;
    flex-direction: row;
    padding: 1rem;
    justify-content: center;
    background: url("../assets/img/login_k.png");
    margin-top: 6rem;
    background-size: 100% 100%;
    }
    .login_k div{
        width: 53%;
    }
    .login_k .frame{
    padding: 0 2rem 1rem 0;
    padding-top: 2rem;
    position: relative;
    }
    .frame input{
    width: 30rem;
    height: 2.5rem;
    padding: 1rem 0;
    margin: 1rem;
    font-size: 16px;
    padding-left: 4rem;
    border: 0px;
    border-bottom: 1px solid #ccc;
    outline: none;
    color: #333;
    }
    .frame input::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #94A8D3; opacity:1; 
    }

    .frame input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #94A8D3;opacity:1;
    }

    .frame input:-ms-input-placeholder{
        color: #94A8D3;opacity:1;
    }

    .frame input::-webkit-input-placeholder{
        color: #94A8D3;opacity:1;
    }
    .frame span{
      width: 34px;
      height: 34px;
      display: inline-block;
      position: absolute;
      margin-top: 1.8rem;
      margin-left: 1.5rem;
    }
    .frame input[type="checkbox"]{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 5rem;
    }
    .frame .mm{
        width: 68px;
        height: 24px;
        display: inline-block;
        position: absolute;
        background: none;
        margin-top: .8rem;
        margin-left: 0;
        font-size: 16px;
        color: #BDBDBD;
        left: 8rem;
    }

    .frame .wj{
        float: right;
        margin-top: .8rem;
        font-size: 16px;
        color: #BDBDBD;
        padding-right: 6rem;
    }
    .frame button{
        width: 100%;
        border: 0;
        color: #FFFFFF;
        background: #3A97F6;
        height: 4.2rem;
        border-radius: .4rem;
        font-size: 16px;
        outline: 0;
    }
    .frame button a{
        color: #FFFFFF;
    }
    .frame div{
        width: 100%;
        height: 5rem;
        position: relative;
    }
    .frame .account{
        background: url("../assets/img/2.png") no-repeat;
        background-position: center;
    }
    .frame .pad{
        background: url("../assets/img/4.png") no-repeat;
        background-position: center;
    }
    .centent .Link_exchange{
        height: 16rem;
        width: 85rem;
        margin: 0 auto;
        padding: 1rem;
    }
    .login .img_div{
        width: 33%;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        float: left;
    }
    .login .img_div div{
        width: 5rem;
        height: 5rem;
        border-radius: 2.5rem;
        background: #3A97F6;
    }
    .img_div:nth-child(1) .aaa{
        background: url("../assets/img/111.png");
    }
        .img_div:nth-child(2) .sss{
        background: url("../assets/img/222.png");
    }
        .img_div:nth-child(3) .ddd{
        background: url("../assets/img/333.png");
    }
    .img_div p{
        padding-top: 1rem;
        font-size: 14px;
        color: #fff;
    }
    .login_footer{
        font-size: 20px;
        color: #222222;
        line-height: 6rem;
    }
</style>






