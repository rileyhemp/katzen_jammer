"use strict";

var quiz = document.querySelector('.quiz');
var slides = document.querySelectorAll('.slide');
var progressIndicator = document.querySelectorAll('.progress-bar li');
var currentIndex = 0;
var quizContainer = document.querySelector('.quiz-container');
var next = document.querySelector('.next');
var back = document.querySelector('.back');
var answer = document.querySelectorAll('.answer');
var btnContainer = document.querySelector('.button-container');
var cleave = new Cleave('#number', {
  phone: true,
  phoneRegionCode: 'US'
});
back.addEventListener('click', prevSlide);
next.addEventListener('click', function () {
  if (slides[currentIndex].classList.contains('visited') || currentIndex === 0) {
    nextSlide();
  }
}); //Advances slide on enter.

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 13 && currentIndex === 0) {
    nextSlide();
  } else if (e.keyCode === 13 && slides[currentIndex].classList.contains('visited')) {
    nextSlide();
  }
});
answer.forEach(function (button) {
  button.addEventListener('click', function () {
    var images = document.querySelectorAll('.button-img');
    console.log(images.length);

    if (currentIndex < images.length - 1) {
      images[currentIndex].style.backgroundImage = "url(../../dist/img/buttons/".concat(button.value, ".svg)");
    } else {
      images[currentIndex].style.backgroundImage = "url(../../dist/img/buttons/".concat(button.value, ".png)");
    } //Makes it so the slide doesn't automatically advance if you've already selected an answer


    if (!button.parentNode.parentNode.parentNode.parentNode.classList.contains('visited')) {
      button.parentNode.parentNode.parentNode.classList.add('black');
      button.parentNode.parentNode.classList.add('white');
      setTimeout(nextSlide, 400);
      button.parentNode.parentNode.parentNode.parentNode.classList.add('visited');
    } else {
      button.parentNode.parentNode.parentNode.querySelector('.white').classList.remove('white');
      button.parentNode.parentNode.classList.add('white');
    }
  });
}); //Next question

function nextSlide() {
  //Adds their name
  if (currentIndex === 0) {
    var nameValue = document.querySelector('#name').value;
    document.querySelector('.name-banner').style.display = "initial";
    document.querySelector('#user-name').textContent = nameValue;
    var welcomeMessage = "Hello, ".concat(nameValue.substr(0, nameValue.indexOf(' ')));

    if (nameValue) {
      quiz.setAttribute('name', welcomeMessage);
    } else {
      quiz.setAttribute('name', "Hello, stranger");
    }
  }

  next.textContent = "Next";
  next.style.fontSize = "13px";
  back.style.visibility = "visible";
  var email = document.querySelector('#email').value;

  if (currentIndex < slides.length - 1
  /*&& ValidateEmail(email)*/
  ) {
      if (currentIndex < slides.length - 2) {
        var navigate = function navigate() {
          var index = this.textContent - 1;
          quiz.style.left = "".concat(index * -90, "vw");
          slides[currentIndex].classList.remove('active');
          slides[index].classList.add('active');
          answer[index].removeEventListener;
          progressIndicator[currentIndex].classList.remove('active');
          progressIndicator[index].classList.add('active');
          currentIndex = index;
          disableNext();
          disableBack();
        };

        //Advances the slide
        quiz.style.left = "".concat((currentIndex + 1) * -90, "vw");
        progressIndicator[currentIndex].classList.remove('active');
        progressIndicator[currentIndex + 1].classList.add('active');
        progressIndicator[currentIndex + 1].classList.remove('black');
        slides[currentIndex].classList.remove('active');
        slides[currentIndex + 1].classList.add('active'); //Turns the progress bar into a nav bar

        progressIndicator[0].addEventListener('click', navigate);
        progressIndicator[currentIndex + 1].addEventListener('click', navigate);
        currentIndex++; //Enables the back button after first slide

        disableNext();
        disableBack(); //Functionality for the last slide
      } else {
        quiz.style.left = "".concat((currentIndex + 1) * -90, "vw"); //Moves the progress bar out of the way

        document.querySelector('.progress-bar').style.transform = "translateX(-120%)";
        slides[currentIndex].classList.remove('active');
        next.classList.remove('black');
        currentIndex++;
        next.textContent = "Confirm";
        next.style.fontSize = "16px";
        quizContainer.style.overflow = "visible";
      }
    }
} //Previous question


function prevSlide() {
  if (currentIndex > 0) {
    if (currentIndex > 0 && currentIndex < slides.length - 1) {
      quiz.style.left = "".concat((currentIndex - 1) * -90, "vw");
      progressIndicator[currentIndex].classList.remove('active');
      slides[currentIndex].classList.remove('active');
      currentIndex--;
      progressIndicator[currentIndex].classList.add('active');
      slides[currentIndex].classList.add('active');
      disableNext();
      disableBack();
    } else {
      quiz.style.left = "".concat((currentIndex - 1) * -90, "vw");
      slides[currentIndex].classList.remove('active');
      currentIndex--;
      document.querySelector('.progress-bar').style.transform = "translateX(0)";
      progressIndicator[currentIndex].classList.add('active');
      slides[currentIndex].classList.add('active');
      next.textContent = "Next";
      next.style.fontSize = "13px";
      setTimeout(function () {
        quizContainer.style.overflow = "hidden";
      }, 300);
    }
  }
} //Remove back button at beginning


function disableBack() {
  if (currentIndex === 0) {
    back.style.visibility = 'hidden';
  } else {
    document.querySelector('.back').classList.remove('black');
    back.style.visibility = 'visible';
  }
}

function disableNext() {
  if (slides[currentIndex].classList.contains('visited') || currentIndex === 0) {
    next.classList.remove('black');
  } else {
    next.classList.add('black');
  }
}

disableBack();
disableNext();

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  alert("Please enter a valid email address!");
  return false;
} //Code to change the button
//# sourceMappingURL=main.js.map
