<template>
    <div class="login">
        <div class="left">
            <div class="logo">
                <img :src="logoImg" alt="" />
            </div>
            <div class="img">
                <img :src="leftImg" alt="" />
            </div>
        </div>
        <div class="right">
            <div class="right_content">
                <div class="login_box">
                    <h2>深圳云顶学校管理系统</h2>
                </div>
                <div class="form_box">
                    <el-form
                        ref="ruleFormRef"
                        :model="ruleForm"
                        :rules="rules"
                        size="large"
                    >
                        <el-form-item prop="phone">
                            <el-input
                                v-model="ruleForm.phone"
                                placeholder="请输入手机号"
                            />
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input
                                v-model="ruleForm.password"
                                type="password"
                                placeholder="请输入密码"
                            />
                        </el-form-item>
                        <el-form-item prop="rememberPassword">
                            <el-checkbox
                                v-model="ruleForm.rememberPassword"
                                label="记住密码"
                                size="large"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="submitForm(ruleFormRef)"
                            >
                                登 录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, onMounted } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'

    import { useRouter } from 'vue-router'

    const router = useRouter()

    import getAssetsFile from '@/util/getAssetsFile'
    import Login from './login.ts'

    const logoImg = getAssetsFile('login/logo.png')
    const leftImg = getAssetsFile('login/11.png')

    interface RuleForm {
        phone: string
        password: string
        rememberPassword: boolean
    }

    const ruleFormRef = ref<FormInstance>()
    let ruleForm = reactive<RuleForm>({
        phone: '',
        password: '',
        rememberPassword: false,
    })

    onMounted(() => {
        if (localStorage.getItem('userInfo')) {
            const { phone, password } = JSON.parse(
                localStorage.getItem('userInfo') as string
            )
            ruleForm.phone = phone
            ruleForm.password = password
            ruleForm.rememberPassword = true
        }
        localStorage.removeItem('Authorization')
    })

    const rules = reactive<FormRules<RuleForm>>({
        phone: [
            {
                required: true,
                message: '请输入账号',
                trigger: 'blur',
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
                trigger: 'blur',
            },
        ],
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid) => {
            if (valid) {
                const params = {
                    phone: ruleForm.phone,
                    password: ruleForm.password,
                }
                Login(params).then((res) => {
                    if (res.code === 200) {
                        localStorage.setItem(
                            'Authorization',
                            JSON.stringify(res.data)
                        )
                        if (ruleForm.rememberPassword) {
                            localStorage.setItem(
                                'userInfo',
                                JSON.stringify(params)
                            )
                        } else {
                            localStorage.removeItem('userInfo')
                        }
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                        })
                        router.push('/studentInfo')
                    }
                })
            }
        })
    }
</script>

<style scoped lang="scss">
    .login {
        width: 100vw;
        height: 100vh;
        display: flex;
        .left {
            width: 60%;
            background-color: #5d6dea;
            .logo {
                margin-top: 100px;
                margin-left: 50px;
                img {
                    width: 50%;
                    height: auto;
                }
            }
            .img {
                width: 100%;
                height: auto;
                margin-top: 120px;
                display: flex;
                justify-content: center;
                img {
                    width: 80%;
                    height: auto;
                }
            }
        }
        .right {
            width: 40%;
            min-width: 460px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .right_content {
                width: 400px;
                .login_box {
                    h2 {
                        text-align: center;
                        font-size: 40px;
                        font-weight: bold;
                        margin-bottom: 50px;
                    }
                }
                .form_box {
                    .el-form {
                        .el-form-item {
                            .el-input {
                                height: 55px;
                                font-size: 18px;
                            }

                            &:deep(.el-input__wrapper) {
                                border-radius: 15px;
                            }

                            .el-button {
                                height: 50px;
                                width: 100%;
                                font-size: 26px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
