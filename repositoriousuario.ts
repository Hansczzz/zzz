import {Usuario} from "./usuarios";

export class RepositorioUsuarios {
    private usuarios: Usuario[]= [];
    private contadorId: number =1;

    listar() : Usuario[] {
        return this.usuarios;
        }

    buscarPorId (id:number): Usuario | undefined {
        return this.usuarios.find ((u) => u.id === id);
    }

    agregar (nombre: string, email: string): Usuario{
        const nuevo = new Usuario(this.contadorId++, nombre,email)
        this.usuarios.push(nuevo);
        return nuevo;
    }

    actualizar (id: number, nombre: string, email: string): Usuario | undefined {
        const usuario = this.buscarPorId(id);
            if (!usuario) return undefined;
            usuario.nombre = nombre;
            usuario.email = email;
            return usuario;
        }

        eliminar (id:  number): boolean {
            const index = this.usuarios.findIndex((u) => u.id === id);
            if (index === -1) return false;
            this.usuarios.splice(index, 1);
            return true;
        }


}
