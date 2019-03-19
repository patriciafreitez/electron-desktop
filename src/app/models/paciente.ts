import {Responsable} from './responsable';
import {TipoDocumento} from './tipo-documento';
import {EstadoCivil} from './estado-civil';
import {NivelSocioeconomico} from './nivel-socioeconomico';
import {NivelEducativo} from './nivel-educativo';
import {Eps} from './eps';

export class Paciente {
    key?: string;
    eps?: Eps;
    numero_identidad: string;
    tipo_documento?: TipoDocumento;
    nombre?: string;
    apellido?: string;
    fecha_nacimiento?: string;
    lugar_nacimiento?: string;
    genero?: string;
    estado_civil?: EstadoCivil;
    nivel_socioeconomico?: NivelSocioeconomico;
    nivel_educativo?: NivelEducativo;
    ocupacion?: string;
    telefono_celular?: string;
    telefono_fijo?: string;
    correo?: string;
    direccion?: string;
    responsable?: Responsable;
}
