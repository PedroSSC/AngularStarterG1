import { Aluno } from './aluno';

export class Turma {
    id: number;
    turma: number;
    alunos:Array<Aluno> = new Array;
    media: number;

    constructor(id: number, turma: number, media:number ) {
        this.id = id;
        this.turma = turma;
        this.media = media;
    }

    copiaTurma(copia: Turma){
        //Copia os dados da turma que chamou o método para a turma indicada.
        copia.id = this.id;
        copia.turma = this.turma
        copia.alunos = new Array;
        for(let Aluno of this.alunos){
            copia.alunos.push(Aluno);
        }
        copia.media = this.media;
    }

    atualizaTurma(turma:Turma){
        //Atualiza a turma dos alunos para a turma indicada.
        for(let aluno of this.alunos){
            aluno.turma = this.turma;
        }
    }

    setAluno(aluno:Aluno){
        //Insere um novo aluno diretamente no Array de alunos.
        aluno.id = this.alunos.length+1;
        aluno.turma = this.turma;
        this.alunos.push(aluno);
        this.mediaTurma();
    }

    mediaTurma(){
        //Calcula a média da turma.
        let  soma :number = 0;
        let possuiMedia :number = 0;
        for(let aluno of this.alunos){
            if(aluno.med != null){
                possuiMedia++;
                soma = +soma+ +aluno.med;
            }
        }
        if(possuiMedia>0){
            let media = +(soma/possuiMedia).toFixed(2);
            this.media = media;
        }
        console.log("soma: "+soma+"   possuiMedia: "+possuiMedia);
    }
}

