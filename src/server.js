const dotenv = require('dotenv');
const path = require('path');

// Ładuje zmienne środowiskowe z pliku .env
const result = dotenv.config({ path: path.resolve(__dirname, './config.env') });

// Sprawdza, czy wystąpił błąd podczas ładowania pliku .env
if (result.error) {
    console.error("ERROR💥:", result.error.message);
    process.exit(1); // Zamyka proces, jeśli plik .env nie może być załadowany
}

const app = require('./app');
const port = process.env.PORT; // Pobiera port zmienną z process.env

if (!port) {
    console.error("ERROR💥: PORT is not defined in the .env file.");
    process.exit(1); // Zamyka proces, jeśli zmienna PORT nie jest zdefiniowana w pliku .env
}

app.listen(port, () => {
    console.log(`App running on port ${port}...😁`);
});