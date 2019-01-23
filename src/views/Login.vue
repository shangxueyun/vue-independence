<template>
    <div id="Login" v-loading="loading_p">
        <el-row>
            <el-col :span="24">
                <div class="grid-content-top bg-purple-dark">
                    <div>
                        <nav>
                            <li><a @click="login_form=true">登录</a>&nbsp;&nbsp;&nbsp;<a>注册</a></li> 
                            <li><a>&nbsp;&nbsp;|&nbsp;&nbsp;接入指引</a></li>
                            <li><a>&nbsp;&nbsp;|&nbsp;&nbsp;开放平台</a></li>
                            <li><a>&nbsp;&nbsp;|&nbsp;&nbsp;帮助中心</a></li>
                        </nav>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content-top_nav bg-purple-dark">
                    <div class="div_one"></div>
                    <div class="logo_div">
                        <img src="../assets/img/logo1.png" alt="">
                        <img src="../assets/img/logo_font.png" alt="" style="margin-left:1rem">
                    </div>
                    <div class="div_nav">
                        <nav>
                            <li class="activate" @click="activate($event)">首页</li>
                            <li class=""  @click="activate($event)">产品大全</li>
                            <li class="" @click="activate($event)">解决方案</li>
                        </nav>
                    </div>
                </div>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="24">
                <div class="grid-content-top_bar bg-purple-dark">
                    <el-carousel interval="3000" height="100%">
                        <el-carousel-item v-for="item in imgData" :key="item">
                            <img :src="require(`../assets/img/${item.url}`)"  width="100%" height="100%" alt="" >
                        </el-carousel-item>
                    </el-carousel>
                    <div class="login_div">
                        <h4>登&nbsp;&nbsp;录</h4>
                        <div>
                            <div class="users">
                                <span></span><input type="text"  ref="account"  placeholder="请输入用户名"/>
                            </div>
                            <br />
                            <div class="passwords">
                                <span></span><input type="password"  @keydown="keydown($event)" ref="password" placeholder="请输入密码"/>
                            </div>
                            <br />
                            <a>忘记密码？</a>
                            <br />
                            <button  @click="handleSubmit2">登 录</button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>  
        <el-row>
            <el-col :span="24">
                <div class="grid-content-top_centent bg-purple-dark">
                    <div class="centent_top">
                        <div>
                            <div></div>
                            <h5>全程追溯您购买的食品</h5>
                            <p>我们通过云服务连接大量线下设备收集
                            数据，让您手中的食品附加了丰富的追
                            踪信息，保障您购买的食品是可追溯的、
                            安全的、可以放心食用的。
                            </p>
                        </div>
                        <div class="special">
                            <div></div>
                            <h5>食品安全全知道</h5>
                            <p>我们有专业的手机APP和微信公众服务
                            号，通过二维码扫描，获取产品的追溯
                            信息，与其他消费者、企业和监管部门
                            进行互动。
                            </p>
                        </div>
                        <div>
                            <div></div>
                            <h5>为您节省大量成本</h5>
                            <p>您只需用很少的费用使用我们的云服务，
                            剩下的交给我们的专业团队，无论是服
                            务器的维护，还是线下多样化的工业追
                            溯终端，您使用的就是我们精心照顾的。
                            </p>
                        </div>
                        <div>
                            <div></div>
                            <h5>提升您的品牌价值</h5>
                            <p>我们通过和消费者的紧密联系，把您的
                            优秀散播出去，我们也把消费者的反馈
                            给到您。我们不想市场埋没任何一个兢
                            兢业业提高产品质量的企业。
                            </p>
                        </div>
                        <div>
                            <div></div>
                            <h5>开放的平台</h5>
                            <p>我们为开发人员提供全面的平台技术接
                            口、文档和工具，让您始于我们的平台，
                            但不止于我们的平台，我们希望您能超
                            越我们，真正带来食品安全的福音。
                            </p>
                        </div>
                        <div>
                            <div></div>
                            <h5>给您足够的洞察力</h5>
                            <p>我们根据积累的大量数据，把数据产生
                            的价值反馈给您，让您拥有足够的商业
                            洞察力，让您的决策足够强大。
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="24">
                <div class="grid-content-top_centent_bottom bg-purple-dark">
                    <div class="centent_bottom_div">
                        <h1>我们的用户</h1>
                        <p>凭借强大的技术力量和平台优势，我们与越来越多的伙伴展开了合作。</p>
                        <p>目标客户涵盖食品生产加工企业、食品批发流通企业、食品零售企业、餐饮企业等。</p>
                        <div>
                            <div><img src="../assets/img/brand_1.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_2.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_3.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_4.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_5.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_6.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_7.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_8.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_9.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_10.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_11.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_12.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_13.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_14.png" alt="" width="100%" height="100%"></div>
                            <div><img src="../assets/img/brand_15.png" alt="" width="100%" height="100%"></div>
                        </div>
                    </div>

                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content-top_bottom bg-purple-dark">
                    <div class="centent_footer_div">
                        <p><a>关于食安先&nbsp;&nbsp;</a>|<a>&nbsp;&nbsp;联系我们</a></p>
                        <p>copyright ©2018 - 2020 上海质尊溯源电子科技有限公司</p>
                    </div>
                </div>
            </el-col>
        </el-row>   
    </div>

</template>

<script>
  import api from "../api/api.js";
  import routesS from "../routes.js";
  export default {
    data() {
      return {
          login_form:false,
          loading_p:false,
          imgData:[
              {url:'bar_1.png'},
              {url:'bar_2.png'},
              {url:'bar_1.png'},
          ],
      };
    },
    created() {

    },
    computed: {

    },
    mounted() {
        //console.log(this.$router)
    },  
    methods: {
        handleSubmit2(ev) {
        var _this = this
        this.loading_p = true
        var loginParams = {username:this.$refs.account.value,password:this.$refs.password.value};
        api.Login(loginParams).then(res => {
            debugger
            //2018-11-15 修改为 permission routes
            this.loading_p = false
            if (res.status == 200) {
                let userId = res.data.user.id;
                let companyId = res.data.user.companyId;
                let userName = res.data.user.username;
                let arr = routesS.ChangeRoutes(res.data.permission);
                this.$router.options.routes = arr;
                this.$router.addRoutes(this.$router.options.routes)
                sessionStorage.setItem('newRoutes', JSON.stringify(res.data.permission));
                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                sessionStorage.setItem('userName', JSON.parse(sessionStorage.getItem('user')).username);
                sessionStorage.setItem('companyId', JSON.stringify(companyId));
                this.$router.push({ path: '/SystemuserManagement' });
            } else {
                this.loading_p = false
                this.$message(res.data.msg)
            }
        });
      },
      keydown(e){
          if(e.keyCode == 13){
            this.handleSubmit2();
          }
      },
      activate(e){
        let thisDom,parentElement;
        e.path.forEach((v,i)=>{if(i==0){
                thisDom = v;
                parentElement = v.parentElement;
                for(var i in parentElement.children){
                    for(var j in parentElement.children[i]){
                        if(j=='className'){console.log(parentElement.children[i][j]);parentElement.children[i][j]=""}
                    }
                }
            }
        })
        thisDom.className = 'activate';
      },
    },
  }

</script>

<style lang="scss" scoped>
    #Login{
        width: 100%;
        height: auto;

        .el-row {
            margin-bottom: 0px;
        }
        li{
            cursor: pointer;
        }
        .grid-content-top {
            border-radius: 0;
            min-height: 0;
            height: 30px;
            background: #000;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            div{
                width: 33.2%;
                height: 29px;
                line-height: 29px;
                li{
                    float: left;
                    list-style: none;
                    a{
                        color: #E6E6E6;
                        font-size: 12px;
                    }
                }
            }
        }
        .grid-content-top_nav{
            border-radius: 0;
            min-height: 0;
            height: 80px;
            background: #fff;
            .div_one{
                width: 17%;
                height: 100%;
                float: left;
            }
            .logo_div{
                height: 100%;
                width: 25rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                overflow: hidden;
                float: left;
 
                h4{
                    color: #222222;
                    font-size: 20px;    
                    padding-left: 1rem;
                }
            }
            .div_nav{
                    width: 35.5%;
                    height: 100%;
                    float: right;
                nav{}
                li{
                    list-style: none;
                    line-height: 80px;
                    float: left;
                    padding: 0 1.5rem;
                    color: #222222;
                    font-size: 18px;
                }
                .activate{
                    border-bottom: 4px solid #1ED373;
                }
            }
        }
        .grid-content-top_bar{
            border-radius: 0;
            min-height: 0;
            height: 400px;  
            display: flex;
            margin-top: 4px;
            flex-direction: row;
            align-items: center;
            position: relative;
            background: #0077ff;
            .el-carousel__item h3 {
                font-size: 18px;
                opacity: 0.75;
                line-height: 300px;
                margin: 0;
            }
            // .el-carousel__item:nth-child(2n) {
            //     background-color: #99a9bf;
            // }
            
            // .el-carousel__item:nth-child(2n+1) {
            //     background-color: #d3dce6;
            // }
            .el-carousel {
                overflow-x: hidden;
                position: relative;
                width: 100%;
                height: 100%;
            }
            .login_div{
                width: 295px;
                height: 322px;
                background: rgba(0, 0, 0, 0.5);
                position: absolute;
                right: 20%;
                top: 8%;
                z-index: 11;
                h4{
                    width: 100%;
                    text-align: center;
                    font-size: 20px;
                    color: #fff;
                    line-height: 1rem;
                    font-weight: normal;
                    margin-top: 2rem;
                }
                div{
                    width: 100%;
                    height: 16rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .users{                    
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            height: 3rem;
                        span{
                            display: block;
                            width: 44px;
                            height: 44px;
                            background: #ccc url('../assets/img/users.png') no-repeat;
                            background-position: center;
                            background-size: 40% 40%;
                            
                        }
                    }
                    .passwords{                    
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            height: 3rem;
                        span{
                            display: block;
                            width: 44px;
                            height: 44px;
                            background: #ccc url('../assets/img/mm.png') no-repeat;
                            background-position: center;
                            background-size: 40% 40%;
                        }
                    }
                    input{
                        width: 172px;
                        height: 42px;
                        border: 0;
                        outline: 0;
                        text-indent: .8rem;
                        cursor: pointer;
                        color: #B5B5B5;
                    }
                    a{
                        color: #AAAAAA;
                        display: block;
                        margin-left: 10rem;
                        font-size: 14px;
                        margin-top: -10px;
                    }
                    button{
                        width: 78%;
                        height: 42px;
                        border: 0;
                        border-radius: 8px;
                        background: #1ED373;
                        color: #fff;
                        outline: 0;
                    }

                }
            }
        }
        .grid-content-top_centent{
            width: 70rem;
            height: auto;
            background: #fff;
            margin: 0 auto;
            .centent_top{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                div{
                        width: 20%;
                        height: 19.8rem;
                        margin-top: 10px;
                        padding: 2rem 3rem 0 3.1rem;
                        text-align: center;
                    div{
                        margin-top: 1rem;
                        height: 134px;
                        width: 134px;
                        padding: 0;
                        border-radius: 60px;
                        position: relative;
                        left: 21%;
                    }
                    h5{
                        color: #222222;
                        font-size: 18px;
                        font-weight: 500;
                    }
                    p{
                        width: 100%;
                        height: 6.5rem;
                        margin: 0;
                        color: #999999;
                        font-size: 15px;
                        text-align: left;
                    }
                }
                .special div{
                    border-radius: 0;
                    width: 155px;
                    height: 134px;
                    left: 13%;
                }
                .special h5{
                    margin-top: 31px;
                }
                div:nth-child(1) div{
                    background: url('../assets/img/centent_1.png') no-repeat;
                    background-position: center;
                }
                div:nth-child(2) div{
                    background: url('../assets/img/centent_2.png') no-repeat;

                    background-position: center;
                }
                div:nth-child(3) div{
                    background: url('../assets/img/centent_3.png') no-repeat;
                    background-position: center;
                }
                div:nth-child(4) div{
                    background: url('../assets/img/centent_4.png') no-repeat;
                    background-position: center;
                }
                div:nth-child(5) div{
                    background: url('../assets/img/centent_5.png') no-repeat;
                    background-position: center;
                }
                div:nth-child(6) div{
                    background: url('../assets/img/centent_6.png') no-repeat;
                    background-position: center;
                }
            }
        }
        .grid-content-top_centent_bottom{
            border-radius: 0;
            min-height: 0;
            background: #e8e8e8;
            margin-top: 4rem;
            .centent_bottom_div{
                width: 54.2rem;
                height: 676px;
                margin: 0 auto;
                h1{
                    height: 4rem;
                    width: 100%;
                    text-align: center;
                    line-height: 4rem;
                    color: #47A136;
                    font-size: 30px;
                    font-weight: 400;
                    padding-top: 2rem;
                }
                p{
                    width: 100%;
                    color: #999999;
                    font-size: 15px;
                }
                div{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding-top: 3rem;
                    div{
                        width: 141px;
                        height: 5rem;
                        background: #ccc;
                        margin: 2rem;
                        margin-top: 1rem;
                        padding: 0;
                        margin-left: 0;
                    }
                }
            }
        }
        .grid-content-top_bottom{
            border-radius: 0;
            min-height: 0;
            background: #fff;
            .centent_footer_div{
                width: 58rem;
                height: 6.5rem;
                margin: 0 auto;
                p{
                    text-align: center;
                    line-height: 2rem;
                    color: #999999;
                }
            }
        }
    }
</style>






