// ================= MENU DATA =================
const menuData = [
  // Burgers
  {category:"Burger", name:"Classic Beef Burger", price:8.99, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
  {category:"Burger", name:"Double Cheese Burger", price:9.99, rating:"★★★★★", img:"https://images.unsplash.com/photo-1550547660-d9450f859349"},
  {category:"Burger", name:"Spicy Chicken Burger", price:8.49, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092"},
  {category:"Burger", name:"BBQ Bacon Burger", price:10.49, rating:"★★★★★", img:"https://images.unsplash.com/photo-1550317138-10000687a72b"},

  // Pizza
  {category:"Pizza", name:"Pepperoni Pizza", price:12.99, rating:"★★★★★", img:"https://images.unsplash.com/photo-1548365328-8b849e4e6c1f"},
  {category:"Pizza", name:"BBQ Chicken Pizza", price:13.99, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1601924638867-3ec3c87e0d71"},
  {category:"Pizza", name:"Veggie Supreme", price:11.99, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1604382354936-07c5d9983bd3"},
  {category:"Pizza", name:"Cheese Burst Pizza", price:14.49, rating:"★★★★★", img:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e"},

  // Beverages
  {category:"Beverage", name:"Iced Coffee", price:3.99, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1498804103079-a6351b050096"},
  {category:"Beverage", name:"Chocolate Milkshake", price:4.99, rating:"★★★★★", img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699"},
  {category:"Beverage", name:"Strawberry Smoothie", price:4.49, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1553530666-ba11a90c8c6d"},

  // Desserts
  {category:"Dessert", name:"Chocolate Lava Cake", price:4.99, rating:"★★★★★", img:"https://images.unsplash.com/photo-1606312619070-d48b4c652a52"},
  {category:"Dessert", name:"Strawberry Cheesecake", price:5.49, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb"},
  {category:"Dessert", name:"Ice Cream Sundae", price:3.99, rating:"★★★★☆", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb"}
];

// ================= VARIABLES =================
let total = 0;
let currentItem = null;

const menu = document.getElementById("menu");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

// ================= DISPLAY MENU =================
function displayItems(items) {
  menu.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-content">
        <h3>${item.name}</h3>
        <p class="price">$${item.price.toFixed(2)}</p>
        <p class="review">${item.rating}</p>
        <button>Add To Cart</button>
      </div>
    `;

    div.querySelector("button").addEventListener("click", () => openModal(item));
    menu.appendChild(div);
  });
}

// Initial Load
displayItems(menuData);

// ================= CATEGORY FILTER =================
function filterCategory(category) {
  if (category === "All") {
    displayItems(menuData);
  } else {
    const filtered = menuData.filter(item => item.category === category);
    displayItems(filtered);
  }
}

// ================= MODAL =================
function openModal(item) {
  currentItem = item;
  document.getElementById("modal-title").innerText = item.name;
  document.getElementById("quantity").value = 1;
  document.getElementById("note").value = "";
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// ================= ADD TO CART =================
function addToCart() {
  const quantity = parseInt(document.getElementById("quantity").value);
  const note = document.getElementById("note").value;

  if (quantity <= 0) return;

  const li = document.createElement("li");
  li.innerHTML = `
    ${currentItem.name} x${quantity}
    ${note ? "<br><small>Note: " + note + "</small>" : ""}
    <span style="float:right;">$${(currentItem.price * quantity).toFixed(2)}</span>
  `;

  cartItems.appendChild(li);

  total += currentItem.price * quantity;
  totalDisplay.innerText = total.toFixed(2);

  closeModal();
}

// ================= CART TOGGLE =================
function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("minimized");
}

// ================= SMOOTH SCROLL =================
function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}