
// WMO天気コード（数字）を受け取って、日本語を返す

//天気（文字）
export function codeToText(code1) {

    if (code1 === 0) {
        return "快晴";
    }

    if (code1 <= 3) {
        return "晴れ〜曇り";
    }

    if (code1 <= 48) {
        return "霧";
    }

    if (code1 <= 67) {
        return "雨";
    }

    if (code1 <= 77) {
        return "雪";
    }

    if (code1 <= 82) {
        return "にわか雨";
    }

    else {
        return "雷雨";
    }
}

//天気（記号）
export function codeToEmoji(code2) {

    if (code2 === 0) {
        return "☀️";
    }

    if (code2 <= 3) {
        return "⛅";
    }

    if (code2 <= 48) {
        return "🌫️";
    }

    if (code2 <= 67) {
        return "🌧️";
    }

    if (code2 <= 77) {
        return "❄️";
    }

    if (code2 <= 82) {
        return "🌦️";
    }

    else {
        return "⛈️";
    }
}

//風向
export function codeToWindDirection(code3) {

    if (code3 >= 0 && code3 <= 45 || code3 >= 225 && code3 <= 360) {
        return "北";
    }

    if (code3 >= 45 && code3 <= 135) {
        return "東";
    }

    if (code3 >= 135 && code3 <= 225) {
        return "南";
    }

    else {
        return "西";
    }
}