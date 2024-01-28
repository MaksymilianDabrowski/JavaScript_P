
// pobieramy wszystkie wartości z html używając querySelectorAll
const wszystkieLiczby = document.querySelectorAll(".liczb");

// w zapętleniu iterujemy po wprowadzonych zmiennych i przeliczamy wyniki
wszystkieLiczby.forEach(input => {
    input.addEventListener('input', przelicz);
})


function przelicz() {
    // zmienne wstępne
    let sum = 0;
    let avr = 0;
    let min = 0;
    let max = 0;

    // operacje
    sum = liczba1 + liczba2 + liczba3 + liczba4;
    avr = sum / 4;
    min = Math.min(liczba1, liczba2, liczba3, liczba4);
    max = Math.max(liczba1, liczba2, liczba3, liczba4);
    // console.log(sum);

    const wyniki = document.getElementById("wyniki");
    wyniki.innerHTML = "Suma: " + sum + "<br>";
    wyniki.innerHTML += "Średnia: " + avr + "<br>";
    wyniki.innerHTML += "Min: " + min + "<br>";
    wyniki.innerHTML += "Max: " + max + "<br>";
}

function dodajPole() {

    let poleDynamiczne = document.createElement("input");
    poleDynamiczne.type = "text";

    document.addEventListener(poleDynamiczne, przelicz);
}