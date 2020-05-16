//Получение canvas
let canvas = document.getElementById('canvas');

//Получение контекста рисования на холсте
let ctx = canvas.getContext('2d');

let fillColor = '0,0,0';
//Заливка холста
// ctx.fillStyle = 'rgba( ' + fillColor + ',1)';
// ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

let mass = [];

let fileBody = {};
// let alpha;
let imageData2;
//============================>
// const start = new Date().getTime();
let usR = localStorage.getItem('usR');
let usG = 0;
let usB = 0;
let ff = false;
let a = localStorage.getItem('a');

//альфа канал 1-99
if (!a) {
    localStorage.setItem('a', 1);
    a = localStorage.getItem('a');
}

//under side RED
if (!usR) {
    localStorage.setItem('usR', 1);
    usR = localStorage.getItem('usR');
}

//Основной цикл
if (a < 100) {
    pick();
    location.href = location.href;
}

//Запаковка в файл
if (a == 100) {
    lsToFile();
    download(`${usR},0,0.txt`, `'${JSON.stringify(fileBody)}'`);
    a++;
    localStorage.setItem('a', a);
    ff = true;

    console.log('Конец!');
}

//Увеличение under side RED на 1
if (a == 101 && ff) {
    setTimeout(() => alert('Привет'), 1000);
    usR++;
    localStorage.clear();
    localStorage.setItem('usR', usR);
}

// const end = new Date().getTime();
// console.log(`SecondWay: ${((end - start) / 1000)}s`);
//============================>

function pick() {
    // for (let usA = 96; usA < 99; usA++) {
    // if ((usA + '').length == 1) {
    //     alpha = '0.0' + usA - 0;
    // }
    // if ((usA + '').length == 2) {
    //     alpha = '0.' + usA - 0;
    // }

    ctx.fillStyle = 'rgba( ' + fillColor + ',1)';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle = `rgba( ${usR} ${usG} ${usB} / ${a}%)`;
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    imageData2 = ctx.getImageData(0, 0, 1, 1).data;

    localStorage.setItem(a, `${imageData2[0]},${imageData2[1]},${imageData2[2]}`);

    a++;

    localStorage.setItem('a', a);
}

function lsToFile() {
    for (let i = 1; i < 100; i++) {
        mass.push(localStorage.getItem(i));

        fileBody[`${usR},${usG},${usB}`] = mass;
    }
}

function download(filename, text) {
    let fileLink = document.createElement('a');
    fileLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    fileLink.setAttribute('download', filename);
    fileLink.style.display = 'none';

    document.body.appendChild(fileLink);

    fileLink.click();

    document.body.removeChild(fileLink);
}

//Преобразование RGB в Hex
function rgbToHex(R, G, B) {
    R = R.toString(16);

    if (R.length == 1) {
        R = '0' + R;
    }

    G = G.toString(16);

    if (G.length == 1) {
        G = '0' + G;
    }

    B = B.toString(16);

    if (B.length == 1) {
        B = '0' + B;
    }

    return (R + G + B).toUpperCase();
}

//Добавление слушателя событий для canvas, захватываем результат на этапе всплывания события
canvas.addEventListener('click', function (event) {
    //Объявление переменных
    let x, y, imageData, R, G, B, RGB, Hex;

    //Получение координат клика мыши
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    //Получение цвета пикселя
    imageData = ctx.getImageData(x, y, 1, 1).data;

    //Разделение цветовых каналов
    R = imageData[0];
    G = imageData[1];
    B = imageData[2];

    //Формирование RGB строки
    RGB = R + ',' + G + ',' + B;

    //Формирование Hex строки
    Hex = rgbToHex(R, G, B);

    //Вывод значений
    document.getElementById('rgb').value = RGB;
    document.getElementById('hex').value = '#' + Hex;
}, false);