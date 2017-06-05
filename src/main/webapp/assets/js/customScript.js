// process in auto complete in select block for general autocomplete
function processAfterAutoComplete(obj, event, ui, classname) {
	$("#" + obj.id).attr("data-id", ui.item.id);
	changeIcon(classname);
	disableKeyPress(event, obj.id, classname);
}

// disable key press after the completion of auto complete function
function disableKeyPress(e, id, classname) {
	$("#" + id)
			.keydown(
					function(e) {
						if (e.keyCode === 8) {
							$("#" + id).attr("data-id", "");
							revertIcon(classname);
						} else if ((e.keyCode !== 9 && e.keyCode !== 38 && e.keyCode !== 40)
								&& ($("." + classname + " i")
										.hasClass('glyphicon-lock'))) {
							e.preventDefault();
						}
					});
}

// change icon from search to remove after completion of select block in
// auto complete
function changeIcon(classname) {
	$("." + classname + " i").addClass('glyphicon-lock').removeClass(
			'glyphicon-search');
}

// change icon from remove to search on pressing backspace
function revertIcon(classname) {
	$("." + classname + " i").addClass('glyphicon-search').removeClass(
			'glyphicon-lock');
}

// process after autocomplete for dynamic textbox
function processAfterAc(obj, event, ui, closestVal, classname) {
	$(obj).closest(closestVal).find('input.' + classname).attr("data-id",
			ui.item.id);
	changeIcon(classname);
	disableKeyPressForDynamic(obj, event, closestVal, classname);
}

// disable key press after the completion of autocomplete function for
// dynamic texbox
function disableKeyPressForDynamic(obj, e, closestVal, classname) {
	$(obj)
			.closest(closestVal)
			.find('input.' + classname)
			.keydown(
					function(e) {
						if (e.keyCode === 8) {
							$(obj).closest(closestVal).find(
									'input.' + classname).attr("data-id", " ");
							revertIconForDynamic(obj, e, closestVal, classname)
						} else if ((e.keyCode !== 9 && e.keyCode !== 38 && e.keyCode !== 40)
								&& ($(obj).closest(closestVal).find(
										'span.' + classname + ' i')
										.hasClass('glyphicon-lock'))) {
							e.preventDefault();
						}
					});
}

// change icon from remove to search on pressing backspace for dynamic textbox
function revertIconForDynamic(obj, e, closestVal, classname) {
	$(obj).closest(closestVal).find('span.' + classname + ' i').addClass(
			'glyphicon-search').removeClass('glyphicon-lock');
}

// Custom Auto Complete
function customAutocomplete(className, requestedUrl, queryString) {
	$("." + className).autocomplete(
			{
				source : function(request, response) {
					$.ajax({
						url : "api/" + requestedUrl + "/search?" + queryString
								+ "=" + request.term,
						type : "GET",
						dataType : "json",
						contentType : "application/json",
						success : function(data) {
							response($.map(data, function(v) {
								return {
									id : v.id,
									label : v.name,
									value : v.name
								};
							}));
						}
					});
				},
				select : function(event, ui) {
					processAfterAutoComplete(this, event, ui, className);
				}
			});
}

// Custom Auto Complete
function customAutoComplete(className, requestedUrl, queryString) {
	$("." + className).autocomplete(
			{
				source : function(request, response) {
					$.ajax({
						url : "api/" + requestedUrl + "/search?" + queryString
								+ "=" + request.term,
						type : "GET",
						dataType : "json",
						contentType : "application/json",
						success : function(data) {
							response($.map(data, function(v) {
								return {
									id : v[0],
									label : v[1],
									value : v[1]
								};
							}));
						}
					});
				},
				select : function(event, ui) {
					processAfterAutoComplete(this, event, ui, className);
				}
			});
}

// Custom Auto Complete for dynamically generated textbox
function autoCompleteInDynamicTextbox(className, requestedUrl, queryString,
		closestVal) {
	$("." + className).autocomplete(
			{
				source : function(request, response) {
					$.ajax({
						url : "api/" + requestedUrl + "/search?" + queryString
								+ "=" + request.term,
						type : "GET",
						dataType : "json",
						contentType : "application/json",
						success : function(data) {
							response($.map(data, function(v) {
								return {
									id : v.id,
									label : v.name,
									value : v.name
								};
							}));
						}
					});
				},
				select : function(event, ui) {
					processAfterAc(this, event, ui, closestVal, className);
				}
			});
}

// JSON Insertion from AJAX
function ajaxInsertion(requestedUrl, processUrl, jsonData) {
	$.ajax({
		url : 'api/' + requestedUrl + '/' + processUrl,
		type : 'POST',
		dataType : 'json',
		data : jsonData,
		contentType : 'application/json',
		complete : function(response) {
			if (response.status === 201) {
				// openSaveModal();
				window.location.reload();
			} else {
				var data = response.responseJSON;
				var html = '';
				for (var i = 0; i < data.length; i++) {
					html += '<li class="text-danger">' + data[i] + '</li>';
				}
				$('form div.errors').html(html);
			}
		}
	});
}
// JSON Insertion from AJAX
function ajaxInsertionForEdit(requestedUrl, processUrl, jsonData) {
	$.ajax({
		url : 'api/' + requestedUrl + '/' + processUrl,
		type : 'POST',
		dataType : 'json',
		data : jsonData,
		contentType : 'application/json',
		complete : function(response) {
			if (response.status === 201) {
				// openSaveModal();
				location.href = requestedUrl;
			} else {
				var data = response.responseJSON;
				var html = '';
				for (var i = 0; i < data.length; i++) {
					html += '<li class="text-danger">' + data[i] + '</li>';
				}
				$('form div.errors').html(html);
			}
		}
	});
}

// Validation for Decimal Fields (Text box)
function disableKeyPressByRegex(classname, regex) {
	$('.' + classname).keypress(function(e) {
		var keycode;
		keycode = e.keyCode ? e.keyCode : e.which;
		var input = String.fromCharCode(keycode);
		input = $.trim($('.' + classname).val()) + $.trim(input);

		var pattern = regex;
		var result = pattern.test(input);
		if (!result) {
			if (!(keycode === 8)) {
				e.preventDefault();
			}
		}
	});
}

function decimalFieldValidation(classname) {
	disableKeyPressByRegex(classname, /^\d+(\.\d{0,2})?$/);
}

function percentageFieldValidation(classname) {
	disableKeyPressByRegex(classname,
			/^100$|^[0-9]{1,2}$|^[0-9]{1,2}\,[0-9]{1,3}$/);
}

function regexValidation(obj, regex, alertValue) {
	var inputValue = $("#" + obj.id).val();
	if (inputValue.match(regex)) {
		return true;
	} else {
		confirm(alertValue);
		return false;
	}
}

// REGEX
var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var deleteTag = "<a class='btn-fab-mini' onclick=openModal()><span class='fa fa-trash'></span></a>";

// Open Bootstrap Modal
function openModal() {
	$("#deleteModal").modal('show');
}

function openSaveModal() {
	$("#myModal").modal("show");
	setTimeout(function() {
		$("#myModal").modal('hide');
	}, 1000);

}

// load id in delete button
$(document).on("click", ".delete", function() {
	$("#btnDelete").val($(this).data('id'));
});

function loadingGif(formName) {
	$(document).ajaxStart(function() {
		$("#loading").addClass("loading");
		$("#" + formName + " :input").prop("disabled", true);
	});
	$(document).ajaxComplete(function() {
		$("#loading").removeClass("loading");
		$("#" + formName + " :input").prop("disabled", false);
	});
}

function GifLoadingForReport(formName) {
	$(document).ajaxStart(function() {
		$("#loading").addClass("loading");
		$("#" + formName + ":input").prop("disabled", true);
	});
	$(document).ajaxComplete(function() {
		$("#loading").removeClass("loading");
		$("#" + formName + ":input").prop("disabled", false);
	});
}