const cards = document.querySelectorAll('.memoji-card');

const timer = document.querySelector('.timer');

let hasFlippedCard = false;
let lockField = false;
let firstCard, secondCard;

let f = 0;
let i = 60;
let time = 0;
let timerOn = false;
let timerOff = false;

//Перемешиваем карты
function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  };

//Сброс игры
function resetField() {
    cards.forEach((oneCard) => {
        oneCard.classList.remove('right-card');
        oneCard.classList.remove('flip');
    });
    i = 60;
    f = 0;
    [hasFlippedCard, lockField, timerOff, timerOn] = [false, false, false, false];
    [firstCard, secondCard] = [null, null];
    timer.innerHTML = '';
}
 
  function blockCard() {
    firstCard.classList.add('wrong-card');
    secondCard.classList.add('wrong-card');
    lockField = true;
}

//Перевернуть карты
function unflipCards() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockField = false;
}

//Прверка совпадения
function checkForMatch() {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        disableCards();
        return;
    } else {
      blockCard ();
    } 
}

//Открытие карты
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

//Отключение карты
function disableCards() {
    f += 1;
    if (f === 6) { 
        modalWindow('Win')
    }

    firstCard.removeEventListener('click', flipCard);
    firstCard.classList.add('right-card');
    secondCard.removeEventListener('click', flipCard);
    secondCard.classList.add('right-card');
    cards.forEach((oneCard) => {
      oneCard.addEventListener('click', flipCard);
  });
}

//Проверка формата времени
function checkTime() {
    const secPerMin = 60;
    let sec = i;
    let min = Math.floor(sec / secPerMin);

    if (min < 10) {
        min = `0${min}`;
    }
    if (sec > 60) {
        sec = Math.floor(i / secPerMin);
    }
    if (sec === 60) {
        sec = '00';
    } else if (sec < 10) {
        sec = `0${sec}`;
    }

    timer.innerHTML = `${min}:${sec}`;
    timer.style.cssText = 'margin: 5px; line-height: 36px;font-size: 30px; font-family: Arial; text-align: center;'
}

//Таймер
function countDown() {
    if (timerOn) return;
    timerOn = true;
  
    time = setInterval(() => {
      if (i === 0) {
        timerOff = true;
        modalWindow('Lose')
      }
      checkTime();
      if (timerOff) return;
      i -= 1;
    }, 1000);
}
  
  cards.forEach((oneCard) => {
    oneCard.addEventListener('click', flipCard);
    oneCard.addEventListener('click', countDown);
  });

  //Появления модального окна пр выигрыше или проигрыше
  function modalWindow(res) {
    clearInterval(time);
    
    //Создаем элементы в html документе
    var modal = document.createElement('div');
    modal.classList.add('modal');

    var inModal = document.createElement('div');
    inModal.classList.add('in_modal');

    var result = document.createElement('p');
    result.classList.add('result');

    var result1 = document.createElement('span');
    result1.classList.add('results');
    result1.innerHTML = res[0];

    var result2 = document.createElement('span');
    result2.classList.add('results');
    result2.innerHTML = res[1];

    var result3 = document.createElement('span');
    result3.classList.add('results');
    result3.innerHTML = res[2];

    var result4 = document.createElement('span');
    result4.classList.add('results');

    result4.innerHTML = res[3] ? res[3] : ' ';
    result.appendChild(result1);
    result.appendChild(result2);
    result.appendChild(result3);
    result.appendChild(result4);
    var buttonAgain = document.createElement('button');
    buttonAgain.classList.add('again');
    buttonAgain.innerHTML = (res == 'win') ? 'Play again' : 'Try again';

    modal.appendChild(inModal);
    inModal.appendChild(result);
    inModal.appendChild(buttonAgain);
    document.body.appendChild(modal);

    //Обраоботчик при клике на кнопку
    buttonAgain.addEventListener('click', function() {
        modal.remove();
        resetField();
        shuffle();
    });
}
