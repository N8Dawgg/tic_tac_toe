const CSS_ROOT = document.querySelector(':root');


function initialize() {
    //set up mouse over color change//
    const allButtons = document.querySelectorAll('.ui_button');
    allButtons.forEach((button) => {
        button.addEventListener('mouseover', button_moused)
    })
    document.querySelector('#vs_ai').addEventListener('click', start_ai_game);
    document.querySelector('#vs_player').addEventListener('click', start_pvp_game);
}

initialize();

const ICON_COLOR_LIST = {
    'vs_player': '#FF66CC',
    'vs_ai': '#66CCFF'
}

function button_moused(e) {
    let id_of_button = e.target.id;
    CSS_ROOT.style.setProperty('--primary_color', ICON_COLOR_LIST[id_of_button]);
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

function start_pvp_game() {
    fade_out_element(document.querySelector('#start_screen'));
    setTimeout(() => {fade_in_element(document.querySelector('#game_board'))}, 1000
    );
    
}

function start_ai_game() {
    fade_out_element(document.querySelector('#start_screen'));
    setTimeout(() => {fade_in_element(document.querySelector('#game_board'))}, 1000
    );
}

/* game states:
    >start screen (player vs ai selection)
    >player name entry with start button
    >>player name entry for two player has two name fields
    >decide who gets Xs (goes first)
    >game*/