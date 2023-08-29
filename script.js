const css_root = document.querySelector(":root");
const vs_ai_button = document.querySelector("#vs_ai");
const vs_player_button = document.querySelector("#vs_player");
vs_ai_button.addEventListener('mouseover', test);
vs_player_button.addEventListener('mouseover', test1);

function test() {
    fade_out_element(vs_ai_button);
}

function test1() {
    fade_in_element(vs_ai_button);
}

function fade_out_element(element) {
    element.classList.remove("fade_in");
    element.classList.add("fade_out");
    element.classList.add("inactive");
}

function fade_in_element(element) {
    element.classList.remove("fade_out");
    element.classList.add("fade_in");
    element.classList.remove("inactive");
}

function reverse_animation(element) {
    element.style.animationFillMode = "backwards";
}
