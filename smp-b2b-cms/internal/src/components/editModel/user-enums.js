export default {
  searchBarOptions: [{
    type: 'input',
    name: 'loginName',
    placeholder: '搜索登录名'
  }, {
    type: 'input',
    name: 'userName',
    placeholder: '搜索姓名'
  }, {
    type: 'input',
    name: 'email',
    placeholder: '搜索电子邮件'
  }, {
    type: 'select',
    name: 'status',
    placeholder: '用户状态',
    noAllowNull: true,
    options: []
  }],
  // 查看、编辑、新建配置
  editOptions: [
    {
      type: 'organization',
      field: 'organization',
      name: '用户类型',
      width: 100
    },
    {
      type: 'input',
      field: 'loginName',
      name: '用户名',
      placeholder: '用户名'
    }, {
      type: 'input',
      field: 'userName',
      name: '姓名',
      placeholder: '姓名'
    }, {
      type: 'input',
      field: 'email',
      name: '电子邮件',
      placeholder: '请输入电子邮件'
    }, {
      type: 'input',
      field: 'phone',
      name: '手机号码',
      placeholder: '请输入手机号码',
      imgUrl: '/api/v1/submitPic'
    }],
  addOptions: [
    {
      type: 'organization',
      field: 'organization',
      name: '用户类型',
      width: 100
    },
    {
      type: 'input',
      field: 'loginName',
      name: '用户名',
      placeholder: '用户名',
      disabled: true
    }, {
      type: 'input',
      field: 'userName',
      name: '姓名',
      placeholder: '姓名'
    }, {
      type: 'password',
      field: 'password',
      name: '密码',
      placeholder: '密码'
    }, {
      type: 'input',
      field: 'email',
      name: '电子邮件',
      placeholder: '请输入电子邮件'
    }, {
      type: 'input',
      field: 'phone',
      name: '手机号码',
      placeholder: '请输入手机号码'
    }
  ],
  rules: {
    loginName: [
      { required: true, message: '请填写用户名', trigger: 'change' }
    ],
    password: [
      { required: true, message: '请填写密码', trigger: 'change' }
    ],
    userName: [
      { required: true, message: '请填写用户名', trigger: 'change' }
    ],
    email: [
      { required: true, message: '请填写电子邮件', trigger: 'change' }
    ]
  }
}
