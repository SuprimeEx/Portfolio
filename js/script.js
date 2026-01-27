// Navegación mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú cuando se hace clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Cerrar menú cuando se hace clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        navMenu.classList.remove('active');
    }
});

// Modal de Perfil
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

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileModal.classList.contains('active')) {
        profileModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Flip Cards de Habilidades - Se ejecuta cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Accordion de Certificados
    const certAccordions = document.querySelectorAll('.cert-accordion');
    certAccordions.forEach(accordion => {
        const header = accordion.querySelector('.cert-header');
        header.addEventListener('click', () => {
            accordion.classList.toggle('active');
        });
    });

    // Inicializar Certificate Viewer Modal
    const certViewerModal = document.getElementById('certViewerModal');
    const certViewerFrame = document.getElementById('certViewerFrame');
    const certViewerClose = document.querySelector('.cert-viewer-close');
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');

    // Abrir modal de visualización de certificados
    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfPath = btn.dataset.pdf;
            certViewerFrame.src = pdfPath;
            certViewerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal de certificados
    certViewerClose.addEventListener('click', () => {
        certViewerModal.classList.remove('active');
        certViewerFrame.src = '';
        document.body.style.overflow = 'auto';
    });

    // Cerrar modal al hacer clic fuera
    certViewerModal.addEventListener('click', (e) => {
        if (e.target === certViewerModal) {
            certViewerModal.classList.remove('active');
            certViewerFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certViewerModal.classList.contains('active')) {
            certViewerModal.classList.remove('active');
            certViewerFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Cargar proyectos
    loadProjects();
    
    // Observar tarjetas de proyectos, habilidades e info
    document.querySelectorAll('.project-card, .skill-card, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.animation = 'none';
        observer.observe(el);
    });
});

// Cargar proyectos desde projects.json
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('projectsContainer');
        projectsContainer.innerHTML = '';

        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error cargando proyectos:', error);
        const projectsContainer = document.getElementById('projectsContainer');
        projectsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: var(--text-color);">Los proyectos se mostrarán pronto. Actualiza el archivo data/projects.json</p>
            </div>
        `;
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    const linksHTML = `
        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> GitHub</a>` : ''}
        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe"></i> Demo</a>` : ''}
    `;

    card.innerHTML = `
        <div class="project-image">
            <i class="${project.icon || 'fas fa-code'}"></i>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tagsHTML}</div>
            <div class="project-links">${linksHTML}</div>
        </div>
    `;

    return card;
}

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aquí puedes agregar lógica para enviar el formulario
        // Por ahora, mostraremos una alerta
        const formData = new FormData(contactForm);
        
        alert('¡Gracias por tu mensaje! Me pondré en contacto pronto.');
        contactForm.reset();
        
        // TODO: Integrar con un servicio de email (EmailJS, Formspree, etc.)
    });
}

// Animación de scroll
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

// Observar elementos al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Cargar proyectos
    loadProjects();
    
    // Observar tarjetas de proyectos, habilidades e info
    document.querySelectorAll('.project-card, .skill-card, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.animation = 'none';
        observer.observe(el);
    });
});

// Cambiar navbar al hacer scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 102, 255, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 102, 255, 0.1)';
    }
});

console.log('Portfolio cargado correctamente');
