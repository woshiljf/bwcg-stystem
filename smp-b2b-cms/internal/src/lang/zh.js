export default {
  route: {
    dashboard: 'BAOWEI首页',
    introduction: '简述',
    account: '账户管理',
    order: '订单管理',
    user: '账户管理',
    goods: '货品管理',
    trade: '交易管理',
    statement: '报表',
    role: '角色管理',
    statementJit: 'JIT财务报表',
    viewGoods: '货品管理',
    internalTrade: '交易管理-内部',
    externalTrade: '交易管理-客户',
    internalUser: '账户管理-内部',
    externalUser: '账户管理-客户',
    roleList: '角色管理',
    internalRoleList: '角色管理-内部',
    externalRoleList: '角色管理-客户',
    editRole: '编辑角色',
    createRole: '添加角色',
    changePassword: '修改密码',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单1-1',
    'menu1-2': '菜单1-2',
    'menu1-2-1': '菜单1-2-1',
    'menu1-2-2': '菜单1-2-2',
    'menu1-3': '菜单1-3',
    menu2: '菜单2',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    editTrade: '编辑交易',
    articleList: '文章列表',
    createTrade: '新建交易',
    tradeList: 'B2B交易列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链'
  },
  navbar: {
    logOut: '退出登录',
    changePassword: '修改密码',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: 'BAOWEI管理平台',
    logIn: '登录',
    username: '账号',
    userName: '账户',
    roleCode: '角色CODE',
    roleName: '角色名称',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 Tab 组件或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    reset: '重置',
    submit: '提交',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    username: '用户名',
    userName: '用户名',
    roleCode: '角色编码',
    accountProperty: '账户属性',
    roleName: '角色',
    customCode: '客户代码',
    propertyEnum: '客户属性',
    available: '状态',
    password: '用户密码',
    createTime: '创建时间',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    close: '关 闭',
    confirm: '确 定'
  },
  goods: {
    barCode: '条码',
    styleId: '款号',
    goodsName: '货品简称',
    goodsFullName: '货品全称',
    goodsEnglishName: '货品英文名称',
    year: '年份',
    season: '季节',
    brand: '品牌',
    gender: '性别',
    category: '类目',
    mode: '款型',
    subMode: '子款型',
    lining: '面料',
    series: '系列',
    subSeries: '子系列',
    project: '项目',
    mainProject: '主项目',
    subProject: '子项目',
    color: '颜色',
    size: '尺码',
    collar: '领型',
    sizeType: '尺码类别',
    tagPrice: '吊牌价',
    retailPrice: '零售价',
    origin: '产地',
    mainImage: '主图',
    goodsMainImage: '商品主图',
    mainImageAddress: '图片地址',
    permit: '允许使用',
    detail: '详细信息',
    classes: '类别',
    marketTime: '上市日期',
    createTime: '建档时间',
    lastEditTime: '最后编辑时间',
    view: '查看',
    goodsNo: '货号',
    sku: 'SKU ID',
    supplier: '供应商',
    businessModel: '商业模式',
    thickness: '厚薄',
    outsideLength: '袖长/裤长',
    clothesLength: '衣长',
    styleNumber: '款号',
    model: '版型',
    stylist: '设计师',
    element: '元素',
    placeHolder: '请输入',
    placeHolderBarCode: '请输入条码',
    placeHolderGoodsNo: '请输入货号',
    placeHolderGoodsName: '请输入货品简称',
    exportNormal: '导出常用字段',
    exportAll: '导出全部信息'
  },
  trade: {
    id: '序号',
    orderNo: '平台订单号',
    customerCode: '客户代码',
    bizType: '订单类型',
    orderStatus: '订单状态',
    shipmentType: '提货方式',
    action: '操作',
    state: '订单状态',
    uploadFutureGoods: '上传期货到货单',
    uploadSaleGoods: '上传特价订单'
  },
  role: {
    edit: '编辑',
    delete: '删除',
    view: '查看',
    add: '添加',
    permissionSelect: '权限选择',
    roleName: '角色名称',
    roleResource: '权限资源',
    submit: '提交',
    cancel: '取消',
    permissionList: '权限列表'
  },
  statement: {
    orderNoPlaceholder: '请输入订单号',
    orderTypePlaceholder: '请输入订单类型',
    brandPlaceholder: '请输入品牌',
    productCodePlaceholder: '请输入货号',
    accountSetPlaceholder: '请选择账套',
    orderDate: '订单日期',
    transactionDate: '出仓日期',
    orderNo: '订单号',
    orderType: '订单类型',
    channel: '销售渠道',
    barCode: '条码',
    productCode: '货号',
    brand: '品牌',
    saleNum: '销售数量',
    price: '唯品会售卖价',
    tagPrice: '零售价',
    retailMoney: '零售金额',
    marketMoney: '销售额(扣满减含拒退)',
    discount: '销售折扣',
    companyCode: '账套',
    barCodePlaceholder: '请输入条码'
  },
  tradeDetail: {
    order: '订单',
    add: '添加',
    update: '修改',
    export: '导出',
    upload: '上传',
    orderCheck: '订单确认',
    checkPass: '审核通过',
    payment: '付款凭证',
    delivery: '到款凭证',
    packing: '出货单号',
    shipment: '装箱单',
    sending: '出库单',
    uploadTime: '上传时间',
    checkTime: '审核时间',
    addTime: '添加时间',
    orderConfirmTime: '订单确认时间'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
