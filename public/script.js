/* =============================================
   DAVIDE VASSALLO — Shared Script
   ============================================= */

/* ── Paper Grain Overlay ───────────────────── */
(function () {
  const SIZE = 256;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;

  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(SIZE, SIZE);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const v = Math.floor(Math.random() * 255);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);

  const overlay = document.createElement('div');
  overlay.id = 'paper-grain-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 10;
    opacity: 0.02;
    mix-blend-mode: multiply;
    background-image: url(${canvas.toDataURL()});
    background-repeat: repeat;
  `;

  // Append as soon as <body> is available
  if (document.body) {
    document.body.appendChild(overlay);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(overlay));
  }
})();


document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const headerNav = document.getElementById('header-nav');

  if (mobileToggle && headerNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      headerNav.classList.toggle('mobile-active');
    });
  }

  // Auto-open portfolio submenu if we are on the portfolio page
  const submenuPortfolio = document.getElementById('submenu-portfolio');
  const portfolioToggle = document.getElementById('portfolio-toggle');
  const siteHeader = document.querySelector('.site-header');
  const currentPageInfo = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
  const isPortfolioPage = currentPageInfo === 'portfolio.html' || currentPageInfo === 'project-detail.html';

  if (isPortfolioPage) {
    if (submenuPortfolio) submenuPortfolio.classList.add('open');
    if (portfolioToggle) portfolioToggle.classList.add('active');
  }

  // Smooth desktop hover handling for portfolio submenu
  if (siteHeader && submenuPortfolio && portfolioToggle && !isPortfolioPage) {
    let closeTimer;

    const clearCloseTimer = () => {
      if (closeTimer !== undefined) {
        window.clearTimeout(closeTimer);
        closeTimer = undefined;
      }
    };

    const openPortfolioSubmenu = () => {
      clearCloseTimer();
      siteHeader.classList.add('is-portfolio-open');
    };

    const closePortfolioSubmenu = () => {
      clearCloseTimer();
      closeTimer = window.setTimeout(() => {
        siteHeader.classList.remove('is-portfolio-open');
        closeTimer = undefined;
      }, 90);
    };

    portfolioToggle.addEventListener('mouseenter', openPortfolioSubmenu);
    submenuPortfolio.addEventListener('mouseenter', openPortfolioSubmenu);
    portfolioToggle.addEventListener('mouseleave', closePortfolioSubmenu);
    submenuPortfolio.addEventListener('mouseleave', closePortfolioSubmenu);

    portfolioToggle.addEventListener('focus', openPortfolioSubmenu);
    siteHeader.addEventListener('focusout', event => {
      if (!siteHeader.contains(event.relatedTarget)) closePortfolioSubmenu();
    });
  }

  // 2. Active nav link based on current page
  const navLinks = document.querySelectorAll('.header-nav a:not(#portfolio-toggle)');
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('?')[0];
    if (linkPage === currentPage && !isPortfolioPage) link.classList.add('active');
  });

  // ============================================================
  //   PORTFOLIO TAB SYSTEM
  // ============================================================
  const tabLinks = document.querySelectorAll('.portfolio-tab-link');
  const tabPanels = document.querySelectorAll('.portfolio-tab-panel');
  const activeLabel = document.getElementById('portfolio-active-label');
  const activeTitle = document.getElementById('portfolio-active-title');

  const tabTitles = {
    fotografia: 'Fotografia',
    videomaking: 'Videomaking',
    regia: 'Regia',
    mosaico: 'Mosaico'
  };

  function switchTab(tabId) {
    // Hide all panels
    tabPanels.forEach(p => { p.style.display = 'none'; });

    // Show selected panel
    const target = document.getElementById('tab-' + tabId);
    if (target) {
      target.style.display = '';
      // Re-trigger animation
      target.style.animation = 'none';
      target.offsetHeight; // reflow
      target.style.animation = '';
    }

    // Update header label + title
    const label = tabTitles[tabId] || tabId;
    if (activeLabel) activeLabel.textContent = label;
    if (activeTitle) activeTitle.textContent = label;

    // Show/hide tertiary submenus in the header
    const tertFoto = document.getElementById('tertiary-fotografia');
    const tertVideo = document.getElementById('tertiary-videomaking');
    const fotoMain = document.getElementById('fotografia-main');
    
    if (tertFoto) {
      if (tabId === 'fotografia' && fotoMain && fotoMain.style.display !== 'none') {
        tertFoto.classList.add('open');
      } else {
        tertFoto.classList.remove('open');
      }
    }
    if (tertVideo) {
      if (tabId === 'videomaking') {
        tertVideo.classList.add('open');
      } else {
        tertVideo.classList.remove('open');
      }
    }

    // Update active class on submenu links
    tabLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.tab === tabId);
    });

    // Update URL hash without scroll jump
    history.replaceState(null, '', '#' + tabId);
  }

  if (tabLinks.length > 0) {
    tabLinks.forEach(link => {
      link.addEventListener('click', e => {
        if (currentPageInfo !== 'portfolio.html') return;
        e.preventDefault();
        switchTab(link.dataset.tab);
      });
    });

    // Activate the correct tab based on URL hash (or default to fotografia)
    if (currentPageInfo === 'portfolio.html') {
      const hash = (window.location.hash || '#fotografia').replace('#', '');
      const validTabs = ['fotografia', 'videomaking', 'regia', 'mosaico'];
      const initialTab = validTabs.includes(hash) ? hash : 'fotografia';
      switchTab(initialTab);
    }
  }

  // Highlight active submenu link based on hash (non-portfolio pages fallback)
  const submenuLinks = document.querySelectorAll('.submenu-nav a:not(.portfolio-tab-link)');
  function updateSubmenuActive() {
    const currentHash = window.location.hash || '#mosaico';
    if (isPortfolioPage) {
      submenuLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentHash)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }
  updateSubmenuActive();
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    const validTabs = ['fotografia', 'videomaking', 'regia', 'mosaico'];
    if (tabLinks.length > 0 && validTabs.includes(newHash)) {
      switchTab(newHash);
    } else {
      updateSubmenuActive();
    }
  });

  // 3. Hero Band Background Sliders
  const heroBands = [
    {
      id: 'hero-band-1',
      images: [
        'assets/DSC_3667-Enhanced-NR.jpg',
        'assets/DSC_3643-Enhanced-NR.jpg',
        'assets/DSC_3596-Enhanced-NR-2.jpg'
      ]
    },
    {
      id: 'hero-band-2',
      images: [
        'assets/DSC_2620-2.jpg',
        'assets/DSC_2952-2.jpg',
        'assets/DSC_2706-2.jpg'
      ]
    },
    {
      id: 'hero-band-3',
      images: [
        'assets/DSC_9738-Enhanced-NR-2.jpg',
        'assets/DSC_9859-Enhanced-NR.jpg',
        'assets/DSC_2965.jpg'
      ]
    }
  ];

  heroBands.forEach(band => {
    const bandElement = document.getElementById(band.id);
    if (!bandElement) return;
    const sliderContainer = bandElement.querySelector('.hero-band-slider');

    // Inject images
    band.images.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      if (idx === 0) img.classList.add('active');
      sliderContainer.appendChild(img);
    });

    // Slider logic
    let currentIndex = 0;
    const images = sliderContainer.querySelectorAll('img');
    if (images.length > 1) {
      setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
      }, 4000 + Math.random() * 2000); // 4-6s interval, randomized so they don't sync
    }
  });

  // 3. Smooth scroll for anchor links only
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 4. Scroll Reveal (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  // 4. Helper: shuffle array randomly
  function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

  // 4b. Helper: render a masonry grid from a data array
  function renderMasonryGrid(gridElement, items, isPreview = false, shuffle = true) {
    if (!gridElement) return;
    gridElement.innerHTML = '';

    let dataToRender = [...items];
    if (shuffle) dataToRender = shuffleArray(dataToRender);
    dataToRender = dataToRender.slice(0, isPreview ? 16 : items.length);

    dataToRender.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `masonry-item reveal active`;
      if (item.aspectRatio && item.aspectRatio < 1) {
        div.classList.add('portrait');
      }
      div.dataset.category = item.category;

      let innerStrc = `
        <img src="${item.src}" alt="${item.title}">
      `;

      if (item.isPreviewCard) {
        div.classList.add('has-preview');
        innerStrc += `
          <div class="project-preview-card">
            <h3 class="project-preview-title">${item.title}</h3>
            <p class="project-preview-meta">${item.metadata}</p>
            <p class="project-preview-logline">${item.logline}</p>
          </div>
        `;
      } else {
        innerStrc += `
          <div class="masonry-caption">
            <p class="masonry-caption-title">${item.title}</p>
            <p class="masonry-caption-cat">${item.category}</p>
          </div>
        `;
      }

      div.innerHTML = innerStrc;

      div.addEventListener('click', () => {
        if (item.url) {
          window.location.href = item.url;
        } else {
          openLightbox(dataToRender, index);
        }
      });

      gridElement.appendChild(div);
    });
  }

  // 4c. Lightbox setup
  const lightboxHTML = `
    <div class="lightbox-modal" id="lightbox-modal">
      <div class="lightbox-close" id="lightbox-close">✕</div>
      <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous image">‹</button>
      <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next image">›</button>
      <div class="lightbox-content-wrapper">
        <div class="lightbox-image-container">
          <img class="lightbox-image" id="lightbox-image" src="" alt="">
        </div>
        <div class="lightbox-info">
          <h2 class="lightbox-title" id="lightbox-title"></h2>
          <p class="lightbox-desc" id="lightbox-desc"></p>
          <p class="lightbox-meta" id="lightbox-meta"></p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentLightboxData = [];
  let currentLightboxIndex = 0;

  function updateLightboxContent() {
    if (!currentLightboxData || currentLightboxData.length === 0) return;
    const item = currentLightboxData[currentLightboxIndex];
    lightboxImg.src = item.src;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description;
    lightboxMeta.textContent = item.metadata;
  }

  function openLightbox(dataArray, index) {
    currentLightboxData = dataArray;
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function nextLightboxImage() {
    if (!currentLightboxData || currentLightboxData.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxData.length;
    updateLightboxContent();
  }

  function prevLightboxImage() {
    if (!currentLightboxData || currentLightboxData.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxData.length) % currentLightboxData.length;
    updateLightboxContent();
  }

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevLightboxImage();
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextLightboxImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'Escape') {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  lightboxClose.addEventListener('click', () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // 4d. Fetch Portfolio data from Sanity
  async function initPortfolio() {
    try {
      const projectId = 'lbt74p0a';
      const dataset = 'production';
      const apiVersion = '2024-03-09';

      const queryFotografia = encodeURIComponent(`*[_type == "fotografia"] | order(ordine asc, _createdAt desc) {
        "src": src.asset->url,
        "aspectRatio": src.asset->metadata.dimensions.aspectRatio,
        "category": categoriaString,
        title,
        description,
        metadata
      }`);
      
      const queryVideo = encodeURIComponent(`*[_type == "progettoVideo"] | order(ordine asc, _createdAt desc) {
        "src": src.asset->url,
        "category": categoriaString,
        title,
        description,
        metadata,
        logline,
        url,
        isPreviewCard
      }`);

      const queryBlog = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        "src": mainImage.asset->url,
        publishedAt,
        "excerpt": array::join(body[0].children[].text, "")
      }`);

      const [resFoto, resVideo, resBlog] = await Promise.all([
        fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${queryFotografia}`).then(r => r.json()),
        fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${queryVideo}`).then(r => r.json()),
        fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${queryBlog}`).then(r => r.json())
      ]);

      const fotografiaData = resFoto.result || [];
      const videoData = resVideo.result || [];
      const blogData = resBlog.result || [];

      // Divide backend video data loosely as it was previously split in script.js
      const videomakingData = videoData.slice(0, 5);
      const regiaData = videoData.slice(5) || videoData;

      const baseMosaicoData = [...fotografiaData];
      
      // Duplicazione delle foto per formare una griglia mosaico più densa ed impattante
      const mosaicoData = [
        ...baseMosaicoData,
        ...baseMosaicoData,
        ...baseMosaicoData,
        ...baseMosaicoData,
        ...baseMosaicoData
      ];

      // Render all portfolio grids
      renderMasonryGrid(document.getElementById('masonry-grid-fotografia'), fotografiaData, false, true);
      renderMasonryGrid(document.getElementById('masonry-grid-videomaking'), videomakingData, false, false);
      renderMasonryGrid(document.getElementById('masonry-grid-regia'), regiaData, false, false);
      renderMasonryGrid(document.getElementById('masonry-grid-mosaico'), mosaicoData, false, true);

      // Legacy grids (home preview + old portfolio page se still referenced)
      renderMasonryGrid(document.getElementById('masonry-grid'), mosaicoData, false, true);
      renderMasonryGrid(document.getElementById('mosaico-grid-preview'), mosaicoData, true, true);

      // Render Blog Grids
      renderBlogGrid(document.getElementById('blog-grid'), blogData);
      renderBlogGrid(document.getElementById('blog-grid-preview'), blogData.slice(0, 3));
      
    } catch (err) {
      console.error("Errore di caricamento da Sanity:", err);
    }
  }

  function renderBlogGrid(container, posts) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!posts || posts.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 2rem;">Nessun articolo trovato.</p>';
      return;
    }

    posts.forEach(post => {
      const date = new Date(post.publishedAt).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      const card = document.createElement('a');
      card.className = 'blog-card reveal active';
      card.href = `post-detail.html?slug=${post.slug}`; // Assuming this will exist soon or use as template
      
      card.innerHTML = `
        <div class="blog-card-image">
          <img src="${post.src || 'assets/placeholder-blog.jpg'}" alt="${post.title}">
        </div>
        <div class="blog-card-content">
          <span class="blog-card-date">${date}</span>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt || ''}</p>
        </div>
      `;
      
      container.appendChild(card);
    });
  }

  // Avvia il rendering dinamico
  initPortfolio();


  // 5. Gallery filtering — scoped to each tab panel
  // Re-wired to explicitly check the new global tertiary menus since they are no longer inside the panels
  const setupTertiaryFilter = (menuId, gridId) => {
    const btns = document.querySelectorAll(`#${menuId} .filter-btn`);
    const grid = document.getElementById(gridId);
    if (!btns.length || !grid) return;

    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;

        grid.querySelectorAll('.masonry-item').forEach(item => {
          if (cat === 'all' || item.dataset.category === cat) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 50);
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 400);
          }
        });
      });
    });
  };

  setupTertiaryFilter('tertiary-videomaking', 'masonry-grid-videomaking');

  // Fotografia specific logic
  const fotoPanels = document.querySelectorAll('.foto-panel');
  const fotoContainer = document.getElementById('foto-panels');
  const fotoMain = document.getElementById('fotografia-main');
  const tertiaryBtnsFoto = document.querySelectorAll('#tertiary-fotografia .tertiary-link');

  function filterFotografiaGrid(filter) {
    const grid = document.getElementById('masonry-grid-fotografia');
    if (!grid) return;
    grid.querySelectorAll('.masonry-item').forEach(item => {
      if (item.dataset.category === filter) {
        item.style.display = 'block';
        setTimeout(() => item.style.opacity = '1', 50);
      } else {
        item.style.opacity = '0';
        setTimeout(() => item.style.display = 'none', 400);
      }
    });
  }

  // Fotografia panels image rotation logic
  const fotoPanelsConfig = [
    {
      id: 'foto-panel-ritratti',
      images: [
        'assets/DSC_3667-Enhanced-NR.jpg',
        'assets/DSC_3643-Enhanced-NR.jpg',
        'assets/DSC_3596-Enhanced-NR-2.jpg'
      ]
    },
    {
      id: 'foto-panel-narrazione',
      images: [
        'assets/DSC_2852.jpg',
        'assets/DSC_2620-2.jpg',
        'assets/DSC_9738-Enhanced-NR-2.jpg'
      ]
    }
  ];

  fotoPanelsConfig.forEach(panelConfig => {
    const el = document.getElementById(panelConfig.id);
    if (!el) return;
    const sliderContainer = el.querySelector('.foto-panel-slider');
    if (!sliderContainer) return;

    panelConfig.images.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      if (idx === 0) img.classList.add('active');
      sliderContainer.appendChild(img);
    });

    let currentIndex = 0;
    const images = sliderContainer.querySelectorAll('img');
    if (images.length > 1) {
      setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
      }, 4000 + Math.random() * 2000);
    }
  });

  fotoPanels.forEach(p => {
    p.addEventListener('click', () => {
      if (fotoContainer) {
        fotoContainer.style.opacity = '0';
        setTimeout(() => fotoContainer.style.display = 'none', 500);
      }
      setTimeout(() => {
        if (fotoMain) {
          fotoMain.style.display = 'block';
          setTimeout(() => fotoMain.style.opacity = '1', 50);
        }
        const tertFoto = document.getElementById('tertiary-fotografia');
        if (tertFoto) tertFoto.classList.add('open');

        const filter = p.dataset.sub;
        tertiaryBtnsFoto.forEach(b => {
          if (b.dataset.filter === filter) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
        filterFotografiaGrid(filter);
      }, 500);
    });
  });

  tertiaryBtnsFoto.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Hide panels and show grid if not already visible
      if (fotoContainer && fotoContainer.style.display !== 'none') {
        fotoContainer.style.opacity = '0';
        setTimeout(() => fotoContainer.style.display = 'none', 500);
        setTimeout(() => {
          if (fotoMain) {
            fotoMain.style.display = 'block';
            setTimeout(() => fotoMain.style.opacity = '1', 50);
          }
        }, 500);
      }
      
      tertiaryBtnsFoto.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterFotografiaGrid(btn.dataset.filter);
    });
  });

  // Reset Fotografia tab when switched back to
  if (tabLinks.length > 0) {
    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (link.dataset.tab === 'fotografia' && fotoContainer) {
          fotoContainer.style.display = 'flex';
          setTimeout(() => fotoContainer.style.opacity = '1', 50);
          if (fotoMain) {
            fotoMain.style.display = 'none';
            fotoMain.style.opacity = '0';
          }
          const tertFoto = document.getElementById('tertiary-fotografia');
          if (tertFoto) tertFoto.classList.remove('open');
        }
      });
    });
  }

  // Mosaico Touch Dragging Effect
  const mosaicoGrid = document.getElementById('masonry-grid-mosaico');
  if (mosaicoGrid) {
    let lastHoveredItem = null;

    mosaicoGrid.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);

      if (element) {
        const item = element.closest('.masonry-item');
        if (item && item.parentElement === mosaicoGrid) {
          e.preventDefault(); // Prevent scroll to allow playful trailing
          if (lastHoveredItem !== item) {
            if (lastHoveredItem) {
              lastHoveredItem.classList.remove('hover-trail');
            }
            item.classList.add('hover-trail');
            lastHoveredItem = item;
          }
        } else {
          if (lastHoveredItem) {
            lastHoveredItem.classList.remove('hover-trail');
            lastHoveredItem = null;
          }
        }
      }
    }, { passive: false });

    mosaicoGrid.addEventListener('touchend', () => {
      if (lastHoveredItem) {
        lastHoveredItem.classList.remove('hover-trail');
        lastHoveredItem = null;
      }
    });

    mosaicoGrid.addEventListener('touchcancel', () => {
      if (lastHoveredItem) {
        lastHoveredItem.classList.remove('hover-trail');
        lastHoveredItem = null;
      }
    });
  }

});
