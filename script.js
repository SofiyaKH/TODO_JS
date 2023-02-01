let i =0;

function add() {
    let text = document.querySelector("input[type = 'text']");

    if (checkValue(text.value)) {
        let items = document.getElementById('items');

        let div = document.createElement('div');        
        div.className ='item';
        div.id = 'itemNew'+ i;
        i++;

        let p = document.createElement('p');
        p.innerHTML = text.value;

        let date = document.createElement('p');
        date.innerHTML = printDate();

        let spacer = document.createElement('div');
        spacer.classList.add('spacer');
        
        let img = document.createElement('img');
        img.src = "x.png";
        img.classList.add('image');
        img.onclick = () => deleteItem(div.id);

        div.append(p);
        div.append(date);
        div.append(spacer);
        div.append(img);
        items.append(div);   
        update();
    }

    text.value='';
    text.focus();
}

function deleteItem(itemId) {
    let itemToDelete = document.getElementById(itemId);
    itemToDelete.remove();
    update();
}

function update() {
    let num = document.querySelector('span');
    let items = document.querySelectorAll('div.item');
    num.innerHTML = items.length;

    let messageOfEmpty = document.getElementById('messageOfEmpty');
    let message = document.getElementById('message');
    message.innerHTML='';

    if (!items.length) {
        messageOfEmpty.innerHTML='Cписок пуст!';
        messageOfEmpty.style.display = 'block';
    } 
    else {
        messageOfEmpty.style.display = 'none';
    }
}

function checkValue(text) {
    let items= document.querySelectorAll('div.item');
    let itemsValue = [];
    let message = document.getElementById('message');

    if (!text) {
        message.innerHTML ='Пустая строка!';
        return false;
    }

    for (let value of items) {
        itemsValue.push(value.firstChild.firstChild.data);
    }

    for (let value in itemsValue) {
        if (itemsValue[value] == text) {
            message.innerHTML ='Уже есть в списке!';
            return false;
        } 
    }
    
    message.innerHTML ='';
    return true;
}

function keyEnter(event) {
    if (event.code == 'Enter') add(); 
}

function printDate() {
    let date = new Date();
    date.setSeconds(date.getSeconds()+10);

    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();

    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();

    if (dd < 10) dd = '0'+ dd;
    if (mm < 10) mm = '0'+ mm;
    if (hh < 10) hh = '0'+ hh;
    if (min < 10) min = '0'+ min;
    if (ss < 10) ss = '0'+ ss;

    return  `&nbsp;${yy}-${mm}-${dd}T${hh}:${min}:${ss}`;
}

function deleteItemOnTime() {
    let items= document.querySelectorAll('div.item');
    items.forEach((elem, index) => {
        let date = Date.parse(elem.childNodes[1].textContent);
        if (Date.now() >= date) {
            elem.remove(); 
            update();
        }
    });
}

function modal() {
    let elem = document.getElementById('overLay');
    elem.style.display = "flex";
}

function ok() {
    let elem = document.getElementById('overLay');
    elem.style.display = "none";
}
// setInterval(() => deleteItemOnTime(),1000);