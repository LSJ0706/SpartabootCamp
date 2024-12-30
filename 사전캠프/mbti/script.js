const results = {
  ESTJ: "당신은 현실적이고 실용적인 리더입니다! (ESTJ - 경영자)",
  ENTJ: "당신은 대담하고 결단력 있는 전략가입니다! (ENTJ - 통솔자)",
  ESFJ: "당신은 친절하고 외교적인 제공자입니다! (ESFJ - 집정관)",
  ENFJ: "당신은 카리스마 있고 영감을 주는 리더입니다! (ENFJ - 선도자)",
  ISTJ: "당신은 책임감 있고 신뢰할 수 있는 관리자입니다! (ISTJ - 논리주의자)",
  INTJ: "당신은 독창적이고 결단력 있는 전략가입니다! (INTJ - 과학자)",
  ISFJ: "당신은 헌신적이고 믿을 수 있는 수호자입니다! (ISFJ - 수호자)",
  INFJ: "당신은 통찰력 있고 이상적인 조언자입니다! (INFJ - 옹호자)",
  ESTP: "당신은 활동적이고 과감한 도전자입니다! (ESTP - 사업가)",
  ENTP: "당신은 창의적이고 전략적인 사상가입니다! (ENTP - 발명가)",
  ESFP: "당신은 외향적이고 자유로운 연예인입니다! (ESFP - 연예인)",
  ENFP: "당신은 열정적이고 자유로운 활동가입니다! (ENFP - 재기발랄한 활동가)",
  ISTP: "당신은 독립적이고 실용적인 장인입니다! (ISTP - 장인)",
  INTP: "당신은 논리적이고 창의적인 사색가입니다! (INTP - 논리학자)",
  ISFP: "당신은 온화하고 예술적인 탐구자입니다! (ISFP - 예술가)",
  INFP: "당신은 이상적이고 성찰적인 중재자입니다! (INFP - 중재자)",
};
const form = document.getElementById("quiz-form");
const submitButton = document.getElementById("submit-button");
// 사용자가 퀴즈를 완료했을 때 호출되는 함수
function calculateResult() {
  // 각 MBTI 성향별로 점수를 저장할 객체
  let score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // 폼 데이터를 가져옴
  const formData = new FormData(form);

  // 폼 데이터에 포함된 값을 기반으로 점수를 계산
  for (let value of formData.values()) {
    score[value] = score[value] + 1;
  }
  const mbti = [
    ["E", "I"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ];
  let personalityType = `${mbti.reduce((acc, [v1, v2]) => {
    return acc + (score[v1] >= score[v2] ? v1 : v2);
  }, "")}`;
  console.log(personalityType);
  document.getElementById("result-text").innerText = results[personalityType];
  document.getElementById("result").classList.remove("hide");
}

// 퀴즈를 초기 상태로 되돌리는 함수
function resetQuiz() {
  document.getElementById("quiz-form").reset();
  document.getElementById("result").classList.add("hide");
  submitButton.disabled = true;
}

function checkRadioSeleted() {
  const allAnswered = ["q1", "q2", "q3", "q4"].every((name) => {
    return form.querySelector(`input[name="${name}"]:checked`);
  });
  submitButton.disabled = !allAnswered;
}

form.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", checkRadioSeleted);
});
submitButton.addEventListener("click", calculateResult);
document.getElementById("reset-button").addEventListener("click", resetQuiz);
