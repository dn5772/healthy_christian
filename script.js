// ========== 페이지 전환 ==========
function showPage(pageId, element) {
    document.querySelectorAll('.page-section').forEach(function(page) {
        page.classList.remove('active');
    });

    document.querySelectorAll('.nav-tab').forEach(function(tab) {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });

    document.getElementById(pageId).classList.add('active');

    element.classList.add('active');
    element.setAttribute('aria-selected', 'true');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 애니메이션 재실행
    var cards = document.querySelectorAll('#' + pageId + ' .section-card');
    cards.forEach(function(card) {
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = null;
    });
}

// ========== 언어 전환 ==========
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLang', lang);

    // 버튼 텍스트 업데이트
    var btn = document.getElementById('lang-toggle');
    if (btn) {
        btn.textContent = lang === 'ko' ? 'ENG' : '한';
    }

    // 타이틀 업데이트
    document.title = lang === 'ko'
        ? "Who's Jesus? & Healthy Christian"
        : "Who's Jesus? & Healthy Christian";
}

function toggleLanguage() {
    var currentLang = document.documentElement.lang || 'ko';
    var newLang = currentLang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
}

// ========== 초기화 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 1. 저장된 언어 설정 확인
    var savedLang = localStorage.getItem('preferredLang');

    if (savedLang) {
        setLanguage(savedLang);
    } else {
        // 2. 브라우저 언어 감지
        var browserLang = navigator.language || navigator.userLanguage || 'ko';
        var lang = browserLang.startsWith('ko') ? 'ko' : 'en';
        setLanguage(lang);
    }
});
