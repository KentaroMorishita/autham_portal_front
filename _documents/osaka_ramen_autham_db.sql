-- phpMyAdmin SQL Dump
-- version 4.1.14.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2014 年 10 月 31 日 08:42
-- サーバのバージョン： 5.1.69
-- PHP Version: 5.3.3

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
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name_ja` varchar(100) NOT NULL,
  `city_name_en` varchar(100) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=48 ;

--
-- テーブルのデータのダンプ `cities`
--

INSERT INTO `cities` (`city_id`, `city_name_ja`, `city_name_en`) VALUES
(1, '北海道', 'Hokkaido'),
(2, '青森県', 'Aomori'),
(3, '岩手県', 'Iwate'),
(4, '宮城県', 'Miyagi'),
(5, '秋田県', 'Akita'),
(6, '山形県', 'Yamagata'),
(7, '福島県', 'Fukushima'),
(8, '茨城県', 'Ibaraki'),
(9, '栃木県', 'Tochigi'),
(10, '群馬県', 'Gunma'),
(11, '埼玉県', 'Saitama'),
(12, '千葉県', 'Chiba'),
(13, '東京都', 'Tokyo'),
(14, '神奈川県', 'Kanagawa'),
(15, '新潟県', 'Niigata'),
(16, '富山県', 'Toyama'),
(17, '石川県', 'Ishikawa'),
(18, '福井県', 'Fukui'),
(19, '山梨県', 'Yamanashi'),
(20, '長野県', 'Nagano'),
(21, '岐阜県', 'Gifu'),
(22, '静岡県', 'Shizuoka'),
(23, '愛知県', 'Aichi'),
(24, '三重県', 'Mie'),
(25, '滋賀県', 'Shiga'),
(26, '京都府', 'Kyoto'),
(27, '大阪府', 'Osaka'),
(28, '兵庫県', 'Hyogo'),
(29, '奈良県', 'Nara'),
(30, '和歌山県', 'Wakayama'),
(31, '鳥取県', 'Tottori'),
(32, '島根県', 'Shimane'),
(33, '岡山県', 'Okayama'),
(34, '広島県', 'Hiroshima'),
(35, '山口県', 'Yamaguchi'),
(36, '徳島県', 'Tokushima'),
(37, '香川県', 'Kagawa'),
(38, '愛媛県', 'Ehime'),
(39, '高知県', 'Kochi'),
(40, '福岡県', 'Fukuoka'),
(41, '佐賀県', 'Saga'),
(42, '長崎県', 'Nagasaki'),
(43, '熊本県', 'Kumamoto'),
(44, '大分県', 'Oita'),
(45, '宮崎県', 'Miyazaki'),
(46, '鹿児島県', 'Kagoshima'),
(47, '沖縄県', 'Okinawa');

-- --------------------------------------------------------

--
-- テーブルの構造 `pictures`
--

CREATE TABLE IF NOT EXISTS `pictures` (
  `picture_id` int(11) NOT NULL AUTO_INCREMENT,
  `picture_name` varchar(255) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `picture_path` varchar(255) NOT NULL,
  `uploaded` datetime NOT NULL,
  `deleted` smallint(6) NOT NULL,
  PRIMARY KEY (`picture_id`),
  KEY `shop_id` (`shop_id`),
  KEY `deleted` (`deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- テーブルの構造 `shops`
--

CREATE TABLE IF NOT EXISTS `shops` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
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
  `shop_deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`shop_id`),
  KEY `pref_id` (`city_id`),
  KEY `shop_deleted` (`shop_deleted`),
  KEY `shop_validity_flag` (`shop_validity_flag`),
  KEY `shop_term_of_validity` (`shop_term_of_validity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
