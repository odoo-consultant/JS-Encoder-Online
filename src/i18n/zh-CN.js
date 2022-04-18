export default {

	common: {
		prevPage: '上一页',
		nextPage: '下一页',

		unfollowButton: '取消关注',
		followButton: '关注',
		likeButton: '点赞',
		unlikeButton: '取消点赞',		
		saveButton: '保存',
		cancelButton: '取消',
		confirmButton: '确认',
		deleteButton: '删除',
		createNewButton: '新建实例',
		searchButton: '搜索',
		filterButton: '过滤',
		modifyButton: '修改',
		shareButton: '分享',
		downloadButton: '下载',
		refreshButton: '刷新',
		fullscreenButton: '全屏',
		goHomeButton: '返回首页',

		sortLabel: '排序',		

		createDate: '创建时间',
		updateDate: '更新日期',
		popularity: '喜爱度',
		account: '账户',

		signin: '登录',
		signup: '注册',
		username: '用户名',
		nickname: '昵称',
		email: '邮箱',
		verifyCode: '验证码',
		password: '密码',
		prompt: '提示',

		work: '实例',
		followee: '关注',
		follower: '粉丝',
		like: '点赞',
		unlike: '取消点赞',		
		config: '设置',
		mine: '我的',
		logout: '退出登录',
		recycleBin: '回收站',

		loginRequiredTips: '请登录后再进行相关操作',
		emptyGridTips: '这里空空如也...',		
		unknownErrorMessage: '未知错误',
		likeSelfProhibited: '不能对自己的实例点喜欢哦',
	},

	clipboard: {
		linkCopiedTips: '链接已复制到剪切板',
	},

	home: {
		slogan1: '简洁易用，功能丰富的 OWL 编辑器',
		slogan2: '一个分享代码，共同学习的平台',
		createNow: '创建新实例',
		viewDocument: '查看Odoo客户端',
		whatisOOE: '能做什么？',

		features: {
			cloudStorage: '云存储',
			importExport: '导入导出',
			customizable: '个性化设置',
			codeSyntax: '编码',
			markdown: 'Markdown',
			console: '控制台',
			cloudStorageDesc: '保存代码至云端，分享你的实例链接，让更多用户浏览你的作品。',
			importExportDesc: '可导入本地代码进行在线编辑，也可将编写好的代码导出至本地。',
			customizableDesc: '可针对你的编码习惯进行个性化，多样化的编码设置。',
			codeSyntaxDesc: '支持 HTML，CSS 和 JavaScript 以及它们 8 种预处理语言编译及高亮。',
			markdownDesc: '实时预览、同步滚动、编写文档更加顺畅；运用工具栏和丰富的快捷键，快速生成语法。',
			consoleDesc: '模拟 Chrome 原生 Console, 支持多种类型的日志高亮显示；也可直接输入命令进行调试。',
		},

	},

	navList: {
		explore: '探索',
		features: '新特性',
		feedback: '反馈',
		document: '文档',
		backend: "Backend"
	},

	headerAccount: {
		logoutTips: '登出之后，下次来只能手动登录哦',
	},

	header: {
		newWorkName: '新建实例',
		save: '保存',
		like: '点赞',
		unlike: '取消点赞',
		savedTips: '实例保存成功',
		saveErrorMessage: '实例保存失败'
	},

	footer: {
		menuProduct: {
			title: '产品',
			features: '新特性',
			log: '日志',
			issues: '问题'
		},
		aboutProduct: {
			title: '关于',
			github: 'GitHub',
			license: '遵循协议',
		},
		supportProduct: {
			title: '支持',
			email: 'Email',
			sponsor: '赞助',
		}
	},

	explore: {
		searchTips: '找找你想要的...',
		searchButton: '搜索',
		filterButton: '过滤',
		preprocessLabel: '预处理',
		sortByCreateDate: '创建时间',
		sortByUpdateDate: '更新日期',
		sortByPopularity: '喜爱度',
		noDataTips1: '哎呀，什么都没找到诶~~',
		noDataTips2: '但我想，也许你可以为这里开拓一片新天地？',
	},

	features: {
		changeLogTitle: '更新事项',
	},

	feedback: {
		title: '快来提出你宝贵的建议吧',
		title2: '标题',
		content: '说说你的想法...',
		submitButton: '提交建议',

		titleRequiredTips: '请填写标题',
		titleMaxLengthTips: '标题长度不能超过25个字符',
		contentRequiredTips: '请填写建议内容',

		fetchFeedbackSuccessTips: '获取反馈成功',
		feedbackSuccessTips: '反馈成功',
		feedbackErrorMessage: '反馈失败',
	},

	instance: {
		loadingTips: '实例页面加载中',
		requestingTips: '正在请求实例信息',
		readonlyTips: '你对当前实例做出的修改将不会被保存',
		exitButton: '退出',

		editor: {
			formatCode: '格式化代码',
			switchView: '切换视图'
		},

		console: {
			clear: '自动清除历史日志',
			clearTips: '选中此选项将会在每次执行代码之前清除先前生成的历史日志，你可以选择保留历史日志，但可能会影响性能',
			highlight: '代码高亮',
			highlightTips: '选中此选项，日志内容将被高亮渲染',
		},

		footer: {
			compilingTips: '代码编译中，请等待...'
		},

		sidebar: {
			templates: '模板',
			prep: '预处理语言',
			library: '库',
			settings: '设置',
			upload: '上传代码',
			download: '下载代码',
			shortcut: '快捷键',
		},

		download: {
			title: '文件下载',
			singleFile: '单文件',
			singleFileTips: '将 HTML, CSS, 和 JavaScript 代码整合成一个 HTML 文件',
			multiFile: '多文件',
			multiFileTips: '生成 html, css 和 js 三个文件并放入文件夹中',
			downloadRawFile: '下载编译前的文件',
			downloadRawFileTips: '如果你使用了预处理语言，选中此选项会下载未编译前的文件。',
		},

		library: {
			title: '库',
			CDNErrorTips: '获取CDN列表失败',
			retry: '重试',
			outerCss: '外部样式',
			outerCssTips: '你所添加的外部样式，将按照顺序在本地CSS执行之前依次执行，支持http和https协议链接。',
			searchingOuterCss: '查找外部样式...',
			noMatchedCDN: '无匹配CDN',
			addOuterCss: '添加外部样式',
			outerJs: '外部脚本',
			outerJsTips: '你所添加的外部脚本，将按照顺序在本地JavaScript执行之前依次执行，支持http和https协议链接',
			searchingOuterJs: '查找外部脚本...',
			addOuterJs: '添加外部脚本',
		},

		preprocess: {
			title: '预处理语言'
		},

		settings: {
			title: '设置',
			executeDelayTime: '延迟执行时间',
			executeDelayTimeTips: '当你完成代码后，我们将等待一段时间后执行它。',
			autoExecute: '自动执行',
			autoExecuteTips: '选中此选项将会自动执行代码，如果没有选中则需点击执行按钮执行代码',
			autoComplete: '代码提示',
			autoCompleteTips: '选中此选项将会在你输入代码时进行适当提示',
			lint: '代码规范检查',
			lintTips: '启用此项将对代码进行规范检查，目前暂不支持预处理语言的检查',
			lineWrap: '代码超过编辑窗口宽度后换行显示',
			codeIndent: '代码缩进',
			replaceTabWithSpace: '用等宽空格替换Tab',
			codeIndentNumber: '缩进数',
			fontFamily: '字体',
			fontSize: '字号(px)',
			metaTags: '头部标签',
			metaTagsTips: '输入你想在 <head> 中添加的标签如 <meta...>',
		},

		shortcut: {
			title: '快捷键',
			common: '通用',
		},

		template: {
			title: '模板',
			headerTips: '选择你的模板(这可能会覆盖你当前实例的代码和外部链接)'
		},

		upload: {
			title: '上传文件',
			headerTips1: '上传本地文件，格式包含',
			headerTips2: '文件内容将覆盖对应编辑窗口的内容。',
			breakdownHtml: '分解html文件',
			breakdownHtmlTips: '选中此选项，编辑器将会把 html 文件中的 html, css 和 javascript 代码以及外部链接分离，代码会覆盖对应编辑器的代码，外部链接会自动添加到库中。',
			pickFile: '选择文件',
			pendingFileList: '待上传文件列表',
			uploadFile: '上传文件',
			uploadSuccessTips: '所有文件已全部上传成功',
			uploadErrorMessage: '文件上传过程出错',
		},

		config: {
			title: '实例设置',
			workNameLabel: '实例标题',
			inputWorkNameTips: '填写实例标题...',
			workTag: '实例标签',
			workTagTips: '添加或修改实例标签，标签最多三个，每个标签长度小于15',
			inputWorkTagTips: '添加实例标签...',
			workVisibility: '公共性',
			workVisibilityTips: '将实例设置为私有，其他人将不会访问到你的实例。但每位用户最多只能有5个私有实例',
			visibilityPublic: '公共',
			visibilityPrivate: '私有',
			titleRequiredTips: '请填写实例标题',
			tagMaxLengthTips: '每个标签长度不能大于15',

			configSuccessTips: '实例设置修改成功',
			configErrorMessage: '实例设置修改失败',
			noMorePrivateWorks: '私有实例已达上限',
		}
	},

	user: {
		noProfileDescTips: 'ta还没想好怎么描述自己...',
	},

	recycleBin: {
		headerTips: '您的实例在放入回收站的7天内可恢复为正常状态，逾期则自动删除。',
		deleteTime: '删除日期',
		restore: '恢复',
		purge: '永久删除',
		noDataTips: '回收站空空如也',
		confirmTips: '该实例永久删除后将不可恢复',
		confirmButton: '确认并继续',
		deleteWork: '删除实例',
		deleteWorkTips: '实例将会在回收站内保存7天，7天后将永久删除，确认继续该操作么',
		deleteConfirmButton: '确认并删除',
	},

	work: {
		noDataTips1: '你当前还没有实例保存在云端哦',
		noDataTips2: '赶快为社区贡献优质实例吧',
	},

	like: {
		noDataTips1: '也许',
		noDataTips2: '你还没有找到你喜欢的？',
	},

	follower: {
		noDataTips1: '你还没有粉丝...',
		noDataTips2: '创造优秀作品，提升你在社区的影响力',
	},

	followee: {
		noDataTips1: '你还没关注过任何人...',
		noDataTips2: '不如探索一番，没准儿真会有你感兴趣的？',
		exploreNow: '去探索',
	},

	signin: {
		title: '登录',
		username: '用户名或邮箱',
		githubOAuth2: '使用 GitHub 登录',
		giteeOAuth2: '使用 Gitee 登录',
		forgotPassword: '忘记密码了？',
		loginButton: '登录',
		loginSuccessTips: '登录成功',
		usernameRequiredTips: '请填写用户名或邮箱',
		passwordRequiredTips: '请填写密码',
		bindErrorMessage: '绑定第三方账户失败，该账户已被绑定',
		loginErrorMessage: '登录失败，用户名/邮箱或密码错误',
		bindSuccessTips: '绑定成功',
		verify: {
			title : '第三方登陆确认',
			headerTips: '您是否已经注册了 OWL Encoder 账户？',
			yesToSignin: '有，去登录',
			noToSignup: '没有，去注册',
		}
	},

	signup: {
		title: '创建属于你的',
		usernameHint: '用户名只能包含字母和数字，长度小于15',
		nicknameHint: '昵称长度小于25',
		passwordHint: '密码必须包含字母数字和下划线且长度为6-12',
		rePassword: '重复密码',
		sendVerifyCodeButton: '发送验证码',
		verifyCodeSentTips: '验证码已发送',
		sentPrefixTips: '已发送',

		usernameRequiredTips: '请填写用户名',
		usernameMaxLengthTips: '用户名长度不能大于15',
		usernameFormatTips: '用户名只能包含字母和数字',

		nicknameRequiredTips: '请填写昵称',
		nicknameMaxLengthTips: '昵称长度不能大于25',

		emailRequiredTips: '请填写邮箱',
		emailFormatTips: '填写正确的邮箱以便发送验证码',

		verifyCodeRequiredTips: '请填写验证码',

		passwordRequiredTips: '请填写密码',
		passwordMaxLengthTips: '密码长度必须在6-12间',
		passwordFormatTips: '密码必须包含字母和数字和下划线',

		rePasswordRequiredTips: '请确认密码',
		rePasswordFormatTips: '两次密码不一致',

		signupSuccessTips: '注册成功',
		verifyCodeErrorMessage: '验证码错误',
		usernameDuplicatedErrorMessage: '该用户名已被注册',
		emailDuplicatedErrorMessage: '该邮箱已被注册',
	},

	settings: {
		title: '设置',
		menuProfile: '个人设置',
		menuCode: '编码设置',
		menuAccount: '账户设置',

		account: {
			title: '第三方账户',
			headerTips: '绑定第三方账户，你就可以通过第三方账户进行快捷登陆。',
			unbindButton: '解除绑定',
			bindButton: '绑定账户',
			bindEmailButton: '绑定邮箱',
			bindEmailTips: '修改绑定的邮箱，该邮箱用于找回密码及其他操作。',
			currentEmailLabel: '当前邮箱',
			deleteAccountButton: '删除账户',
			deleteAccountTips: '请注意这样会删除你的账户和里面的所有信息，该操作无法恢复',
			unbindConfirmTips: '确认解除该第三方绑定么？',
			unbindSuccessTips: '解绑成功',
			unbindErrorMessage: '解绑失败',
		},

		code: {
			title: '默认预处理器',
			defaultInitCode: '默认初始代码',
			defaultHead: '默认 head',
			inputHeadTips: '输入你想在 <head> 中添加的标签如 <meta...>',
			codeIndent: '代码缩进',
			codeIndentNumber: '缩进数',
			replaceTabWithSpace: '用等宽空格替换Tab',
			fontFamily: '字体',
			fontSize: '字号(px)',
			preview: '预览',
			saveSuccessTips: '编码设置保存成功',
		},

		profile: {
			title: '头像',
			headerTips: '从你的设备上选取一张 JPG 或 PNG 图片作为新的头像。',
			uploadButton: '上传头像',
			cropImageButton: '裁剪图片',
			saveSuccessTips: '个人设置保存成功',

			about: '关于你',
			aboutTips: '让别人更加了解你',
			emailTips: '你的联系邮箱',
			nicknameRequiredTips: '请填写昵称',
			nicknameMaxLengthTips: '昵称长度不能大于25',

			emailFormatTips: '邮箱格式错误',
			abountMaxLengthTips: '关于内容长度不能超过150',

			fileFormatTips: '文件格式错误',
			imageMaxSizeTips: '图片大小不能超过2M',
		},

		resetPassword: {
			title : '重置密码',
			headerTips: '重置成功后将返回登录页面',

			passwordRequiredTips: '请填写密码',
			passwordMaxLengthTips: '密码长度必须在6-12间',
			passwordFormatTips: '密码必须包含字母和数字和下划线',

			rePasswordRequiredTips: '请确认密码',
			rePasswordFormatTips: '两次密码不一致',

			resetSuccessTips: '重置密码成功',
			resetErrorMessage: '重置密码失败',

			resetButton: '重置密码',
		},
	},

	http404: {
		title: '页面不见了',
	}
};