export interface UserRegister {
    nombre: string,
    username: string,
    correo: string,
    password: string,
    telefono: string
}

export interface UserLogin {
    correo: string;
    password: string;
}

export interface UserProfile {
    nombre: string,
    username: string,
    correo: string,
    telefono: string,
    fechaCreacion: string
}