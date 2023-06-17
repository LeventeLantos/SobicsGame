class BlockBase {
    static similarBlockCount = 0;
  
    constructor(position, imageFile) {
      this.position = position; // {x, y} pozíció objektum
      this.isScanned = false;
      this.htmlElement = $("<img>");
      this.htmlElement.attr("src", imageFile);
      this.htmlElement.addClass("block");
      this.htmlElement.appendTo(`#hover${this.Y}`);
    }
  
    get X() {
      return this.position.x;
    }
  
    get Y() {
      return this.position.y;
    }
  
    set E(block) {
      this.htmlElement = block;
    }
  
    get E() {
      return this.htmlElement;
    }
  
    ActionDown(row, column) {
      document.getElementById("down_audio").play(); // hang lejátszása
      // blokkok lemozgatása
      // számolja meg, hány blokk van a kattintott blokk felett azonos színnel
      // ellenőrizze, hogy a blokkok típusa (szín) megegyezik-e
      for (; row >= 0 && blocks[row] !== undefined && blocks[row][column] !== undefined && blocks[row][column].constructor === this.constructor; row--) {
        player.PushHand(blocks[row][column]); // blokk átadása a játékosnak
        blocks[row][column] = undefined;
      }
      player.AppendContainer(); // játékos konténerének frissítése
  
      // Ha néhány blokk(ok) lefelé mozog, számolja ki, hány sor van a területen az utolsó sorral kezdve, és állítsa be a number_of_lines értékét
    }
  }
  