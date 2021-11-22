const cards = document.querySelectorAll('.memoji-card');

let hasFlippedCard = false;
let lockField = false;
let firstCard, secondCard;

function flipCard() {
    if (lockField) {
        unflipCards();
    };

    if (this === firstCard) return;

    this.classList.add('flip');
    this.classList.remove('wrong-card');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        disableCards();
        return;
    } else {
      blockCard ();
    }

   
}

function blockCard() {
    firstCard.classList.add('wrong-card');
    secondCard.classList.add('wrong-card');
    
    lockField = true;
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    firstCard.classList.add('right-card');
    secondCard.removeEventListener('click', flipCard);
    secondCard.classList.add('right-card');
    cards.forEach((oneCard) => {
      oneCard.addEventListener('click', flipCard);
  });
}
 

function unflipCards() {
    
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockField = false;
}

function resetField() {
    [hasFlippedCard, lockField] = [false, false];
    [firstCard, secondCard] = [null, null];
}


//IIFE (Immediately Invoked Function Expression)
(function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();


cards.forEach(card => card.addEventListener('click', flipCard));