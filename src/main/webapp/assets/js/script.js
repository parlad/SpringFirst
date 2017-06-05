$(function() {
	$("a.confirm").click(function(e) {
		if (!confirm("Are you sure?")) {
			return false;
		}
	});
});

$(function($) {
	$("#navicon").click(function() {
		if ($("#navdrawer").is(':visible')) {
			$("#navdrawer").hide();
			$("#navcontent").removeClass('col-md-10 col-md-offset-2');
			$("#navcontent").addClass('col-md-12');
		} else {
			$("#navdrawer").show();
			$("#navcontent").addClass('col-md-10 col-md-offset-2');
			$("#navcontent").removeClass('col-md-12');
			$("#navcontent").addClass('col-md-10');
		}
	})
});
