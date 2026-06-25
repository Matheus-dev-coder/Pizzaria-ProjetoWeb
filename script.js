const tabs = document.querySelectorAll(".tab");
const pizzaCards = document.querySelectorAll(".pizza-card");
const addButtons = document.querySelectorAll(".add-button");
const orderList = document.querySelector("#order-list");
const orderTotal = document.querySelector("#order-total");
const finishButton = document.querySelector("#finish-order");
const customerName = document.querySelector("#customer-name");
const customerAddress = document.querySelector("#customer-address");
const customerPhone = document.querySelector("#customer-phone");
const customerNote = document.querySelector("#customer-note");


let order = [];

function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function updateOrder() {
  orderList.innerHTML = "";

  if (order.length === 0) {
    orderList.innerHTML =
      '<li class="empty">Sua sacola está vazia.</li>';
    orderTotal.textContent = "R$ 0,00";
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

// FILTRO DE CATEGORIAS
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedCategory = tab.dataset.category;

    tabs.forEach((button) => {
      button.classList.remove("active");
    });

    tab.classList.add("active");

    pizzaCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "todas" ||
        card.dataset.category === selectedCategory;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// ADICIONAR À SACOLA
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

// FINALIZAR PEDIDO
finishButton.addEventListener("click", () => {
  if (order.length === 0) {
    alert("Adicione uma pizza antes de finalizar o pedido.");
    return;
  }

  const name = customerName.value.trim();
  const address = customerAddress.value.trim();
  const phoneNumber = customerPhone.value.trim();
  const note = customerNote.value.trim();

  if (!name) {
    alert("Informe seu nome.");
    return;
  }

const total = order.reduce((sum, item) => sum + item.price, 0);

const message = encodeURIComponent(
`🍕 Novo Pedido

👤 Nome: ${name}
📞 Telefone: ${phoneNumber}
📍 Endereço: ${address}

📝 Observações:
${note}

${order.map(item =>
`• ${item.name} - ${formatPrice(item.price)}`
).join("\n")}

💰 Total: ${formatPrice(total)}`
);

const phone = "5531995355663";

window.open(
  `https://wa.me/${phone}?text=${message}`,
  "_blank"
);
});

finishButton.addEventListener("click", () => {
   
// Limpar sacola
order = [];
updateOrder();

// Limpar campos
customerName.value = "";
customerAddress.value = "";
customerPhone.value = "";
customerNote.value = "";

});


// ÍCONES LUCIDE
if (window.lucide) {
  lucide.createIcons();
}

// Inicializa a sacola vazia
updateOrder();

order = [];
updateOrder();

customerName.value = "";
customerAddress.value = "";
customerPhone.value = "";
customerNote.value = "";