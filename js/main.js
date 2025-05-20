/*
   Portfolio de Animación - JavaScript
   Funcionalidades interactivas para el portafolio
*/

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos DOM
    const loader = document.querySelector('.loader-wrapper');
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');
    const skillBars = document.querySelectorAll('.skill-bar');
    const sections = document.querySelectorAll('.section');
    
    // Ocultar pantalla de carga una vez que todo esté cargado
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            
            // Mostrar animaciones iniciales después de que se oculte el loader
            animateOnLoad();
        }, 1000);
    });
    
    // Cambio de estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostrar/ocultar botón "back to top"
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Animar elementos al hacer scroll
        handleScrollAnimations();
    });
    
    // Navegación móvil toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
      // Cerrar menú móvil al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Cerrar menú móvil
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Activar enlace actual
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Si es un enlace de anclaje, hacer scroll suave
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    window.scrollTo({
                        top: offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    // Filtrado de proyectos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Activar botón de filtro
            filterBtns.forEach(item => item.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filtrar proyectos
            filterProjects(filterValue);
        });
    });
    
    // Abrir modal de proyectos
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Cerrar modal al hacer click en la X o fuera del modal
    closeModal.addEventListener('click', () => {
        closeProjectModal();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Manejar envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
      // Inicializar funcionalidades
    initializeActiveLinkOnScroll();
      // Eliminamos cualquier evento mouseenter en los enlaces para evitar conflictos
    
    // Funciones
    function animateOnLoad() {
        // Mostrar animaciones iniciales
        document.querySelector('.hero-text h1').classList.add('animate-title');
        document.querySelector('.hero-text p').classList.add('animate-subtitle');
        document.querySelector('.hero-buttons').style.opacity = '1';
        
        // Inicializar barras de habilidades con valores iniciales
        setTimeout(() => {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }, 1000);
    }
    
    function handleScrollAnimations() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.querySelectorAll('.fade-in').forEach(item => {
                    item.classList.add('active');
                });
            }
        });
    }
    
    function filterProjects(filter) {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    function openProjectModal(projectId) {
        // Aquí normalmente cargarías el contenido dinámicamente desde una base de datos
        // Por ahora, usaremos contenido estático para demostración
        
        const projectContent = getProjectContent(projectId);
        
        modalBody.innerHTML = projectContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
        
        // Añadir clases para animación
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('active');
        }, 10);
    }
    
    function closeProjectModal() {
        modal.querySelector('.modal-content').classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }, 300);
    }
    
    function getProjectContent(projectId) {
        // Este es un ejemplo de contenido estático para cada proyecto
        // En un entorno real, esto vendría de una API o base de datos
        
        const projects = {
            'project1': `
                <h2>Personaje Animado</h2>
                <div class="project-modal-media">
                    <img src="images/projects/project1-full.jpg" alt="Proyecto de Animación 1">
                </div>
                <div class="project-modal-info">
                    <div class="project-details">
                        <div class="detail-item">
                            <h4>Categoría</h4>
                            <p>Animación 2D</p>
                        </div>
                        <div class="detail-item">
                            <h4>Software</h4>
                            <p>Adobe Animate, Photoshop</p>
                        </div>
                        <div class="detail-item">
                            <h4>Fecha</h4>
                            <p>Enero 2025</p>
                        </div>
                    </div>
                    <div class="project-description">
                        <h3>Descripción</h3>
                        <p>Este proyecto presenta un personaje original animado usando técnicas de animación 2D tradicional. El personaje fue diseñado para expresar una amplia gama de emociones y movimientos fluidos.</p>
                        <p>El proceso incluye el diseño conceptual, creación de hojas de modelo, animación de fotogramas clave y limpieza final. Se prestó especial atención a los principios de anticipación y seguimiento para lograr movimientos naturales.</p>
                        <h3>Proceso de Creación</h3>
                        <ul>
                            <li>Concepto y bocetos iniciales</li>
                            <li>Diseño de personaje y hoja de modelo</li>
                            <li>Animación de poses clave</li>
                            <li>Intercalado y refinamiento</li>
                            <li>Colorización y efectos finales</li>
                        </ul>
                    </div>
                </div>
            `,
            'project2': `
                <h2>Mundo Fantasía</h2>
                <div class="project-modal-media">
                    <img src="images/projects/project2-full.jpg" alt="Proyecto de Animación 2">
                </div>
                <div class="project-modal-info">
                    <div class="project-details">
                        <div class="detail-item">
                            <h4>Categoría</h4>
                            <p>Animación 3D</p>
                        </div>
                        <div class="detail-item">
                            <h4>Software</h4>
                            <p>Blender, Substance Painter</p>
                        </div>
                        <div class="detail-item">
                            <h4>Fecha</h4>
                            <p>Marzo 2025</p>
                        </div>
                    </div>
                    <div class="project-description">
                        <h3>Descripción</h3>
                        <p>Mundo Fantasía es un entorno 3D completamente modelado, texturizado y animado que representa un paisaje fantástico con elementos surreales y mágicos.</p>
                        <p>El proyecto explora técnicas avanzadas de iluminación y partículas para crear atmósferas envolventes. La cámara animada guía al espectador a través de este mundo imaginario.</p>
                        <h3>Proceso de Creación</h3>
                        <ul>
                            <li>Modelado de entorno y elementos</li>
                            <li>Texturizado y materiales PBR</li>
                            <li>Configuración de iluminación y atmósfera</li>
                            <li>Sistemas de partículas para efectos mágicos</li>
                            <li>Animación de cámara y elementos del entorno</li>
                        </ul>
                    </div>
                </div>
            `,
            // Contenido para otros proyectos...
            'project3': `
                <h2>Logo Animado</h2>
                <div class="project-modal-media">
                    <img src="images/projects/project3-full.jpg" alt="Proyecto de Animación 3">
                </div>
                <div class="project-modal-info">
                    <div class="project-details">
                        <div class="detail-item">
                            <h4>Categoría</h4>
                            <p>Motion Graphics</p>
                        </div>
                        <div class="detail-item">
                            <h4>Software</h4>
                            <p>After Effects, Illustrator</p>
                        </div>
                        <div class="detail-item">
                            <h4>Fecha</h4>
                            <p>Febrero 2025</p>
                        </div>
                    </div>
                    <div class="project-description">
                        <h3>Descripción</h3>
                        <p>Animación de logo para una marca ficticia utilizando técnicas de motion graphics. El proyecto busca transmitir dinamismo y modernidad a través del movimiento.</p>
                        <p>Se utilizaron diferentes técnicas como shape layers, técnicas de morphing y efectos de partículas para conseguir una animación fluida y profesional.</p>
                    </div>
                </div>
            `
        };
        
        return projects[projectId] || '<h2>Proyecto no encontrado</h2>';
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Simulación de envío de formulario
        // En un entorno real, aquí irían las validaciones y el envío a backend
        
        // Mostrar mensaje de éxito (simulado)
        const formBtn = contactForm.querySelector('button');
        const originalText = formBtn.textContent;
        
        formBtn.disabled = true;
        formBtn.textContent = 'Enviando...';
        
        setTimeout(() => {
            // Simular respuesta exitosa
            formBtn.textContent = '¡Mensaje enviado!';
            formBtn.classList.add('success');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Restaurar botón después de un tiempo
            setTimeout(() => {
                formBtn.disabled = false;
                formBtn.textContent = originalText;
                formBtn.classList.remove('success');
            }, 3000);
        }, 1500);
    }
    
    function initializeActiveLinkOnScroll() {
        // Obtener todas las secciones y sus posiciones
        const sections = document.querySelectorAll('section[id]');
        
        // Función simple para actualizar el enlace activo
        const updateActiveLink = () => {
            const scrollPos = window.scrollY + 100;
            
            // Verificar cada sección
            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    // Quitar active de todos los enlaces
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Añadir active solo al enlace correspondiente
                    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        };
        
        // Actualizar en scroll con debounce simple
        let isScrolling;
        window.addEventListener('scroll', () => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                updateActiveLink();
            }, 50);
        });
        
        // Activar inicialmente después de cargar
        setTimeout(updateActiveLink, 100);
    }
    
    // Inicializar efectos de parallax
    let parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            let scrollPosition = window.pageYOffset;
            let speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Crear efecto de cursor personalizado
    const createCustomCursor = () => {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        });
        
        // Añadir efecto hover en enlaces y botones
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-icon');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    };
    
    // Descomenta la siguiente línea si deseas activar el cursor personalizado
    // createCustomCursor();
    
    // Agregar clases para animaciones al scroll
    document.querySelectorAll('.about-content, .project-card, .skill-item, .contact-card').forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Inicializar animación al scroll
    handleScrollAnimations();
});
