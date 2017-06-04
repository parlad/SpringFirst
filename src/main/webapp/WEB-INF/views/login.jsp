<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<title>Login</title>

<script>
	var ctx = "${pageContext.request.contextPath}"
</script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet"
	href="<spring:url value="/resources/css/bootstrap-select.min.css"/>"
	type="text/css" />
<link rel="stylesheet"
	href="<spring:url value="/resources/css/global.css"/>" type="text/css" />
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script
	src="<spring:url value="/resources/js/bootstrap-select.min.js"/>"></script>
<script src="<spring:url value="/resources/js/resource.js"/>"></script>

</head>
<body>
	<div class="container form_login" id="container">
		<form method="post" id="fmLogin" class="form-horizontal">
			<fieldset>
				<div class="col-md-5 col-md-offset-2 pull-none">
					<div class="well bs-component">
						<center>
							<h3 class="text-primary">
								<b>Login</b>
							</h3>
						</center>
						<div class="errors"></div>

						<div class="form-group label-floating">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="input-group">
									<label class="control-label" for="code"> Database Code</label>
									<input type="text" class="form-control" name="code" id="code"
										required /> <span class="input-group-btn"></span>
								</div>
							</div>
						</div>

						<div class="form-group label-floating">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="input-group">
									<label class="control-label" for="username"> Email</label> <input
										type="text" class="form-control" name="username" id="username"
										required /> <span class="input-group-btn"></span>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-sm-12 col-xs-12">
							<div class="form-group label-floating">
								<div class="input-group">
									<label class="control-label" for="password"> Password</label> <input
										type="password" class="form-control" name="password"
										id="password" required /> <span class="input-group-btn"></span>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<input type="button" id="btnLogin"
									class="btn btn-success btn-lg btn-block btn-raised"
									value="Login" />
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
		<%@ include file="/WEB-INF/views/include/footer.jsp"%>
	</div>
	<%@ include file="/WEB-INF/views/include/javascripts.jsp"%>
	<script>
		$("#btnLogin").click(function() {
			var form = $("#fmLogin");
			/* form.validate();
			if (!form.valid()) {
				return;
			} */
			convertToJson();
			checkLogin();
		});

		function convertToJson() {
			var login = {};
			login.username = $("#username").val();
			login.password = $("#password").val();
			login.code = $("#code").val();
			jsonData = JSON.stringify(login);
		}

		function checkLogin() {
			$
					.ajax({
						url : '${pageContext.request.contextPath}/api/auth/login?myValue='
								+jsonData,
						type : 'POST',
						dataType : 'json',
						data : {
							myData : jsonData
						},
						contentType : 'application/json',
						success : function(response) {
							if (response.status === 201) {
								location.href = "${pageContext.request.contextPath}/";
							} else {
								var data = response.responseJSON;
								var html = '';
								for (var i = 0; i < data.length; i++) {
									html += '<li class="text-danger">'
											+ data[i] + '</li>';
								}
								$('form div.errors').html(html);
							}

						}
					});
		}
	</script>
</body>
</html>
