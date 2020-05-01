//Получение canvas
let canvas = document.getElementById('canvas');

//Получение контекста рисования на холсте
let ctx = canvas.getContext('2d');

//Заливка холста
ctx.fillStyle = 'rgba( 255 , 255, 255, 1)';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

//Цвет 1
ctx.fillStyle = 'rgba( 20 , 100 , 150, 0.5)';
ctx.fillRect(canvas.clientWidth / 2, 0, canvas.clientWidth - canvas.clientWidth / 2, canvas.clientHeight / 2);

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