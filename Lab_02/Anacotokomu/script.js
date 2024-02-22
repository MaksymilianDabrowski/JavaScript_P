
let slideIndex = 1; // deklarujemy pierwszy slajd
showSlides(slideIndex);

// setInterval() - medota wyświetlania funkcji po upływie określonego czasu
setInterval(() => {
    nextSlide(1);
}, 4000); // 4000ms 

// Kontrola slajdów
function nextSlide(n) {
    showSlides(slideIndex += n);
}

// kropki
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// funkcja odpowiedzialna za slajder
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slider");
    let dots = document.getElementsByClassName("dots");
    if (n > slides.length) { slideIndex = 1 } // zapętlenie po osiągnięciu 3. slajdu

    // ustawia slajder w miejscu pierwszego wyświetlanego zdjęcia
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // usuwa "zaznaczenie" kropek po ich kliknięciu
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // pokazuje wyświetlane zdjęcie
    slides[slideIndex - 1].style.display = "block";
    // podświetla wyświetlaną kropkę
    dots[slideIndex - 1].className += " active";
}