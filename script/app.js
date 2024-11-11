// const user = {
//     name: 'Вася',
//     surname: 'Васильев',
//     get fullName(){
//         return this.name + ' ' + this.surname
//     },
//     set fullName(val){
//         let split = val.split(' ')
//         this.name = split[0];
//         this.surname = split[1];
//         console.log(split);        
//     }
// }

// console.log(user);
// user.fullName = 'Петя Петров';
// console.log(user);

const products = {
    crazy: {
        amount: 0,
        img: 'images/products/burger-1.png',
        price: 31000,
        name: 'Crazy',
        get result() {
            return this.price * this.amount
        }
    },
    light: {
        amount: 0,
        img: 'images/products/burger-2.png',
        price: 26000,
        name: 'Light',
        get result() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        amount: 0,
        img: 'images/products/burger-3.png',
        price: 29000,
        name: 'CheeseBurger',
        get result() {
            return this.price * this.amount
        }
    },
    dburger: {
        amount: 0,
        img: 'images/products/burger-4.png',
        price: 24000,
        name: 'dBurger',
        get result() {
            return this.price * this.amount
        }
    }
}
// products.crazy.amount = 3;
console.log(products);

const btn = document.querySelector('.wrapper__navbar-btn');
const basket = document.querySelector('.wrapper__navbar-basket');
btn.addEventListener('click', function () {
    basket.classList.toggle('active')
})

const productBtns = document.querySelectorAll('.wrapper__list-btn');
productBtns.forEach((elem) => {
    elem.addEventListener('click', function () {
        // plus(elem)
        plus(this)
    })
})

function plus(btn) {
    let parent = btn.closest('.wrapper__list-card')
    // elem.getAttribute(name) // значение атрибута
    // elem.hasAttribute(name) // true - false
    // elem.removeAttribute(name) // удаляет атрибут
    // elem.setAttribute(name, value) // создает атрибут со значением
    let parentID = parent.getAttribute('id');
    products[parentID]['amount']++
    printBasket()
}

const basketChecklist = document.querySelector('.wrapper__navbar-checklist');
const basketCount = document.querySelector('.warapper__navbar-count');
const basketTotalPrice = document.querySelector('.wrapper__navbar-totalprice');
function printBasket() {
    const productsArray = [];
    let totalCount = 0;
    let totalSum = 0;
    for (const key in products) {
        const obj = products[key];
        const card = document.querySelector(`#${key}`);
        const cardCount = card.querySelector('.wrapper__list-count')
        cardCount.innerHTML = obj.amount;
        if (obj.amount > 0) {
            cardCount.classList.add('active');
            productsArray.push(obj)
            totalCount += obj.amount;
            totalSum += obj.result;
        } else {
            cardCount.classList.remove('active');
        }
    }
    basketCount.innerHTML = totalCount;
    basketTotalPrice.innerHTML = totalSum.toLocaleString();
    if (totalCount > 0) {
        basketCount.classList.add('active')
    } else {
        basketCount.classList.remove('active')
    }
    basketChecklist.innerHTML = ''
    productsArray.forEach((elem) => {
        basketChecklist.innerHTML += cardItem(elem)
    })
}

function cardItem(prod) {
    let {amount, img, name, result} = prod
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img class="wrapper__navbar-productImage" src="${img}" alt="">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice"><span>${result.toLocaleString()}</span> сум</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
    `
}
// btn.addEventListener('click', (event)=>{ 
//     event.stopPropagation()
//     console.log('btn');
// })

document.addEventListener('click', (event)=>{ 
    let elem = event.target;
    if(elem.classList.contains('wrapper__navbar-symbol')){
        let attr = elem.getAttribute('data-symbol');
        let parent = elem.closest('.wrapper__navbar-option')
        let parentID = parent.getAttribute('id').split('_')[0]
        if (attr == '+') {
            products[parentID].amount++;
        } else {
            products[parentID].amount--;            
        }
        printBasket()
    }
})

const closeBtn = document.querySelector('.wrapper__navbar-close');

closeBtn.addEventListener('click', ()=>{
    basket.classList.remove('active');
})

const printBtn = document.querySelector('.wrapper__navbar-bottom');
const printBody = document.querySelector('.print__body');
const printFooter = document.querySelector('.print__footer');

printBtn.addEventListener('click', ()=>{
    printBody.innerHTML = '';
    let totalSum = 0;
    for (const key in products) {
        const obj = products[key];
        if (obj.amount > 0) {
            totalSum += obj.result;
            let { name, amount, result} = obj;
            printBody.innerHTML += `
            <div class="print__body-item">
                <p class="print__body-item_name">
                    <span class="name">${name}</span>
                    <span class="count">${amount}</span>
                </p>
                <p class="print__body-item_summ">${result}</p>
            </div>
            `
        }
    }
    printFooter.innerHTML = totalSum;
    print()
})