// General stuff

function fadeUpAnim() {
	$('.fade-up').one('inview', function() {
		TweenMax.to(this, 0.8, {y: 0, opacity: 1, ease: Expo.easeOut});
	});

	$('.fade-up-delay').one('inview', function() {
		TweenMax.to(this, 0.8, {y: 0, opacity: 1, delay: 0.1, ease: Expo.easeOut});
	});
};



//* Home View *//

function homeView() {
	var homeHeading = $('section#home h2 span');
	var homeParagraph = $('section#home p');
	TweenMax.staggerTo(homeHeading, 1, {y: 0, opacity: 1, ease: Expo.easeOut}, 0.055);
	TweenMax.to(homeParagraph, 1, {y: 0, opacity: 1, delay: 0.1, ease: Expo.easeOut});
}


//* Projects View *//

function projectsView() {
	$('article.project').one('inview', function() {
		var thisProjectImage = $(this).find('.project-image');
		var thisProjectInfo = $(this).find('.project-info');
		TweenMax.to(thisProjectImage, 1, {y: 0, opacity: 1, ease: Expo.easeOut});
		TweenMax.to(thisProjectInfo, 0.7, {y: '30%', opacity: 1, delay: 0.1, ease: Expo.easeOut});
	});
}


//* Blog View *//

function blogView() {

	// Get number of blog posts
	var postsNo = $('.posts-container').children().length;

	// Change animation type based on amount of posts
	if (postsNo > 8) {
		$('article.post:nth-child(odd)').one('inview', function() {
			TweenMax.to(this, 0.8, {y: 0, opacity: 1, ease: Expo.easeOut});
		});
		$('article.post:nth-child(even)').one('inview', function() {
			TweenMax.to(this, 0.8, {y: 0, opacity: 1, delay: 0.07, ease: Expo.easeOut});
		});
	} else {
		TweenMax.staggerTo($('article.post'), 0.8, {y: 0, opacity: 1, ease: Expo.easeOut}, 0.07);
	}

	// Post hover animation
	$('article.post')
		.mouseenter(function() {
			TweenMax.to(this, 0.3, {scale: 1.03, ease: Back.easeOut.config(1.7)});
		})
		.mouseleave(function() {
			TweenMax.to(this, 0.3, {scale: 1, ease: Back.easeOut.config(1.7)});
		});

}



//* Single Post **//

function singlePostView() {
	Prism.highlightAll();
	$('nav ul li.blog').addClass('is-active');
	TweenMax.staggerFrom($('section#single-post .small-container .post-element'), 1, {y: 100, opacity: 0, ease: Expo.easeOut}, 0.06);
}



//* About View *//

function aboutView() {
	var aboutEls = $('.about-container').children();
	TweenMax.staggerFrom(aboutEls, 1, {y: 80, opacity: 0, ease: Expo.easeOut}, 0.04);
}



//* Contact View *//

function contactView() {
	var contactEls = $('.contact-content-wrapper').children();
	TweenMax.staggerFrom(contactEls, 1, {y: 80, opacity: 0, ease: Expo.easeOut}, 0.04);
}





$(document).ready(function() {


	//* EVERYTHING BARBA RELATED *//

	var Home = Barba.BaseView.extend({
		namespace: 'home',
		onEnterCompleted: function() {
			$('body').addClass('home');
			$('main').addClass('centered');
			homeView();
		},
		onLeaveCompleted: function() {
			$('body').removeClass('home');
			$('main').removeClass('centered');
		}
	});

	var Projects = Barba.BaseView.extend({
		namespace: 'projects',
		onEnterCompleted: function() {
			projectsView();
		}
	});

	var Blog = Barba.BaseView.extend({
		namespace: 'blog',
		onEnterCompleted: function() {
			blogView();
		}
	});

	var SinglePost = Barba.BaseView.extend({
		namespace: 'singlepost',
		onEnterCompleted: function() {
			singlePostView();
		}
	});

	var About = Barba.BaseView.extend({
		namespace: 'about',
		onEnterCompleted: function() {
			aboutView();
		}
	});

	var Contact = Barba.BaseView.extend({
		namespace: 'contact',
		onEnterCompleted: function() {
			$('main').addClass('centered');
			contactView();
		},
		onLeave: function() {
			$('main').removeClass('centered');
		}
	});

	Home.init();
	Projects.init();
	Blog.init();
	SinglePost.init();
	About.init();
	Contact.init();
	Barba.Prefetch.init();
	Barba.Pjax.start();

	Barba.Dispatcher.on('newPageReady', function(currentStatus) {
		
		// Header active classes
		var currentStatus = Barba.HistoryManager.currentStatus(); // Get current page
		var currentPage = currentStatus.namespace; // Get current page namespace
		$('nav ul li').removeClass('is-active'); // Remove active from all items
		$('nav').find('.' + currentPage + '').addClass('is-active'); // Add active to current namespace

		// Fade up animations on each view
		fadeUpAnim();
		
	});



	// Call the general functions
	fadeUpAnim();

	

	// Header & Footer

	TweenMax.from($('header #logo'), 1, {y: 40, opacity: 0, ease: Expo.easeOut});
	TweenMax.staggerFrom($('header nav ul li'), 1, {y: 40, opacity: 0, ease: Expo.easeOut}, 0.04);
	TweenMax.staggerFrom($('footer .copy-links ul li'), 1, {y: 40, opacity: 0, ease: Expo.easeOut}, 0.04);
	TweenMax.staggerFrom($('footer .social a'), 1, {y: 40, opacity: 0, ease: Expo.easeOut}, 0.04);


	if( $(window).width() > 585 ) {

		$('nav ul li.contact a')
		.mouseenter(function() {
			TweenMax.to(this, 0.3, {scale: 1.1, rotation: -6, ease: Back.easeOut.config(1.7)});
		})
		.mouseleave(function() {
			TweenMax.to(this, 0.3, {scale: 1, rotation: 0, ease: Back.easeOut.config(1.7)});
		});

	}

	



});