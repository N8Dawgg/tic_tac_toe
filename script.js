const css_root = document.querySelector(':root');
const vs_ai_button = document.querySelector('#vs_ai');
const vs_player_button = document.querySelector('#vs_player');



function initialize() {
    //set up mouse over color change//
    const allButtons = document.querySelectorAll('.ui_button');
    allButtons.forEach((button) => {
        button.addEventListener('mouseover', button_moused)
    })
}

initialize();

const COLOR_LIST = {
    'vs_player': '#FF66CC',
    'vs_ai': '#66CCFF'
}

function button_moused(e) {
    let id_of_button = e.target.id;
    css_root.style.setProperty('--primary_color', COLOR_LIST[id_of_button]);
}

function fade_out_element(element) {
    element.classList.remove('fade_in');
    element.classList.add('fade_out');
    element.classList.add('inactive');
}

function fade_in_element(element) {
    element.classList.remove('fade_out');
    element.classList.add('fade_in');
    element.classList.remove('inactive');
}

