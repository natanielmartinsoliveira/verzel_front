export interface Car {
    id: number;
    marca_id: number;
    marca: Marca;
    modelo_id: number;
    ano: number;
    preco: number;
    quilometragem: number;
    modelo: Modelo;
}

export interface Marca {
    id: number;
    nome: string;
}

export interface Modelo {
    id: number;
    nome: string;
    marca_id?: number;
    marca?: Marca;
}

export interface Brand {
    id?: number;
    nome: string;
}

export interface Model {
    id: number;
    nome: string;
}

export interface Filters {
    marca: string ;
    modelo: string;
    ano: string ;
    quilometragem_min: string ;
    quilometragem_max: string ;
}