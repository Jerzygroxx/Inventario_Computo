USE inventario_computo;

INSERT INTO categorias (nombre, descripcion) VALUES
('Computador de escritorio', 'Equipos de torre con monitor, teclado y mouse'),
('Portátil', 'Computadores portátiles tipo laptop'),
('Monitor', 'Pantallas independientes'),
('Impresora', 'Impresoras láser, tinta o multifuncional'),
('Periférico', 'Teclados, mouse, parlantes, webcams, etc.');

INSERT INTO estados (nombre) VALUES
('Disponible'),
('En uso'),
('En mantenimiento'),
('Dado de baja');

INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Admin', 'admin@inventario.com', '$2b$10$pP5wXV.qvwuGxipj5/Eu4eq8DJeJyqDeggzYGBZCgv63Ar79mcXJu', 'admin');

INSERT INTO ubicaciones (nombre, edificio, aula) VALUES
('Laboratorio 101', 'Bloque A', '101'),
('Laboratorio 102', 'Bloque A', '102'),
('Oficina de profesores', 'Bloque B', '201'),
('Sala de sistemas', 'Bloque C', '301'),
('Almacén general', 'Bloque D', '001');

INSERT INTO equipos (nombre, marca, modelo, numero_serie, fecha_adquisicion, observaciones, id_categoria, id_estado, id_ubicacion) VALUES
('Desktop Dell Optiplex 3090', 'Dell', 'Optiplex 3090', 'SN-DELL-001', '2024-01-15', 'Torre con monitor 22\" incluido', 1, 2, 1),
('Laptop Lenovo ThinkPad X1', 'Lenovo', 'ThinkPad X1 Carbon', 'SN-LEN-001', '2024-03-10', 'Asignada a docente tiempo completo', 2, 2, 3),
('Monitor Samsung 27\"', 'Samsung', 'LF27T350FHLX', 'SN-SAM-001', '2024-02-20', 'Monitor curvo 75Hz', 3, 1, 4),
('Impresora HP LaserJet Pro', 'HP', 'LaserJet Pro M404dn', 'SN-HP-001', '2023-11-05', 'Impresora blanco y negro, duplex automático', 4, 2, 3),
('Desktop ARM CUSTOM', 'ARM', 'Custom Build', 'SN-ARM-001', '2024-06-01', 'Equipo de estación de trabajo', 1, 3, 5),
('Laptop ASUS VivoBook', 'ASUS', 'VivoBook 15', 'SN-ASUS-001', '2024-05-12', 'Equipo de préstamo estudiantil', 2, 2, 1),
('Teclado Mecánico Logitech', 'Logitech', 'G413 SE', 'SN-LOG-001', '2024-04-08', 'Teclado mecánico retroiluminado', 5, 1, 4),
('Monitor LG 24\"', 'LG', '24MK430H-B', 'SN-LG-001', '2023-09-15', 'Monitor IPS básico', 3, 2, 2),
('Desktop HP EliteDesk 800', 'HP', 'EliteDesk 800 G6', 'SN-HP-002', '2024-07-20', 'Mini torre con SSD 512GB', 1, 2, 2),
('Impresora Epson L3250', 'Epson', 'L3250 EcoTank', 'SN-EPS-001', '2024-08-01', 'Multifuncional tanque de tinta', 4, 1, 5);
