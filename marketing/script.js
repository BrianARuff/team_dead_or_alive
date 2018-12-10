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


let credits = document.querySelector('footer span');
let creditContent = document.querySelector('.footerContent')
credits.addEventListener('click', () => creditContent.classList.toggle('display'))