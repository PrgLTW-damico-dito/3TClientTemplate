class Game{
    constructor(){
        this.inProgress = true;    //una partita quando comincia e' sempre inProgress. La variabile serve perche', quando si trova un vincitore, la partita sara' decretata come terminata e non potranno piu' essere effettuate delle mosse
        this.winner = null;     //Quando la partita e' vinta da qualcuno viene modificato in X o O
        this.currentTurn = Game.X;   //Dovremo far cambiare questa variabile per ogni turno. Inizializzandola come Game.X diciamo che il giocatore X fara' la prima mossa
        this.movesMade = 0;     //E' necessario per sapere se una partita e' finita in parita'
        this.squares = new Array(9).fill().map(s => new Square());      //Ogni partita avra' un array formato da 9 elementi Square (Definiti in Square.js)
    }

    makeMove(i){
        if (this.inProgress && !this.squares[i].value){
            //Per poter fare una mossa e' necessario che il Game sia inProgress e che la casella su cui si vuole far la mossa non abbia alcun valore (non sia gia' X o O)
            this.squares[i].value = this.currentTurn;   //Si cambia il value della casella corrente con X o O (dipendentemente dal turno)
            this.movesMade++;
            this.checkForWinner();      //Dopo ogni mossa si verifica se c'e' un vincitore
            this.currentTurn = (this.currentTurn === Game.X) ? Game.O : Game.X;
        }
    }

    checkForWinner(){
        //Se nelle seguenti caselle si hanno gli stessi value (X o O), allora significa che un giocatore ha vinto

        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        winningCombinations.forEach((wc) => {
            const [a, b, c] = wc;  //Ogni winningCombination (i valori descritti sopra) verra' "divisa in 3 valori singoli. Ad esempio a=0, b=1, c=2"
            const sqA = this.squares[a];
            const sqB = this.squares[b];
            const sqC = this.squares[c];

            if (sqA.value && sqA.value === sqB.value && sqA.value === sqC.value){
                //Verifico che i tre valori siano uguali. Se lo sono il gioco finisce e si elegge il vincitore
                this.inProgress = false;
                this.winner = sqA.value;    //Il giocatore che vince e' semplicemente colui che ha il valore di una delle 3 caselle vincenti
                sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true;   //Le tre caselle saranno quindi evidenziate
            }
        });

        //Dobbiamo inoltre verificare ad ogni mossa non solo se c'e' un vincitore, ma anche se tutte le 9 mosse sono state fatte ed ancora non c'e' un vincitore (per cui finisce in pareggio)
        if (this.movesMade === 9){
            this.inProgress = false;
            //Il gioco viene quindi fermato ed il valore this.winner rimarra' null
        }
    }
}

Game.O = 'O';
Game.X = 'X';