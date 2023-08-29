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
    setTimeout(start_game , 1000);
    
}

function start_ai_game() {
    fade_out_element(document.querySelector('#start_screen'));
    ai_player = true;
    setTimeout(start_game , 1000);
}



let ai_player = false;
let x_turn = true;



function start_game() {
    fade_in_element(document.querySelector('#game_board'));
    initialize_tic_tac_tiles();
    if (ai_player) {
        take_ai_turn()
    }
}

let tile_state = [0,0,0,0,0,0,0,0,0]

function initialize_tic_tac_tiles() {
    const ALL_TIC_TAC_TILES = document.querySelectorAll('.tic_tac_tile');
    ALL_TIC_TAC_TILES.forEach((tile) => {
        tile.addEventListener('click', tile_clicked)
    });
}

function tile_clicked(e) {
    if (ai_player && !x_turn) {
        tile_selected(e.target);
    }
    
}

function tile_selected(tile) {
    console.log(tile.id);
    let id_of_tile = tile.id;
    if (tile_state[id_of_tile] != 0) {
        return
    }
    if (x_turn) {
        tile_state[id_of_tile] = 'X';
        tile.textContent = 'X';
        tile.style.color = '#FF00FF'
    } else if (ai_player){
        //nothing...
    } else {
        tile_state[id_of_tile] = 'O';
        tile.textContent = 'O';
        tile.style.color = '#00FFFF'
    }
    x_turn = !x_turn;
    if (x_turn && ai_player) {
        take_ai_turn();
    }
}

function take_ai_turn() {
    setTimeout(take_ai_turn_after_delay , .333);
}





function take_ai_turn_after_delay() {
    if (TILE[4] == 0) {
        tile_selected(TILE[4]);
    }
}

let TILE = [
    document.querySelector('#t0'),
    document.querySelector('#t1'),
    document.querySelector('#t2'),
    document.querySelector('#t3'),
    document.querySelector('#t4'),
    document.querySelector('#t5'),
    document.querySelector('#t6'),
    document.querySelector('#t7'),
    document.querySelector('#t8')
];