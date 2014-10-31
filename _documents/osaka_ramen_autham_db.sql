-- phpMyAdmin SQL Dump
-- version 4.2.9.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2014 年 10 月 31 日 18:29
-- サーバのバージョン： 5.6.21
-- PHP Version: 5.5.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `osaka_ramen_autham_db`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
`city_id` int(11) NOT NULL,
  `city_code` varchar(100) NOT NULL,
  `city_name_ja` varchar(100) NOT NULL,
  `city_name_en` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `cities`
--

INSERT INTO `cities` (`city_id`, `city_code`, `city_name_ja`, `city_name_en`) VALUES
(1, 'hokkaido', '北海道', 'Hokkaido'),
(2, 'aomori', '青森県', 'Aomori'),
(3, 'iwate', '岩手県', 'Iwate'),
(4, 'miyagi', '宮城県', 'Miyagi'),
(5, 'akita', '秋田県', 'Akita'),
(6, 'yamagata', '山形県', 'Yamagata'),
(7, 'fukushima', '福島県', 'Fukushima'),
(8, 'ibaraki', '茨城県', 'Ibaraki'),
(9, 'tochigi', '栃木県', 'Tochigi'),
(10, 'gunma', '群馬県', 'Gunma'),
(11, 'saitama', '埼玉県', 'Saitama'),
(12, 'chiba', '千葉県', 'Chiba'),
(13, 'tokyo', '東京都', 'Tokyo'),
(14, 'kanagawa', '神奈川県', 'Kanagawa'),
(15, 'niigata', '新潟県', 'Niigata'),
(16, 'toyama', '富山県', 'Toyama'),
(17, 'ishikawa', '石川県', 'Ishikawa'),
(18, 'fukui', '福井県', 'Fukui'),
(19, 'yamanashi', '山梨県', 'Yamanashi'),
(20, 'nagano', '長野県', 'Nagano'),
(21, 'gifu', '岐阜県', 'Gifu'),
(22, 'shizuoka', '静岡県', 'Shizuoka'),
(23, 'aichi', '愛知県', 'Aichi'),
(24, 'mie', '三重県', 'Mie'),
(25, 'shiga', '滋賀県', 'Shiga'),
(26, 'kyoto', '京都府', 'Kyoto'),
(27, 'osaka', '大阪府', 'Osaka'),
(28, 'hyogo', '兵庫県', 'Hyogo'),
(29, 'nara', '奈良県', 'Nara'),
(30, 'wakayama', '和歌山県', 'Wakayama'),
(31, 'tottori', '鳥取県', 'Tottori'),
(32, 'shimane', '島根県', 'Shimane'),
(33, 'okayama', '岡山県', 'Okayama'),
(34, 'hiroshima', '広島県', 'Hiroshima'),
(35, 'yamaguchi', '山口県', 'Yamaguchi'),
(36, 'tokushima', '徳島県', 'Tokushima'),
(37, 'kagawa', '香川県', 'Kagawa'),
(38, 'ehime', '愛媛県', 'Ehime'),
(39, 'kochi', '高知県', 'Kochi'),
(40, 'fukuoka', '福岡県', 'Fukuoka'),
(41, 'saga', '佐賀県', 'Saga'),
(42, 'nagasaki', '長崎県', 'Nagasaki'),
(43, 'kumamoto', '熊本県', 'Kumamoto'),
(44, 'oita', '大分県', 'Oita'),
(45, 'miyazaki', '宮崎県', 'Miyazaki'),
(46, 'kagoshima', '鹿児島県', 'Kagoshima'),
(47, 'okinawa', '沖縄県', 'Okinawa');

-- --------------------------------------------------------

--
-- テーブルの構造 `lines`
--

CREATE TABLE IF NOT EXISTS `lines` (
  `line_id` int(11) NOT NULL,
  `line_name_ja` varchar(255) NOT NULL,
  `line_name_en` varchar(255) NOT NULL,
  `line_lon` decimal(11,8) NOT NULL,
  `line_lat` decimal(11,8) NOT NULL,
  `line_zoom` tinyint(4) NOT NULL,
  `line_sort` int(11) NOT NULL,
  `line_deleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- テーブルの構造 `pictures`
--

CREATE TABLE IF NOT EXISTS `pictures` (
`picture_id` int(11) NOT NULL,
  `picture_name_ja` varchar(100) NOT NULL,
  `picture_name_en` varchar(100) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `picture_path` varchar(255) NOT NULL,
  `uploaded` datetime NOT NULL,
  `deleted` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- テーブルの構造 `shops`
--

CREATE TABLE IF NOT EXISTS `shops` (
`shop_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `shop_name_ja` varchar(100) NOT NULL,
  `shop_name_en` varchar(100) NOT NULL,
  `shop_tel` varchar(15) NOT NULL,
  `shop_address_ja` varchar(100) NOT NULL,
  `shop_address_en` varchar(100) NOT NULL,
  `shop_access_ja` varchar(100) NOT NULL,
  `shop_access_en` varchar(100) NOT NULL,
  `shop_holiday_ja` varchar(100) NOT NULL,
  `shop_holiday_en` varchar(100) NOT NULL,
  `shop_homepage` varchar(100) NOT NULL,
  `shop_term_of_validity` date NOT NULL,
  `shop_validity_flag` tinyint(4) NOT NULL,
  `shop_created` datetime NOT NULL,
  `shop_modified` datetime NOT NULL,
  `shop_deleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- テーブルの構造 `stations`
--

CREATE TABLE IF NOT EXISTS `stations` (
  `station_id` int(11) NOT NULL,
  `station_name_ja` varchar(255) NOT NULL,
  `station_name_en` varchar(255) NOT NULL,
  `line_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `station_zip_code` varchar(20) NOT NULL,
  `station_address_ja` varchar(255) NOT NULL,
  `station_address_en` varchar(255) NOT NULL,
  `station_lon` decimal(11,8) NOT NULL,
  `station_lat` decimal(11,8) NOT NULL,
  `station_sort` int(11) NOT NULL,
  `station_deleted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- テーブルの構造 `texts`
--

CREATE TABLE IF NOT EXISTS `texts` (
`text_id` bigint(20) NOT NULL,
  `text_controller` varchar(50) NOT NULL,
  `text_action` varchar(50) NOT NULL,
  `text_code` varchar(100) NOT NULL,
  `text_ja` text NOT NULL,
  `text_en` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
 ADD PRIMARY KEY (`city_id`), ADD KEY `city_code` (`city_code`);

--
-- Indexes for table `lines`
--
ALTER TABLE `lines`
 ADD PRIMARY KEY (`line_id`), ADD KEY `line_deleted` (`line_deleted`), ADD KEY `line_sort` (`line_sort`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
 ADD PRIMARY KEY (`picture_id`), ADD KEY `shop_id` (`shop_id`), ADD KEY `deleted` (`deleted`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
 ADD PRIMARY KEY (`shop_id`), ADD KEY `pref_id` (`city_id`), ADD KEY `shop_deleted` (`shop_deleted`), ADD KEY `shop_validity_flag` (`shop_validity_flag`), ADD KEY `shop_term_of_validity` (`shop_term_of_validity`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
 ADD PRIMARY KEY (`station_id`), ADD KEY `line_id` (`line_id`), ADD KEY `city_id` (`city_id`), ADD KEY `station_sort` (`station_sort`), ADD KEY `station_deleted` (`station_deleted`);

--
-- Indexes for table `texts`
--
ALTER TABLE `texts`
 ADD PRIMARY KEY (`text_id`), ADD KEY `text_controller` (`text_controller`), ADD KEY `text_action` (`text_action`), ADD KEY `text_code` (`text_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
MODIFY `shop_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `texts`
--
ALTER TABLE `texts`
MODIFY `text_id` bigint(20) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
