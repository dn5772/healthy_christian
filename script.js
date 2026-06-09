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
var SUPPORTED_LANGS = ['ko', 'en', 'zh'];

function setLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) {
        lang = 'ko';
    }
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLang', lang);

    // 활성 버튼 표시
    document.querySelectorAll('.lang-toggle-btn').forEach(function(btn) {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });

    document.title = "Who's Jesus? & Healthy Christian";
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
        var lang;
        if (browserLang.startsWith('ko')) {
            lang = 'ko';
        } else if (browserLang.startsWith('zh')) {
            lang = 'zh';
        } else {
            lang = 'en';
        }
        setLanguage(lang);
    }
});
