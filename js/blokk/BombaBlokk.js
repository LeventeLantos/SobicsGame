class BombBlock extends BlockBase {
    constructor(position) {
      super(position, "./images/blocks/bomb.png");
    }
  
    ActionDown(row, column) {
      document.getElementById("down_audio").play(); // hang lejátszása
  
      player.PushHand(blocks[row][column]); // blokk átadása a játékosnak
      blocks[row][column] = undefined;
      player.AppendContainer(); // játékos konténerének frissítése
  
      // Ha néhány blokk(ok) lefelé mozog, számolja ki, hány sor van a területen az utolsó sorral kezdve, és állítsa be a number_of_lines értékét.
    }
  }
  