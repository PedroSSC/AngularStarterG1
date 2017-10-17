import { Component, OnInit } from '@angular/core';
import { Aluno } from './aluno';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    alunos: Array<Aluno>;
    select: Aluno = new Aluno(0, 1,'', null,null,null,null,null,null);
    novo: Aluno = new Aluno(0, 1,'', null,null,null,null,null,null);
    ultimo_id = 5;
    editando = false;

    constructor() {
        this.alunos = [
            new Aluno(1, 105,'Alberto', null,null,null,null,null,null),
            new Aluno(2, 105,'Bruna',   null,null,null,null,null,null),
            new Aluno(3, 105,'Carla',   null,null,null,null,null,null),
            new Aluno(4, 105,'Daniel',  null,null,null,null,null,null),
            new Aluno(5, 105,'Gabriel', null,null,null,null,null,null)
        ];
    }

    ngOnInit(): void {
    }

    editar(aluno: Aluno): void {
       this.select = aluno;
       this.novo = new Aluno(aluno.id, aluno.turma, aluno.nome, aluno.freq, aluno.n1, aluno.n2, aluno.n3, aluno.n4, aluno.med);

    }

    salvar(): void{
        let n = this.novo.media();
        this.select.atualiza(this.novo);
        this.novo = new Aluno(0, 1,'', null,null,null,null,null,null);
        this.select = new Aluno(0, 1,'', null,null,null,null,null,null);
    }

    limpar():void{
        this.novo = new Aluno(0, 1,'', null,null,null,null,null,null);
        this.select = new Aluno(0, 1,'', null,null,null,null,null,null);
    }

    mediaTurma():number{
        let media = 0;
        let div = 0;

        for (let i = 0; i < this.alunos.length; i++) {
            if(this.alunos[i].med != null){
                div ++;
                media = media + +this.alunos[i].med;
            }
        }  
        console.log('media: '+media+'   div: '+div);
        media = media/div;
        
        return media;
    }
}