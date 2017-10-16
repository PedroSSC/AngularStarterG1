export class Aluno {
    id: number;
    turma: number;
    nome: string;
    freq: number;
    n1: number;
    n2: number;
    n3: number;
    n4: number;
    med: number;

    constructor(id: number, turma: number, nome: string, freq:number, 
                n1: number, n2: number, n3: number, n4: number, med: number ) {
        this.id = id;
        this.turma = turma;
        this.nome = nome;
        this.freq = freq;
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.n4 = n4;
        this.med = med;
    }

}
