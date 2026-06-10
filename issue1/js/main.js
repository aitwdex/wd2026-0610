// 　↓ プログラムでわからなかった部分をLLMに聞き、理解をしたのち、使用した。
// 　https://gemini.google.com/share/7f41db995892

import { codeToText, codeToEmoji, codeToWindDirection } from "./weatherText.js";

// 都市の名前(name)・経度(lat)・緯度(lon)の格納クラス
const cityData = {
  "#Hokkaido": { name: "札幌", lat: 43.0641, lon: 141.3469 },
  "#Sendai": { name: "仙台", lat: 38.2682, lon: 140.8694 },
  "#Tokyo": { name: "東京", lat: 35.6895, lon: 139.6917 },
  "#Nigata": { name: "新潟", lat: 37.9161, lon: 139.0364 },
  "#Nagoya": { name: "名古屋", lat: 35.1814, lon: 136.9063 },
  "#Kanazawa": { name: "金沢", lat: 36.5613, lon: 136.6562 },
  "#Osaka": { name: "大阪", lat: 34.6937, lon: 135.5021 },
  "#Hiroshima": { name: "広島", lat: 34.3853, lon: 132.4553 },
  "#Kochi": { name: "高知", lat: 33.5597, lon: 133.5311 },
  "#Fukuoka": { name: "福岡", lat: 33.5902, lon: 130.4017 },
  "#Naha": { name: "那覇", lat: 26.2124, lon: 127.6809 }
};

// デフォルトの都市
let selectedCityId = "#Tokyo";

// 都市が選択されるたびに、そのidを取得
const navLinks = document.querySelectorAll(".nav-link"); //navLinksにnav-link（都市の天気のリンク）を全て代入
navLinks.forEach(link => { //forEach = それぞれ
  link.addEventListener("click", (e) => {
    // デフォルトの挙動（ページ内ジャンプ）を止める → 私のやりたいことはこのサイトで表示させることだから？
    e.preventDefault();

    // // 全てのリンクからactiveクラスを消し、クリックされたものに付ける
    // navLinks.forEach(l => l.classList.remove("active"));
    // link.classList.add("active");

    // hrefの値（#Tokyoなど）を取得して保存
    selectedCityId = link.getAttribute("href");

    // 見た目の文字（都市名）をブランド部分に出す
    document.querySelector(".navbar-brand").textContent = `選択中: ${link.textContent}`;
  });
});

//ボタンが押されたらgetWeather関数が開始
document.getElementById("getBtn").addEventListener("click", () => {
  getWeather(selectedCityId); //最後に取得したidを使用
});

// リンクをidから作成し取得　→ リンクから得られた情報を代入
async function getWeather(cityId) {
  try {
    const coords = cityData[cityId];
    if (!coords) return; //コードが代入されない＝載っていない　→ 強制終了

    //cityDataから都市名を取得する
    const cityName = coords.name;

    // API URLの組み立て
    // ${coords.lat} = cityDataのlatが代入される
    // ${coords.lon} = cityDataのlonが代入される
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&timezone=Asia%2FTokyo`;

    const response = await fetch(url); //データが届いたら次に行くようにawaitをつける
    if (!response.ok) return; //.ok = データを取りに行った通信が成功した場合

    const data = await response.json();

    const code = data.current_weather.weathercode; //天気
    const temp = data.current_weather.temperature; //気温
    const wind_sp = data.current_weather.windspeed; //風速
    const wind_dr = data.current_weather.winddirection; //風向き

    const code1 = code; //codeToText用
    const code2 = code; //codeToEmoji用
    const code3 = wind_dr; //codeToWindDirection用

    // 自作ライブラリで数字→日本語に変換
    const weather1 = codeToText(code1);
    const weather2 = codeToEmoji(code2);
    const weather3 = codeToWindDirection(code3);

    document.getElementById("temp_cityname").textContent = cityName;
    document.getElementById("temp_emoji").textContent = weather2
    document.getElementById("temp_wheather_text").textContent = weather1;
    document.getElementById("temp_tempreture_text").textContent = '気温:　' + temp + '　℃';
    document.getElementById("temp_windspeed_text").textContent = '風速:　' + wind_sp + '　m/s';
    document.getElementById("temp_winddirection_text").textContent = '風向:　' + weather3;


  } catch (error) {
    console.error("取得に失敗しました:", error);
    document.getElementById("temp_cityname").textContent = "取得に失敗しました";
    document.getElementById("temp_text").textContent = "取得に失敗しました";
    document.getElementById("temp_emoji").textContent = "取得に失敗しました";
    document.getElementById("temp_wheather_text").textContent = "取得に失敗しました";
    document.getElementById("temp_tempreture_text").textContent = "取得に失敗しました";
    document.getElementById("temp_windspeed_text").textContent = "取得に失敗しました";
    document.getElementById("temp_winddirection_text").textContent = "取得に失敗しました";
  }
}