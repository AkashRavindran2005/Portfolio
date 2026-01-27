// ============================================
// Typing Animation
// ============================================
const typedTextElement = document.getElementById('typed-text');
const roles = [
    'Full-Stack Developer',
    'Security Enthusiast',
    'Backend Engineer',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, 1000);
});

// ============================================
// Mobile Navigation Toggle
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Scroll Reveal Animation
// ============================================
const revealElements = document.querySelectorAll(
    '.section-title, .about-ctf, .ctf-terminal, .blog-preview, .timeline-item, .extras-column, .contact-content'
);

// Project cards with staggered animation
const projectCards = document.querySelectorAll('.project-card-scroll');
const skillGroups = document.querySelectorAll('.skill-group');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('reveal', 'active');
        }
    });

    // Staggered reveal for project cards
    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            setTimeout(() => {
                card.classList.add('active');
            }, index * 150);
        }
    });

    // Staggered reveal for skill groups
    skillGroups.forEach((group, index) => {
        const groupTop = group.getBoundingClientRect().top;

        if (groupTop < triggerBottom) {
            setTimeout(() => {
                group.classList.add('active');
            }, index * 100);
        }
    });
};

// Add reveal class to elements
revealElements.forEach(el => el.classList.add('reveal'));

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// Active Navigation Highlight
// ============================================
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ============================================
// Navbar Background on Scroll
// ============================================
const nav = document.getElementById('nav');

const handleNavScroll = () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
};

window.addEventListener('scroll', handleNavScroll);

// ============================================
// Smooth Scroll for Safari
// ============================================
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

// ============================================
// SSH Login Animation (Extended)
// ============================================
(function () {
    const sshScreen = document.getElementById('ssh-screen');
    const sshTerminal = document.getElementById('ssh-terminal');
    const mainSite = document.getElementById('main-site');

    // Check if already logged in this session
    if (sessionStorage.getItem('sshComplete')) {
        if (sshScreen) sshScreen.classList.add('hidden');
        if (mainSite) mainSite.classList.remove('hidden');
        return;
    }

    if (!sshScreen || !sshTerminal || !mainSite) return;

    // SSH sequence steps
    const sequence = [
        { type: 'typing', prompt: 'guest@localhost:~$ ', text: 'ssh akash@portfolio', delay: 800 },
        { type: 'output', text: 'The authenticity of host \'portfolio (192.168.1.42)\' can\'t be established.', delay: 400 },
        { type: 'output', text: 'ED25519 key fingerprint is SHA256:xK3mB9nVs2Pq...', delay: 200 },
        { type: 'typing', prompt: 'Are you sure you want to continue connecting (yes/no)? ', text: 'yes', delay: 600 },
        { type: 'output', text: 'Warning: Permanently added \'portfolio\' (ED25519) to known hosts.', delay: 300 },
        { type: 'password', prompt: 'akash@portfolio\'s password: ', delay: 500 },
        { type: 'blank', delay: 200 },
        { type: 'output', text: '<span class="ssh-success">Authentication successful.</span>', delay: 400 },
        { type: 'blank', delay: 100 },
        { type: 'output', text: 'Last login: ' + getLastLogin() + ' from 192.168.1.1', delay: 200 },
        { type: 'blank', delay: 100 },
        {
            type: 'welcome', text: `
<span class="ssh-welcome">Welcome to Portfolio OS v2.0 (GNU/Linux 5.15.0-generic x86_64)</span>

 * Documentation:  <span class="ssh-info">https://akashravindran.dev/docs</span>
 * Support:        <span class="ssh-info">akashravindran2005@gmail.com</span>

<span class="ssh-output">System information as of ${new Date().toLocaleString()}</span>

  <span class="ssh-success">System load:</span>  0.42              <span class="ssh-success">Users logged in:</span>     1
  <span class="ssh-success">Memory usage:</span> 23%               <span class="ssh-success">IPv4 address:</span>        192.168.1.42
  <span class="ssh-success">Disk usage:</span>   45%               <span class="ssh-success">Projects active:</span>     6

`, delay: 100
        },
        { type: 'typing', prompt: 'akash@portfolio:~$ ', text: './start_portfolio.sh', delay: 800 },
        { type: 'output', text: '<span class="ssh-success">Starting portfolio interface...</span>', delay: 500 },
        { type: 'complete', delay: 800 }
    ];

    function getLastLogin() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = new Date(Date.now() - 86400000); // Yesterday
        return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    }

    let currentLine = null;
    let totalDelay = 0;

    function addLine(html) {
        const line = document.createElement('div');
        line.className = 'ssh-line';
        line.innerHTML = html;
        sshTerminal.appendChild(line);
        return line;
    }

    function typeText(element, text, callback, speed = 80) {
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'ssh-cursor';
        cursor.textContent = '█';
        element.appendChild(cursor);

        const interval = setInterval(() => {
            if (i < text.length) {
                cursor.insertAdjacentText('beforebegin', text[i]);
                i++;
            } else {
                clearInterval(interval);
                cursor.remove();
                if (callback) callback();
            }
        }, speed);
    }

    function processStep(index) {
        if (index >= sequence.length) return;

        const step = sequence[index];

        setTimeout(() => {
            if (step.type === 'typing') {
                const line = addLine(`<span class="ssh-prompt">${step.prompt}</span>`);
                typeText(line, step.text, () => {
                    setTimeout(() => processStep(index + 1), 300);
                });
            } else if (step.type === 'password') {
                const line = addLine(`<span class="ssh-output">${step.prompt}</span>`);
                typeText(line, '••••••••••', () => {
                    setTimeout(() => processStep(index + 1), 300);
                }, 60);
            } else if (step.type === 'output') {
                addLine(`<span class="ssh-output">${step.text}</span>`);
                processStep(index + 1);
            } else if (step.type === 'welcome') {
                addLine(`<pre class="ssh-output">${step.text}</pre>`);
                processStep(index + 1);
            } else if (step.type === 'blank') {
                addLine('&nbsp;');
                processStep(index + 1);
            } else if (step.type === 'complete') {
                setTimeout(() => {
                    sshScreen.classList.add('fade-out');
                    setTimeout(() => {
                        mainSite.classList.remove('hidden');
                        setTimeout(() => {
                            sshScreen.classList.add('hidden');
                            sessionStorage.setItem('sshComplete', 'true');
                        }, 800);
                    }, 200);
                }, 300);
            }
        }, step.delay);
    }

    // Start the sequence
    setTimeout(() => processStep(0), 500);
})();
