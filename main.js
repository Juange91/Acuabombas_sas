        // Mobile menu toggle
        document.getElementById('mobile-menu').addEventListener('click', function() {
            document.getElementById('nav-menu').classList.toggle('show');
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu after click
                document.getElementById('nav-menu').classList.remove('show');
            });
        });
        
        // Form submission
        document.getElementById('quoteForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por su solicitud! Nos pondremos en contacto con usted en breve.');
            this.reset();
        });
        
        let currentIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        const carousel = document.getElementById('carousel');
        const dots = document.querySelectorAll('.dot');
        const progressBar = document.getElementById('progress-bar');
        const pauseBtn = document.getElementById('pauseBtn');
        
        let autoPlayInterval;
        let isPlaying = true;
        let autoPlayDelay = 5000; // Cambia cada 3 segundos (más rápido)

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update progress bar
            const progress = ((currentIndex + 1) / totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
        }

        function moveSlide(direction) {
            currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        }

        function currentSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetAutoPlay();
        }

        function nextSlide() {
            if (isPlaying) {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }
        }

        function startAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        function resetAutoPlay() {
            if (isPlaying) {
                stopAutoPlay();
                startAutoPlay();
            }
        }



        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    moveSlide(1); // Swipe left
                } else {
                    moveSlide(-1); // Swipe right
                }
            }
        }

        // Pause auto-play on hover (opcional - puedes comentar esto si no quieres que se pause)
        carousel.addEventListener('mouseenter', () => {
            if (isPlaying) {
                stopAutoPlay();
            }
        });

        carousel.addEventListener('mouseleave', () => {
            if (isPlaying) {
                startAutoPlay();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                moveSlide(-1);
            } else if (e.key === 'ArrowRight') {
                moveSlide(1);
            } else if (e.key === ' ' || e.key === 'Space') {
                e.preventDefault();
                toggleAutoPlay();
            }
        });

        // Start auto-play
        startAutoPlay();

        // Initialize
        updateCarousel();

        // Optional: Change speed selector (puedes agregar esto si quieres control de velocidad)
        // Para cambiar la velocidad, modifica autoPlayDelay (en milisegundos)
        // 3000 = 3 segundos
        // 5000 = 5 segundos
        // 2000 = 2 segundos