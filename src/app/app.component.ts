import { Component, OnInit } from '@angular/core';
import { Aluno } from './aluno';
import { Turma } from './turma';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    alunos: Array<Aluno>;
    selectA: Aluno = new Aluno(0, 1,'', null,null,null,null,null,null);
    novo: Aluno = new Aluno(0, 1,'', null,null,null,null,null,null);
    ultimo_id = 5;
    editando = false;

    turmas: Array<Turma>;
    selectT: Turma = new Turma(0,null,null,null);
    novoT: Turma = new Turma(0,null,null,null);
    ultimo_id_turma = 2;



    constructor() {
        this.alunos = [
            new Aluno(1, 105,'Alberto', null,null,null,null,null,null),
            new Aluno(2, 105,'Bruna',   null,null,null,null,null,null),
            new Aluno(3, 104,'Carla',   null,null,null,null,null,null),
            new Aluno(4, 104,'Daniel',  null,null,null,null,null,null),
            new Aluno(5, 105,'Gabriel', null,null,null,null,null,null)
        ];

        this.turmas = [
            new Turma(1,104,null,null),
            new Turma(2,105,null,null)
        ];
    }

    
    ngOnInit(): void {
        //Calcula a quantidade de alunos em cada turma no inicio da execução.
        for(let i = 0; i < this.turmas.length; i++){
            this.contaAlunos(this.turmas[i]);
        }
    }


    buscaAluno(nome: string): Aluno{
        //Retorna o aluno buscando pelo seu numero na lista de alunos selecionada, retorna nulo se não encontrar.
        //Pelo escopo do problema, entende-se que um aluno não pode estar matriculado em mais de uma turma.
        for(let i = 0; i < this.alunos.length; i++){
            if(this.alunos[i].nome == nome)
                return this.alunos[i];
        }
        return null;
    }

    buscaTurma(turma: number): Turma{
        //Retorna a turma buscando pelo seu numero na lista de turmas, retorna nulo se não encontrar.
        for(let i = 0; i < this.turmas.length; i++){
            if(this.turmas[i].turma == turma)
                return this.turmas[i];
        }
        return null;
    }

    editar(aluno: Aluno): void {
        //Cria uma cópia do aluno para edição.
        this.selectA = aluno;
        this.novo = new Aluno(aluno.id, aluno.turma, aluno.nome, aluno.freq, aluno.n1, aluno.n2, aluno.n3, aluno.n4, aluno.med);

    }

    editarT(turma: Turma): void{
        //Cria uma cópia da turma para edição. 
        this.selectT = turma;
        this.novoT = new Turma(turma.id, turma.turma, turma.alunos, turma.media)

    }

    salvar(): void{
        //Transfere os dados da cópia atualizados para o aluno original
        let n = this.novo.media();
        this.selectA.atualiza(this.novo);
        this.novo = new Aluno(0, 1,'', null,null,null,null,null,null);
        this.selectA = new Aluno(0, 1,'', null,null,null,null,null,null);
    }

    salvarTurma(): void{
        //Transfere os dados da cópia da turma atualizados para a turma original, atualizando também todos os alunos
        //que estejam na turma.
        for(let i = 0; i < this.alunos.length; i++){
            if(this.alunos[i].turma == this.selectT.turma)
                this.alunos[i].turma = this.novoT.turma;
        }
        this.selectT.atualiza(this.novoT);
        this.novoT = new Turma(0,null,null,null);
        this.selectT = new Turma(0,null,null,null);
    }

    limpar():void{
        //Cancela a edição do aluno.
        this.novo = new Aluno(0, 1,'', null,null,null,null,null,null);
        this.selectA = new Aluno(0, 1,'', null,null,null,null,null,null);
    }

    limparT():void{
        //Cancela a edição da turma.
        this.novoT = new Turma(0,null,null,null);
        this.selectT = new Turma(0,null,null,null);
        this.limpar();
    }

    mediaTurma():number{
        //Calcula a média das turmas.
        let media = 0;
        let div:number = 0;

        for (let i = 0; i < this.alunos.length; i++) {
            if(this.alunos[i].med != null){
                div ++;
                media = +media + +this.alunos[i].med;
            }
        }  
        media = +(media/div).toFixed(2);
        return media;
    }

    visualizarT(turma: Turma):void{
        //Apresenta a lista de alunos da turma selecionada.
        this.selectT = turma;
    }

    contaAlunos(turma: Turma):void{
        //Conta a quantidade de alunos da turma.
        let cont = 0;
        for(let i = 0; i < this.alunos.length; i++){
            if(this.alunos[i].turma == turma.turma){
                cont++;
                console.log(cont);
            }
        }
        turma.alunos = cont;
    }

    cadastrar():void{
        if(!this.buscaAluno(this.novo.nome)){
            if(this.selectT!=null){
                this.novo.turma = this.selectT.turma;
                this.ultimo_id ++ ;
                this.novo.id = this.ultimo_id;
                this.alunos.push(this.novo);
                this.limpar();
            }else{
                this.limpar();
            }
        }else{
            this.limpar();
        }
        
    }

    cadastrarTurma():void{
        if(!this.buscaTurma(this.novoT.turma)){
            this.ultimo_id_turma ++ ;
            this.novoT.id = this.ultimo_id_turma;
            this.turmas.push(this.novoT);
            this.limparT();
        }else{
            this.limparT();
        }
        
    }
}