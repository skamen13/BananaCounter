const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.post('/', (req, res) => {

    const wordToCompare = req.body.wordToCompare.toLowerCase();
    const wordToCheck = req.body.wordToCheck.toLowerCase();

    const vowelsCompare = wordToCompare.match(/[aeiouаеёиоуыэюя]/gi) || [];
    const consonantsCompare = wordToCompare.match(/[bcdfghjklmnpqrstvwxyzбвгджзйклмнпрстфхцчшщ]/gi) || [];

    const vowelsCheck = wordToCheck.match(/[aeiouаеёиоуыэюя]/gi) || [];
    const consonantsCheck = wordToCheck.match(/[bcdfghjklmnpqrstvwxyzбвгджзйклмнпрстфхцчшщ]/gi) || [];

    let responseText = '';

    if (vowelsCheck.length === vowelsCompare.length && consonantsCheck.length === consonantsCompare.length) {
        responseText = `${wordToCheck} равно ${wordToCompare}`;
    } else {
        responseText = `${wordToCheck} не ${wordToCompare}`;
    }



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
