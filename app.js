const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

function compareWords(word1, word2) {
  const vowels = /[aeiouаеёиоуыэюя]/gi;
  const consonants = /[bcdfghjklmnpqrstvwxyzбвгджзйклмнпрстфхцчшщ]/gi;

  // Функция для подсчета количества гласных и согласных букв
  function countLetters(word) {
    const vowelsCount = (word.match(vowels) || []).length;
    const consonantsCount = (word.match(consonants) || []).length;
    return { vowels: vowelsCount, consonants: consonantsCount };
  }

  const word1Counts = countLetters(word1.toLowerCase());
  const word2Counts = countLetters(word2.toLowerCase());

  // Сравниваем количество гласных и согласных букв
  if (
    word1Counts.vowels === word2Counts.vowels &&
    word1Counts.consonants === word2Counts.consonants
  ) {
    return `${word1} ${word2}`;
  } else {
    return `${word1} не ${word2}`;
  }
}

app.post('/', (req, res) => {

    let responseText = compareWords(res, req);
    
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Сравнение слов</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <div class="container">
        <h1>${responseText}</h1>
        <a href="/">Назад</a>
      </div>
      <script>
        const wordToCompareInput = document.getElementById('wordToCompareInput');
        const storedWordToCompare = localStorage.getItem('wordToCompare');
        if (storedWordToCompare) {
          wordToCompareInput.value = storedWordToCompare;
        }
        wordToCompareInput.addEventListener('input', (event) => {
          localStorage.setItem('wordToCompare', event.target.value);
        });
      </script>
    </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
