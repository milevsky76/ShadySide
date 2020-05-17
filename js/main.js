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
let obb = JSON.parse(localStorage.getItem('obb'))

if (!obb) {
    obb = {
        "usR": 1,
        "usG": 0,
        "usB": 0,
        "usA": 1,
        "ff": false,
        "dow": {}
    };

    obb.dow[`${obb.usR},${obb.usG},${obb.usB}`] = [];

    localStorage.setItem('obb', JSON.stringify(obb));
}

//Основной цикл
if (obb.usA < 100) {
    pick();
    location.href = location.href;
}

//Запаковка в файл
if (obb.usA == 100) {
    download(`${obb.usR},${obb.usG},${obb.usB}.txt`, `'${JSON.stringify(obb.dow)}'`);
    obb.usA++;
    obb.ff = true;
}

//Увеличение under side RED на 1
if (obb.usA == 101 && obb.ff) {
    setTimeout(() => alert('Привет'), 1000);
    obb.usR++;
    obb.usA = 1;
    obb.ff = false;
    obb.dow[`${obb.usR},${obb.usG},${obb.usB}`] = [];
    localStorage.clear();
    localStorage.setItem('obb', JSON.stringify(obb));
}

// const end = new Date().getTime();
// console.log(`SecondWay: ${((end - start) / 1000)}s`);
//============================>

function pick() {
    ctx.fillStyle = 'rgba( ' + fillColor + ',1)';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle = `rgba( ${obb.usR} ${obb.usG} ${obb.usB} / ${obb.usA}%)`;
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    imageData2 = ctx.getImageData(0, 0, 1, 1).data;

    obb.dow[`${obb.usR},${obb.usG},${obb.usB}`].push(`${imageData2[0]},${imageData2[1]},${imageData2[2]}`);

    obb.usA++;

    localStorage.setItem('obb', JSON.stringify(obb));
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