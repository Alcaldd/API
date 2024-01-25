-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-01-2024 a las 13:52:55
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alcalde_foro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `subtitulo` varchar(250) NOT NULL,
  `contenido` varchar(10000) DEFAULT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `portada` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `id_usuario`, `titulo`, `subtitulo`, `contenido`, `fecha`, `portada`) VALUES
(2, 1, 'Auto de los sueños', 'El mejor auto en precio', '<p><strong>Este auto esta tomando relevancia en las ultimas horas debido a su bajo costo de mantenimiento y produccion.</strong></p>\r\n<p><strong><img src=\"http://localhost:3000/images/1705932421417-bora.jpg\" alt=\"\" width=\"568\" height=\"426\" /></strong></p>', '2024-01-22', 'http://localhost:3000/images/1705932428444-bora.jpg'),
(3, 1, 'El mejor auto', 'asdasd', '<p>asdfsadfasdfasdf</p>', '2024-01-22', 'http://localhost:3000/images/1705966733478-GAZ_6de0f32792cc45e2aaf10ab39c3b9b37.jpg'),
(4, 1, ' RED BULL PRESENTÓ EL DISEÑO DE SU MONOPLAZA PARA EL GRAN PREMIO DE LOS ESTADOS UNIDOS', 'La escudería austriaca puso los colores de la bandera de los Estados Unidos de cara a su próxima carrera', '<p><img src=\"http://localhost:3000/images/1705982953260-f0m2ayswyay7k0o-12.jpg\" alt=\"\" /></p>\r\n<p dir=\"ltr\" style=\"line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;\"><span style=\"font-size: 12pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Red Bull present&oacute; este mi&eacute;rcoles el dise&ntilde;o que llevar&aacute;n sus monoplazas para el Gran Premio de los Estados Unidos a realizarse este fin de semana.&nbsp;</span></p>\r\n<p dir=\"ltr\" style=\"line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;\"><span style=\"font-size: 12pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">La escuder&iacute;a donde Sergio \'Checo\' P&eacute;rez y Max Verstappen corren mostr&oacute; el dise&ntilde;o, el cual cuenta con los colores de los Estados Unidos, pues a sus costados se encuentran unos detalles con franjas blancas y rojas, adem&aacute;s algunas estrellas, mientras que en la parte trasera en el aler&oacute;n se encuentra la bandera del estado de Texas.</span></p>\r\n<p><span id=\"docs-internal-guid-85081989-7fff-c439-6e34-ebcaaacc1157\"></span></p>\r\n<p dir=\"ltr\" style=\"line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;\"><span style=\"font-size: 12pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\">Con este nuevo dise&ntilde;o, la escuder&iacute;a de Red Bull buscar&aacute; mantener su dominio en los &uacute;ltimos a&ntilde;os en Austin, pues en 2021 y en 2022 el piloto neerland&eacute;s fue quien se consagr&oacute; campe&oacute;n.</span></p>\r\n<p dir=\"ltr\" style=\"line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;\"><span style=\"font-size: 12pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><img src=\"http://localhost:3000/images/1705982965151-f0mrlvtwaaetu-h-12.jpg\" alt=\"\" /></span></p>', '2024-01-22', 'http://localhost:3000/images/1705982968317-descarga.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `gasolina` int(11) DEFAULT 1,
  `confiabilidad` int(11) DEFAULT 1,
  `confort` int(11) DEFAULT 1,
  `diseno` int(11) DEFAULT 1,
  `manejo` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id`, `id_usuario`, `id_resena`, `gasolina`, `confiabilidad`, `confort`, `diseno`, `manejo`) VALUES
(2, 1, 14, 0, 0, 3, 0, 0),
(3, 2, 14, 2, 4, 4, 4, 5),
(4, 2, 15, 3, 1, 1, 1, 1),
(5, 1, 15, 5, 4, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrete`
--

CREATE TABLE `carrete` (
  `id` int(11) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `id_resena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrete`
--

INSERT INTO `carrete` (`id`, `imagen`, `id_resena`) VALUES
(4, 'http://localhost:3000/images\\1705504828266-audi.jpg', 14),
(5, 'http://localhost:3000/images/1705505364195-audi.jpg', 15),
(6, 'http://localhost:3000/images/1705505364224-bmw.jpg', 15),
(7, 'http://localhost:3000/images/1705505364254-bora.jpg', 15),
(8, 'http://localhost:3000/images/1705505364287-sedan.png', 15),
(9, 'http://localhost:3000/images/1705930028164-audi.jpg', 16),
(10, 'http://localhost:3000/images/1705938084470-audi.jpg', 17),
(11, 'http://localhost:3000/images/1705942641298-2024-nissan-versa-cargo-space-showcase-rear-trunk.jpg', 18),
(12, 'http://localhost:3000/images/1705942641330-2024-nissan-versa-front-view-front-lights.jpg', 18),
(13, 'http://localhost:3000/images/1705942641602-2024-nissan-versa-rear-view-cityscape.jpg', 18),
(14, 'http://localhost:3000/images/1705942641637-2024-nissan-versa-rear-view-rear-lights.jpg', 18),
(15, 'http://localhost:3000/images/1705942641669-2024-nissan-versa-red-street-parking.jpg', 18),
(16, 'http://localhost:3000/images/1705942641704-2024-nissan-versa-side-view-by-seaside-road.jpg', 18),
(17, 'http://localhost:3000/images/1705942641737-2024-nissan-versa-signature-led-daytime-running-lights.jpg', 18),
(18, 'http://localhost:3000/images/1705943396328-GAZ_5ded71b1702b42dc85b003127acff4f4.jpg', 19),
(19, 'http://localhost:3000/images/1705943396375-GAZ_6de0f32792cc45e2aaf10ab39c3b9b37.jpg', 19),
(20, 'http://localhost:3000/images/1705943396447-GAZ_8a357cc9bec84c17b1222ed1921caa6e.jpg', 19),
(21, 'http://localhost:3000/images/1705943396486-GAZ_8aabb3c7b06f4a12a894d603852dee81.jpg', 19),
(22, 'http://localhost:3000/images/1705943396523-GAZ_67c86560d30f4754a8435634efa59448.jpg', 19),
(23, 'http://localhost:3000/images/1705943396560-GAZ_98cebf83b83a471d9a029a4cc3ce3617.jpg', 19),
(24, 'http://localhost:3000/images/1705943396601-GAZ_af10f9fd9ade4b409e8c07bce075a321.jpg', 19),
(25, 'http://localhost:3000/images/1705943972349-cheyenne-bison-exterior.jpg', 20),
(26, 'http://localhost:3000/images/1705943972371-cheyenne-bison-exterior-modal.jpg', 20),
(27, 'http://localhost:3000/images/1705943972393-cheyenne-bison-gal-ext-01.jpg', 20),
(28, 'http://localhost:3000/images/1705943972414-cheyenne-bison-gal-ext-04.jpg', 20),
(29, 'http://localhost:3000/images/1705943972437-cheyenne-bison-gal-ext-06.jpg', 20),
(30, 'http://localhost:3000/images/1705943972458-cheyenne-bison-gal-int-02.jpg', 20),
(31, 'http://localhost:3000/images/1705943972477-cheyenne-bison-gal-int-03.jpg', 20),
(32, 'http://localhost:3000/images/1705944924438-2024-nissan-frontier.jpg', 21),
(33, 'http://localhost:3000/images/1705944924471-2024-nissan-frontier-desert.jpg', 21),
(34, 'http://localhost:3000/images/1705944924504-2024-nissan-frontier-interior-design.jpg', 21),
(35, 'http://localhost:3000/images/1705944924535-2024-nissan-frontier-king-cab-interior.jpg', 21),
(36, 'http://localhost:3000/images/1705944924557-2024-nissan-frontier-off-road.jpg', 21),
(37, 'http://localhost:3000/images/1705944924587-2024-nissan-frontier-wheels.jpg', 21),
(38, 'http://localhost:3000/images/1705945606933-2024-aveo-sedan-gal-ext-02.jpg', 22),
(39, 'http://localhost:3000/images/1705945606962-2024-aveo-sedan-gal-ext-03.jpg', 22),
(40, 'http://localhost:3000/images/1705945606992-2024-aveo-sedan-gal-ext-05.jpg', 22),
(41, 'http://localhost:3000/images/1705945607021-2024-aveo-sedan-gal-int-01.jpg', 22),
(42, 'http://localhost:3000/images/1705945607057-2024-aveo-sedan-gal-int-02.jpg', 22),
(43, 'http://localhost:3000/images/1705945607094-2024-aveo-sedan-gal-int-03.jpg', 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

CREATE TABLE `coches` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `lista_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coches`
--

INSERT INTO `coches` (`id`, `resena_id`, `lista_id`) VALUES
(1, 19, 1),
(2, 18, 1),
(3, 21, 1),
(4, 19, 2),
(5, 20, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `codigos`
--

INSERT INTO `codigos` (`id`, `codigo`, `id_usuario`) VALUES
(1, 340519, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunicados`
--

CREATE TABLE `comunicados` (
  `id` int(11) NOT NULL,
  `id_autor` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `mensaje` varchar(3500) NOT NULL,
  `fecha` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles`
--

CREATE TABLE `detalles` (
  `id` int(11) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `ano` int(11) NOT NULL DEFAULT 2000,
  `hp` int(11) NOT NULL DEFAULT 0,
  `puertas` int(11) NOT NULL,
  `precio_inicial` int(11) NOT NULL DEFAULT 0,
  `precio_final` int(11) NOT NULL DEFAULT 0,
  `etiquetas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles`
--

INSERT INTO `detalles` (`id`, `modelo`, `marca`, `ano`, `hp`, `puertas`, `precio_inicial`, `precio_final`, `etiquetas`) VALUES
(16, '150', 'Motomel', 2017, 200, 0, 1005000, 2350000, 'estudiantes, deportivo'),
(17, '1.8T', 'Volkswagen', 2009, 200, 4, 45000, 120000, 'rendidor, pickup, economico'),
(19, 'A4', 'Audi', 2016, 200, 4, 80999, 126300, 'carga, familiar, deportivo'),
(20, 'Versa ', 'Nissan', 2024, 118, 5, 349900, 439900, 'estudiantes, economico, rendidor, familiar'),
(21, 'Sentra Sense', 'Nissan', 2024, 145, 5, 390900, 536900, 'estudiantes, economico, familiar'),
(22, 'Cheyenne RST CD', 'Chevrolet ', 2024, 355, 5, 1035900, 1640400, 'cuatro, carga, pickup'),
(23, 'Frontier Pro-4X V6 ', 'Nissan', 2024, 310, 5, 1050900, 1100590, 'cuatro, carga, pickup'),
(24, 'Aveo LT', 'Chevrolet', 2024, 98, 5, 288900, 338400, 'estudiantes, economico, rendidor, familiar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foros`
--

CREATE TABLE `foros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foros`
--

INSERT INTO `foros` (`id`, `titulo`, `id_usuario`, `estado`) VALUES
(1, 'Vehiculos Generales', 1, 1),
(2, 'motos', 4, 1),
(3, 'chidas motos', 1, 1),
(4, 'Cosas de BMW lovers', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `visitas` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `id_usuario`, `id_resena`, `visitas`) VALUES
(1, 1, 15, 114),
(3, 1, 14, 7),
(4, 2, 14, 10),
(6, 1, 17, 2),
(7, 1, 19, 14),
(8, 1, 18, 7),
(9, 1, 21, 1),
(10, 1, 20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE `listas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` varchar(100) NOT NULL,
  `imagen` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `listas`
--

INSERT INTO `listas` (`id`, `titulo`, `subtitulo`, `imagen`) VALUES
(1, 'Los nissan del foro', 'Los autos nissan que tenemos', 'http://localhost:3000/images/1705966856416-GAZ_6de0f32792cc45e2aaf10ab39c3b9b37.jpg'),
(2, 'Peores nissan', 'asdasda', 'http://localhost:3000/images/1705966878792-GAZ_8a357cc9bec84c17b1222ed1921caa6e.jpg'),
(3, 'peores chevro', 'dasdsa', 'http://localhost:3000/images/1705966923492-2024-aveo-sedan-gal-ext-01.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `mensaje` varchar(1500) DEFAULT '',
  `imagen` varchar(130) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_usuario`, `id_foro`, `mensaje`, `imagen`) VALUES
(15, 1, 1, 'sa', ''),
(17, 2, 1, 'sa', ''),
(18, 2, 1, 'sa', ''),
(19, 2, 1, 'tonto', ''),
(20, 2, 1, 'Buens', ''),
(21, 4, 2, 'perros admin', ''),
(22, 4, 4, 'Hola bmw lovers como estas', ''),
(25, 4, 4, 'Yo prefiero mi versa a veces', 'http://localhost:3000/images/chat/1705976427218-2024-nissan-versa-blue-parked-outdoors.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_likes`
--

CREATE TABLE `mensajes_likes` (
  `id` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `id_mensaje` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_votante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes_likes`
--

INSERT INTO `mensajes_likes` (`id`, `id_foro`, `id_mensaje`, `point`, `id_votante`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 1, 1, 2),
(3, 1, 14, 1, 2),
(5, 1, 15, 1, 2),
(7, 1, 8, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_replica`
--

CREATE TABLE `mensajes_replica` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `id_mensaje` int(11) NOT NULL,
  `mensaje` text DEFAULT NULL,
  `imagen` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes_replica`
--

INSERT INTO `mensajes_replica` (`id`, `id_usuario`, `id_foro`, `id_mensaje`, `mensaje`, `imagen`) VALUES
(8, 2, 1, 20, 'buenas', ''),
(9, 1, 2, 21, 'lou lou', ''),
(10, 4, 2, 21, 'la fresada pa la albercada', ''),
(11, 1, 2, 21, 'pero no es el patron son 4 letras', ''),
(12, 4, 2, 21, 'afirmativa junto a todos sus plebeeeeees', ''),
(13, 4, 4, 22, 'Bien', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_reply_likes`
--

CREATE TABLE `mensaje_reply_likes` (
  `id` int(11) NOT NULL,
  `id_foro` int(11) NOT NULL,
  `id_reply` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_votante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `id_usuario`, `mensaje`, `fecha`) VALUES
(4, 2, 'Has sido baneado por tener 3 strikes', '2024-01-17'),
(5, 2, 'Has sido baneado por tener 3 strikes', '2024-01-17'),
(6, 2, 'Palabras Prohibidas', '2024-01-17'),
(7, 2, 'Has sido baneado por tener 3 strikes', '2024-01-22'),
(8, 2, 'Sancionado por no respetar las reglas', '2024-01-22'),
(9, 2, 'Has sido baneado por tener 3 strikes', '2024-01-22'),
(10, 2, 'Foto inapropiada', '2024-01-22'),
(11, 2, 'Has sido ascendido a escritor', '2024-01-22'),
(12, 4, 'strike por grosero', '2024-01-22'),
(13, 5, 'Has sido ascendido a escritor', '2024-01-22'),
(14, 5, 'Has sido ascendido a moderador', '2024-01-22'),
(15, 5, 'Has sido ascendido a admin', '2024-01-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quejas`
--

CREATE TABLE `quejas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mensaje` varchar(3500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `id` int(11) NOT NULL,
  `tipo_sancion` varchar(150) NOT NULL,
  `id_sancionado` int(11) NOT NULL,
  `razon` varchar(250) NOT NULL,
  `id_moderador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`id`, `tipo_sancion`, `id_sancionado`, `razon`, `id_moderador`) VALUES
(2, 'STRIKE', 2, 'Palabras Prohibidas', 3),
(3, 'STRIKE', 2, 'Palabras Prohibidas', 3),
(4, 'BAN', 2, 'Palabras Prohibidas', 3),
(5, 'BAN', 2, 'Palabras Prohibidas', 3),
(6, 'STRIKE', 2, 'Palabras Prohibidas', 3),
(7, 'BAN', 2, 'Sancionado por no respetar las reglas', 1),
(8, 'STRIKE', 2, 'Sancionado por no respetar las reglas', 1),
(9, 'BAN', 2, 'Foto inapropiada', 1),
(10, 'STRIKE', 2, 'Foto inapropiada', 1),
(11, 'PERDON', 2, 'Perdonado por malas sanciones', 1),
(12, 'ASCENSO', 2, 'Se ascendio un usuario de id 2', 1),
(13, 'STRIKE', 4, 'strike por grosero', 1),
(14, 'ASCENSO', 5, 'Se ascendio un usuario de id 5', 1),
(15, 'ASCENSO', 5, 'Se ascendio un usuario de id 5', 1),
(16, 'ASCENSO', 5, 'Se ascendio un usuario de id 5', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reglas`
--

CREATE TABLE `reglas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `contenido` varchar(670) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reglas`
--

INSERT INTO `reglas` (`id`, `nombre`, `contenido`) VALUES
(1, 'Regla General de Foros', 'No insultar, No Spamear, No Floodear, Respetar a usuarios.'),
(2, 'Palabras', 'Tonto, Tonto, Malo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_foro` int(11) DEFAULT NULL,
  `id_articulo` int(11) DEFAULT NULL,
  `id_resena` int(11) DEFAULT NULL,
  `id_reportante` int(11) NOT NULL,
  `motivo` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena`
--

CREATE TABLE `resena` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_detalles` int(11) NOT NULL,
  `calificaciones` int(11) DEFAULT 0,
  `imagen` varchar(1500) NOT NULL,
  `descripcion` varchar(1500) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `video` varchar(500) DEFAULT NULL,
  `visitas` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena`
--

INSERT INTO `resena` (`id`, `id_usuario`, `id_detalles`, `calificaciones`, `imagen`, `descripcion`, `titulo`, `video`, `visitas`) VALUES
(14, 1, 16, 0, 'http://localhost:3000/images/1705349914085-tornado.jpg', 'La moto mas rendidora en la ciudad', 'Skua', '_6XzJPyAJDI', 18),
(15, 2, 17, 0, 'http://localhost:3000/images/1705505364159-bora.jpg', 'El coche elegido en Argentina', 'Bora', 'Opxhh9Oh3rg', 120),
(17, 1, 19, 0, 'http://localhost:3000/images/1705938084436-a4.jpg', 'La mejor opcion para el dia a dia', 'Audi A4', '1JZLzFT74QU', 2),
(18, 1, 20, 0, 'http://localhost:3000/images/1705942641262-2024-nissan-versa-blue-parked-outdoors.jpg', 'Prepárate para retar lo establecido a bordo de Nissan Versa 2024, un auto que vuelve a elevar los estándares de seguridad y tecnología en su segmento.', 'Nissan Versa 2024', 'FnEAQvgtDzo', 7),
(19, 1, 21, 0, 'http://localhost:3000/images/1705943396289-GAZ_359f45aca89e4b43bab9ebd8260beaba.jpg', 'El nuevo Nissan Sentra 2024 tiene tecnología para lo que sigue, además de un diseño sofisticado que lo hacen un sedán único en su segmento.', 'Nissan Sentra 2024', '9qoHp5IKZ94', 14),
(20, 1, 22, 0, 'http://localhost:3000/images/1705943972324-cheyenne-bison-desempeno.jpg', 'Nueva Chevrolet Cheyenne 2024, la mejor camioneta pickup con motor V8. Legendaria por su poder y tecnología. ¡Conoce todo sobre ella!', 'Chevrolet Cheyenne 2024', '6PaoliZutIE', 1),
(21, 1, 23, 0, 'http://localhost:3000/images/1705944924406-2024-nissan-frontier-exterior.jpg', 'Construida con la fortaleza que merece una Pick-Up Nissan Frontier, PRO-4X cuenta con bloqueo de diferencial trasero y un ángulo de ataque de 31° y 25.3°', 'Nissan Frontier Pro-4X V6 2024', 'upkcvWlJNR8', 1),
(22, 1, 24, 0, 'http://localhost:3000/images/1705945606903-2024-aveo-sedan-gal-ext-01.jpg', 'El nuevo Chevrolet Aveo en su nueva versión Hatchback 2024 llega totalmente rediseñado con mayor seguridad y conectividad. ¡Reinvenciónate!', 'Chevrolet Aveo 2024', 'AG2WpRz3fio', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_chasis`
--

CREATE TABLE `resena_chasis` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `motor` varchar(150) NOT NULL,
  `traccion` varchar(150) NOT NULL,
  `tranmision` varchar(150) NOT NULL,
  `frenos` varchar(150) NOT NULL,
  `neumaticos` varchar(150) NOT NULL,
  `suspdelantero` varchar(150) NOT NULL,
  `susptrasera` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_chasis`
--

INSERT INTO `resena_chasis` (`id`, `resena_id`, `motor`, `traccion`, `tranmision`, `frenos`, `neumaticos`, `suspdelantero`, `susptrasera`, `direccion`) VALUES
(13, 14, 'Centro', 'Arrastre', 'Manual', 'Frenos a disco', 'Pirelli', 'Si', 'Si', 'No'),
(14, 15, 'Centro', 'Arrastre', 'Manual', 'Si', 'Si', 'Si', 'Si', 'Si'),
(16, 17, 'Centro', 'Delantera', 'Automatica', 'Si', 'Si', 'Si', 'Si', 'Si'),
(17, 18, 'Delantero', 'Delantera', 'Xtronic CVT', 'Discos ventilados y tambor', '195/65/R15', 'Independiente tipo McPherson con barra estabilizadora', 'Eje torsional con ruedas tiradas y resortes', 'eléctrica progresiva'),
(18, 19, 'delantero ', 'delantera', 'manual 6 velocidades', 'discos ventilados y discos sólidos', '205/60/R16', 'Independiente tipo McPherson con barra estabilizadora', 'Independiente MultiLink con barra estabilizadora', 'eléctrica progresiva'),
(19, 20, 'delantero', 'integral permanente', 'automática CVT 6 Velocidades', 'discos ventilados - discos sólidos', '275/60/R20', 'Independiente de doble horquilla con barra estabilizadora', 'Eje rígido', 'eléctrica'),
(20, 21, 'delantero ', 'integral', 'automática 9 velocidades', 'discos ventilados - discos ventilados', '265/70/R17', 'Independiente de doble horquilla con barra estabilizadora', 'Eje rígido de 5 brazos, muelles y barra estabilizadora desconectable', 'hidráulica'),
(21, 22, 'delantero', 'delantera', 'manual 6 velocidades', 'discos ventilados - tambor', '185/60/R15', 'Independiente tipo McPherson con barra estabilizadora', 'Eje torsional con ruedas tiradas y resortes', 'eléctrica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_comentarios`
--

CREATE TABLE `resena_comentarios` (
  `id` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_comentarios`
--

INSERT INTO `resena_comentarios` (`id`, `id_resena`, `id_usuario`, `mensaje`) VALUES
(1, 15, 2, 'b'),
(2, 15, 1, 'como estas'),
(3, 15, 1, 'ass'),
(4, 14, 1, 'Hola se ve bueno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_confort`
--

CREATE TABLE `resena_confort` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `aire` varchar(150) NOT NULL,
  `asientosd` varchar(150) NOT NULL,
  `asientost` varchar(150) NOT NULL,
  `cierre` varchar(150) NOT NULL,
  `espejoi` varchar(150) NOT NULL,
  `espejoe` varchar(150) NOT NULL,
  `farosniebla` varchar(150) NOT NULL,
  `farosdelanteros` varchar(150) NOT NULL,
  `cambios` varchar(150) NOT NULL,
  `quemacocos` varchar(150) NOT NULL,
  `rines` varchar(150) NOT NULL,
  `vestiduras` varchar(150) NOT NULL,
  `crucero` varchar(150) NOT NULL,
  `vidrios` varchar(150) NOT NULL,
  `volante` varchar(150) NOT NULL,
  `cajuela` varchar(150) NOT NULL,
  `sensor` varchar(150) NOT NULL,
  `camara` varchar(150) NOT NULL,
  `computadora` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_confort`
--

INSERT INTO `resena_confort` (`id`, `resena_id`, `aire`, `asientosd`, `asientost`, `cierre`, `espejoi`, `espejoe`, `farosniebla`, `farosdelanteros`, `cambios`, `quemacocos`, `rines`, `vestiduras`, `crucero`, `vidrios`, `volante`, `cajuela`, `sensor`, `camara`, `computadora`) VALUES
(2, 14, 'No', 'No', 'No', 'No', '1', '2', 'No', 'Si', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'Si', 'No', 'No', 'No'),
(3, 15, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'),
(5, 17, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'No', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'),
(6, 18, 'manual', 'con ajuste en altura solo conductor, con ajuste manual', 'no abatibles', 'apertura y cierre por presencia (Keyless)', 'antideslumbrante manual', 'eléctricos', 'delanteros', 'Fijos', 'N/D', 'No', 'aleación', 'tela', 'Si', 'eléctricos - eléctricos', 'Con ajuste en altura y profundidad, multifunción', 'Interna', 'traseros', 'Si', 'Si'),
(7, 19, 'manual', 'con ajuste en altura solo conductor, con ajuste manual', 'abatibles 60/40', 'apertura y cierre por presencia (Keyless)', 'antideslumbrante manual', 'eléctricos', 'no tiene', 'fijos de halógeno', 'N/D', 'No', 'aleación', 'tela', 'Si', 'eléctricos - eléctricos', 'con ajuste en altura y profundidad', 'interna y a distancia solo cajuela', 'traseros', 'Si', 'Si'),
(8, 20, 'climatizador bizona', 'calefaccionables, con ajuste eléctrico en altura y lumbar solo conductor, con ajuste eléctrico solo conductor', 'abatibles 60/40', 'apertura y cierre por presencia (Keyless)', 'antideslumbrante manual', 'eléctricos', 'delanteros', 'con apagado automático, fijos', 'N/D', 'No', 'aleación', 'tela', 'Si', 'eléctricos - eléctricos', 'con ajuste en altura y profundidad, multifunción revestido en piel', 'interior y remota', 'delanteros y traseros', 'con visión de 360 grados', 'Si'),
(9, 21, 'climatizador bizona', 'calefaccionables, con ajuste eléctrico solo conductor', 'abatibles 60/40', 'centralizado con comando a distancia', 'antideslumbrante automático', 'eléctricos', 'delanteros con led', 'con encendido automático, con luces de marcha diurna, con luces led, con regulación interna', 'revestida en piel', 'eléctrico', 'aleación', 'piel', 'Si', 'eléctricos - eléctricos', 'calefactable, con ajuste en altura, multifunción revestido en piel', 'interna y a distancia', 'delanteros y traseros', 'con visión de 360 grados', 'Si'),
(10, 22, 'manual', 'con ajuste manual', 'abatibles 60/40', 'centralizado con comando a distancia', 'antideslumbrante manual', 'con luces direccionales integradas, eléctricos', 'delanteros', 'con luces led de marcha diurna, fijos', 'revestida en piel', 'No', 'aleación', 'tela', 'Si', 'eléctricos - eléctricos', 'con ajuste en altura, multifunción', 'interna y a distancia solo cajuela', 'traseros', 'Si', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_entretenimiento`
--

CREATE TABLE `resena_entretenimiento` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `musica` varchar(150) NOT NULL,
  `bocinas` varchar(150) NOT NULL,
  `conex` varchar(150) NOT NULL,
  `bluetooth` varchar(150) NOT NULL,
  `tablero` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_entretenimiento`
--

INSERT INTO `resena_entretenimiento` (`id`, `resena_id`, `musica`, `bocinas`, `conex`, `bluetooth`, `tablero`) VALUES
(4, 14, 'No', 'Si', 'No', 'No', 'No'),
(5, 15, 'Si', 'Si', 'Si', 'Si', 'Si'),
(7, 17, 'Si', 'Si', 'Si', 'Si', 'Si'),
(8, 18, 'AM - FM, Android Auto, Apple Car Play, con comandos de audio', '2', 'Si', 'Si', 'táctil de 7\" color'),
(9, 19, 'AM - FM, Android Auto, Apple Car Play', '4', 'Si', 'Si', 'cuadro de instrumentos digital de 4.2\", táctil de 7\" color'),
(10, 20, 'AM - FM con lector de Mp3, Android Auto, Apple Car Play, con comandos de audio al volante', '6', 'Si', 'Si', 'táctil de 13.2\"'),
(11, 21, 'AM - FM, Android Auto, Apple Car Play, Cargador inalámbrico para smartphone, sistema de sonido Fender', '8', 'Si', 'Si', 'cuadro de instrumentos digital de 7\", táctil de 9\"'),
(12, 22, 'AM - FM y CD con lector de Mp3, Android Auto, Apple Car Play, con comandos de audio al volante', '4', 'Si', 'Si', 'color de 3.5\", táctil de 8\" color');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_medidas`
--

CREATE TABLE `resena_medidas` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `largo` varchar(11) NOT NULL,
  `alto` varchar(11) NOT NULL,
  `ancho` varchar(11) NOT NULL,
  `distanciaejes` varchar(11) NOT NULL,
  `cajuela` varchar(150) NOT NULL,
  `tanque` varchar(11) NOT NULL,
  `peso` varchar(11) NOT NULL,
  `capacidadcarga` varchar(150) NOT NULL,
  `alturapiso` varchar(150) NOT NULL,
  `capacidadvadeo` varchar(150) NOT NULL,
  `anguloataque` varchar(150) NOT NULL,
  `angulopartida` varchar(150) NOT NULL,
  `anguloventral` varchar(150) NOT NULL,
  `remolque` varchar(150) NOT NULL,
  `escalonamiento` varchar(150) NOT NULL,
  `inclinacion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_medidas`
--

INSERT INTO `resena_medidas` (`id`, `resena_id`, `largo`, `alto`, `ancho`, `distanciaejes`, `cajuela`, `tanque`, `peso`, `capacidadcarga`, `alturapiso`, `capacidadvadeo`, `anguloataque`, `angulopartida`, `anguloventral`, `remolque`, `escalonamiento`, `inclinacion`) VALUES
(6, 14, '200', '110', '70', '250', 'No', '10', '1250', '350 KG', '60', '2000', '90 deg', '60 deg', '-50 deg', 'Si', 'Si', '200'),
(7, 15, '220', '80', '90', '20', '50', '80', '4500', '2400', '30', '30', '30deg', '30deg', '70deg', 'Si', '30deg', '50deg'),
(9, 17, '250', '90', '180', '90', '50', '120', '6400', '3200KG', '50', 'Si', '80deg', '80deg', '80deg', 'Si', 'Si', '20deg'),
(10, 18, '4495 ', '1465', '1740 ', '2620 ', '482', '41', '1106', '410', '172', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D'),
(11, 19, '4646', '1461', '1816', '2707', '466', '47', '1330', '344', '170', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D'),
(12, 20, '5885', '1918', '2063', '3745', '900', '91', '2271', '934', '300', 'N/D', 'N/D', 'N/D', 'N/D', '4355', 'N/D', 'N/D'),
(13, 21, '5338', '1851', '1853', '3200', '890', '80', '2159', '490', '233', 'N/D', '32', '23', '22', '1588', 'N/D', 'N/D'),
(14, 22, '4490', '1490', '1695', '2550', '475', '45', '1075', '400', '180', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D', 'N/D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_motor`
--

CREATE TABLE `resena_motor` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `combustible` varchar(150) NOT NULL,
  `potencia` int(11) NOT NULL,
  `torque` varchar(150) NOT NULL,
  `cilindros` int(11) NOT NULL,
  `valvulas` varchar(150) NOT NULL,
  `alimentacion` varchar(150) NOT NULL,
  `sistema` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_motor`
--

INSERT INTO `resena_motor` (`id`, `resena_id`, `combustible`, `potencia`, `torque`, `cilindros`, `valvulas`, `alimentacion`, `sistema`) VALUES
(13, 14, 'Nafta', 200, 'Arrastre', 150, '3', 'Interna', 'Si'),
(14, 15, 'Diesel', 200, 'Arrastre', 200, 'º5', 'Interna', 'Si'),
(16, 17, 'Nafta', 200, 'Arrastre', 4, '7', 'Interna', 'Si'),
(17, 18, 'Gasolina', 118, '110/4000 lb·pie/rpm', 4, '16', 'inyección electrónica secuencial multipunto', 'No'),
(18, 19, 'Gasolina', 145, '145/4000 lb·pie/rpm', 4, '16', 'inyección directa', 'No'),
(19, 20, 'Gasolina', 355, '383/4100 lb·pie/rpm', 8, '32', 'inyección directa', 'Si'),
(20, 21, 'Gasolina', 310, '281/4400 lb·pie/rpm', 6, '24', 'inyección electrónica multipunto', 'No'),
(21, 22, 'Gasolina', 98, '105/3400-4000 lb·pie/rpm', 4, '16', 'inyección electrónica multipunto', 'No');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_perfomance`
--

CREATE TABLE `resena_perfomance` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `aceleracion` int(11) NOT NULL,
  `velocidad` int(11) NOT NULL,
  `rendimientociudad` varchar(150) NOT NULL,
  `rendimientoruta` varchar(150) NOT NULL,
  `rendimientomixto` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_perfomance`
--

INSERT INTO `resena_perfomance` (`id`, `resena_id`, `aceleracion`, `velocidad`, `rendimientociudad`, `rendimientoruta`, `rendimientomixto`) VALUES
(13, 14, 65, 250, 'Excelente', 'Estandar', 'Bueno'),
(14, 15, 78, 170, 'Bueno', 'Bueno', 'Regular'),
(16, 17, 100, 350, 'Bueno', 'Bueno', 'Excelente'),
(17, 18, 11, 220, '18', '24', '20'),
(18, 19, 10, 220, '14', '23', '17'),
(19, 20, 10, 200, '9', '13', '11'),
(20, 21, 10, 230, '8', '13', '10'),
(21, 22, 13, 220, '17', '27', '21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena_seguridad`
--

CREATE TABLE `resena_seguridad` (
  `id` int(11) NOT NULL,
  `resena_id` int(11) NOT NULL,
  `airbag` varchar(150) NOT NULL,
  `abs` varchar(150) NOT NULL,
  `distfrenado` varchar(150) NOT NULL,
  `asistfrenado` varchar(150) NOT NULL,
  `alarma` varchar(150) NOT NULL,
  `anclaje` varchar(150) NOT NULL,
  `cinturones` varchar(150) NOT NULL,
  `otros` varchar(450) NOT NULL,
  `sensor` varchar(150) NOT NULL,
  `terceraluz` varchar(150) NOT NULL,
  `autobloqueo` varchar(150) NOT NULL,
  `controlestabilidad` varchar(150) NOT NULL,
  `controltraccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena_seguridad`
--

INSERT INTO `resena_seguridad` (`id`, `resena_id`, `airbag`, `abs`, `distfrenado`, `asistfrenado`, `alarma`, `anclaje`, `cinturones`, `otros`, `sensor`, `terceraluz`, `autobloqueo`, `controlestabilidad`, `controltraccion`) VALUES
(4, 14, 'Si', 'Si', 'No', 'No', 'Si', 'No', 'No', 'No', 'No', 'No', 'No', 'Si', 'No'),
(5, 15, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'),
(7, 17, 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'No hay otras especificaciones', 'Si', 'No', 'No', 'Si', 'Si'),
(8, 18, ' Conductor y acompañante, de cabeza delanteros (cortina), laterales delanteros', 'Si', 'Si', 'Si', 'Si', 'Si', 'traseros inerciales, traseros inerciales (2) y central pélvico', 'advertencia de colisión, control de ascenso en pendientes', 'Si', 'Si', 'Si', 'Si', 'Si'),
(9, 19, 'conductor y acompañante, de cabeza delanteros (cortina), laterales delanteros', 'Si', 'Si', 'Si', 'Si', 'Si', 'delanteros inerciales pirotécnicos, traseros inerciales', 'control de ascenso en pendientes', 'Si', 'Si', 'Si', 'Si', 'Si'),
(10, 20, 'conductor y acompañante, de cabeza delanteros (cortina), laterales delanteros', 'Si', 'Si', 'Si', 'Si', 'Si', 'delanteros y traseros inerciales', 'asistente trasero de tráfico cruzado, control de descenso en pendientes, control de estabilidad para remolques, indicador de presión de neumáticos, sistema de alerta del punto ciego', 'Si', 'Si', 'Si', 'Si', 'Si'),
(11, 21, 'conductor y acompañante, de cabeza delanteros y traseros (cortina), de rodilla conductor y acompañante, laterales delanteros', 'Si', 'Si', 'Si', 'Si', 'Si', 'delanteros inerciales, traseros inerciales (2) y central pélvico', 'asistente trasero de tráfico cruzado, control de ascenso en pendientes, control de descenso en pendientes, control de estabilidad para remolques, indicador de presión de neumáticos, sistema de advertencia de salida de carril, sistema de alerta del punto ciego', 'Si', 'Si', 'Si', 'Si', 'Si'),
(12, 22, 'conductor y acompañante, de cabeza delanteros (cortina), laterales delanteros', 'Si', 'Si', 'Si', 'Si', 'Si', 'delanteros y traseros inerciales', 'indicador de presión de neumáticos', 'Si', 'Si', 'Si', 'Si', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo`
--

CREATE TABLE `subforo` (
  `id` int(11) NOT NULL,
  `id_resena` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `silenciado` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo`
--

INSERT INTO `subforo` (`id`, `id_resena`, `tipo`, `silenciado`) VALUES
(1, 1, 0, 0),
(2, 1, 1, 0),
(3, 1, 2, 1),
(4, 13, 0, 0),
(5, 13, 1, 0),
(6, 13, 2, 0),
(7, 14, 0, 0),
(8, 14, 1, 0),
(9, 14, 2, 0),
(10, 15, 0, 0),
(11, 15, 1, 0),
(12, 15, 2, 0),
(13, 16, 0, 0),
(14, 16, 1, 0),
(15, 16, 2, 0),
(16, 17, 0, 0),
(17, 17, 1, 0),
(18, 17, 2, 0),
(19, 18, 0, 0),
(20, 18, 1, 0),
(21, 18, 2, 0),
(22, 19, 0, 0),
(23, 19, 1, 0),
(24, 19, 2, 0),
(25, 20, 0, 0),
(26, 20, 1, 0),
(27, 20, 2, 0),
(28, 21, 0, 0),
(29, 21, 1, 0),
(30, 21, 2, 0),
(31, 22, 0, 0),
(32, 22, 1, 0),
(33, 22, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_comentario`
--

CREATE TABLE `subforo_comentario` (
  `id` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL,
  `texto` varchar(1500) DEFAULT NULL,
  `imagen` varchar(1500) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo_comentario`
--

INSERT INTO `subforo_comentario` (`id`, `id_subforo`, `texto`, `imagen`, `id_usuario`) VALUES
(1, 9, '', 'http://localhost:3000/images/foros/1705501735098-bmw.jpg', 2),
(3, 10, 'buenas', '', 1),
(5, 10, 'hola', '', 2),
(6, 7, 'Yo creo que es buena la mecanica de este auto.', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_likes`
--

CREATE TABLE `subforo_likes` (
  `id` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_usuario` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo_likes`
--

INSERT INTO `subforo_likes` (`id`, `id_comentario`, `point`, `id_usuario`, `id_subforo`) VALUES
(7, 3, 1, 1, 10),
(11, 5, 1, 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_replicas`
--

CREATE TABLE `subforo_replicas` (
  `id` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto` varchar(800) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subforo_replicas`
--

INSERT INTO `subforo_replicas` (`id`, `id_subforo`, `id_comentario`, `id_usuario`, `texto`, `imagen`) VALUES
(6, 10, 2, 2, 'yo bien', ''),
(7, 9, 1, 1, 'Buenisima imagen', ''),
(8, 10, 5, 1, 'como va?', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subforo_reply_likes`
--

CREATE TABLE `subforo_reply_likes` (
  `id` int(11) NOT NULL,
  `id_reply` int(11) NOT NULL,
  `id_subforo` int(11) NOT NULL,
  `point` int(11) DEFAULT 1,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `correo` varchar(70) NOT NULL,
  `rol` text NOT NULL DEFAULT 'usuario',
  `contraseña` text DEFAULT NULL,
  `strikes` int(11) DEFAULT 0,
  `ban` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `ciudad`, `correo`, `rol`, `contraseña`, `strikes`, `ban`) VALUES
(1, 'ADMIN', 'Cancun', 'admin@alcaldeforo.com', 'superadmin', '$2b$10$5r7Rp1ybTfWQbjbQ0tsNUuLYKiTdDWWDrzl3ojJB3PKSu4C0b9w6K', 0, 0),
(2, 'Jorge', 'Mexicali', 'test@gmail.com', 'escritor', '$2b$10$HOeSCYqgg8vazb8Ie28CfuZ/BGBtihcQCidBWrRFA.ZZFSUD86DRC', 5, 0),
(3, 'Automatizacion', 'Mexicali', 'bot@alcaldeforo.com', 'bot', '$2b$10$l2H0MoOdolNIuBwDTlvymuNdF.ikZJIBwFoV8eTMOVCZ682H.tKay', 0, 0),
(4, 'Pruebas zapopan', 'Zapopan', 'correo@email.com', 'usuario', '$2b$10$m4lUvCJ9ydP.FesXEM7CeeXnajyvWReemXbZToet8EoZYA8u14roK', 1, 0),
(5, 'Moderador', 'Guadalajara', 'a18300592@ceti.mx', 'admin', '$2b$10$M5LoGPNHHz5A9PQCi5pGGuHNmqQlUzDxOjpIJR/zBv2nuMcQum3P.', 0, 0),
(6, 'Sendgrid', 'Guadalajara', 'luis_fernando_alcalde@hotmail.com', 'usuario', '$2b$10$g4Reavn.eEOv98oO6pU0MO/9KHpvCIanbdNjUrssKP63ebhGXixRy', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versus`
--

CREATE TABLE `versus` (
  `id` int(11) NOT NULL,
  `coche1_id` int(11) NOT NULL,
  `coche2_id` int(11) NOT NULL,
  `imagen` varchar(750) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `versus`
--

INSERT INTO `versus` (`id`, `coche1_id`, `coche2_id`, `imagen`) VALUES
(1, 19, 18, 'http://localhost:3000/images/1705945911319-GAZ_359f45aca89e4b43bab9ebd8260beaba.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versus_comentarios`
--

CREATE TABLE `versus_comentarios` (
  `id` int(11) NOT NULL,
  `id_versus` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `mensaje` varchar(500) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versus_votos`
--

CREATE TABLE `versus_votos` (
  `id` int(11) NOT NULL,
  `id_versus` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_coche` int(11) NOT NULL,
  `punto` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carrete`
--
ALTER TABLE `carrete`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coches`
--
ALTER TABLE `coches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comunicados`
--
ALTER TABLE `comunicados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `foros`
--
ALTER TABLE `foros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes_likes`
--
ALTER TABLE `mensajes_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes_replica`
--
ALTER TABLE `mensajes_replica`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensaje_reply_likes`
--
ALTER TABLE `mensaje_reply_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `quejas`
--
ALTER TABLE `quejas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena`
--
ALTER TABLE `resena`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_chasis`
--
ALTER TABLE `resena_chasis`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_comentarios`
--
ALTER TABLE `resena_comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_confort`
--
ALTER TABLE `resena_confort`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_entretenimiento`
--
ALTER TABLE `resena_entretenimiento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_medidas`
--
ALTER TABLE `resena_medidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_motor`
--
ALTER TABLE `resena_motor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_perfomance`
--
ALTER TABLE `resena_perfomance`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resena_seguridad`
--
ALTER TABLE `resena_seguridad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo`
--
ALTER TABLE `subforo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_comentario`
--
ALTER TABLE `subforo_comentario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_likes`
--
ALTER TABLE `subforo_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_replicas`
--
ALTER TABLE `subforo_replicas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subforo_reply_likes`
--
ALTER TABLE `subforo_reply_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `versus`
--
ALTER TABLE `versus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `versus_comentarios`
--
ALTER TABLE `versus_comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `versus_votos`
--
ALTER TABLE `versus_votos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `carrete`
--
ALTER TABLE `carrete`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `coches`
--
ALTER TABLE `coches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comunicados`
--
ALTER TABLE `comunicados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles`
--
ALTER TABLE `detalles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `foros`
--
ALTER TABLE `foros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `mensajes_likes`
--
ALTER TABLE `mensajes_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `mensajes_replica`
--
ALTER TABLE `mensajes_replica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `mensaje_reply_likes`
--
ALTER TABLE `mensaje_reply_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `quejas`
--
ALTER TABLE `quejas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `reglas`
--
ALTER TABLE `reglas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resena`
--
ALTER TABLE `resena`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `resena_chasis`
--
ALTER TABLE `resena_chasis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `resena_comentarios`
--
ALTER TABLE `resena_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `resena_confort`
--
ALTER TABLE `resena_confort`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `resena_entretenimiento`
--
ALTER TABLE `resena_entretenimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `resena_medidas`
--
ALTER TABLE `resena_medidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `resena_motor`
--
ALTER TABLE `resena_motor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `resena_perfomance`
--
ALTER TABLE `resena_perfomance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `resena_seguridad`
--
ALTER TABLE `resena_seguridad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `subforo`
--
ALTER TABLE `subforo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `subforo_comentario`
--
ALTER TABLE `subforo_comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `subforo_likes`
--
ALTER TABLE `subforo_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `subforo_replicas`
--
ALTER TABLE `subforo_replicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `subforo_reply_likes`
--
ALTER TABLE `subforo_reply_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `versus`
--
ALTER TABLE `versus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `versus_comentarios`
--
ALTER TABLE `versus_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `versus_votos`
--
ALTER TABLE `versus_votos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
