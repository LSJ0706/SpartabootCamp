document.addEventListener("DOMContentLoaded", function () {
  const random = document.getElementById("random");
  const answer = document.getElementById("answer");
  const startButton = document.getElementById("start");
  const submitButton = document.getElementById("submit");
  let memoryNum;

  const start = () => {
    document.getElementById("result").textContent = "";
    answer.value = "";
    const randomNum = Math.floor(Math.random() * 10000);
    random.textContent = randomNum;
    memoryNum = randomNum;
    setTimeout(() => {
      random.textContent = "";
    }, 500);
  };

  const submit = () => {
    if (Math.floor(answer.value) === memoryNum) {
      document.getElementById("result").textContent = "정답입니다.";
    } else {
      document.getElementById(
        "result"
      ).textContent = `오답입니다. 정답은 ${memoryNum} 입니다.`;
    }
  };

  answer.addEventListener("input", () => {
    answer.value = answer.value.replace(/[^0-9]/g, "");
  });

  startButton.addEventListener("click", () => {
    start();
  });

  submitButton.addEventListener("click", () => {
    submit();
  });
});
