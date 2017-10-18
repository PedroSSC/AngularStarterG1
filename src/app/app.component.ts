import { Component, OnInit } from '@angular/core';
import { Aluno } from './classes/aluno';
import { Turma } from './classes/turma';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    alunos: Array<Aluno>;
    selectA: Aluno = new Aluno('', null,null,null,null,null,null);
    novo: Aluno = new Aluno('', null,null,null,null,null,null);
    ultimo_id = 5;
    editando = false;

    turmas: Array<Turma>;
    selectT: Turma = new Turma(0,null,null);
    novoT: Turma = new Turma(0,null,null);
    ultimo_id_turma = 2;
    editando_turma = false;

    



    constructor() {
        this.turmas = [
            new Turma(1,104,null),
            new Turma(2,105,null)
        ];

        this.turmas[0].setAluno(new Aluno('Alberto', null,null,null,null,null,null));
        this.turmas[0].setAluno(new Aluno('Benicio', null,null,null,null,null,null));
        this.turmas[1].setAluno(new Aluno('Camila', null,null,null,null,null,null));
        this.turmas[1].setAluno(new Aluno('Daniele', null,null,null,null,null,null));
        this.turmas[1].setAluno(new Aluno('Eduardo', null,null,null,null,null,null));
        

        
        
    }

    
    ngOnInit(): void {
        /*//Calcula a quantidade de alunos em cada turma no inicio da execução.
        for(let i = 0; i < this.turmas.length; i++){
            this.contaAlunos(this.turmas[i]);
        }*/

        for(let Turma of this.turmas){
            Turma.mediaTurma();
        }
    }


    buscaAluno(nome: string, turma:Turma): Aluno{
        //Retorna o aluno buscando pelo seu numero na turma selecionada, retorna nulo se não encontrar.
        for(let Aluno of turma.alunos){
            if (Aluno.nome == nome){
                return Aluno;
            }
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
        this.editando = true;
        this.selectA = aluno;
        this.novo = new Aluno(aluno.nome, aluno.freq, aluno.n1, aluno.n2, aluno.n3, aluno.n4, aluno.med, aluno.id, aluno.turma);

    }

    editarT(turma: Turma): void{
        //Cria uma cópia da turma para edição.
        this.editando_turma = true; 
        this.selectT = turma;
        turma.copiaTurma(this.novoT);

    }

    salvar(): void{
        //Transfere as alterações feitas na cópia para o aluno original
        if(this.buscaAluno(this.novo.nome, this.selectT)){
            let n = this.novo.media();
            this.selectA.atualiza(this.novo);
            this.limpar();
            this.selectT.mediaTurma();
        }else{
            this.limpar();
        }

    }

    salvarTurma(): void{
        //Transfere as alterações da cópia da turma para a turma original, atualizando também todos os alunos
        //que estejam na turma.
        if(!this.buscaTurma(this.novoT.turma)){
            this.novoT.atualizaTurma(this.selectT);
            this.novoT.copiaTurma(this.selectT);
            this.limparT();
        }else{
            this.limparT();
        }

    }

    limpar():void{
        //Cancela a edição do aluno.
        this.novo = new Aluno('', null,null,null,null,null,null);
        this.selectA = new Aluno('', null,null,null,null,null,null);
        this.editando = false;
    }

    limparT():void{
        //Cancela a edição da turma.
        this.novoT = new Turma(0,null,null);
        this.selectT = new Turma(0,null,null);
        this.editando_turma = false;
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

    cadastrar():void{
        //Cadastra um novo aluno na turma selecionada, se o aluno já não estiver cadastrado.
        if(!this.buscaAluno(this.novo.nome, this.selectT)){
            this.novo.media();
            this.novo.id = this.selectT.alunos.length+1;
            this.novo.turma = this.selectT.turma;
            this.selectT.alunos.push(this.novo);
            this.selectT.mediaTurma();
            this.limpar();
        }else{
            this.limpar();
        }
 
    }

    cadastrarTurma():void{
        //Cadastra uma nova turma, se já não estiver cadastrada.
        if(!this.buscaTurma(this.novoT.turma)){
            this.ultimo_id_turma ++ ;
            this.novoT.id = this.ultimo_id_turma;
            this.turmas.push(this.novoT);
            this.limparT();
        }else{
            this.limparT();
        }
    }

    excluirTurma(turma: Turma):void{
        //Exclui a turma indicada.
        var index = this.turmas.indexOf(turma,0);
        if(index > -1){
            this.turmas.splice(index,1);
        }
    }

    excluirAluno(aluno: Aluno){
        //Exclui o aluno da turma e atualiza a média da turma.
        //Se o aluno a ser excluido for o único da turma, a média da turma será null
        var index = this.selectT.alunos.indexOf(aluno,0);
        var tam = this.selectT.alunos.length;
        if(index > -1){
            if(tam = 1){
                this.selectT.media = null;
            }
            this.selectT.alunos.splice(index,1);
            this.selectT.mediaTurma();
        }
    }

}