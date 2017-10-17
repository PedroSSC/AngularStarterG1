export class Turma {
    id: number;
    turma: number;
    alunos: number;
    media: number;

    constructor(id: number, turma: number, alunos:number, media:number ) {
        this.id = id;
        this.turma = turma;
        this.alunos = alunos;
        this.media = media;
    }

    atualiza(turma:Turma){
        this.id = turma.id;
        this.turma = turma.turma;
        this.alunos = turma.alunos;
        this.media = turma.media;
    }

}


