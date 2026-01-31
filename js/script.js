/*************************
 * EMAILJS INIT
 *************************/
emailjs.init('BmGRkxVz0gXbhWthd');


/*************************
 * INTERSECTION OBSERVER
 *************************/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


/*************************
 * NAVBAR MOBILE
 *************************/
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        navMenu.classList.remove('active');
    }
});


/*************************
 * PROFILE MODAL
 *************************/
const profileModal = document.getElementById('profileModal');
const logoImage = document.getElementById('logoImage');
const closeModal = document.getElementById('closeModal');

logoImage.addEventListener('click', () => {
    profileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    profileModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        profileModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileModal.classList.contains('active')) {
        profileModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


/*************************
 * DOM CONTENT LOADED
 *************************/
document.addEventListener('DOMContentLoaded', () => {

    /* Flip cards */
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    /* Certificados accordion */
    document.querySelectorAll('.cert-accordion').forEach(accordion => {
        const header = accordion.querySelector('.cert-header');
        header.addEventListener('click', () => {
            accordion.classList.toggle('active');
        });
    });

    /* Certificados modal */
    const certViewerModal = document.getElementById('certViewerModal');
    const certViewerFrame = document.getElementById('certViewerFrame');
    const certViewerClose = document.querySelector('.cert-viewer-close');

    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            certViewerFrame.src = btn.dataset.pdf;
            certViewerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    certViewerClose.addEventListener('click', () => {
        certViewerModal.classList.remove('active');
        certViewerFrame.src = '';
        document.body.style.overflow = 'auto';
    });

    certViewerModal.addEventListener('click', (e) => {
        if (e.target === certViewerModal) {
            certViewerModal.classList.remove('active');
            certViewerFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certViewerModal.classList.contains('active')) {
            certViewerModal.classList.remove('active');
            certViewerFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    /* Cargar proyectos */
    loadProjects();

    /* Animaciones */
    document.querySelectorAll('.project-card, .skill-card, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.animation = 'none';
        observer.observe(el);
    });
});


/*************************
 * PROYECTOS
 *************************/
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const container = document.getElementById('projectsContainer');
        container.innerHTML = '';

        projects.forEach(project => {
            container.appendChild(createProjectCard(project));
        });
    } catch (error) {
        console.error('Error cargando proyectos:', error);
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const linksHTML = `
        ${project.github ? `<a href="${project.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
        ${project.live ? `<a href="${project.live}" target="_blank"><i class="fas fa-globe"></i> Demo</a>` : ''}
    `;

    card.innerHTML = `
        <div class="project-image"><i class="${project.icon || 'fas fa-code'}"></i></div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tagsHTML}</div>
            <div class="project-links">${linksHTML}</div>
        </div>
    `;
    return card;
}


/*************************
 * CONTACT FORM - EMAILJS
 *************************/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        emailjs.sendForm(
            'service_oz91xgy',
            'template_b4umwlr',
            contactForm
        ).then(() => {
            showSuccessModal();
            contactForm.reset();
            btn.textContent = 'Enviar Mensaje';
            btn.disabled = false;
        }).catch(() => {
            alert('Error al enviar el mensaje.');
            btn.textContent = 'Enviar Mensaje';
            btn.disabled = false;
        });
    });
}


/*************************
 * SUCCESS MODAL
 *************************/
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    setTimeout(() => closeSuccessModal(), 5000);
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}


/*************************
 * NAVBAR SCROLL
 *************************/
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50
        ? '0 2px 20px rgba(0, 102, 255, 0.2)'
        : '0 2px 10px rgba(0, 102, 255, 0.1)';
});

console.log('✅ Portfolio cargado correctamente');
