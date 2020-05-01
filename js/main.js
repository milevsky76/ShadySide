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
    return toHex(R) + toHex(G) + toHex(B);
}

//Нахождение hex, принимает один из цветовых каналов rgb
function toHex(n) {
    n = parseInt(n, 10);

    if (isNaN(n)) {
        return "00";
    }

    n = Math.max(0, Math.min(n, 255));

    return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
}

