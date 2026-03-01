/* ===== NAV SCROLL ===== */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

/* ===== DONUT CHART ===== */
function drawDonut() {
    const canvas = document.getElementById('donutChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = 45, cy = 45, r = 38, innerR = 24;
    const segments = [
        { pct: 0.293, color: '#4CAF50' },
        { pct: 0.265, color: '#EF5350' },
        { pct: 0.192, color: '#42A5F5' },
        { pct: 0.18, color: '#FFCA28' },
        { pct: 0.07, color: '#9E9E9E' },
    ];
    let startAngle = -Math.PI / 2;
    ctx.clearRect(0, 0, 90, 90);
    segments.forEach(seg => {
        const endAngle = startAngle + seg.pct * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = seg.color;
        ctx.fill();
        startAngle = endAngle;
    });
    // Erase center (donut hole)
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, 2 * Math.PI);
    ctx.fillStyle = '#141312';
    ctx.fill();
}

/* ===== LINE CHART ===== */
function drawLineChart() {
    const canvas = document.getElementById('lineChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const pts = [4200, 8100, 5300, 11400, 7200, 9800, 6500];
    const maxVal = Math.max(...pts);
    const pad = { top: 10, bottom: 10, left: 10, right: 10 };
    const gw = W - pad.left - pad.right;
    const gh = H - pad.top - pad.bottom;

    const toX = i => pad.left + (i / (pts.length - 1)) * gw;
    const toY = v => pad.top + gh - (v / maxVal) * gh;

    // Fill gradient
    const grad = ctx.createLinearGradient(0, pad.top, 0, H);
    grad.addColorStop(0, 'rgba(46,125,50,0.3)');
    grad.addColorStop(1, 'rgba(46,125,50,0)');
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(pts[0]));
    for (let i = 1; i < pts.length; i++) {
        const cpX = (toX(i - 1) + toX(i)) / 2;
        ctx.bezierCurveTo(cpX, toY(pts[i - 1]), cpX, toY(pts[i]), toX(i), toY(pts[i]));
    }
    ctx.lineTo(toX(pts.length - 1), H);
    ctx.lineTo(toX(0), H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(pts[0]));
    for (let i = 1; i < pts.length; i++) {
        const cpX = (toX(i - 1) + toX(i)) / 2;
        ctx.bezierCurveTo(cpX, toY(pts[i - 1]), cpX, toY(pts[i]), toX(i), toY(pts[i]));
    }
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dots
    pts.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(toX(i), toY(v), 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#4CAF50';
        ctx.fill();
    });
}

/* ===== ONBOARDING CAROUSEL ===== */
let currentSlide = 0;
const totalSlides = 5;

function goToSlide(idx) {
    const slides = document.querySelectorAll('.onboarding-slide');
    const dots = document.querySelectorAll('.ob-dot');
    const nextBtn = document.getElementById('obNext');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = Math.max(0, Math.min(idx, totalSlides - 1));
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    nextBtn.textContent = currentSlide === totalSlides - 1 ? 'Get Started ↓' : 'Next →';
}

document.getElementById('obNext').addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    else document.getElementById('download').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('obPrev').addEventListener('click', () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
});
document.querySelectorAll('.ob-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

/* ===== INTERSECTION OBSERVER (entrance animations) ===== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.step-card, .feature-card, .insight-feat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

/* ===== CATEGORY BARS ANIMATE ON SCROLL ===== */
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.cat-bar-fill').forEach(bar => {
                const target = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => { bar.style.transition = 'width 0.8s ease'; bar.style.width = target; }, 100);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.mock-card').forEach(el => barObserver.observe(el));

/* ===== INJECT APP ICONS ===== */
function injectAppIcons() {
    if (!window.FinSageIcons) return;
    const I = window.FinSageIcons;

    // Transaction list icons in phone mockup
    const txIconMap = {
        'txicon-food': { fn: () => I.food('#A8E6A1') },
        'txicon-transport': { fn: () => I.transport('#90CAF9') },
        'txicon-income': { fn: () => I.income('#A8E6A1') },
        'txicon-shopping': { fn: () => I.shopping('#EF9A9A') },
    };
    Object.entries(txIconMap).forEach(([id, cfg]) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = cfg.fn();
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.padding = '5px'; // breathing room inside the 28px box
        }
    });

    // Savings badge trending icon
    const savingsEl = document.getElementById('savings-icon');
    if (savingsEl) savingsEl.innerHTML = I.trendingUp('#A8E6A1');

    // Dashboard mock topbar icons (Today + Refresh — same as DashboardScreen.kt)
    const topbarIcons = {
        'topbar-today': () => I.today('#CAC4CF'),
        'topbar-refresh': () => I.refresh('#CAC4CF'),
    };
    Object.entries(topbarIcons).forEach(([id, fn]) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = fn();
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.width = '14px';
            el.style.height = '14px';
        }
    });

    // Insight feature list icons (same icons as InsightsScreen.kt)
    const insightIcons = {
        'if-barchart': () => I.barChart('#90CAF9'),
        'if-trending': () => I.trendingUp('#A8E6A1'),
        'if-lightbulb': () => I.lightbulb('#FFCA28'),
        'if-ai': () => I.autoAwesome('#CE93D8'),
    };
    Object.entries(insightIcons).forEach(([id, fn]) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = fn();
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.width = '28px';
            el.style.height = '28px';
            el.style.flexShrink = '0';
            el.style.marginTop = '2px';
        }
    });

    // Onboarding carousel icons — using the actual onboarding drawable paths
    const obIcons = [
        // 0: Welcome — ic_onboarding_welcome (bank/building)
        () => I._svg('M4,10v7h3v-7H4zM10,10v7h3v-7h-3zM2,22h19v-3H2v3zM16,10v7h3v-7h-3zM11.5,1L2,6v2h19V6l-9.5,-5z'),
        // 1: Auto-Track — ic_onboarding_tracking (SMS bubble)
        () => I._svg('M20,2H4c-1.1,0 -1.99,0.9 -1.99,2L2,22l4,-4h14c1.1,0 2,-0.9 2,-2V4c0,-1.1 -0.9,-2 -2,-2zM9,11H7V9h2v2zM13,11h-2V9h2v2zM17,11h-2V9h2v2z'),
        // 2: Insights — ic_onboarding_insights (bar chart)
        () => I._svg('M19,3H5c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2V5c0,-1.1 -0.9,-2 -2,-2zM9,17H7v-7h2v7zM13,17h-2V7h2v10zM17,17h-2v-4h2v4z'),
        // 3: Smart Categorization — Icons.Default.Lightbulb (per user request)
        () => I.lightbulb(),
        // 4: Privacy — ic_onboarding_privacy (lock)
        () => I._svg('M18,8h-1V6c0,-2.76 -2.24,-5 -5,-5S7,3.24 7,6v2H6c-1.1,0 -2,0.9 -2,2v10c0,1.1 0.9,2 2,2h12c1.1,0 2,-0.9 2,-2V10c0,-1.1 -0.9,-2 -2,-2zM12,17c-1.1,0 -2,-0.9 -2,-2s0.9,-2 2,-2 2,0.9 2,2 -0.9,2 -2,2zM15.1,8H8.9V6c0,-1.71 1.39,-3.1 3.1,-3.1 1.71,0 3.1,1.39 3.1,3.1v2z'),
    ];
    obIcons.forEach((fn, i) => {
        const el = document.getElementById(`ob-icon-${i}`);
        if (el) {
            el.innerHTML = fn();
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.padding = '20px'; // breathing room inside the 100px circle
        }
    });
}

/* ===== INIT ===== */
window.addEventListener('load', () => {
    drawDonut();
    drawLineChart();
    injectAppIcons();
});

/* ===== DOWNLOAD MODAL ===== */
const modal = document.getElementById('downloadModal');
const closeBtn = document.getElementById('modalClose');

function openDownloadModal(e) {
    if (e) e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    loadDownloads();
}

function closeDownloadModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

if (closeBtn) closeBtn.addEventListener('click', closeDownloadModal);

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeDownloadModal();
    }
});

// Close on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeDownloadModal();
    }
});

async function loadDownloads() {
    const latestContainer = document.getElementById('latestVersionContainer');
    const olderContainer = document.querySelector('.older-versions-container');
    const olderList = document.getElementById('olderVersionsList');

    try {
        const response = await fetch('downloads/downloads.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const downloads = await response.json();
        
        if (!downloads || downloads.length === 0) {
            latestContainer.innerHTML = '<div class="modal-loading">No releases found.</div>';
            return;
        }

        const latest = downloads[0];
        
        // Fetch changelog text
        let changelogText = 'Initial release.';
        try {
            const clRes = await fetch(latest.changelogPath);
            if (clRes.ok) {
                changelogText = await clRes.text();
            }
        } catch (e) {
            console.error('Could not load changelog');
        }

        // Format changelog as list
        const lines = changelogText.split('\n').filter(l => l.trim().length > 0);
        let formattedChangelog = '';
        if (lines.length > 0) {
            formattedChangelog = `<p>${lines[0]}</p><ul>`;
            for (let i = 1; i < lines.length; i++) {
                formattedChangelog += `<li>${lines[i].replace(/^- /, '')}</li>`;
            }
            formattedChangelog += `</ul>`;
        } else {
            formattedChangelog = `<p>${changelogText}</p>`;
        }

        latestContainer.innerHTML = `
            <div class="latest-version-card">
                <div class="latest-header">
                    <span class="latest-badge">LATEST</span>
                    <span class="latest-date">${formatDate(latest.date)}</span>
                </div>
                <div class="latest-title">FinSage v${latest.version}</div>
                <div class="latest-changelog">
                    ${formattedChangelog}
                </div>
                <a href="${latest.apkPath}" class="dl-btn" download>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Download APK
                </a>
            </div>
        `;

        if (downloads.length > 1) {
            olderContainer.style.display = 'block';
            olderList.innerHTML = downloads.slice(1).map(dl => `
                <div class="older-item">
                    <div class="older-info">
                        <span class="older-ver">v${dl.version}</span>
                        <span class="older-date">${formatDate(dl.date)}</span>
                    </div>
                    <a href="${dl.apkPath}" class="older-dl" download>Download</a>
                </div>
            `).join('');
        } else {
            olderContainer.style.display = 'none';
        }

    } catch (error) {
        console.error('Error loading downloads:', error);
        latestContainer.innerHTML = '<div class="modal-loading">Failed to load releases. Please check GitHub.</div>';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

