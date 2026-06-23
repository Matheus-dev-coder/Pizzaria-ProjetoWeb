const tabs = document.querySelectorAll(".tab");
const pizzaCards = document.querySelectorAll(".pizza-card");
const addButtons = document.querySelectorAll(".add-button");
const orderList = document.querySelector("#order-list");
const orderTotal = document.querySelector("#order-total");
const finishButton = document.querySelector("#finish-order");

let order = []

function formatPrice(value) {
  return `R$ ${value}`;
}

function updateOrder() {
  orderList.innerHTML = "";

  if (order.length === 0) {
    orderList.innerHTML = '<li class="empty">Sua sacola esta vazia.</li>';
    orderTotal.textContent = "R$ 0";
    return;
  }

  let total = 0;

  order.forEach((item) => {
    total += item.price;
  
     const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${item.name}</span>
      <strong>${formatPrice(item.price)}</strong>
    `;

    orderList.appendChild(listItem);
  });

  orderTotal.textContent = formatPrice(total);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedCategory = tab.dataset.category;

    tabs.forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");

    pizzaCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "todas" || card.dataset.category === selectedCategory;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = {
      name: button.dataset.item,
      price: Number(button.dataset.price),
    };

    order.push(item);
    updateOrder();
  });
});

finishButton.addEventListener("click", () => {
  if (order.length === 0) {
    alert("Adicione uma pizza antes de finalizar o pedido.");
    return;
  }

  alert("Pedido recebido! Em breve a pizzaria entra em contato.");
  order = [];
  updateOrder();
});

if (window.lucide) {
  lucide.createIcons();
}

