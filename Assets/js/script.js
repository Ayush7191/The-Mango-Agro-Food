document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (slideIndex + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDotsContainer = document.querySelector('.testimonials-dots');
    let currentTestimonial = 0;

    // Create testimonial dots
    testimonials.forEach((testimonial, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });

    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    function goToTestimonial(testimonialIndex) {
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (testimonialIndex + testimonials.length) % testimonials.length;
        
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    // Auto testimonial change
    setInterval(() => {
        goToTestimonial(currentTestimonial + 1);
    }, 6000);

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active class for desktop nav
            if (this.classList.contains('nav-link')) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
            
            // Update active class for mobile nav
            if (this.classList.contains('mobile-nav-link')) {
                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Product Filter and Search
    const productsGrid = document.querySelector('.products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productSearch = document.getElementById('product-search');
    
    // Sample product data (in a real app, this would come from an API)
    const products = [
        {
            id: 1,
            title: "Frozen Mango Pieces",
            category: "Seasonal",
            description: "Juicy chunks of handpicked Kesar mangoes, frozen at peak ripeness for ultimate freshness.",
            price: "₹2,075.00",
            image: "./Assets/Images/Products/133443512456937718.jpg",
            badge: "Seasonal"
        },
        {
            id: 2,
            title: "Pure Desi Gud – Box Pack",
            category: "Natural Sweetener",
            description: "Pure Desi Jaggery made from natural sugarcane juice, free from chemicals and preservatives.",
            price: "₹580.00",
            image: "./Assets/Images/Products/133443525197574703.jpg",
            badge: "Traditional"
        },
        {
            id: 3,
            title: "Organic Cane Jaggery Powder",
            category: "processed",
            description: "Traditional jaggery powder made from fresh sugarcane, ideal for sweets and beverages",
            price: "₹1,000.00",
            image: "./Assets/Images/Products/133458257670541058.jpg",
            badge: "Popular"
        },
        {
            id: 4,
            title: "Black Jamun Bites",
            category: "Frozen",
            description: "Sweet and tangy frozen jamun, perfect for smoothies or direct consumption.",
            price: "₹664.00",
            image: "./Assets/Images/Products/133443518107090372.jpg",
            badge: "Organic"
        },
        {
            id: 5,
            title: "Pink Guava Cubes",
            category: "Frozen",
            description: "Bite-sized frozen pink guava pieces, packed with tropical flavor.",
            price: "₹830.00",
            image: "./Assets/Images/Products/133443516580332790.jpg",
            badge: "New"
        },
        {
            id: 6,
            title: "Sitaphal Delights",
            category: "processed",
            description: "Fresh frozen custard apple chunks, ideal for desserts or blending.",
            price: "₹581.00",
            image: "./Assets/Images/Products/133443514390898653.jpg",
            badge: "Limited"
        }
    ];

    // Display all products initially
    displayProducts(products);

    // Filter products by category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            let filteredProducts = [];
            
            if (filter === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(product => product.category === filter);
            }
            
            displayProducts(filteredProducts);
        });
    });

    // Search products
    productSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        let filteredProducts = [];
        
        if (activeFilter === 'all') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(product => product.category === activeFilter);
        }
        
        if (searchTerm.trim() !== '') {
            filteredProducts = filteredProducts.filter(product => 
                product.title.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        
        displayProducts(filteredProducts);
    });

    // Function to display products
    function displayProducts(productsToDisplay) {
        productsGrid.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-category', product.category);
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    <span class="product-badge">${product.badge}</span>
                </div>
                <div class="product-content">
                    <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${product.price}</span>
                        <button class="product-btn">Inquire</button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to product buttons
        const productBtns = document.querySelectorAll('.product-btn');
        productBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // In a real app, this would open a modal or redirect to a product page
                alert('Product inquiry sent! We will contact you soon.');
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For this example, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. We will contact you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input').value;
        
        // Here you would typically send the email to a server
        alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
        
        // Reset form
        this.reset();
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .products-grid, .gallery-grid, .testimonials-slider, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animated elements
    const animatedElements = document.querySelectorAll('.about-content, .products-grid, .gallery-grid, .testimonials-slider, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});