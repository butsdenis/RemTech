window.addEventListener("DOMContentLoaded", function() {
	function setCursorPosition(pos, elem) {
			elem.focus();
			if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
			else if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.collapse(true);
					range.moveEnd("character", pos);
					range.moveStart("character", pos);
					range.select()
			}
	}
	
	var is_del = false;
	var is_back = false;
	function mask(event) {
			var curent_position = -1;
			if(event.type == "keyup"){
				curent_position = this.selectionStart;
			}
			var matrix = "+7 (___) ___ ____",
					i = 0,
					def = matrix.replace(/\D/g, ""),
					val = this.value.replace(/\D/g, "");
			if (def.length >= val.length) val = def;
			this.value = matrix.replace(/./g, function(a) {
					return /[_\d]/.test(a) && i <= val.length ? val.charAt(i++) : i < val.length ? a : i++ == 6 && val.length == 4 && event.keyCode !=8 && event.keyCode !='' ? ")" : ""
			});
			is_back = is_del = false;
			if(event.keyCode == 8) is_back = true;
			else if(event.keyCode == 46) is_del = true;
			if (event.type == "blur") {
					if (this.value.length == 2) this.value = "";
			} else if(curent_position != -1){
				if(is_del || is_back){
					setCursorPosition(curent_position, this);
				}
			} else if(event.type == "focus") setCursorPosition(this.value.length, this);
	};

			var phoneField = document.getElementsByClassName("phone");

			for (i=0; i < phoneField.length; i++) {
				var input = document.querySelector("#phone"+[i]);
				input.addEventListener("focus", mask, false);
				input.addEventListener("blur", mask, false);
				input.addEventListener("keyup", mask, false);
			}
	});


$(document).ready(function () {

	$("head").append("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.3.1/css/all.css' integrity= 'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU' crossorigin='anonymous'>");

	$(".owl-carousel").owlCarousel({
		loop: true,
		items: 1,
		margin: 130,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		stagePadding: 130,
		nav: true,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		navContainer: '#customNav',
		responsive: {
			// > 0
			0: {
				margin: 30,
				stagePadding: 30
			},
			// > 768
			768: {
				margin: 130,
				stagePadding: 130
			}
		}
	});


	$("#menu").on("click", "a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 1500);
	});

	$().UItoTop({ easingType: 'easeOutQuart' });

	$(".callback").submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			alert("Ваша заявка принята!");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(".request-btn").magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 500,
		mainClass: 'my-mfp-zoom-in'
	});

});



