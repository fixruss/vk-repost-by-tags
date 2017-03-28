# vk-repost-by-tags

Приложение реализует репостинг постов по тегам.

По всем вопросам можно писать на <savelev.aleksandr.96@yandex.ru> или в ВК (https://vk.com/im?sel=92682082).

## Инструкиця по настройке

### Файл src/repost.php
* `$db_config` — Подключение к базе данных
* `$ruCaptcha` — Ключ к RuCaptcha, если нужен обход капч

### Файл js/Vk.js
* `clientId` — ID Standalone-приложения во Вконтакте
* `secret` — Секретный ключ приложения

## Инструкция по использованию
1. Войти в ВК под пользователем, от имени которого будет происходить репостинг.
2. Получить Code.
3. Получить Access Token, используя Code.
4. Вставить Access Token.
5. Заполнить поле тегов. Новая строка - новый запрос. Запрос может выглядеть так "#rap #beats" или "Музыка".
6. Заполнить количество постов и VK User ID (против дублирования репостов).
7. Запустить приложение.