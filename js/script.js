document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Enhanced FAQ Functionality
    const faqButtons = document.querySelectorAll('.faq-section .btn-link');
    faqButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            const collapse = document.querySelector(target);
            
            // Close all other collapses with animation
            document.querySelectorAll('.faq-section .collapse.show').forEach(c => {
                if (c !== collapse) {
                    c.style.height = c.scrollHeight + 'px';
                    setTimeout(() => {
                        c.style.height = '0';
                        setTimeout(() => {
                            c.classList.remove('show');
                            const btn = c.previousElementSibling.querySelector('.btn-link');
                            btn.setAttribute('aria-expanded', 'false');
                            btn.classList.add('collapsed');
                        }, 300);
                    }, 10);
                }
            });
            
            // Toggle current collapse with animation
            if (collapse.classList.contains('show')) {
                collapse.style.height = collapse.scrollHeight + 'px';
                setTimeout(() => {
                    collapse.style.height = '0';
                    setTimeout(() => {
                        collapse.classList.remove('show');
                        this.setAttribute('aria-expanded', 'false');
                        this.classList.add('collapsed');
                    }, 300);
                }, 10);
            } else {
                collapse.style.height = '0';
                collapse.classList.add('show');
                collapse.style.height = collapse.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
                this.classList.remove('collapsed');
                setTimeout(() => {
                    collapse.style.height = 'auto';
                }, 300);
            }
        });
    });

    // Handle YouTube-like play/pause for reels
    const reelPreviews = document.querySelectorAll('.reel-preview');
    reelPreviews.forEach(preview => {
        const video = preview.querySelector('video');
        const btn = preview.querySelector('.yt-playpause-btn');
        const icon = btn.querySelector('i');

        // Helper to pause all other videos
        function pauseAllOthers() {
            document.querySelectorAll('.reel-video').forEach(v => {
                if (v !== video) {
                    v.pause();
                    const otherBtn = v.parentElement.querySelector('.yt-playpause-btn i');
                    if (otherBtn) {
                        otherBtn.classList.remove('fa-pause');
                        otherBtn.classList.add('fa-play');
                    }
                }
            });
        }

        // Toggle play/pause
        function togglePlayPause() {
            if (video.paused) {
                pauseAllOthers();
                video.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                video.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        }

        // Button click
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            togglePlayPause();
        });

        // Click on video toggles play/pause
        video.addEventListener('click', function() {
            togglePlayPause();
        });

        // When video ends, show play icon
        video.addEventListener('ended', function() {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });

        // When video is paused, show play icon
        video.addEventListener('pause', function() {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });

        // When video is playing, show pause icon
        video.addEventListener('play', function() {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        });
    });

    // Pause all videos when scrolling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            document.querySelectorAll('.reel-video').forEach(video => {
                if (!video.paused) {
                    video.pause();
                    const btn = video.parentElement.querySelector('.yt-playpause-btn i');
                    if (btn) {
                        btn.classList.remove('fa-pause');
                        btn.classList.add('fa-play');
                    }
                }
            });
        }, 150);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional: Pause carousel on hover
    if (typeof $ !== 'undefined' && $('#carouselExampleFade').length) {
      $('#carouselExampleFade').carousel({
        interval: 3000,
        pause: 'hover'
      });
    }

    // Custom FAQ Accordion Functionality (show answer on hover)
    const faqItems = document.querySelectorAll('.custom-accordion .faq-item');
    faqItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        // Close all other items
        faqItems.forEach(i => {
          if (i !== item) {
            i.classList.remove('open');
          }
        });
        // Open this item
        item.classList.add('open');
      });
      item.addEventListener('mouseleave', function() {
        item.classList.remove('open');
      });
    });
});
  