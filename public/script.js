//quantity change
const upQuantity = document.querySelectorAll('.up-quantity');
const downQuantity = document.querySelectorAll('.down-quantity');
const numberDisplay= document.querySelectorAll('.number-display');

for (let i = 0; i < downQuantity.length; i++) {
    downQuantity[i].addEventListener('click', (event) => {
        event.preventDefault();
        console.log("found" + numberDisplay[i].value);
        if (numberDisplay[i].value > 0){
            numberDisplay[i].value --;
        }else{
            numberDisplay[i].value;
        }

    })

}

for (let i = 0; i < downQuantity.length; i++) {
    upQuantity[i].addEventListener('click', (event) => {
        event.preventDefault();
        console.log("found" + numberDisplay[i].value);
        numberDisplay[i].value ++;

    })

}


