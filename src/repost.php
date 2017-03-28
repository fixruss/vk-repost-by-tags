<?php
header('Content-type:application/json;charset=utf-8');

if (!empty($_GET) && !empty($_GET['action'])) {
    require "Vk.php";
    require "oFile.php";
    require "BodyPost.php";

    $db_config = [
    'host'     => 'localhost',
    'user'     => 'user',
    'password' => '',
    'name'     => 'database',
    'table'    => 'vk_repost',
    ];

    $ruCaptcha = [
    'key' => '',
    ];

    if ($_GET['action'] == 'get') {
        $walls = getPosts();

        die(json_encode(['walls' => $walls]));
    } elseif ($_GET['action'] == 'repost') {
        $data = repost();

        die(json_encode($data));
    } elseif ($_GET['action'] == 'check_captcha') {
        $data = checkCaptcha();

        die($data);
    }
}

function getPosts()
{
    global $_GET;

    $Vk = new Vk(['access_token' => $_GET['vk_token']]);

    $posts = $Vk->api('newsfeed.search', ['q' => urldecode($_GET['q']), 'count' => $_GET['count']]);
    array_shift($posts);

    $walls = [];
    foreach ($posts as $post) {
        $walls[] = "wall{$post->owner_id}_{$post->id}";
    }

    return $walls;
}

function repost()
{
    global $_GET, $db_config;

    $Vk = new Vk(['access_token' => $_GET['vk_token']]);
    $db = new mysqli($db_config['host'], $db_config['user'], $db_config['password'], $db_config['name']);

    // get post from database
    $posts = $db->query("SELECT id FROM {$db_config['table']} WHERE wall = '{$_GET['wall']}' AND vk_uid = '{$_GET['vk_uid']}' LIMIT 1");
    $vk_post = $posts->fetch_assoc();

    $data = [];

    // if exist
    if ($vk_post) {
        $data['status'] = 3;
    } else {
        $send_data = [
        'object' => $_GET['wall'],
        ];

        // if need capthca - send
        if (!empty($_GET['captcha_sid'])) {
            $send_data['captcha_sid'] = $_GET['captcha_sid'];
        }

        if (!empty($_GET['captcha_key'])) {
            $send_data['captcha_key'] = $_GET['captcha_key'];
        }

        $response = $Vk->api('wall.repost', $send_data);
        $data['response'] = $response;

        if (isset($response->error)) {
            if ($response->error->error_code == 14) {
                // need captcha
                $result = sendCaptcha($response->error->captcha_img);

                $data['status'] = 2;
                $data['ruCapthca'] = json_decode($result);
            } elseif ($response->error->error_code == 6) {
                // too many connection
                $data['status'] = 4;
            }
        } else {
            $db->query("INSERT INTO {$db_config['table']} (wall, vk_uid) VALUES ('{$_GET['wall']}', '{$_GET['vk_uid']}')");

            $data['status'] = 1;
        }
    }

    return $data;
}

function sendCaptcha($image)
{
    global $ruCaptcha;

    // save image, because URL not supported
    $img = imagecreatefromjpeg($image);
    imagejpeg($img, 'image.jpg', 100);

    $file = new oFile('image.jpg');
    $post = BodyPost::Get(array('file' => $file, 'key' => $ruCaptcha['key'], 'json' => true), $delimiter);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'http://rucaptcha.com/in.php');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data; boundary='.$delimiter, 'Content-Length: '.strlen($post)));

    $result = curl_exec($ch);

    return $result;
}

function checkCaptcha()
{
    global $_GET, $ruCaptcha;

    $id = $_GET['id'];

    if ($curl = curl_init()) {
        curl_setopt($curl, CURLOPT_URL, "http://rucaptcha.com/res.php?key={$ruCaptcha['key']}&action=get&id=$id&json=true&header_acao=1");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
        $out = curl_exec($curl);

        return $out;
    }

    return false;
}