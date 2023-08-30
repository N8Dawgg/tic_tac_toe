const CSS_ROOT = document.querySelector(':root');
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
        take_ai_turn(2000);
    }
}



function initialize_tic_tac_tiles() {
    const ALL_TIC_TAC_TILES = document.querySelectorAll('.tic_tac_tile');
    ALL_TIC_TAC_TILES.forEach((tile) => {
        tile.addEventListener('click', tile_clicked)
    });
}

function tile_clicked(e) {
    
    if (ai_player && x_turn) {
        return;
    }
    tile_selected(e.target);
}

function tile_selected(tile) {
    console.log(tile)
    let id_of_tile = tile.id[1];
    if (tile_state[id_of_tile] != 0) {
        return
    }
    if (x_turn) {
        tile_state[id_of_tile] = 'X';
        tile.textContent = 'X';
        tile.style.color = '#FF00FF'
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

function take_ai_turn(delay=330) {
    setTimeout(take_ai_turn_after_delay, delay);
}

function take_ai_turn_after_delay() {
    let winning_tile_idx = check_for_winning_move('X');
    if (winning_tile_idx != false) {
        tile_selected(TILE[winning_tile_idx])
    }
    let opponent_winning_tile_idx = check_for_winning_move('O');
    if (opponent_winning_tile_idx != false) {
        tile_selected(TILE[opponent_winning_tile_idx])
    }
    if (tile_state[4] == 0) {
        tile_selected(TILE[4]);
    } else if (true) {}
}

function check_for_winning_move(player_char) {
    WINNING_COMBOS.forEach((combo) => {
        let player_char_count = 0;
        let third_tile_idx = -1;
        combo.forEach((tile_idx) => {
            if (tile_state[tile_idx] == player_char) {
                player_char_count += 1;
            } else if (tile_state[tile_idx] == 0) {
                third_tile_idx = tile_idx;
            }
        })
        if (player_char_count == 2 && third_tile_idx != -1) {
            return third_tile_idx;
        }
    })
    return false;
}



let tile_state = [0,0,0,0,0,0,0,0,0]


const WINNING_COMBOS = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,3,6],
    [0,4,8], [2,4,6]
]

function check_for_winner() {
    WINNING_COMBOS.forEach((combo) => {
        let X_count = 0;
        let O_count = 0;
        combo.forEach((tile_idx) => {
            if (tile_state[tile_idx] == 'X') {
                X_count += 1;
            } else if (tile_state[tile_idx] == 'O') {
                O_count += 1;
            }
        })
        if (X_count >= 3) {
            declare_winner('X');
            return;
        } else if (O_count >= 3) {
            declare_winner('O');
            return;
        }
    })
}

function declare_winner(winner) {
    console.log(winner + ' is the winner!!');
}





