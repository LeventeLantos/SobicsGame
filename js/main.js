class Game {
    constructor() {
        // Játékterület beállítása
        this.game_area = $("#game_area");

        // Idővonal beállítása
        this.time_progress_bar = $("#timeprg");

        // Vonalak számának beállítása
        this.number_of_lines = 0;

        // Maximális vonalak számának beállítása
        this.max_number_of_lines = 16;

        // Időtartam blokkonként
        this.time_per_blocks = 15000;

        // Új blokkok létrehozásának intervalluma
        this.new_blocks_interval = null;

        // Játékos létrehozása
        this.player = new Player($("#player"));

        // Blokkok tömbjének létrehozása
        this.blocks = [];

        // Konténer tömb létrehozása a maximum vonalak számával
        this.container = new Array(this.max_number_of_lines);

        // Pontok számának beállítása
        this.points = 0;

        // Háttérzene beállítása
        this.background_music = document.getElementById("background_music");
        this.background_music.loop = true;
        this.background_music.autoplay = true;
        this.background_music.play();

        // Tömbök inicializálása
        for (let i = 0; i < this.max_number_of_lines; i++) {
            this.blocks[i] = new Array(10);
        }

        // Első négy vonal létrehozása
        for (let i = 0; i < 4; i++) {
            this.createNewBlocks();
        }

        // Új blokkok létrehozása időintervallum alapján
        this.new_blocks_interval = setInterval(() => {
            let old_value = this.time_progress_bar.val();
            this.time_progress_bar.val(old_value + 100/(this.time_per_blocks/10));
            if(this.time_progress_bar.val() >= 100){
                this.createNewBlocks();
            }
        }, 10);
    }

    // Játékos mozgatása
    movePlayer(e) {
        // Játékos mozgatása a kurzor alá
        this.player.Player.appendTo(e);
    }

    // Blokkok mozgatása
    moveBlocks(col) {
        // Az utolsó blokk megtalálása az oszlopban
        let i = this.number_of_lines;
        for (;i >= 0 && this.blocks[i] !== undefined && this.blocks[i][col] === undefined; i--);
        if(this.player.hand.length === 0){
            if(this.blocks[i] !== undefined){
                this.blocks[i][col].actionDown(i, col);
            }
        } else{
            // blocks[i][col] az első undefined elem
            for(let j = this.player.hand.length - 1; j >= 0; j--){
                this.blocks[i][col] = this.player.hand[j];
                this.player.hand[j].position = new Position(col, i);
                i--;
            }
            this.player.hand = [];
            this.player.clearHand();
        }
    }

    // Új blokkok létrehozása
    createNewBlocks() {
        // A vonalak számának növelése
        this.number_of_lines++;

        // Ha a vonalak száma meghaladja a maximumot, vége a játéknak
        if (this.number_of_lines > this.max_number_of_lines) {
            this.endGame();
        }

        // rest of methods
        this.createBlocks();
        this.checkGameStatus();
        this.calculatePoints();
        // ...
    }

    // Játék vége
    endGame() {
        // Időintervallum törlése
        clearInterval(this.new_blocks_interval);

        // Zene leállítása
        this.background_music.pause();
        this.background_music.currentTime = 0;

        // Játék vége üzenet kiírása
        console.log("Game over!");
    }
}
