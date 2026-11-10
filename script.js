// ============================================================
// BENKACEM CHBANI — PREMIUM 3D PORTFOLIO — SCRIPT
// ============================================================

(function () {
    'use strict';

    // ===== Loading Screen =====
    var loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('loaded');
        }, 2200);
    });

    // ===== Custom Cursor =====
    var cursorDot = document.getElementById('cursorDot');
    var cursorRing = document.getElementById('cursorRing');
    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursorRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateCursorRing);
        }
        animateCursorRing();

        // Hover effect on interactive elements
        var hoverElements = document.querySelectorAll('a, button, .skill-item, .project-card, .quality-card, .learned-card, .info-item, .contact-item, input, textarea');
        hoverElements.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursorDot.classList.add('cursor-hover');
                cursorRing.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', function () {
                cursorDot.classList.remove('cursor-hover');
                cursorRing.classList.remove('cursor-hover');
            });
        });
    }

    // ===== Navbar =====
    var navbar = document.getElementById('navbar');
    var menuToggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');
    var allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Nav link clicks
    allNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            allNavLinks.forEach(function (l) { l.classList.remove('active'); });
            this.classList.add('active');
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    var sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        var scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                allNavLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ===== Hero Particles =====
    var heroParticles = document.getElementById('heroParticles');

    function createParticles() {
        if (!heroParticles) return;
        for (var i = 0; i < 30; i++) {
            var particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            var size = 2 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            if (Math.random() > 0.5) {
                particle.style.background = '#00d4aa';
            }
            heroParticles.appendChild(particle);
        }
    }
    createParticles();

    // ===== Scroll Animations (Intersection Observer) =====
    var animElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all
        animElements.forEach(function (el) {
            el.classList.add('animated');
        });
    }

    // ===== 3D Tilt Effect on Cards =====
    var tiltElements = document.querySelectorAll('[data-tilt]');

    if (window.innerWidth > 768) {
        tiltElements.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = ((y - centerY) / centerY) * -6;
                var rotateY = ((x - centerX) / centerX) * 6;

                el.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    // ===== Contact Form =====
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = contactForm.querySelector('.btn-submit');
            var originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Message Sent!</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
            submitBtn.style.background = '#00d4aa';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = navbar.offsetHeight;
                var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Parallax on Hero floating shapes =====
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            var scrolled = window.scrollY;
            var shapes = document.querySelectorAll('.floating-shape');
            shapes.forEach(function (shape, i) {
                var speed = 0.02 + (i * 0.01);
                shape.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
            });
        });
    }

    // ===== Stagger animation delays for grid children =====
    function addStaggerDelays(parentSelector, childSelector) {
        var parents = document.querySelectorAll(parentSelector);
        parents.forEach(function (parent) {
            var children = parent.querySelectorAll(childSelector);
            children.forEach(function (child, index) {
                child.style.transitionDelay = (index * 0.1) + 's';
            });
        });
    }

    addStaggerDelays('.qualities-grid', '.quality-card');
    addStaggerDelays('.learned-grid', '.learned-card');
    addStaggerDelays('.skills-grid', '.skill-category');
    addStaggerDelays('.projects-grid', '.project-card');

})();
