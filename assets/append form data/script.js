/* Todo with this piece of crap...

-Replace all " with ' on submit
-Make it in one single string with no spaces
-Add a preview or something

*/


const scriptURL = 'https://script.google.com/macros/s/AKfycbzTAH-wQsl5onKwD1597h8MFi-Zo80Bf33CN-6gM-zADFXJ_vtNgL8kduZLq6pXPVw7/exec'

const form = document.forms['contact-form']
const message = document.getElementById('message');

function submitForm() {  
  var text = editor.getValue();

  message.name = document.getElementById('select').value;
  const today = new Date();
  const formattedDate = formatDate(today);
  text = compressString(text);

  let data = {
    "title": document.getElementById("title").value,
    "date": formattedDate,
    "body": text
  }
  message.value = JSON.stringify(data)
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatDate(date) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  const day = new Date(date).getDate();
  const suffix = getDaySuffix(day);
  
  return formattedDate.replace(/\d+/, (day) => day + suffix);
}


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => alert('Error!', error.message))
})

var editor;

require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.23.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
  monaco.editor.defineTheme('dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {}
});

monaco.editor.setTheme('dark');

    editor = monaco.editor.create(document.getElementById('editor'), {
        value: `<div class="sideBar">
 <div class="sideBarArticle">

  </div>
</div>

<div class="article">
    
</div>`,
        language: 'html',
        theme: 'dark'
    });
});

document.getElementById('editor').style.fontFamily = 'Courier New, Courier, monospace';
document.getElementById('editor').style.fontSize = '10px';

function compressString(inputString) {
  
  function insertImgTag(match) {
    return match + '<img class=\'dlIcon\' src=\'assets/download-white.png\'></img>';
  }

  let compressedString = inputString.replace(/\n/g, "").replace(/"/g, "'").replace(/<[^>]*class=['"]dlButton['"][^>]*>/g, insertImgTag);
  return compressedString;
}

// Test the function
