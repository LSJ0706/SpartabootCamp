document.addEventListener("DOMContentLoaded", () => {
  const menu = [
    { name: "아메리카노", price: 4100 },
    { name: "카페라떼", price: 4600 },
    { name: "카푸치노", price: 4600 },
    { name: "카라멜 마끼아또", price: 5800 },
    { name: "자바 칩 프라푸치노", price: 6300 },
    { name: "딸기 요거트 블렌디드", price: 6300 },
  ];

  //변수 초기화
  let order = {};
  let totalPrice = 0;
  const menuContainer = document.getElementById("menu");
  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("total-price");
  const submitOrderButton = document.getElementById("submit-order");

  //화면에 메뉴 표시
  menu.forEach((v, idx) => {
    const div = document.createElement("div");
    div.setAttribute("class", "menu-item");
    div.innerHTML = `
          <span>${v.name}</span>
          <span>&#8361 ${v.price} <button class="menu__btn">주문 추가</button></span>`;
    const btn = div.querySelector(".menu__btn");
    btn.setAttribute("data-index", idx);

    menuContainer.appendChild(div);
  });

  //메뉴 추가 로직
  menuContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const menuIndex = event.target.getAttribute("data-index");

      if (order[menu[menuIndex].name] === undefined) {
        order[menu[menuIndex].name] = {
          price: menu[menuIndex].price,
          quantity: 1,
        };
      } else {
        order[menu[menuIndex].name].quantity++;
      }
      totalPrice += menu[menuIndex].price;
    }

    updateOrderList();
  });

  // 주문 내역 업데이트 함수
  function updateOrderList() {
    orderList.innerHTML = "";
    for (let item in order) {
      const index = menu.findIndex((v) => v.name === item);
      const price = order[item].price;
      const quantity = order[item].quantity;
      const orderItemElement = document.createElement("li");
      orderItemElement.innerHTML = `
      ${item} - ₩${price} x ${quantity} 
      <button class="remove" data-index=${index}>삭제</button>
      `;
      orderList.appendChild(orderItemElement);
    }
    totalPriceElement.textContent = totalPrice.toLocaleString();
  }

  // 아이템 삭제 로직
  orderList.addEventListener("click", (event) => {
    const itemName = menu[event.target.getAttribute("data-index")].name;
    if (event.target.classList.contains("remove")) {
      totalPrice -= order[itemName].price * order[itemName].quantity;
      delete order[itemName];
      updateOrderList();
    }
  });

  // 주문 제출 로직
  submitOrderButton.addEventListener("click", () => {
    if (Object.keys(order).length > 0) {
      alert("주문해 주셔서 감사합니다!");
      order = {};
      totalPrice = 0;
      updateOrderList();
    } else {
      alert("주문 내역이 비어 있습니다!");
    }
  });
});
