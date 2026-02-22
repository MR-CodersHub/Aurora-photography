document.addEventListener('DOMContentLoaded', () => {
    // Reset any frozen scroll state from previous pages/modals
    document.body.style.overflow = 'auto';

    // Page fade-in effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        document.body.style.opacity = '1';
    }, 100);

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('nav ul');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking links inside
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Header scroll state and Parallax logic
    const header = document.getElementById('main-header');
    const heroContent = document.querySelector('.hero-content');
    const heroImg = document.querySelector('.hero-img');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header class toggle
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hero Parallax and Fade Effects
        if (scrollY < window.innerHeight) {
            if (heroContent) {
                const speed = 0.4;
                heroContent.style.transform = `translateY(${scrollY * speed}px)`;
                heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.7));
            }
            if (heroImg) {
                const imgSpeed = 0.15;
                heroImg.style.transform = `scale(1.1) translateY(${scrollY * imgSpeed}px)`;
            }
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.gallery-item, .portfolio-item, .service-card, .about-content, .featured-gallery h2, .contact-form, .project-intro, .portfolio-hero, .about-grid, .detail-box, .services-hero, .detail-introduction, .detail-gallery-item, .blog-card');

    animateElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Dynamic Reveal Style
    if (!document.getElementById('reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'reveal-styles';
        style.innerHTML = `
            .reveal-on-scroll {
                opacity: 0;
                transform: translateY(60px) scale(0.98);
                transition: opacity 1.2s cubic-bezier(0.165, 0.84, 0.44, 1), 
                            transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
                will-change: transform, opacity;
            }
            .reveal-on-scroll.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        `;
        document.head.appendChild(style);
    }

    // Modal Logic (Booking Only)
    const openBooking = document.getElementById('book-now-open');
    const bookingModal = document.getElementById('booking-modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (openBooking) openBooking.addEventListener('click', () => openModal(bookingModal));

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            closeModal(bookingModal);
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    // User Dropdown Logic
    const userDropdownTrigger = document.getElementById('user-dropdown-trigger');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    const userDropdownContainer = document.querySelector('.user-dropdown-container');

    if (userDropdownTrigger && userDropdownMenu) {
        // Toggle Open/Close
        userDropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = userDropdownMenu.classList.contains('open');
            if (isOpen) {
                userDropdownMenu.classList.remove('open');
            } else {
                userDropdownMenu.classList.add('open');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (userDropdownContainer && !userDropdownContainer.contains(e.target)) {
                userDropdownMenu.classList.remove('open');
            }
        });

        // Close when clicking an item
        const dropdownItems = userDropdownMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                userDropdownMenu.classList.remove('open');
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && userDropdownMenu.classList.contains('open')) {
                userDropdownMenu.classList.remove('open');
            }
        });
    }



    // Password Visibility Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const eyeOpen = toggle.querySelector('.eye-open');
            const eyeClosed = toggle.querySelector('.eye-closed');

            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                input.type = 'password';
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });
    });



    // Booking Form Validation
    const bookingForm = document.getElementById('booking-form');
    const bookingStatus = document.getElementById('booking-status');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            bookingForm.style.transition = 'opacity 0.6s ease';
            bookingForm.style.opacity = '0';
            setTimeout(() => {
                bookingForm.style.display = 'none';
                bookingStatus.style.display = 'block';
            }, 600);
        });
    }

    // --- Mobile Back Button (if exists) ---
    const backBtn = document.querySelector('.mobile-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Check if there is a history to go back to 
            if (window.history.length > 1) {
                history.back();
            } else {
                // If in pages folder, go up one level, else stay in root
                const isPagesDir = window.location.pathname.includes('/pages/');
                window.location.href = isPagesDir ? '../index.html' : 'index.html';
            }
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('open');
                    document.body.style.overflow = 'auto';
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox Logic
    const galleryItems = document.querySelectorAll('.detail-gallery-item, .portfolio-item:not(a)');
    if (galleryItems.length > 0) {
        let lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="" alt="Lightbox Image">
                </div>
            `;
            document.body.appendChild(lightbox);
        }

        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Gallery Filtering Logic
    const filterItems = document.querySelectorAll('.filter-item');
    const galleryGridItems = document.querySelectorAll('.detail-gallery-item');
    const galleryContainer = document.querySelector('.detail-gallery-grid');

    if (filterItems.length > 0 && galleryContainer) {
        filterItems.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all
                filterItems.forEach(item => item.classList.remove('active'));
                // Add active to clicked
                filter.classList.add('active');

                const filterValue = filter.getAttribute('data-filter');

                // If filtering specific category, wait for hide transition then switch to Flex
                // If showing 'all', revert to Grid immediately
                if (filterValue !== 'all') {
                    // Timeout matches CSS transition duration
                    setTimeout(() => {
                        galleryContainer.style.display = 'flex';
                        galleryContainer.style.flexWrap = 'wrap';
                        galleryContainer.style.gap = '30px';
                        galleryContainer.style.justifyContent = 'center';
                    }, 400);
                } else {
                    galleryContainer.style.display = 'grid';
                    galleryContainer.style.justifyContent = 'initial';
                }

                galleryGridItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === itemCategory) {
                        // Show item
                        item.classList.remove('hide');
                        item.style.display = 'block';

                        // Reset width/height for flex layout if filtered
                        if (filterValue !== 'all') {
                            item.style.flex = '1 1 300px'; // Flex basis for responsive columns
                            item.style.maxWidth = '400px';
                            item.style.height = '400px'; // Enforce consistent height
                        } else {
                            // Reset styles for Grid layout
                            item.style.flex = '';
                            item.style.maxWidth = '';
                            item.style.height = '';
                        }
                    } else {
                        // Hide item completely from layout
                        item.classList.add('hide');
                        setTimeout(() => {
                            if (item.classList.contains('hide')) {
                                item.style.display = 'none';
                            }
                        }, 400);
                    }
                });
            });
        });
    }
});
