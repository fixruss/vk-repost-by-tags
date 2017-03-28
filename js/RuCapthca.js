function RuCapthca() {
}

RuCapthca.prototype.checkCaptcha = function() {
    var _this = this;

    $.ajax({
        url: 'src/repost.php',
        type: 'get',
        data: {
            action: 'check_captcha',
            id: this.captchaId,
        },
        beforeSend: function () {
            vk.log('Checking captcha');
        },
        success: function (response) {
            console.log(response);

            if (response.status == 0) {
                if (response.request == 'CAPCHA_NOT_READY') {
                    vk.log('CAPCHA_NOT_READY');

                    setTimeout(function () {
                        _this.checkCaptcha();
                    }, 5000);
                } else if (response.request == 'ERROR_CAPTCHA_UNSOLVABLE') {
                    vk.log('ERROR_CAPTCHA_UNSOLVABLE');

                    vk.reposting();
                    console.log('ERROR_CAPTCHA_UNSOLVABLE, run again, get new captcha');
                }
            } else if (response.status == 1) {
                _this.captchaText = response.request;

                vk.log('Captcha = ' + _this.captchaText);
                vk.reposting();
            }
        }
    });
};