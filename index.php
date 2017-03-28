<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reposter</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
    <div class="controls" style="">
        <div class="h1">Step 1 - get code</div>
        <div class="h2">Click on "Get code" and copy Code from URL parameters</div>
        <button id="get-code">Get Code</button>

        <div class="h1">Step 2 - get token</div>
        <div class="h2">Paste Code, click "Get Access Token" and copy Access Token from JSON answer</div>
        <input type="text" id="code" placeholder="Code">
        <button id="get-token">Get Access Token</button>

        <div class="h1">Step 3 - set settings and run reposting</div>
        <div class="h2">Paste Access Token and set settings</div>
        <input type="text" id="accessToken" placeholder="Access Token" value=""><br>
        <textarea id="tags" placeholder="Tags" rows="10"></textarea><br>
        <input type="text" id="count" placeholder="Count Posts"><br>
        <input type="text" id="vk_uid" placeholder="VK User ID"><br>
        <div class="h2">VK User ID need against doubles posting</div>

        <button id="run">Run reposting</button>
    </div>

    <div class="statistic">

        <div class="h1">Statistics</div>
        <p class="tag-now">Now Tag:</p>
        <p class="count-now">0/0 posts</p>
        <p class="count-added">Added: 0</p>
        <p class="count-exist">Exist: 0</p>

        <div class="marks">
            <p class="active">Post active</p>
            <p class="exist">Post already exist</p>
            <p class="good">Post added</p>
            <p class="bad">Wait captcha</p>
        </div>

        <div class="captcha">

        </div>

        <div class="h1">Log:</div>
        <div class="log">
            <p>Wait running</p>
        </div>
    </div>

    <div id="posts">Posts</div>

    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/Vk.js"></script>
    <script type="text/javascript" src="js/RuCapthca.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>