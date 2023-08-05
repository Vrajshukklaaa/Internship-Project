-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 14, 2023 at 04:32 AM
-- Server version: 8.0.27
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quizapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
CREATE TABLE IF NOT EXISTS `levels` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `levels_subject_id_index` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `subject_id`, `title`, `created_at`, `updated_at`) VALUES
(1, 1, 'KS', '2023-06-05 05:09:14', '2023-06-07 00:35:36'),
(4, 5, 'KS', '2023-06-05 05:27:06', '2023-06-07 00:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_05_29_111930_create_permission_tables', 1),
(6, '2023_06_05_071202_create_subjects_table', 1),
(7, '2023_06_05_071326_create_levels_table', 1),
(8, '2023_06_05_071642_create_sub_levels_table', 1),
(9, '2023_06_05_071811_create_topics_table', 1),
(16, '2023_06_05_072550_create_questions_table', 2),
(17, '2023_06_05_073134_create_question_options_table', 2),
(18, '2023_06_13_090833_add_video_to_questions', 3);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE IF NOT EXISTS `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE IF NOT EXISTS `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'web', '77bc4ed67dec896f4dbdaaddd2cb06d68e00d2f5c5e55f07de7f6bf9f1704364', '[\"Admin\"]', '2023-06-13 22:49:44', NULL, '2023-06-05 04:35:19', '2023-06-13 22:49:44'),
(2, 'App\\Models\\User', 2, 'web', '99e21109d586d026ca145f625a5bf0d8da17ef848610fb8385b4d25e62558964', '[\"Free\"]', '2023-06-05 04:40:49', NULL, '2023-06-05 04:35:38', '2023-06-05 04:40:49'),
(3, 'App\\Models\\User', 1, 'web', '59f5bbdf712d4915f4695b6586bbe7aba8957fe6a8716c59f046c42bfc000e41', '[\"Admin\"]', NULL, NULL, '2023-06-05 23:27:44', '2023-06-05 23:27:44'),
(4, 'App\\Models\\User', 1, 'web', '3929269eb32a096efaa9954e96a2ffcef754445f862ca596167cb8eae2abd45b', '[\"Admin\"]', '2023-06-06 23:58:17', NULL, '2023-06-06 23:12:20', '2023-06-06 23:58:17'),
(5, 'App\\Models\\User', 1, 'web', '42438193f666dabc08977744f5af7cdd1b2f5ce53b962ba79674c99ed6ac9189', '[\"Admin\"]', '2023-06-06 23:35:12', NULL, '2023-06-06 23:17:13', '2023-06-06 23:35:12'),
(6, 'App\\Models\\User', 1, 'web', '08d76e6f0b5a6d827762a933b4e31f5db23e5227b6c7878cb30ed6c904ca89f9', '[\"Admin\"]', '2023-06-07 00:28:52', NULL, '2023-06-06 23:35:25', '2023-06-07 00:28:52'),
(7, 'App\\Models\\User', 1, 'web', 'a43faa5b11876e153c2065987c668a863455f96bfde10b9e465fd2f4e6659981', '[\"Admin\"]', '2023-06-07 01:48:37', NULL, '2023-06-07 00:29:02', '2023-06-07 01:48:37'),
(8, 'App\\Models\\User', 1, 'web', '25439df7d06d617777baba39361f815b0cfe72a66bf86cfe2b8c1f5a52aa2e6e', '[\"Admin\"]', '2023-06-07 06:47:04', NULL, '2023-06-07 06:46:28', '2023-06-07 06:47:04'),
(9, 'App\\Models\\User', 1, 'web', '235afed5a8145bec57bfe839df0f3a558780f850b46a877c7a12c282af50f1ef', '[\"Admin\"]', '2023-06-08 01:52:52', NULL, '2023-06-08 01:49:30', '2023-06-08 01:52:52'),
(10, 'App\\Models\\User', 1, 'web', 'b6567057c257bf0be4fab383bca390383dc4a3c6f4fe803c5fec2dc8e3cad56b', '[\"Admin\"]', '2023-06-09 00:14:22', NULL, '2023-06-09 00:10:21', '2023-06-09 00:14:22'),
(11, 'App\\Models\\User', 1, 'web', 'b9780cbdcff8337de5aaeb5fdedcf369e032e1ef526668a4470867f94a2b4185', '[\"Admin\"]', '2023-06-09 04:12:43', NULL, '2023-06-09 02:01:51', '2023-06-09 04:12:43'),
(12, 'App\\Models\\User', 1, 'web', '7ffc42c6e0da17294851d04446e3a9d90afabc216b98aa82b70ba3ff6836b87e', '[\"Admin\"]', '2023-06-09 05:38:36', NULL, '2023-06-09 04:13:05', '2023-06-09 05:38:36'),
(13, 'App\\Models\\User', 1, 'web', '44492651aa0feb925380a7079815afe099820580ad699fc60326c232047c6c50', '[\"Admin\"]', '2023-06-09 05:38:51', NULL, '2023-06-09 05:38:42', '2023-06-09 05:38:51'),
(14, 'App\\Models\\User', 1, 'web', '53eaba39fee5ccdb3971935fad931c0dd36103136d41557bee9ab0e6dd965ac7', '[\"Admin\"]', '2023-06-13 07:19:17', NULL, '2023-06-12 23:31:58', '2023-06-13 07:19:17');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `topic_id` bigint UNSIGNED NOT NULL,
  `question` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `explanation` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `revisiontext` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `video` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questions_topic_id_index` (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `topic_id`, `question`, `explanation`, `revisiontext`, `created_at`, `updated_at`, `video`) VALUES
(8, 2, 'Which of the following is true about Laravel?', 'Laravel is an open-source PHP framework, which is robust and easy to understand.', 'Laravel is an open-source PHP framework, which is robust and easy to understand.', '2023-06-06 07:02:28', '2023-06-06 07:02:28', NULL),
(9, 2, 'Command line interface used in Laravel is called?', 'Command line interface used in Laravel is called Artisan.', 'Command line interface used in Laravel is called Artisan.', '2023-06-09 04:39:01', '2023-06-09 04:39:01', NULL),
(18, 2, 'Question 3', 'Command line interface used in Laravel is called Artisan.', 'Command line interface used in Laravel is called Artisan.', '2023-06-13 07:57:51', '2023-06-13 07:57:51', NULL),
(19, 2, 'Question 3', 'Command line interface used in Laravel is called Artisan.', 'Command line interface used in Laravel is called Artisan.', '2023-06-13 07:58:27', '2023-06-13 07:58:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `question_options`
--

DROP TABLE IF EXISTS `question_options`;
CREATE TABLE IF NOT EXISTS `question_options` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_id` bigint UNSIGNED NOT NULL,
  `option_key` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `option_value` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_correct` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_options_question_id_index` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `question_options`
--

INSERT INTO `question_options` (`id`, `question_id`, `option_key`, `option_value`, `is_correct`, `created_at`, `updated_at`) VALUES
(1, 8, 'A', 'Laravel is an open-source PHP framework', '0', '2023-06-06 07:02:28', '2023-06-06 07:02:28'),
(2, 8, 'B', 'Laravel is robust', '0', '2023-06-06 07:02:28', '2023-06-06 07:02:28'),
(3, 8, 'C', 'Laravel is easy to understand', '0', '2023-06-06 07:02:28', '2023-06-06 07:02:28'),
(4, 8, 'D', 'All of the above', '1', '2023-06-06 07:02:28', '2023-06-06 23:06:08'),
(5, 9, 'A', 'composer', '0', '2023-06-09 04:39:01', '2023-06-09 04:39:01'),
(6, 9, 'B', 'Artisan', '1', '2023-06-09 04:39:01', '2023-06-09 04:39:01'),
(7, 9, 'C', 'Symphony', '0', '2023-06-09 04:39:01', '2023-06-09 04:39:01'),
(8, 9, 'D', 'ORM', '0', '2023-06-09 04:39:01', '2023-06-09 04:39:01'),
(13, 18, 'A', 'composer', '0', '2023-06-13 07:57:51', '2023-06-13 07:57:51'),
(14, 18, 'B', 'Artisan', '1', '2023-06-13 07:57:51', '2023-06-13 07:57:51'),
(15, 18, 'C', 'Symphony', '0', '2023-06-13 07:57:51', '2023-06-13 07:57:51'),
(16, 18, 'D', 'ORM', '0', '2023-06-13 07:57:51', '2023-06-13 07:57:51'),
(17, 19, 'A', 'composer 1', '0', '2023-06-13 07:58:27', '2023-06-13 07:58:27'),
(18, 19, 'B', 'Artisan 2', '1', '2023-06-13 07:58:27', '2023-06-13 07:58:27'),
(19, 19, 'C', 'Symphony 3', '0', '2023-06-13 07:58:27', '2023-06-13 07:58:27'),
(20, 19, 'D', 'ORM 4', '0', '2023-06-13 07:58:27', '2023-06-13 07:58:27');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'web', NULL, NULL),
(2, 'Free', 'web', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE IF NOT EXISTS `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'French', '2023-06-05 04:22:30', '2023-06-07 00:35:27'),
(2, 'Computer', '2023-06-05 04:22:37', '2023-06-05 04:22:37'),
(4, 'Science', '2023-06-05 05:19:48', '2023-06-05 05:19:48'),
(5, 'English', '2023-06-05 05:20:26', '2023-06-06 23:30:55');

-- --------------------------------------------------------

--
-- Table structure for table `sub_levels`
--

DROP TABLE IF EXISTS `sub_levels`;
CREATE TABLE IF NOT EXISTS `sub_levels` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `level_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_levels_level_id_index` (`level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sub_levels`
--

INSERT INTO `sub_levels` (`id`, `level_id`, `title`, `created_at`, `updated_at`) VALUES
(1, 4, 'GCSE12', '2023-06-05 06:02:57', '2023-06-05 06:19:27'),
(3, 4, 'OCR', '2023-06-05 06:34:39', '2023-06-05 06:34:39');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_id` bigint UNSIGNED NOT NULL,
  `level_id` bigint UNSIGNED NOT NULL,
  `sublevel_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `topics_subject_id_index` (`subject_id`),
  KEY `topics_level_id_index` (`level_id`),
  KEY `topics_sublevel_id_index` (`sublevel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `subject_id`, `level_id`, `sublevel_id`, `title`, `created_at`, `updated_at`) VALUES
(2, 2, 4, 1, 'Learn Laravel', '2023-06-05 07:07:12', '2023-06-09 00:14:19'),
(3, 1, 1, 1, 'Sample Topic', '2023-06-12 23:56:08', '2023-06-12 23:56:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin Admin', 'admin@example.com', '2023-06-05 04:08:44', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'AQPzcRHOn9', '2023-06-05 04:08:44', '2023-06-05 04:08:44'),
(2, 'User Front', 'front@example.com', '2023-06-05 04:09:55', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'zfUvlAWK1u', '2023-06-05 04:09:55', '2023-06-05 04:09:55');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `levels`
--
ALTER TABLE `levels`
  ADD CONSTRAINT `levels_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_topic_id_foreign` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question_options`
--
ALTER TABLE `question_options`
  ADD CONSTRAINT `question_options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_levels`
--
ALTER TABLE `sub_levels`
  ADD CONSTRAINT `sub_levels_level_id_foreign` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_level_id_foreign` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topics_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topics_sublevel_id_foreign` FOREIGN KEY (`sublevel_id`) REFERENCES `sub_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
