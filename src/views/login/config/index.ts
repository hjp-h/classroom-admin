const accountRules = {
  name: [
    {
      required: true,
      message: '账号不能为空',
      trigger: 'blur'
    },
    {
      // eslint-disable-next-line no-useless-escape
      pattern: /^([a-zA-Z]|[0-9]){5,10}$/,
      message: '账号由5~10位的英文或数字组成'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
    // {
    //   pattern:
    //     /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8}$/,
    //   message: '密码必须由8位的数字、字母和特殊字符组成',
    //   trigger: 'blur'
    // }
  ]
}
const emailRules = {
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur'
    },
    {
      // eslint-disable-next-line no-useless-escape
      pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: '邮箱格式不正确'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{4}$/,
      message: '验证码为4位有效数字',
      trigger: 'blur'
    }
  ]
}
export { accountRules, emailRules }
