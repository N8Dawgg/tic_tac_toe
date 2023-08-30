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
    document.querySelector('#again').addEventListener('click', restart_game);
    document.querySelector('#back').addEventListener('click', restore_start_screen);
}


initialize();

const ICON_COLOR_LIST = {
    'vs_player': '#FF66CC',
    'vs_ai': '#66CCFF',
    'again': '#42ebc9',
    'back' : '#ffa238'
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

const START_SCREEN = document.querySelector('#start_screen')

function start_pvp_game() {
    fade_out_element(START_SCREEN);
    reset_board_state();
    setTimeout(start_game , 1000);
}

function start_ai_game() {
    fade_out_element(START_SCREEN);
    reset_board_state();
    ai_player = true;
    setTimeout(start_game , 1000);
}



let ai_player = false;
let x_turn = true;

const GAME_BOARD = document.querySelector('#game_board')

function start_game() {
    fade_in_element(GAME_BOARD);
    initialize_tic_tac_tiles();
    if (ai_player) {
        take_ai_turn_after_delay(2000);
    }
}

const ALL_TIC_TAC_TILES = document.querySelectorAll('.tic_tac_tile');

function initialize_tic_tac_tiles() {
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
    let winner = check_for_winner();
    if (winner) {
        return;
    }
    let tie = check_for_tie();
    if (tie) {
        declare_tie();
        return;
    }
    x_turn = !x_turn;
    if (x_turn && ai_player) {
        take_ai_turn_after_delay();
    }
}

function take_ai_turn_after_delay(delay=330) {
    setTimeout(take_ai_turn, delay);
}

function take_ai_turn() {
    let winning_tile_idx = check_for_winning_move('X');
    if (winning_tile_idx != false) {
        tile_selected(TILE[winning_tile_idx]);
        return;
    }
    let opponent_winning_tile_idx = check_for_winning_move('O');
    if (opponent_winning_tile_idx != false) {
        tile_selected(TILE[opponent_winning_tile_idx]);
        return;
    }
    if (tile_state[4] == 0) {
        tile_selected(TILE[4]);
    } else {
        let best_move_idx = determine_best_move_with_value_matrix('X');
        tile_selected(TILE[best_move_idx]);
    }
}

function determine_best_move_with_value_matrix(player_char) {
    let value_matrix = [0,0,0,0,0,0,0,0,0];

    WINNING_COMBOS.forEach((combo) => {
        let player_char_count = 0;
        let enemy_char_count = 0;
        let empty_tile_list = [];
        combo.forEach((tile_idx) => {
            if (tile_state[tile_idx] == 0) {
                empty_tile_list.push(tile_idx);
            } else if (tile_state[tile_idx] == player_char) {
                player_char_count += 1;
                value_matrix[tile_idx] -= 1;
            } else {
                enemy_char_count += 1;
                value_matrix[tile_idx] -= 1;
            }
        })
        //if the line is empty, add 1 point to each of the tiles in the matrix.
        //if the line is not conflicting, meaning both players aren't in it, add 1 point to each empty tile in the matrix.
        if (empty_tile_list.length >= 3 || (player_char_count ^ enemy_char_count)) {
            empty_tile_list.forEach((tile_idx) => {
                value_matrix[tile_idx] += 1;
            })
        }
    })
    //step through each tle in the matrix and make a list of the highest tiles.
    //then, return one of them at random.
    let highest_value = 0;
    let highest_tile_idx_list = [];
    value_matrix.forEach((tile_value, tile_idx) => {
        if (tile_value == highest_value) {
            highest_tile_idx_list.push(tile_idx);
        } else if (tile_value > highest_value) {
            highest_value = tile_value;
            highest_tile_idx_list = [tile_idx];
        }
    })
    let rand_idx = Math.floor(Math.random() * highest_tile_idx_list.length);
    return highest_tile_idx_list[rand_idx];
}

function check_for_winning_move(player_char) {
    let winning_move = false;
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
            winning_move = third_tile_idx;
        }
    })
    return winning_move;
}

function reset_board_state() {
    tile_state = [0,0,0,0,0,0,0,0,0];
    ALL_TIC_TAC_TILES.forEach((tile) => {
        tile.textContent = '';
    })
}

let tile_state = [0,0,0,0,0,0,0,0,0]


const WINNING_COMBOS = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,3,6],
    [0,4,8], [2,4,6]
]

function check_for_winner() {
    let winner = false;
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
        if (X_count == 3) {
            declare_winner('X');
            winner = true;
        } else if (O_count == 3) {
            declare_winner('O');
            winner = true;
        }
    })
    return winner;
}

function check_for_tie() {
    let empty_tile_count = 9;
    tile_state.forEach((state) => {
        if (state != 0) {
            empty_tile_count -= 1;
        }
    })
    return (empty_tile_count == 0);
}

const WIN_COMMENT = document.querySelector('#win_comment');
const WIN_BAR = document.querySelector('#win_bar');

function declare_winner(winner) {
    WIN_COMMENT.textContent = winner + ' is the winner!!'
    fade_in_element(WIN_BAR);
}

function declare_tie() {
    WIN_COMMENT.textContent = 'Tie!!'
    fade_in_element(WIN_BAR);
}



function restart_game() {
    reset_board_state();
    fade_out_element(WIN_BAR);
    x_turn = true;
    if (ai_player) {
        take_ai_turn_after_delay(1000);
    }
}


function restore_start_screen() {
    fade_out_element(GAME_BOARD);
    fade_out_element(WIN_BAR);
    fade_in_element(START_SCREEN);
}

