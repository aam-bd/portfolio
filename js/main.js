/**
 * PORTFOLIO INTERACTIVITY SCRIPT
 * For Graphic Designer & Video Editor Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initVideoPlayers();
  initProjectsFilter();
  initModalLightbox();
  initContactForm();
  initCopyButtons();
  initFAQAccordion();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (!hamburgerBtn || !mobileNav) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
      mobileNav.classList.add('open');
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  });

  // Close mobile nav when clicking on any link
  const navLinks = mobileNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ==========================================================================
   2. VIDEO PLAYER ENHANCEMENTS
   ========================================================================== */
function initVideoPlayers() {
  const videoContainers = document.querySelectorAll('.video-showcase-container');

  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.play-pause-btn');
    const muteBtn = container.querySelector('.mute-btn');
    const fsBtn = container.querySelector('.fullscreen-btn');

    if (!video) return;

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play();
          playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
          video.pause();
          playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
      });

      video.addEventListener('play', () => {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      });

      video.addEventListener('pause', () => {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted 
          ? '<i class="fa-solid fa-volume-xmark"></i>' 
          : '<i class="fa-solid fa-volume-high"></i>';
      });
    }

    if (fsBtn) {
      fsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      });
    }

    // Toggle play when clicking directly on video
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
}

/* ==========================================================================
   3. PROJECTS FILTERING (ALL, VIDEO, GRAPHIC DESIGN, BRANDING)
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('[data-category]');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. MODAL LIGHTBOX FOR IMAGES & VIDEOS
   ========================================================================== */
function initModalLightbox() {
  const modal = document.getElementById('projectLightboxModal');
  if (!modal) return;

  const modalMediaHolder = modal.querySelector('.modal-media-holder');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-description');
  const closeBtn = modal.querySelector('.modal-close-btn');

  function openModal(type, src, title, desc) {
    modalMediaHolder.innerHTML = '';
    
    if (type === 'video') {
      const vid = document.createElement('video');
      vid.src = src;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.style.width = '100%';
      vid.style.maxHeight = '65vh';
      modalMediaHolder.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Project Preview';
      modalMediaHolder.appendChild(img);
    }

    if (modalTitle) modalTitle.textContent = title || '';
    if (modalDesc) modalDesc.textContent = desc || '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Pause any playing modal video
    const currentVideo = modalMediaHolder.querySelector('video');
    if (currentVideo) {
      currentVideo.pause();
    }
    setTimeout(() => {
      modalMediaHolder.innerHTML = '';
    }, 300);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach triggers
  const triggers = document.querySelectorAll('[data-lightbox]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const type = trigger.getAttribute('data-lightbox-type') || 'image';
      const src = trigger.getAttribute('data-lightbox-src');
      const title = trigger.getAttribute('data-lightbox-title');
      const desc = trigger.getAttribute('data-lightbox-desc');
      if (src) {
        openModal(type, src, title, desc);
      }
    });
  });
}

/* ==========================================================================
   5. CONTACT FORM INTERACTION & FEEDBACK
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('projectInquiryForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> বার্তা পাঠানো হচ্ছে...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();
      showToast('ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমি খুব শীঘ্রই যোগাযোগ করব।');
    }, 1200);
  });
}

/* ==========================================================================
   6. 1-CLICK COPY BUTTONS
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`কপি করা হয়েছে: ${textToCopy}`);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`কপি করা হয়েছে: ${textToCopy}`);
      });
    });
  });
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i class="fa-solid fa-circle-check toast-icon"></i>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
