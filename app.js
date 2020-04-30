const setShowPage = (el) => {
    if (el === 'first-page') {
        first.style.display = 'block';
        second.style.display = 'none';
    } else if (el === 'second-page') {
        first.style.display = 'none';
        second.style.display = 'block';
    }
};
const renderAccounts = () => {
    const firstPage__accounts = document.getElementById('first-page__accounts');
    firstPage__accounts.innerHTML = '';
    accounts.map((el, i) => {
        let div = document.createElement('div',);
        if (i === 0) {
            div.id = 'start'
        }
        div.className = 'first-page__item';
        div.setAttribute('name', el.title);
        let img = document.createElement('img',);
        img.src = el.img;
        img.height = 40;
        img.width = 40;

        let p = document.createElement('p',);
        p.innerText = el.title;
        div.append(img);
        div.append(p);
        firstPage__accounts.append(div)
    });

};
const handleKeyPress = (e) => {
    if (start.parentNode.id === 'first-page__accounts') {
        if (e.keyCode === 38) {
            // up arrow
            let sibling = start.previousElementSibling;
            changeFocus(sibling);
        } else if (e.keyCode === 40) {
            // down arrow
            let sibling = start.nextElementSibling;
            changeFocus(sibling);

        } else if (e.keyCode === 37) {
            // left arrow
            accounts = [...accounts.filter(item => item.title !== start.getAttribute('name'))];
            renderAccounts();
            let sibling = document.getElementById('start');
            changeFocus(sibling);

        } else if (e.keyCode === 39) {
            // right arrow
            previousAccount = start;
            let sibling = document.getElementById('first-page_btn-btn');
            changeFocus(sibling);
        }
    } else if (start.parentNode.id === 'first-page__btn') {
        if (e.keyCode === 37) {
            // left arrow
            changeFocus(previousAccount);
        } else if (e.keyCode === 13) {
            // enter arrow
            let sibling = document.getElementById('second-page__input-input');
            setShowPage('second-page');
            changeFocus(sibling);
        }
    }
    else if (start.parentNode.id === 'second-page__input') {
        if (e.keyCode === 40) {
            // down arrow
            start.blur();
            let sibling = document.getElementById(previousBtn || 'second-page__btn-add');
            changeFocus(sibling);
        }
    } else if (start.parentNode.id === 'second-page__btn-group') {
        if (e.keyCode === 39) {
            // right arrow
            let sibling = start.nextElementSibling;
            changeFocus(sibling);
        } else if (e.keyCode === 37) {
            // left arrow
            let sibling = start.previousElementSibling;
            changeFocus(sibling);
        } else if (e.keyCode === 38) {
            // up arrow
            let previous = start.id;
            let sibling = document.getElementById('second-page__input-input');
            changeFocus(sibling);
            previousBtn = previous;
        } else if (e.keyCode === 13) {
            // enter arrow
            let text = document.getElementById('second-page__input-input');
            if (start.id === 'second-page__btn-add') {
                let newAccount = {
                    title: text.value,
                    img: "avatar.png"
                };
                accounts.push(newAccount);
                renderAccounts();
                let test = document.getElementById('first-page');
                test.style.display = ''
            }
            text.value = '';
            setShowPage('first-page');
            let sibling = document.getElementById('start');
            changeFocus(sibling);
        }
    }
};
const changeFocus = (sibling) => {
    if (sibling != null) {
        start.style.backgroundColor = '';
        start.style.color = '';
        sibling.focus();
        sibling.style.backgroundColor = 'cadetblue';
        sibling.style.color = 'white';
        start = sibling;
    }
};
let accounts = [];
let start;
let requestURL = 'https://aijeykob.github.io/data_propducts/data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = () =>{
    accounts = request.response;
    renderAccounts();
    start = document.getElementById('start');
    start.focus();
    start.style.backgroundColor = 'cadetblue';
    start.style.color = 'white';
};
let previousAccount;
let previousBtn;
let first = document.getElementById('first-page');
let second = document.getElementById('second-page');
document.addEventListener('keydown', handleKeyPress);

