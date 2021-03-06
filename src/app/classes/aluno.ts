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

    constructor(nome: string, freq:number, n1: number, n2: number, n3: number, n4: number, 
                med: number, id?: number, turma?: number) {
        this.nome = nome;
        this.freq = freq;
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.n4 = n4;
        this.med = med;
        this.id = id;
        this.turma = turma;
    }

    atualiza(aluno:Aluno){
        //Atualiza os dados alterados em edição.
        this.nome = aluno.nome;
        this.freq = aluno.freq;
        this.n1 = aluno.n1;
        this.n2 = aluno.n2;
        this.n3 = aluno.n3;
        this.n4 = aluno.n4;
        this.med = aluno.med;
    }


    media(){
        //Calcula a média do aluno.
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
        //Indica a situação final do aluno.
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


