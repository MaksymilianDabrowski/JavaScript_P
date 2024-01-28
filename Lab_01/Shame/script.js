
function przelicz() {
    // pobranie wartości
    const jeden = document.getElementById("i1").value;
    const dwa = document.getElementById("i2").value;
    const trzy = document.getElementById("i3").value;
    const cztery = document.getElementById("i4").value;

    // parsowanie na liczbe
    let = liczba1 = parseFloat(jeden);
    let = liczba2 = parseFloat(dwa);
    let = liczba3 = parseFloat(trzy);
    let = liczba4 = parseFloat(cztery);

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

    // wyniki
    const wyniki = document.getElementById("wyniki");
    wyniki.innerHTML = "Suma: " + sum + "<br>";
    wyniki.innerHTML += "Średnia: " + avr + "<br>";
    wyniki.innerHTML += "Min: " + min + "<br>";
    wyniki.innerHTML += "Max: " + max + "<br>";
}