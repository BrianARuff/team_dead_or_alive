class Carousel {
    constructor(item){
        this.item = item;
        this.index = 0; // Keeping track of array index
        this.img = Array.from(document.querySelectorAll('.carousel img')); // Creating an array from images
        this.lBtn = document.querySelector('.left-button'); // Getting left button
        this.rBtn = document.querySelector('.right-button'); // Getting right button
        this.img[this.index].style.display = 'block'; // Setting starting image to display block
        this.lBtn.addEventListener('click', () => this.moveLeft()); // Setting left button click
        this.rBtn.addEventListener('click', () => this.moveRight()); // Setting right button click
    }
    moveLeft() {
        this.index--; // Moves the index down 1
        this.setImg(); // Invoking setImg function
    }
    moveRight() {
        this.index++; // Moves the index up 1
        this.setImg(); // Invoking setImg function
    }
    setImg(){
        if(this.index === this.img.length){ // Checks to see if the index is equal to the array length
            this.index = 0; // Sets index back to 0
        }else if(this.index < 0){ // Checks to see if index is less than 0
            this.index = this.img.length-1; // Sets the index to the end of the array
        }
        this.img.forEach( item => item.style.display = 'none'); // Sets all array images to display none
        this.img[this.index].style.display = 'flex'; // Sets current array index image to display
    }
}
let carousel = document.querySelectorAll('.carousel').forEach(item => new Carousel(item)); // Creates carousel object

// Credit 
let credits = document.querySelector('footer span');
let creditContent = document.querySelector('.footerContent')
$(credits).click( () => $(creditContent).slideToggle( "slow"));

//login modal
const login = document.querySelector('.login')
const modalLogin = document.querySelector('.mLogin')

login.addEventListener('click', () => {
    document.getElementById('id01').style.display = 'block'
})
modalLogin.addEventListener('click', () => {
    let modal = document.querySelector('.menuModal');
    modal.style.display = "none";
    document.getElementById('id01').style.display = 'block'
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', event => {
    let modal = document.getElementById('id01');
    if (event.target == modal) {
        modal.style.display = "none";
    }})

//Fade in of header items
const titleL = document.querySelector('.titleLeft');
const dead = document.querySelector('.headerLeft img');
const o = document.querySelector('.or');
const titleR = document.querySelector('.titleRight');
const alive = document.querySelector('.headerRight img');
const signUp = document.querySelector('.signUp')
let w = window.innerWidth;
console.log(w);

if(w >= 500){
    $(window).ready(() => {
        $(titleL).hide().fadeIn(2000);
        $(dead).hide().fadeIn(2000);
        $(o).hide().delay(1000).fadeIn(2000);
        $(titleR).hide().delay(2000).fadeIn(2000);
        $(alive).hide().delay(2000).fadeIn(2000);
        $(signUp).hide().delay(4000).fadeIn(2000);
      });
}

//Mobile Menu
const hamburger = document.querySelector('.fa-bars');
const menuContent = document.querySelector('.menuModal')
hamburger.addEventListener('click', ()=> menuContent.style.display = "block")
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', event => {
    let modal = document.querySelector('.menuModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }})
