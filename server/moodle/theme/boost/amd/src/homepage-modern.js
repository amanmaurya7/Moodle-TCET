/**
 * Modern homepage interactions and animations
 */
define(['jquery'], function($) {
    'use strict';

    return {
        init: function() {
            this.addScrollAnimations();
            this.addHoverEffects();
            this.addSmoothScrolling();
            this.addParallaxEffects();
        },

        addScrollAnimations: function() {
            // Add intersection observer for fade-in animations
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-fade-in-up');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                // Observe elements that should animate
                document.querySelectorAll('.course-card, .feature-item, .stat-item').forEach(function(el) {
                    observer.observe(el);
                });
            }
        },

        addHoverEffects: function() {
            // Add magnetic effect to buttons
            $('.btn, .course-card').on('mouseenter', function(e) {
                $(this).addClass('hover-lift');
            }).on('mouseleave', function(e) {
                $(this).removeClass('hover-lift');
            });

            // Add floating animation to hero elements
            $('.hero-content').addClass('floating');
        },

        addSmoothScrolling: function() {
            // Smooth scrolling for anchor links
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
                    && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top - 70
                        }, 800);
                        return false;
                    }
                }
            });
        },

        addParallaxEffects: function() {
            // Simple parallax effect for hero section
            $(window).scroll(function() {
                var scrolled = $(this).scrollTop();
                var parallax = $('.site-hero');
                var speed = 0.5;
                
                parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
            });

            // Add navbar background change on scroll
            $(window).scroll(function() {
                if ($(this).scrollTop() > 100) {
                    $('.navbar').addClass('navbar-scrolled');
                } else {
                    $('.navbar').removeClass('navbar-scrolled');
                }
            });
        }
    };
});
