//
$(window).on("pageshow scroll", function () {
    let scroll = $(window).scrollTop();
    let sections = $(".js-brand-section"),
        nav = $(".js-brand-nav"),
        nav_height = nav.outerHeight();

    // 
    scroll > 50 ? $(".js-brand-nav").addClass('invert') : $(".js-brand-nav").removeClass('invert');
    if (scroll + window.innerHeight - 200 >= $(".c-footer").offset().top) {
        $(".js-brand-nav").addClass("ishide");
        $(".js-brand-logo").addClass("ishide");
    } else {
        $(".js-brand-nav").removeClass("ishide");
        $(".js-brand-logo").removeClass("ishide");
    }
    // 
    nav.find("a").removeClass("active");
    sections.each(function () {
        let top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
        if (scroll >= top && scroll <= bottom) {
            nav.find("a").removeClass("active");
            nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active");
        }
    });
});

//
const offer = document.querySelectorAll(".making_counter .current");
const total = document.querySelectorAll(".making_counter .total");
const swiperBrand = new Swiper(".js-brand-swiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    speed: 1200,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        0: {
            allowTouchMove: true,
        },
        1025: {
            allowTouchMove: false,
        },
    },
    on: {
        init: function (sw) {
            $(".making_progress").removeClass("animate");
            $(".making_progress").addClass("animate");
            total.forEach((sel) => {
                sel.innerHTML = sw.slides.length - 2;
            })
            //
            $("[data-making-slide]").removeClass("active");
            $("[data-making-slide]:eq(" + this.realIndex + ")").addClass("active");
        },
        slideChange: function () {
            let currentSlide = this.realIndex + 1;
            offer.forEach((sel) => {
                if (currentSlide >= 10) {
                    sel.innerHTML = currentSlide;
                } else {
                    sel.innerHTML = '0' + currentSlide;
                }
            })
            //
            $("[data-making-slide]").removeClass("active");
            $("[data-making-slide]:eq(" + this.realIndex + ")").addClass("active");
        },
        slideChangeTransitionStart: function () {
            $(".making_progress").removeClass("animate");
        },
        slideChangeTransitionEnd: function () {
            $(".making_progress").addClass("animate");
        },
    },
});