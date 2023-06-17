class BrickBlock extends BlockBase {
    constructor(position) {
      super(position, "./img/blocks/brick.png");
    }
  
    ActionDown(row, column) {
      document.getElementById("brick_audio").play(); // hang lejátszása
      // blokk animálása
      if(time_progress_bar.val() > 90) return;
      let oldTop = this.E.position().top;
      this.E.animate({top: oldTop + 15}, 50);
      this.E.animate({top: oldTop}, 50);
    }
  }