
// Napisz funkcję asyncAdd() który dodaje dwie liczby asynchronicznie. Operacja dodawania powinna zająć 100ms.
async function asyncAdd1() {
    const one = Math.floor(Math.random() * 100) + 1; console.log(one)
    const two = Math.floor(Math.random() * 100) + 1; console.log(two)
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = one + two;
            resolve(result);
            console.log(result);
        }, 100);
    });
}
measureTime(asyncAdd1);

// Napisz funkcję która pobiera dowolną ilość argumentów (liczby całkowite) i następnie korzysta z asyncAdd() by je dodać.
async function addMultipleNumbers() {
    const numbers = [5, 10, 15, 20];
    let sum = 0;

    for (const num of numbers) {
        const result = await asyncAdd1(numbers, sum);
        sum += result;
    }

    console.log('Suma dowolnych argumentów:', sum);
    return sum;

}
measureTime(addMultipleNumbers)


// Napisz funkcję mierzącą czas wykonania kodu.
async function measureTime(cb) {
    const startTime = performance.now();
    await cb();
    const endTime = performance.now();
    const time = (endTime - startTime);
    console.log(`Czas operacji wyniósł: ${time} ms`);
}

// Zmierz działanie funkcji dodającej dla zbiorów danych o wielkości 100 elementów. Wyświetl czas wykonania oraz ilość operacji asynchronicznych.
async function measureTimeFor100Elements() {
    const numbers = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100) + 1);
    await measureTime(async () => await addMultipleNumbers(numbers));
}

measureTimeFor100Elements();


