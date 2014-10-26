-- phpMyAdmin SQL Dump
-- version 4.2.9.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2014 年 10 月 26 日 17:21
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
-- テーブルの構造 `pictures`
--

CREATE TABLE IF NOT EXISTS `pictures` (
`picture_id` int(11) NOT NULL,
  `picture_name` varchar(255) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `picture_path` varchar(255) NOT NULL,
  `uploaded` datetime NOT NULL,
  `deleted` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- テーブルの構造 `prefectures`
--

CREATE TABLE IF NOT EXISTS `prefectures` (
`pref_id` int(11) NOT NULL,
  `pref_name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `prefectures`
--

INSERT INTO `prefectures` (`pref_id`, `pref_name`) VALUES
(1, '北海道'),
(2, '青森県'),
(3, '岩手県'),
(4, '宮城県'),
(5, '秋田県'),
(6, '山形県'),
(7, '福島県'),
(8, '茨城県'),
(9, '栃木県'),
(10, '群馬県'),
(11, '埼玉県'),
(12, '千葉県'),
(13, '東京都'),
(14, '神奈川県'),
(15, '新潟県'),
(16, '富山県'),
(17, '石川県'),
(18, '福井県'),
(19, '山梨県'),
(20, '長野県'),
(21, '岐阜県'),
(22, '静岡県'),
(23, '愛知県'),
(24, '三重県'),
(25, '滋賀県'),
(26, '京都府'),
(27, '大阪府'),
(28, '兵庫県'),
(29, '奈良県'),
(30, '和歌山県'),
(31, '鳥取県'),
(32, '島根県'),
(33, '岡山県'),
(34, '広島県'),
(35, '山口県'),
(36, '徳島県'),
(37, '香川県'),
(38, '愛媛県'),
(39, '高知県'),
(40, '福岡県'),
(41, '佐賀県'),
(42, '長崎県'),
(43, '熊本県'),
(44, '大分県'),
(45, '宮崎県'),
(46, '鹿児島県'),
(47, '沖縄県'),
(99, 'その他');

-- --------------------------------------------------------

--
-- テーブルの構造 `shops`
--

CREATE TABLE IF NOT EXISTS `shops` (
`shop_id` int(11) NOT NULL,
  `pref_id` int(11) NOT NULL,
  `shop_name` varchar(255) NOT NULL,
  `shop_tel` varchar(15) NOT NULL,
  `shop_address` varchar(100) NOT NULL,
  `shop_access` varchar(100) NOT NULL,
  `shop_holiday` varchar(100) NOT NULL,
  `shop_homepage` varchar(100) NOT NULL,
  `shop_term_of_validity` date NOT NULL,
  `shop_validity_flag` tinyint(4) NOT NULL,
  `shop_created` datetime NOT NULL,
  `shop_modified` datetime NOT NULL,
  `shop_deleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
 ADD PRIMARY KEY (`picture_id`), ADD KEY `shop_id` (`shop_id`), ADD KEY `deleted` (`deleted`);

--
-- Indexes for table `prefectures`
--
ALTER TABLE `prefectures`
 ADD PRIMARY KEY (`pref_id`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
 ADD PRIMARY KEY (`shop_id`), ADD KEY `pref_id` (`pref_id`), ADD KEY `shop_deleted` (`shop_deleted`), ADD KEY `shop_validity_flag` (`shop_validity_flag`), ADD KEY `shop_term_of_validity` (`shop_term_of_validity`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `prefectures`
--
ALTER TABLE `prefectures`
MODIFY `pref_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=100;
--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
MODIFY `shop_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
