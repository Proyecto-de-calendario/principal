-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2024 a las 20:25:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_calendario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `idTarea` int(10) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `prioridad` int(1) NOT NULL,
  `horaInicio` varchar(20) NOT NULL,
  `horaFin` varchar(20) NOT NULL,
  `dia` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiempo_uso`
--

CREATE TABLE `tiempo_uso` (
  `id_usuario` int(10) NOT NULL,
  `id_sesion` int(11) NOT NULL,
  `red_social` varchar(20) NOT NULL,
  `tiempo_inicio` datetime NOT NULL,
  `tiempo_final` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contraseña` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `email`, `contraseña`) VALUES
(928902119, 'carlos', 'carlos@gmail.com', '$2b$10$HtN/KsVZz0buDiaNxbjo1O.V55p3NHZuaFxVYOZ3Q4pOdgIMQDNOC'),
(734097501, 'marco', 'marco@gmail.com', '$2b$10$ZaJsba6lIJruFg1W6ySYjuRk49sQqkGdfhhHIhh8A5lRK/6gXmZS2'),
(932985488, 'mirna', 'mirnafranco58@gmail.com', '$2b$10$tdk0VHWLp7s5p8cicuAZaOcKT3o9CmQq36IEeSx/92Mlk17mgOC8a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tiempo_uso`
--
ALTER TABLE `tiempo_uso`
  ADD PRIMARY KEY (`id_sesion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tiempo_uso`
--
ALTER TABLE `tiempo_uso`
  MODIFY `id_sesion` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
