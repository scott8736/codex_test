const form = document.querySelector("#fortune-form");
const result = document.querySelector("#result");

const fortunes = [
  { keyword: "새로운 시작", message: "익숙한 길에서도 새로운 표지판을 발견하는 날입니다. 망설였던 일이 있다면 작게라도 시작해 보세요. 가벼운 첫걸음이 생각보다 멀리 데려다줄 거예요." },
  { keyword: "따뜻한 인연", message: "사람 사이의 온기가 유난히 선명한 날입니다. 먼저 건넨 다정한 한마디가 좋은 흐름으로 돌아옵니다. 오래 미뤄둔 안부를 전해 보세요." },
  { keyword: "단단한 중심", message: "주변의 소음보다 내 안의 목소리가 중요한 날입니다. 서두르지 말고 우선순위를 하나씩 살피면 원하는 방향이 자연스럽게 또렷해집니다." },
  { keyword: "고요한 성장", message: "눈에 띄는 성과보다 보이지 않는 뿌리가 자라는 날입니다. 지금의 꾸준함을 의심하지 마세요. 오늘 쌓은 작은 노력이 곧 든든한 기반이 됩니다." },
  { keyword: "기분 좋은 전환", message: "막혀 있던 흐름에 작은 틈이 열립니다. 계획과 조금 달라도 유연하게 받아들이면 뜻밖의 기회를 만날 수 있어요. 새로운 제안에 귀 기울여 보세요." },
];

const luckyColors = ["솔잎색", "동백색", "달빛 베이지", "먹빛 남색", "옥빛 초록"];
const luckyTimes = ["오전 9–11시", "오후 1–3시", "오후 4–6시", "저녁 7–9시", "밤 9–11시"];

function hash(text) {
  return [...text].reduce((value, char) => ((value << 5) - value + char.charCodeAt(0)) | 0, 0);
}

function score(seed, offset) {
  return 68 + (Math.abs(seed * (offset + 7) + offset * 31) % 30);
}

function setScore(id, value) {
  document.querySelector(`#score-${id}`).textContent = `${value}점`;
  document.querySelector(`#bar-${id}`).style.width = `${value}%`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const seed = hash(`${data.get("name")}${data.get("birthdate")}${data.get("birthtime")}${dateKey}`);
  const fortune = fortunes[Math.abs(seed) % fortunes.length];

  document.querySelector("#result-date").textContent = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(today);
  document.querySelector("#result-name").textContent = data.get("name").trim();
  document.querySelector("#result-keyword").textContent = fortune.keyword;
  document.querySelector("#result-message").textContent = fortune.message;
  setScore("total", score(seed, 1));
  setScore("love", score(seed, 2));
  setScore("money", score(seed, 3));
  setScore("work", score(seed, 4));
  document.querySelector("#lucky-color").textContent = luckyColors[Math.abs(seed + 2) % luckyColors.length];
  document.querySelector("#lucky-number").textContent = `${(Math.abs(seed) % 9) + 1}`;
  document.querySelector("#lucky-time").textContent = luckyTimes[Math.abs(seed + 4) % luckyTimes.length];

  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "center" });
});

function closeResult() {
  result.hidden = true;
  document.querySelector("#name").focus();
}

document.querySelector(".close-result").addEventListener("click", closeResult);
document.querySelector("#again-button").addEventListener("click", closeResult);

document.querySelector("#birthdate").max = new Date().toISOString().split("T")[0];
