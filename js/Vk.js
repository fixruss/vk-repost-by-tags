function Vk () {
    this.clientId = 0;
    this.scope    = 'offline,wall';
    this.secret   = '';

    this.$posts = $('#posts');
}

Vk.prototype.getCode = function() {
    window.open("https://oauth.vk.com/authorize?client_id=" + this.clientId + "&scope=" + this.scope + "&redirect_uri=http://vk.com&response_type=code");
};

Vk.prototype.getToken = function() {
    var code = $('#code').val();

    window.open("https://oauth.vk.com/access_token?client_id=" + this.clientId + "&client_secret=" + this.secret + "&redirect_uri=http://vk.com&code=" + code);
};

Vk.prototype.run = function() {
    var _this = this;

    this.queries    = this.getQueries();
    this.token      = $('#accessToken').val();
    this.countPosts = $('#count').val();
    this.uid        = $('#vk_uid').val();

    this.nowQuery = 0;
    this.countPostsCheck = 1;
    this.countExist = 0;
    this.countAdded = 0;

    this.log('Running');

    this.getPosts();
};

Vk.prototype.getPosts = function() {
    var _this = this;

    this.post = undefined;

    $('.tag-now').text('Now Tag: ' + this.queries[this.nowQuery]);

    $.ajax({
        url: 'src/repost.php',
        type: 'GET',
        data: {
            action:   'get',
            vk_token: this.token,
            count:    this.countPosts,
            q:        this.getQuery(),
        },
        dataType: 'json',
        beforeSend: function () {
            _this.log('Loading posts...');
            _this.$posts.html('loading...');
        },
        success: function (data) {
            _this.getPostsSuccess(data);
        }
    });
};

Vk.prototype.getPostsSuccess = function(data) {
    var _this = this;

    this.$posts.html('');

    var counter = 1;

    if (data.walls.length > 0) {
        for (key in data.walls) {
            this.$posts.append('<div class="post" data-wall="' + data.walls[key] + '">#' + counter++ + ' <a href="https://vk.com/' + data.walls[key] + '" target="_blank">' + data.walls[key] + '</a></div>');

            if (counter - 1 == data.walls.length) {
                $('.count-now').text(this.countPostsCheck + '/' + counter);

                this.$post = $('.post');


                this.reposting();
            }
        }
    } else {
        this.log('Try again');
    }
};

Vk.prototype.getQueries = function() {
    return $('textarea').val().split("\n");
};

Vk.prototype.getQuery = function() {
    return encodeURIComponent(this.queries[this.nowQuery]);
};

Vk.prototype.reposting = function() {
    var _this = this;

    if (this.post == undefined) {
        this.post = this.$post.first();

        this.$post.removeClass('active').removeClass('good').removeClass('bad').removeClass('exist');
    }

    this.$post.removeClass('active').removeClass('bad');
    this.post.addClass('active');

    var wall = this.post.data('wall');

    this.repost(wall);

    $('.count-now').text(this.countPostsCheck + '/' + this.$post.length);

    if (this.countPostsCheck - 1 == this.$post.length) {
        if (this.queries.length > ++this.nowQuery) {
            this.log('Get next posts');

            this.getPosts();
        } else {
            this.log('Tags ended');
        }

        this.countPostsCheck = 1;
    }
};

Vk.prototype.repost = function(wall) {
    var _this = this;

    $.ajax({
        url: 'src/repost.php',
        type: 'GET',
        data: {
            action:   'repost',
            vk_token: this.token,
            vk_uid:   this.uid,
            wall:     encodeURIComponent(wall),
            captcha_sid: this.captchaSid,
            captcha_key: ruCapthca.captchaText,
        },
        dataType: 'json',
        beforeSend: function () {
            _this.log('Repost ' + wall);
        },
        success: function (data) {
            _this.repostSuccess(data);
        }
    });
};

Vk.prototype.repostSuccess = function(data) {
    var _this = this;

    console.log(data);

    this.captchaSid = '';
    ruCapthca.captchaText = '';

    if (data.status == 1) {
        this.post.addClass('good');
        _this.log('Post added');

        $('.count-added').text('Added: ' + ++this.countAdded);

        this.post = this.post.next();
        this.countPostsCheck++;
        this.reposting();
    }

    if (data.status == 2) {
        this.post.addClass('bad');

        if (data.ruCapthca.status == 1) {
            this.log('Getting capthca');

            this.captchaSid = data.response.error.captcha_sid;

            $('.captcha').html('<img src="src/image.jpg">');

            ruCapthca.captchaId = data.ruCapthca.request;

            ruCapthca.checkCaptcha();
        } else if (data.ruCapthca.status == 0) {
            this.log('Captcha = ' + ruCapthca.captchaText);
            console.log(data.ruCapthca.request);
        }
    }

    if (data.status == 4) {
        this.log('Too many request per second');
        this.reposting();
    }

    if (data.status == 3) {
        this.post.addClass('exist');
        this.log('Exist');
        $('.count-exist').text('Exist: ' + ++this.countExist);

        if (this.queries.length > ++this.nowQuery) {
            this.getPosts();
        } else {
            this.log('Tags ended');
        }
    }
};

Vk.prototype.log = function(text) {
    $('.log').append('<p>' + text + '</p>');

    var psconsole = $('.log').first();

    if(psconsole.length) {
        psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
    }
};