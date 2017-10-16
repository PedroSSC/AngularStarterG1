import { Component, OnInit } from '@angular/core';
import { Aluno } from './aluno';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    alunos: Array<Aluno>;
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


    encontrar(id: number): number {
        let indice = -1;
        for (let i = 0; i < this.alunos.length; i++) {
            if (this.alunos[i].id == id) {
                indice = i;
                break;
            }
        }
        return indice;
    }

    editar(aluno: Aluno): void {
       this.novo = aluno;

    }

    salvar(): void{
        let list:number[] = [this.novo.n1,this.novo.n2,this.novo.n3,this.novo.n4];
        let cont = 0;
        var nota;

        for (let i = 0; i < list.length; i++) {
            if(list[i])
                cont++;
        }    
        console.log(cont);

        if(cont>0){
            nota = ((+this.novo.n1+ +this.novo.n2+ +this.novo.n3+ +this.novo.n4)/cont).toFixed(2);
            this.novo.med=nota;
            console.log(nota);
            this.novo = new Aluno(0, 1,'', null,null,null,null,null,null);
        }
    }
}