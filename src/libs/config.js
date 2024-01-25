import 'dotenv/config';

// Definimos variables de entorno, para exportarlas globalmente.
export const puerto = process.env.PORT || 3000;

// Database Variables
export const host = process.env.HOST;
export const user = process.env.USER;
export const password = process.env.PASSWORD;
export const database = process.env.DATABASE;

// Secret para Autentificacion

export const secret = process.env.SECRET;

// Detalles para cuenta de super admin.

export const nombre = process.env.NOMBRE;
export const correo = process.env.CORREO;
export const ciudad = process.env.CIUDAD;
export const rol = process.env.ROL;
export const contraseña = process.env.CONTRA;

export const SMTP_PASSWORD = process.env.SMTP_PASSWORD
export const SMTP_USER = process.env.SMTP_USER
export const SMTP_HOST = process.env.SMTP_HOST
export const SMTP_EMAIL = process.env.SMTP_EMAIL