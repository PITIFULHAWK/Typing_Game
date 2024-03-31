const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistakes span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

//set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = [" Avoid daydreaming about the years to come.", "You are the most important person in your whole life.", "Always be true to who you are, and ignore what other people have to say about you.", "Always be true to who you are, and ignore what other people have to say about you.", "Only demonstrate your strength when it's really required."];
    const randomIndex =  Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML =  "";
    for(const  char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add("active");
    document.addEventListener('keydown' , ()=>input.focus());
    typingText.addEventListener('click' , () => input.focus());
}


//handle user input

function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typesChar = input.value.charAt(charIndex);

    if(!isTyping){
        timer = setInterval(initTime , 1000);
        isTyping = true;
    }

    if(charIndex < char.length  &&  timeLeft > 0)
    {
        if(char[charIndex].innerText === typesChar){
            console.log("Correct!");
            char[charIndex].classList.add("correct");
        }
        else{
            mistake++;
            console.log("incorrect")
            char[charIndex].classList.add("incorrect");
        }
        charIndex++;
        mistakes.innerHTML = `${mistake}`;
        typingText.querySelectorAll('span')[charIndex].classList.add("active");
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        input.value= '';
    }
}

function initTime(){
    if(timeLeft > 0)
    {
        timeLeft--;
        time.innerHTML = timeLeft;
        const words = Math.round(((charIndex-mistake)/5)/(maxTime - timeLeft) * 60);
        wpm.innerHTML=words;
    }
    else {
        clearInterval(timer)
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerHTML = timeLeft;
    input.value='';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();