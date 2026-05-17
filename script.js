// script.js

// Podpinamy się pod formularz
document.getElementById('bmi-form').addEventListener('submit', function(e) {
    // Zapobiegamy domyślnemu odświeżeniu strony po kliknięciu "Oblicz"
    e.preventDefault();

    // Pobieramy wartości z pól
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const heightCm = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Przeliczamy wzrost na metry
    const heightM = heightCm / 100;

    // Obliczamy BMI: waga (kg) podzielona przez wzrost do kwadratu (m^2)
    const bmi = weight / (heightM * heightM);

    // Obliczamy szacunkowy procent tkanki tłuszczowej (formuła Deurenberga dla dorosłych)
    // gender_factor: Mężczyzna = 1, Kobieta = 0
    const genderFactor = gender === 'male' ? 1 : 0;
    const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4;

    // Ustalamy kategorię BMI i odpowiedni kolor
    let category = '';
    let colorClass = '';

    if (bmi < 18.5) {
        category = 'Niedowaga';
        colorClass = 'underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Waga prawidłowa';
        colorClass = 'normal';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Nadwaga';
        colorClass = 'overweight';
    } else {
        category = 'Otyłość';
        colorClass = 'obese';
    }

    // Wyświetlamy wynik na stronie
    const resultDiv = document.getElementById('result');
    
    // Tworzymy kod HTML dla wyniku używając tzw. template stringów (odwrotne apostrofy)
    resultDiv.innerHTML = `
        <h2 class="${colorClass}">BMI: ${bmi.toFixed(2)}</h2>
        <p><strong>Kategoria:</strong> <span class="${colorClass}">${category}</span></p>
        <p><strong>Szacowana tkanka tłuszczowa:</strong> ${bodyFat.toFixed(1)}%</p>
        <br>
        <p style="font-size: 0.85em; color: #7f8c8d;">
            *Wynik uwzględnia wiek i płeć przy szacowaniu poziomu tkanki tłuszczowej.
        </p>
    `;

    // Usuwamy klasę 'hidden', aby pokazać blok z wynikiem
    resultDiv.classList.remove('hidden');
});