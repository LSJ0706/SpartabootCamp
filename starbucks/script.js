document.addEventListener("DOMContentLoaded", () => {
  const menu = [
    { name: "아메리카노", price: 4100 },
    { name: "카페라떼", price: 4600 },
    { name: "카푸치노", price: 4600 },
    { name: "카라멜 마끼아또", price: 5800 },
    { name: "자바 칩 프라푸치노", price: 6300 },
    { name: "딸기 요거트 블렌디드", price: 6300 },
  ];

  let order = {};
  let totalPrice = 0;

  const menuContainer = document.getElementById("menu");
  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("total-price");
  const submitOrderButton = document.getElementById("submit-order");
  const div = document.createElement("div");

  menu.forEach((v) => {
    div.innerHTML = `
        <span>${v.name}</span>
        <span>&#8361 ${v.price} <button class="menu__btn">주문 추가</button></span>`;
    menuContainer.appendChild(div);
  });

  // TODO-1: 메뉴 아이템을 화면에 표시하는 코드를 작성하세요.
  // 힌트: menu 배열을 반복문(forEach)을 사용해 순회하며,

  // 각 메뉴 아이템을 div 요소로 생성한 후 menuContainer에 추가하세요.
  // div 요소 안에는 메뉴 이름과 가격을 표시하는 span 태그,
  // 그리고 '주문 추가' 버튼을 추가해야 합니다.

  // '주문 추가' 버튼에는 각 메뉴 아이템의 인덱스를 data-index 속성으로 저장하여,
  // 클릭 시 해당 메뉴를 식별할 수 있게 만드세요.

  // TODO-2: 주문 추가 로직을 작성하세요.
  // 힌트: menuContainer에 이벤트 리스너를 추가하고, 이벤트가 발생한 대상이 버튼인지 확인합니다.

  // 버튼의 data-index 속성을 이용해 어떤 메뉴가 클릭되었는지 파악한 후,
  // 해당 메뉴의 수량을 증가시키거나 새로 추가하세요.

  // 이후, 총 가격(totalPrice)을 업데이트하고,
  // 주문 목록을 업데이트하는 updateOrderList 함수를 호출하세요.

  // 예시 코드:
  // menu.forEach((item, index) => {
  //     // 각 메뉴 아이템에 대해 div 요소 생성 및 메뉴 아이템 추가
  // });

  // menuContainer.addEventListener('click', (event) => {
  //     if (event.target.tagName === 'BUTTON') {
  //         // 클릭된 버튼의 메뉴 아이템을 주문에 추가하는 로직 작성
  //     }
  // });

  // 주문 내역 업데이트 함수
  function updateOrderList() {
    orderList.innerHTML = "";
    for (let itemName in order) {
      const orderItem = order[itemName];
      const orderItemElement = document.createElement("li");
      orderItemElement.innerHTML = `
                ${itemName} - ₩${orderItem.price.toLocaleString()} x${
        orderItem.quantity
      }
                <button class="remove" data-item="${itemName}">삭제</button>
            `;
      orderList.appendChild(orderItemElement);
    }
    totalPriceElement.textContent = totalPrice.toLocaleString();
  }

  // 아이템 삭제 로직
  orderList.addEventListener("click", (event) => {
    const itemName = event.target.getAttribute("data-item");
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
