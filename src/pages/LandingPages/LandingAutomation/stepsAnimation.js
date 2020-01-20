$(document).ready(function() {

	$('.offer .close').click(function(event) {
		event.preventDefault();

		$('.offer').slideUp(300);
	});

	var howItWorks = $('.how_it_works .slider');
	var dots       = $('.how_it_works .nav_wrap .dots li');

	howItWorks.on('changed.owl.carousel', function(event) {
		var index = event.item.index;
		if (($('.how_it_works .nav_wrap .dots').hasClass('remove-autoplay')) || ($(window).width() < 768)) {
			$(dots).removeClass('active');
			$(dots).eq(index).addClass('active');
		} else {
			$(dots).eq(index-1).addClass('loaded');
			$(dots).eq(index).addClass('active');
		}
	});

	howItWorks.addClass('owl-carousel').owlCarousel({
		items: 1,
		loop: false,
		nav: true,
		dots: false,
		navText: '',
		smartSpeed: 800,
		autoplay: false,
		autoplayTimeout: 5000,
		navContainer: '.how_it_works .nav_wrap .nav'
	});

	var controller = $.superscrollorama();
	var tree       = new TimelineMax();
	var howHeight  = $('.how_it_works').outerHeight();

	var tweenTree  = tree.call(function() {

		howItWorks.trigger('play.owl.autoplay');
		$('.how_it_works').addClass("started");

	}, null, null, 2);

	controller.addTween($('.how_it_works'), tweenTree, 0 , -howHeight);

	function stopPlay() {
		howItWorks.trigger('stop.owl.autoplay');
	}

	$(dots).click(function(event) {
		event.preventDefault();
		$('.how_it_works .nav_wrap .dots').addClass('remove-autoplay');
		var currentIndex = $(this).index();
		howItWorks.trigger('to.owl.carousel', currentIndex);
		stopPlay();
	});

	$('.how_it_works .nav_wrap .nav button').click(function() {
		$('.how_it_works .nav_wrap .dots').addClass('remove-autoplay');
		stopPlay();
	});


});