export class Persona {

// Pongo los objetos como opcionales " ? " para poder instanciar Persona 
// y no tener que asignar todos los parametros con comillas vacias

// Al declrar los parametros en el constructor, me permite al instanciar 
// pasar valores a dichos parametros

    constructor(
        public idPersona?: number,
        public documento?: number,
        public nombre?: string,
        public apellido?: string,
        public direccion?: string,
        public telefono?: string,
        public email?: string,
        public fechaRegistro?: Date,
        public usuario?: string,
        public clave?: string,
        public estado?: string) {}
}
