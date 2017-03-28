-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Мар 28 2017 г., 10:20
-- Версия сервера: 5.7.17-12-beget-log
-- Версия PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `d92238c0_cosmosx`
--

-- --------------------------------------------------------

--
-- Структура таблицы `vk_repost`
--
-- Создание: Мар 23 2017 г., 07:08
-- Последнее обновление: Мар 28 2017 г., 06:13
--

DROP TABLE IF EXISTS `vk_repost`;
CREATE TABLE `vk_repost` (
  `id` int(11) NOT NULL,
  `wall` varchar(255) NOT NULL,
  `vk_uid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `vk_repost`
--
ALTER TABLE `vk_repost`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `vk_repost`
--
ALTER TABLE `vk_repost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
