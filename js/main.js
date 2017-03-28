var vk, ruCapthca;

$(function () {
    vk = new Vk();
    ruCapthca = new RuCapthca();

    $('#get-code').click(function () {
        vk.getCode();
    });

    $('#get-token').click(function () {
        vk.getToken();
    });

    $('#run').click(function () {
        vk.run();
    });
});