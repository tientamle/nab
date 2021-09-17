// Simple Text Translate
const en = require('../languages/en');
const vn = require('../languages/vn');

// Default Language
const defaultLang = 'en';
const multiLang = { en, vn };

const translate = (req, text) => {
  let lang = req.header('language');
  if (!lang || multiLang[lang] === undefined) {
    lang = defaultLang;
  }

  if (multiLang[lang][text] !== undefined) {
    return multiLang[lang][text];
  }

  return text;
};

module.exports = translate;
