class Player {
    constructor(playerElement) {
        this.playerElement = playerElement;
        this.hand = [];
        this.container_div = $("<div></div>");
        this.container_div.addClass("container");
    }

    get Player() {
        return this.playerElement;
    }

    PopHand() {
        // Blokk eltávolítása a játékos kezéből
        return this.hand.pop();
    }

    PushHand(e) {
        // Blokk áthelyezése a játékos kezébe
        this.hand.push(e);
    }

    AppendContainer() {
        // Hozzáadja a blokkokat a játékos kezében lévő tárolóhoz
        for (const element of this.hand) {
            element.E.css({
                position: "relative",
                top: 0
            });
            this.container_div.append(element.E);
        }
        $("#player").append(this.container_div);

        // Animáció: a játékos tárolója megjelenik a képernyőn
        $("#player").animate({
            bottom: -10
        }, 100);
        $("#player").animate({
            bottom: 0
        }, 100);
    }

    RemoveContainer() {
        // Eltávolítja a blokkot a játékos kezéből
        this.hand[0].E.css({display: "none"});
    }
}
