document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
  
    const copyButton = createButton('Copy to Clipboard');
    container.appendChild(copyButton);
  
    const yyyy_mm_dd_button = createButton('yyyy/mm/dd', 'yyyy-mm-dd');
    container.appendChild(yyyy_mm_dd_button);
  
    const yyyy_mm_dd_kanji_button = createButton('yyyy年mm月dd日', 'yyyy-mm-dd-kanji');
    container.appendChild(yyyy_mm_dd_kanji_button);
  
    const mm_dd_button = createButton('mm/dd', 'mm-dd');
    container.appendChild(mm_dd_button);
  
    const yyyy_mm_button = createButton('yyyy/mm', 'yyyy-mm');
    container.appendChild(yyyy_mm_button);
  
    yyyy_mm_dd_button.addEventListener('click', () => {
      const today = getTodaysDate('yyyy/mm/dd');
      copyToClipboard(today);
    });
  
    yyyy_mm_dd_kanji_button.addEventListener('click', () => {
      const today = getTodaysDate('yyyy年mm月dd日');
      copyToClipboard(today);
    });
  
    mm_dd_button.addEventListener('click', () => {
      const today = getTodaysDate('mm/dd');
      copyToClipboard(today);
    });
  
    yyyy_mm_button.addEventListener('click', () => {
      const today = getTodaysDate('yyyy/mm');
      copyToClipboard(today);
    });
  
    copyButton.addEventListener('click', () => {
      const today = getTodaysDate('yyyy/mm/dd');
      copyToClipboard(today);
    });
  
    chrome.action.onClicked.addListener(() => {
      const today = getTodaysDate('yyyy/mm/dd');
      copyToClipboard(today);
    });
  });
  
  function createButton(label, id) {
    const button = document.createElement('button');
    button.classList.add('button');
    if (id) {
      button.id = id;
    }
    button.textContent = label;
    button.style.marginRight = '5px';
    return button;
  }
  
  
  
  function getTodaysDate(format) {
    const today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
  
    if (format === 'yyyy/mm/dd') {
      // yyyy/mm/dd format
      return `${year}/${month}/${day}`;
    } else if (format === 'yyyy年mm月dd日') {
      // yyyy年mm月dd日 format
      year = today.getFullYear();
      month = String(today.getMonth() + 1).padStart(2, '0');
      day = String(today.getDate()).padStart(2, '0');
      return `${year}年${month}月${day}日`;
    } else if (format === 'mm/dd') {
      // mm/dd format
      return `${month}/${day}`;
    } else if (format === 'yyyy/mm') {
      // yyyy/mm format
      return `${year}/${month}`;
    } else {
      // default to yyyy/mm/dd format
      return `${year}/${month}/${day}`;
    }
  }
  
  function copyToClipboard(text) {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  }