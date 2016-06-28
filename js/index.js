$(function () {
	$("#search_button").button({
		icons:{
			primary:'ui-icon-search',
		},
		
	});

	$('#question_button').button({
		icons :{
			primary:'ui-icon-lightbulb',
		},
		
	});

	//请先登录的提示弹出层
	$('#error').dialog({
		autoOpen:false,
		modal:true,
		//当按下Esc时关闭该弹出层
		closeOnEscape:true,
		resizable:false,
		draggable:false,
		width:180,
		height:50,
	});

	//隐藏请先登录的提示弹出层的标题栏
	$('#error').dialog('widget').find('.ui-widget-header').hide();

	//只有登录的用户才能提问
	$('#question_button').click(function(){
		//如果有cookie则说明已经登录
		if ($.cookie('user')) {
			//弹出提问窗体
			$('#question').dialog('open');
		}
		else {
			$('#error').dialog('open');
			setTimeout(function(){
				$('#error').dialog('close');
				$('#login').dialog('open');
			},1000);
		}
	});

	//提问问题的弹出窗体
	$('#question').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 500,
		height : 360,
		buttons : {
			'发布' : function () {
				$(this).ajaxSubmit({
					url : 'add_content.php',
					type : 'POST',
					data : {
						user : $.cookie('user'),
						content : $('.uEditorIframe').contents().find('#iframeBody').html(),
					},
					beforeSubmit : function (formData, jqForm, options) {
						$('#loading').dialog('open');
						$('#question').dialog('widget').find('button').eq(1).button('disable');
					},
					success : function (responseText, statusText) {
						if (responseText) {
							$('#question').dialog('widget').find('button').eq(1).button('enable');
							$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
							setTimeout(function () {
								$('#loading').dialog('close');
								$('#question').dialog('close');
								$('#question').resetForm();
								// 把问题描述栏清空
								$('.uEditorIframe').contents().find('#iframeBody').html('请输入问题描述！');
								$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							}, 1000);
						}
					},
				});
			}
		}
	});

	$('.uEditorCustom').uEditor();

	//cookie的使用
	$('#menber,#logout').hide();
	if($.cookie('user')){
		$('#menber,#logout').show();
		$('#reg_a,#login_a').hide();
		$('#menber').html($.cookie('user'));
	}
	else{
		$('#reg_a,#login_a').show();
		$('#menber,#logout').hide();
	}
	//当点击‘退出时’
	$('#logout').click(function(){
		//移除cookie
		$.removeCookie('user');
		//重新定向
		window.location.href='/ajax-code/';
	});
	//loading弹出层
	$('#loading').dialog({
		autoOpen:false,
		modal:true,
		//当按下Esc时关闭该弹出层
		closeOnEscape:true,
		resizable:false,
		draggable:false,
		width:180,
		height:50,
	});

	//隐藏dialog的标题栏
	$('#loading').dialog('widget').find('.ui-widget-header').hide();

	

	$("#reg").dialog({
		autoOpen:false,
		modal:true,
		resizable:false,
		width:320,
		height:340,
		buttons:{
			'提交':function(){
				$(this).submit();
			}
		}
	});

	$("#reg_a").click(function () {
		$("#reg").dialog('open');
	});

	//设置表单中的所有的radio外观为按钮形式
	$('#reg').buttonset();

	//工具提示
	// $('#reg input[title]').tooltip({
	// 	position:{
	// 		my:'left',
	// 		at:'right'
	// 	}

	// 	});

	$('#date').datepicker({
		dateFormat:'yy-mm-dd',
		dayNamesMin:['日','一','二','三','四','五','六'],
		monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一','十二'],
		monthNamesShort:['一','二','三','四','五','六','七','八','九','十','十一','十二'],

		altFormat:'yy/mm/dd',
		weekHeader:true,
		firstDay:'1',
		changeMonth:true,
		changeYear:true,
		showButtonPanel:true,
		closeText:'关闭',
		currentText:'add今天',
		maxDate:0,
		hideIfNoPrevNext : true,
		yearRange : '1950:2020',

	});

	//设置默认时间
	$('#date').datepicker('setDate','2016-6-20');

	//邮箱自动补全功能
	$('#email').autocomplete({
		delay:0,
		source:function (request,response) {
			var hosts=['qq.com','163.com','gmail.com','sina.com.cn','hostmail.com'],
			userTypeIn=request.term,			//用户输入的内容
			name=userTypeIn,					//暂存用户输入的内容
			
			host=''	,							//邮箱的域名
			result=[],							//最终的邮箱列表
			ix=userTypeIn.indexOf('@');			//输入的@所在的位置，如果输入中包含@则得到@所在的索引，否则得到-1
			//result.push(userTypeIn);
			//当有@时，重新分配用户名和域名
			if(ix>-1){
				 name=userTypeIn.slice(0,ix);	//@符号之前的为邮箱中的用户名
				 host=userTypeIn.slice(ix+1);	//@符号之后的为邮箱中的域名
			}
			//从hosts数组中过滤出用户输入的域名的元素
			//如果用户已经输入了域名中的一部分，则从hosts中过滤出，否则是全部的hosts
			if(name)
			{
				var host_grep=(host?$.grep(hosts,function (value,index) {	
				return value.indexOf(host)>-1;
			    }):hosts);
			    //把过滤出来的域名和用户名组合成邮箱列表
			    var host_list=$.map(host_grep,function (value,index) {
			    	return name+'@'+value;
			    });
			    //result=result.concat(host_list);
			}
			
			//response(result);
			response(host_list);
		},
		});


	//验证插件的使用
	$('#reg').validate({
		// submitHander中的方法只有在验证成功时才会执行，且会阻止默认提交跳转
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url : 'add.php',
				type : 'POST',
				beforeSubmit:function (formData,jqForm,options){
					//当点击‘提交’按钮之后自动打开loading窗体
					$('#loading').dialog('open');
					//$('#reg')得到的是form对象，$('#reg').dialog('widget')得到的是整个浮动弹出窗体的对象
					//在按下提交按钮之后，数据提交之前，把‘提交’按钮设置为灰色，以防止用户重复点击
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
				},
				//ajaxsubmit提交成功时执行success里的方法
				success : function (responseText, statusText) {
					//如果responseText的值不为真时，表示插入数据成功
					//（因为在add.php中如果插入成功返回1：echomysql_affected_rows();）
					if (responseText) {
						//提交成功后，重新激活‘提交’按钮
						$('#reg').dialog('widget').find('button').eq(1).button('enable');
						//提交成功修改loading的图片为打勾
						$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
						//把注册时的用户名放入cookie中
						$.cookie('user', $('#user').val());
						setTimeout(function () {
							$('#loading').dialog('close');
							$('#reg').dialog('close');
							//成功后重置表单
							$('#reg').resetForm();
							//移除打勾图片，并修改为*号
							$('#reg span.star').html('*').removeClass('succ');
							//小bug，插入数据成功后，把loading弹出层的内容改回来
							$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							//成功提交后，就立即将右上角注册登录更改为用户名和退出
							$('#menber,#logout').show();
							$('#reg_a,#login_a').hide();
							$('#menber').html($.cookie('user'));
						}, 1000);
					}
				},
			});
			
		},
		//当出现错误提示时，会自动调整dialog的高度，
		showErrors:function(errorMap,errorList){
			var errors=this.numberOfInvalids();
			if(errors>0){
				$('#reg').dialog('option','height',errors*20+340);
			}
			else{
			 	$('#reg').dialog('option','height',340);
			}
			this.defaultShowErrors();
		},
		//设置当验证出错时input的边框高光
		highlight:function(element,errorClass){
			$(element).css('border','1px solid #630');
			//验证不成功时，移除打勾的符号
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		//当验证正确时，去掉input边框的高光
		unhighlight:function(element,errorClass){
			$(element).css('border','1px solid #ccc');   
			//验证成功时，在input后面加入打勾的图片
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},

		//群组错误提示
		errorLabelContainer:'ol.reg_error',
		//把错误提示包裹在li标签中
		wrapper:'li',
		//根据错误提示的条数动态修改窗体的高度
		rules:{
			user:{
				required:true,
				minlength:2,
				//把用户填入的字段传到is_user.php,判断用户名是否已经存在，如果已经存在，is_user.php返回false
				remote:{
					url:'is_user.php',
					type:'POST',
				},
				
			},
			pass:{
				required:true,
				minlength:6
			},
			email:{
				required:true,
				email:true
			},
			date:{
				date:true
			}
		},

		messages:{
			user:{
				required:'账号不得为空',
				minlength:jQuery.format('账号不得小于{0}位！'),
				remote:'该用户名已经存在！',
				
			},
			pass:{
				required:'密码不得为空',
				minlength:'密码不得小于6位'
			},
			email:{
				required:'邮箱不得为空',
				email:'请输入正确的邮箱',
			},
			date:{
				date:'请输入正确的日期',
			}
		},
	});
	//用Ajax提交表单的插件form
	

	//登录窗体
	
	$('#login_a').click(function () {
		$('#login').dialog('open');
	});

	$('#login').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 320,
		height : 240,
		buttons : {
			'登录' : function () {
				$(this).submit();
			}
		}
	});
	//登录窗体内容的验证
	$('#login').validate({
	
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url : 'login.php',
				type : 'POST',
				beforeSubmit : function (formData, jqForm, options) {
					$('#loading').dialog('open');
					$('#login').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function (responseText, statusText) {
					if (responseText) {
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('登录成功...');
						//如果勾选了登录7天，则设置cookie的有效期为7，不勾选有效期则为会话结束时
						if ($('#expires').is(':checked')) {
							$.cookie('user', $('#login_user').val(), {
								expires : 7,
							});
						} else {
							$.cookie('user', $('#login_user').val());
						}
						setTimeout(function () {
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#login span.star').html('*').removeClass('succ');
							$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('#member, #logout').show();
							$('#reg_a, #login_a').hide();
							$('#member').html($.cookie('user'));
						}, 1000);
					}
				},
			});
		},
	
		showErrors : function (errorMap, errorList) {
			var errors = this.numberOfInvalids();
			
			if (errors > 0) {
				$('#login').dialog('option', 'height', errors * 20 + 240);
			} else {
				$('#login').dialog('option', 'height', 240);
			}
			
			this.defaultShowErrors();
		},
		
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
	
		errorLabelContainer : 'ol.login_error',
		wrapper : 'li',
	
		rules : {
			login_user : {
				required : true,
				minlength : 2,
			},
			login_pass : {
				required : true,
				minlength : 6,
				remote : {
					url : 'login.php',
					type : 'POST',
					data : {
						login_user : function () {
							return $('#login_user').val();
						},
					},
				},
			},
		},
		messages : {
			login_user : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
			},
			login_pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
				remote : '帐号或密码不正确！',
			}
		}
	});	

	//选项卡方法
	$('#tabs').tabs({

	});

	$('#accordion').accordion({

	});
})