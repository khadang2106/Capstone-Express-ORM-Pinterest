/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `refresh_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 1, 1, '2023-01-01', 'Bình luận cho hình ảnh 1');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 2, '2023-01-02', 'Bình luận cho hình ảnh 2');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 3, 3, '2023-01-03', 'Bình luận cho hình ảnh 3');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 4, 1, '2023-12-09', 'aaaa'),
(5, 4, 2, '2023-12-09', 'bbbbb');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `deleted_at`) VALUES
(1, 'Hình 1', 'duongdan1.jpg', 'Mô tả cho hình ảnh 1', 1, '2023-12-11 19:24:52');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `deleted_at`) VALUES
(2, 'Hình 2', 'duongdan2.jpg', 'Mô tả cho hình ảnh 2', 2, NULL);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `deleted_at`) VALUES
(3, 'Hình 3', 'duongdan3.jpg', 'Mô tả cho hình ảnh 3', 3, NULL);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `deleted_at`) VALUES
(4, NULL, 'https://res.cloudinary.com/dicixuz5j/image/upload/v1702799928/jci0wsqwbycncaf3b5mu.jpg', NULL, 4, '2023-12-18 09:14:41'),
(5, 'Xe hơi 4K', 'https://res.cloudinary.com/dicixuz5j/image/upload/v1702800143/zjx3amxkrlwon8er0gao.jpg', 'Hình xe hơi với chất lượng 4K', 4, '2023-12-18 09:14:49'),
(6, 'Audi 4K', 'https://res.cloudinary.com/dicixuz5j/image/upload/v1702890718/capstone-pinterest/wondpb0adpjyfooa5nem.jpg', 'Hình Audi R8 với chất lượng 4K', 4, NULL),
(7, 'Mèo', 'https://res.cloudinary.com/dicixuz5j/image/upload/v1702890795/capstone-pinterest/kb41eukphvzylzzey0l3.jpg', 'Mèo cười đểu', 4, NULL),
(8, 'Iron 883', 'https://res.cloudinary.com/dicixuz5j/image/upload/v1702891159/capstone-pinterest/kwn5bzgompgr50g8tc5q.jpg', 'Wallpaper xe HD Iron883 màu xám', 4, NULL),
(9, 'Phi hành gia', 'https://res.cloudinary.com/dicixuz5j/image/upload/v1702891196/capstone-pinterest/ekcjfo4ybjyqyuk0ocfp.jpg', 'Hình nền phi hành gia đẹp', 4, NULL),
(10, 'Arcana Windranger', 'https://res.cloudinary.com/dicixuz5j/image/upload/v1702891805/capstone-pinterest/smszrdgmkeqrouhqphc9.jpg', 'Arcana của Windranger, 1 tướng trong Dota2', 4, NULL);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `deleted_at`) VALUES
(1, 1, '2023-01-01', '2023-12-11 19:24:52');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `deleted_at`) VALUES
(2, 2, '2023-01-02', NULL);
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `deleted_at`) VALUES
(3, 3, '2023-01-03', NULL);
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `deleted_at`) VALUES
(4, 2, '2023-12-11', NULL),
(4, 3, '2023-12-11', NULL);

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(1, 'test01@gmail.com', '123', 'Người Dùng 1', 25, 'avatar1.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(2, 'test02@gmail.com', '123', 'Người Dùng 2', 30, 'avatar2.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(3, 'test03@gmail.com', '123', 'Người Dùng 3', 22, 'avatar3.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(4, 'test04@gmail.com', '$2b$10$rBO5jATxJR7fPyxAxqVlSeMq//Z9Jbre3x5V.lUS6GbRalYXRRg.2', 'Tester', 26, '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5ndW9pX2R1bmdfaWQiOjQsImtleSI6MTcwMzg3MjQ4MTc4Mn0sImlhdCI6MTcwMzg3MjQ4MSwiZXhwIjoxNzAzODcyNDkxfQ.0NY3AMvCTCjdh8SZ8kZ9k7tYdKjE0-XZimg11yC2J-4');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;