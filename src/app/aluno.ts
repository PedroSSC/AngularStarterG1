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

    media(){
        let list:number[] = [this.n1,this.n2,this.n3,this.n4];
        let cont = 0;
        let nota;

        for (let i = 0; i < list.length; i++) {
            if(list[i])
                cont++;
        }  

        if(cont>0){
            nota = ((+this.n1+ +this.n2+ +this.n3+ +this.n4)/cont).toFixed(2);
            this.med=nota;
        }
    }

    situacao(){
        if(this.freq != null){
            if(this.freq<150)
                return "Reprovado por falta";
            else {
                if(this.med != null){
                    if(this.med < 7){
                        return "Reprovado"
                    }else{
                        return "Aprovado"
                    }
                }else{
                    return 'N/I';
                }
            }
        }else{
            return 'N/I';
        }
    }

}


