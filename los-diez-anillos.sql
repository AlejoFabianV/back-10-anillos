-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-11-2022 a las 01:38:56
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `los-diez-anillos`

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `novedades`

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `descripcion` text NOT NULL,
  `precio` int(250) NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcado de datos para la tabla `novedades`

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `descripcion`, `precio`, `img_id`) VALUES
(1, 'Venom 01', 'REX', 'Tras el colapso de Shield, una maldad primordial ha despertado bajo las calles de Nueva York. Hace tiempo, un monstruo mítico aterrorizó a los humanos y a los klyntar. Ahora ha despertado, está furioso y tiene una influencia sobre el simbionte de Venom ¡que amenza con la conexión entre Eddie y su otro yo!.', 1100, 'iogxvbgxm5uj60i7sb5a'),
(2, 'Berserk 1', 'Kentaro Miura', 'Un hombre completamente vestido de negro que se hace llamar Guts, que tiene una mano artificial de hierro duro y que carga una espada gigantesca que supera su estatura. En el lugar al cual se dirige llueve sangre y hay montañas de cadáveres apilados.', 750, 'yslel0pm6pp9xhnrwjzy'),
(3, 'Naruto 35', 'Masashi Kishimoto', 'Si tan solo pudiera volverme más fuerte\" son las palabras que pronuncia Naruto al ver la enorme diferencia de fuerza entre él y Sasuke. Sin embargo, ¡Kakashi lo sorprende con un nuevo método de entrenamiento! Al mismo tiempo, ¡una nueva pareja de Akatsuki aparece en las proximidades del País del Fuego! Todo esto y más, ¡en Naruto 35!', 1100, 'azomz2ewobqze02bccht');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'Alejo', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
