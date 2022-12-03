import Card from "./Card.js";

const CardListItem = (imgData) => {
  return `<li class="cardlistitem_item">
    ${Card(imgData)}
  </li>`;
};

const CardList = (data) => {
  return `
    <link href="components/cardlist.css" rel="stylesheet" />
    <section class="cardlist">
      <ul class="cardlist__list">
        ${data.map((imgData) => CardListItem(imgData)).join("")}
      </ul>
    </section>
  `;
};

export default CardList;
