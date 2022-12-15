const dragstartHandler = event => {
    console.log(event);
    event.dataTransfer.setData('text/plain', event.target.className);
};

const dragoverHandler = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

const dropHandler = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    console.log(data);
    try {
        const card = document.querySelector(`.${data}`);
        const cardImage = document.querySelector(`.${data} .card-image`);

        event.target.appendChild(cardImage);
        cardImage.style.height = '100%';
        cardImage.style.width = '100%';
        cardImage.style.cursor = 'pointer';
        cardImage.draggable = 'true';
        cardImage.addEventListener('dragstart', dragstartHandler);
        card.remove();
    } catch (err) {
        console.log(err);
        const cardImage = document.querySelector('.card-image');
        event.target.appendChild(cardImage);
    }
};

const cards = document.querySelectorAll('.card');
const squares = document.querySelectorAll('.square');

cards.forEach(card => {
    card.addEventListener('dragstart', dragstartHandler)
})
squares.forEach(square => {
    square.addEventListener('dragover', dragoverHandler);
    square.addEventListener('drop', dropHandler);
});