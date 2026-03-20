const SUPPORTED = ['en','hi','de','ja','fr','te','ru','ko','es','it','zh','nl','pt'];
window.translations = {};

window.loadLanguage = async function(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'en';
  const res = await fetch(`locales/${lang}.json`);
  window.translations = await res.json();
  localStorage.setItem('portfolio-lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  document.dispatchEvent(new Event('i18n:ready'));
}

function applyTranslations() {
  // Normal text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (window.translations[key]) el.textContent = window.translations[key];
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (window.translations[key]) el.placeholder = window.translations[key];
  });
  // Update switcher
  const sw = document.getElementById('lang-switcher');
  if (sw) sw.value = localStorage.getItem('portfolio-lang') || 'en';
}

// Auto-init
const saved = localStorage.getItem('portfolio-lang') 
           || navigator.language.slice(0,2);
loadLanguage(saved);