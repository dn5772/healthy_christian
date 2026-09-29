// ========== 페이지 전환 ==========
var PAGES = ['page1', 'page2', 'page3'];

function showPage(pageId) {
    if (PAGES.indexOf(pageId) === -1) {
        pageId = 'page1';
    }

    document.querySelectorAll('.page').forEach(function(page) {
        page.classList.toggle('active', page.id === pageId);
    });

    document.querySelectorAll('.tab').forEach(function(tab) {
        tab.setAttribute('aria-selected', tab.getAttribute('data-page') === pageId ? 'true' : 'false');
    });

    window.scrollTo({ top: 0 });
}

window.addEventListener('hashchange', function() {
    showPage(location.hash.slice(1));
});

// ========== 언어 전환 ==========
var SUPPORTED_LANGS = ['ko', 'en', 'zh'];

function setLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) {
        lang = 'ko';
    }
    document.documentElement.lang = lang;
    try { localStorage.setItem('preferredLang', lang); } catch (e) {}

    // 활성 버튼 표시
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        var active = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

// ========== 초기화 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 1. 저장된 언어 설정 확인
    var savedLang = null;
    try { savedLang = localStorage.getItem('preferredLang'); } catch (e) {}

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

    // 3. 주소의 #page 로 시작 탭 결정
    showPage(location.hash.slice(1));

    // 4. 로고는 탭마다 처음 열 때 한 번만 그린다 (중간에 탭을 옮기면 다음에 다시 그림)
    document.querySelectorAll('.logo.is-drawing').forEach(function(logo) {
        logo.addEventListener('animationend', function(e) {
            if (e.target === logo || e.target.classList.contains('last')) {
                logo.classList.remove('is-drawing');
            }
        });
    });
});
