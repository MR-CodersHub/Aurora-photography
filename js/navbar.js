/**
 * Aurora Photography - Reusable Navbar Component
 * This script dynamically injects the consistent header/navbar across all pages.
 */

(function () {
    function initNavbar() {
        const header = document.getElementById('main-header');
        if (!header) return;

        // Determine path depth to handle relative links
        const path = window.location.pathname;
        const isPagesDir = path.includes('/pages/');
        const rootPath = isPagesDir ? '../' : './';
        const pagesPath = isPagesDir ? './' : 'pages/';

        // Current page for active state
        const currentPage = path.split('/').pop() || 'index.html';

        const navbarHTML = `
        <div class="container">
            <nav id="navbar">
                ${isPagesDir ? `
                <a href="#" class="mobile-back-btn" aria-label="Go Back">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </a>` : ''}
                <a href="${rootPath}index.html" class="logo-container">
                    <svg class="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2" />
                        <path d="M30 70 L50 30 L70 70 M40 55 L60 55" fill="none" stroke="currentColor" stroke-width="2" />
                    </svg>
                    <span class="logo-text">AURORA</span>
                </a>
                <ul id="nav-menu">
                    <li><a href="${rootPath}index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
                    <li><a href="${rootPath}home2.html" class="${currentPage === 'home2.html' ? 'active' : ''}">Home2</a></li>
                    <li><a href="${pagesPath}gallery.html" class="${currentPage === 'gallery.html' ? 'active' : ''}">Gallery</a></li>
                    <li><a href="${pagesPath}portfolio.html" class="${currentPage === 'portfolio.html' ? 'active' : ''}">Portfolio</a></li>
                    <li><a href="${pagesPath}blog.html" class="${currentPage === 'blog.html' ? 'active' : ''}">Blog</a></li>
                    <li><a href="${pagesPath}about.html" class="${currentPage === 'about.html' ? 'active' : ''}">About</a></li>
                    <li><a href="${pagesPath}services.html" class="${currentPage === 'services.html' ? 'active' : ''}">Services</a></li>
                    <li><a href="${pagesPath}contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contact</a></li>
                    <li class="mobile-only-item"><a href="${pagesPath}login.html">Account</a></li>
                    <li class="mobile-only-item"><a href="#" class="mobile-cta" id="mobile-book-now">Book Now</a></li>
                </ul>
                <div class="header-actions">
                    <div class="book-now-trigger" id="book-now-open">Book Now</div>
                    <div class="user-dropdown-container">
                        <button class="dropdown-action-btn" id="user-dropdown-trigger" aria-label="User Account">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                            </svg>
                        </button>
                        <div class="dropdown-menu" id="user-dropdown-menu">
                            <a href="${pagesPath}login.html" class="dropdown-item">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                                Log In
                            </a>
                            <a href="${pagesPath}signup.html" class="dropdown-item">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                                Sign Up
                            </a>
                        </div>
                    </div>
                    <div class="mobile-toggle" id="mobile-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </div>
        `;

        header.innerHTML = navbarHTML;

        // Re-initialize mobile toggle and dropdowns since we replaced the HTML
        setupHeaderInteractions();
    }

    function setupHeaderInteractions() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        const userDropdownTrigger = document.getElementById('user-dropdown-trigger');
        const userDropdownMenu = document.getElementById('user-dropdown-menu');
        const bookNowTrigger = document.getElementById('book-now-open');
        const mobileBookNow = document.getElementById('mobile-book-now');
        const bookingModal = document.getElementById('booking-modal');

        // Mobile Menu Toggle
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('open');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
        }

        // User Dropdown
        if (userDropdownTrigger && userDropdownMenu) {
            userDropdownTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdownMenu.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!userDropdownTrigger.contains(e.target) && !userDropdownMenu.contains(e.target)) {
                    userDropdownMenu.classList.remove('open');
                }
            });
        }

        // Book Now Modal Triggers
        const openModal = () => {
            if (bookingModal) {
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                if (navMenu) navMenu.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('open');
            }
        };

        if (bookNowTrigger) bookNowTrigger.addEventListener('click', openModal);
        if (mobileBookNow) mobileBookNow.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });

        // Mobile Back Button
        const backBtn = document.querySelector('.mobile-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.history.length > 1) {
                    history.back();
                } else {
                    const path = window.location.pathname;
                    const isPagesDir = path.includes('/pages/');
                    window.location.href = isPagesDir ? '../index.html' : 'index.html';
                }
            });
        }

        // Close mobile menu on link click
        if (navMenu) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('open');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    }

    // Run on DOMContentLoaded or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();
