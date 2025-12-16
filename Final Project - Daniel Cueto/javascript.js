// Get the button and the menu elements
const menuToggle = document.getElementById('nav-hamburger');
const menuLinks = document.getElementById('menu-links');

// Add hamburger menu functionality if elements exist
if (menuToggle && menuLinks) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Add an event listener for the 'click' event
    menuToggle.addEventListener('click', function() {
        // Toggle the 'open' class on the menu div to show/hide it
        menuLinks.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Optional: Toggle 'is-active' class on the button for icon animation
        menuToggle.classList.toggle('is-active');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        menuLinks.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuLinks.classList.contains('open')) {
            menuLinks.classList.remove('open');
            overlay.classList.remove('active');
            menuToggle.classList.remove('is-active');
        }
    });
}

// Search functionality for cheat sheets
const searchInput = document.getElementById('searchInput');
const sections = document.querySelectorAll('.section');

if (searchInput && sections.length > 0) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        let hasResults = false;

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query)) {
                section.classList.remove('hidden');
                hasResults = true;
            } else {
                section.classList.add('hidden');
            }
        });

        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        if (!hasResults && query !== '') {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No results found. Try searching for "form", "table", or "semantic"';
            document.getElementById('content').appendChild(noResults);
        }
    });
}

function toggleSection(header) {
    const section = header.parentElement;
    const content = section.querySelector('.section-content');

    section.classList.toggle('collapsed');

    if (section.classList.contains('collapsed')) {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

function copyCode(btn) {
    const codeBlock = btn.parentElement;
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#4CAF50';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#9F1010';
        }, 2000);
    });
}

// Tag item animations
const tagItems = document.querySelectorAll('.tag-item');
if (tagItems.length > 0) {
    tagItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 100);
        });
    });
}

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================

// Lightbox content data
const lightboxData = {
    1: {
        title: "Hobby 1",
        content: `
            <h2>osu!</h2>
            <p>For my first hobby, it is a rhythm game, called osu!. In this game, you use your mouse or other input devices like a tablet 
            to aim your cursor at the notes that appear on the screen, and you click them, using many different methods, such as your keyboard,
            our mouse, using two fingers. I am currently top 100 in Canada, and top 2000 Globally, and have two official badges on my profile,
            which signify my accomplishment of winning those tournaments. I was introduced to the game in 2021, by one of my good friends, and 
            the day I started, I knew that I would fall in love with it. I've made many friends and connections through this game, and it is one
            of the most important things to happen in my life, and I dedicate a lot to it.</p>
        `
    },
    2: {
        title: "Hobby 2",
        content: `
            <h2>Music</h2>
            <p>As seen in the previous hobby, I am obsessed with music. I don't believe in people who just listen to music on the radio,
            and that they do not try to explore more music, because it is key to the expression of life. I used to play the piano for 6
            years, and then after started playing osu! and haven't stopped since. I really like most genres of music, from many different
            language types of pop, including city pop, bossanova music, jazz/jazz fusion, metal, drum & bass, and more that I could go on
            forever talking about. My current favourite artist is Lamp, and my favourite song is Raindrop City.</p>
        `
    },
    3: {
        title: "Hobby 3",
        content: `
            <h2>Photography</h2>
            <p>Along with an interest in graphic design, I picked up this hobby to work alongside it. However, I have fallen into more of
            an interest of photography in general. I love the idea of being able to capture moments in time, as capsules of life. From taking
            pictures of landscapes I come accross, or pictures of buildings downtown, it all fascinates me to capture the world through a lens.
            I don't take photos professionally or anything, so I do not own a digital camera or an actual camera for that part, I just use my 
            iPhone camera, but even then it's all the same. It also helps me express myself in ways that words cannot, so I am grateful for picking
            this hobby up.</p>
        `
    }
};

function openLightbox(itemNumber) {
    const lightbox = document.getElementById('lightbox');
    const lightboxBody = document.getElementById('lightbox-body');
    
    if (lightbox && lightboxBody && lightboxData[itemNumber]) {
        lightboxBody.innerHTML = lightboxData[itemNumber].content;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close lightbox when clicking outside content
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Make functions available globally
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
