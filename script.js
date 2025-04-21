document.addEventListener('DOMContentLoaded', () => {
    // Loading screen functionality
    const loadingScreen = document.getElementById('loading-screen');
    const container = document.querySelector('.container');
    
    // Simulate loading time (reduced for better UX)
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            container.classList.add('loaded');
            initParticles(); // Initialize particles after loading
        }, 800);
    }, 1500); // Reduced from 2000ms to 1500ms for better UX

    // Initialize particles.js for the home section background with optimized settings
    function initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50, // Reduced from 80 for better performance
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#E30614'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 0.8, // Reduced for better performance
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1.5, // Reduced for better performance
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#E30614',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5, // Reduced from 2 for better performance
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 3 // Reduced from 4 for better performance
                    }
                }
            },
            retina_detect: false // Set to false for better performance
        });
    }

    // Navigation functionality
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    
    // Function to switch active section with optimized animations
    function switchSection(sectionId) {
        // Remove active class from all sections and links
        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.remove('animate__fadeIn');
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to selected section and corresponding link
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (targetSection && targetLink) {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                targetSection.classList.add('active');
                targetSection.classList.add('animate__fadeIn');
                targetLink.classList.add('active');
            }, 50);
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${sectionId}`);
        }
    }
    
    // Event listeners for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    
    // Handle URL hash on page load
    window.addEventListener('load', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchSection(hash);
        }
    });

    // Discord link functionality
    const discordLink = document.querySelector('.discord-link');
    // Update the href attribute directly
    discordLink.setAttribute('href', 'https://discord.gg/invite');
    // No event listener needed as we want the default link behavior now

    // Copy button functionality - IMPROVED
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        // Initialize each button with both icons
        button.innerHTML = '<i class="fas fa-copy"></i><i class="fas fa-check"></i>';
        
        button.addEventListener('click', () => {
            const codeId = button.getAttribute('data-code');
            const codeElement = document.getElementById(codeId);
            const codeText = codeElement.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                // Visual feedback
                button.classList.add('copied');
                
                // Reset after animation completes
                setTimeout(() => {
                    button.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // Command search functionality
    const commandSearch = document.getElementById('command-search');
    const commandItems = document.querySelectorAll('.command-item');
    
    if (commandSearch) {
        commandSearch.addEventListener('input', () => {
            const searchTerm = commandSearch.value.toLowerCase();
            
            commandItems.forEach(item => {
                const commandName = item.querySelector('h4').textContent.toLowerCase();
                const commandDesc = item.querySelector('p').textContent.toLowerCase();
                
                if (commandName.includes(searchTerm) || commandDesc.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --------- GAME SEARCH FUNCTIONALITY ---------
    
    // Initialize game search variables
    const gameSearch = document.getElementById('game-search');
    const gameItems = document.querySelectorAll('.game-item');
    const searchToggle = document.getElementById('search-toggle');
    const searchModeText = document.getElementById('search-mode');
    
    // Search modes: 'name' or 'tag'
    let searchMode = 'name';
    
    // Search by name or tag based on current mode
    function searchGames(searchTerm) {
        if (!searchTerm) {
            // Show all games if search term is empty
            gameItems.forEach(item => {
                item.style.display = 'flex';
            });
            return;
        }
        
        searchTerm = searchTerm.toLowerCase();
        
        gameItems.forEach(item => {
            if (searchMode === 'name') {
                // Search by game name
                const gameName = item.querySelector('h4').textContent.toLowerCase();
                const gameDesc = item.querySelector('p:not(.game-features)').textContent.toLowerCase();
                
                if (gameName.includes(searchTerm) || gameDesc.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            } else {
                // Search by game tags
                const tags = Array.from(item.querySelectorAll('.feature-tag'))
                    .map(tag => tag.textContent.toLowerCase());
                
                if (tags.some(tag => tag.includes(searchTerm))) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
    
    // Toggle search mode between name and tag
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            searchMode = searchMode === 'name' ? 'tag' : 'name';
            searchModeText.textContent = searchMode.charAt(0).toUpperCase() + searchMode.slice(1);
            
            // Update toggle button icon
            searchToggle.innerHTML = searchMode === 'name' ? 
                '<i class="fas fa-font"></i>' : 
                '<i class="fas fa-tag"></i>';
            
            // Apply animations
            searchToggle.classList.add('animated', 'ripple');
            
            // Add mode change animation to the text
            const searchStatus = document.querySelector('.search-status');
            searchStatus.classList.add('mode-change');
            
            // Re-run search with current term
            if (gameSearch) {
                searchGames(gameSearch.value);
            }
            
            // Remove animation classes after they complete
            setTimeout(() => {
                searchToggle.classList.remove('animated');
            }, 500);
            
            setTimeout(() => {
                searchToggle.classList.remove('ripple');
                searchStatus.classList.remove('mode-change');
            }, 600);
        });
    }
    
    // Set up game search input event listener
    if (gameSearch) {
        gameSearch.addEventListener('input', () => {
            searchGames(gameSearch.value);
        });
        
        // Add clear button functionality
        gameSearch.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                gameSearch.value = '';
                searchGames('');
            }
        });
    }

    // Reveal animations on scroll - with performance optimization
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        requestAnimationFrame(() => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        });
    }
    
    // Add scroll event listeners to each section with throttling for performance
    let isScrolling = false;
    sections.forEach(section => {
        section.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    checkReveal();
                    isScrolling = false;
                });
            }
        });
    });
    
    // Initial check for visible elements
    setTimeout(checkReveal, 100);
});