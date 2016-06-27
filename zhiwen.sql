-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 02 月 27 日 09:42
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `zhiwen`
--
CREATE DATABASE IF NOT EXISTS `zhiwen` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `zhiwen`;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(20) CHARACTER SET utf8 NOT NULL,
  `pass` char(40) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `sex` varchar(10) CHARACTER SET utf8 NOT NULL,
  `birthday` date DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `user`, `pass`, `email`, `sex`, `birthday`, `date`) VALUES
(1, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '0000-00-00', '2014-02-27 17:16:33'),
(2, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:20:15'),
(3, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:20:41'),
(4, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:21:52'),
(5, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:22:24'),
(6, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:22:45'),
(7, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:22:56'),
(8, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:23:15'),
(9, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:23:40'),
(10, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:29:17'),
(11, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:29:33'),
(12, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:30:30'),
(13, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:30:53'),
(14, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:31:51'),
(15, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:32:13'),
(16, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:32:57'),
(17, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-04', '2014-02-27 17:34:55'),
(18, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-03', '2014-02-27 17:35:08'),
(19, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-03', '2014-02-27 17:35:47'),
(20, 'bnbbs', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'bnbbs@163.com', 'male', '2014-02-03', '2014-02-27 17:36:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
