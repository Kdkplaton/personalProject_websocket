import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;

  constructor(ctx, scaleRatio, itemData, stageData) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.itemData = itemData;
    this.stageData = stageData;
  }

  update(deltaTime) {
    const stageNow = this.stageData;
    this.score += deltaTime * 0.001;

    // 점수가 100점 이상이 될 시 서버에 메세지 전송
    // 스테이지 변경시 stageChange 전환
    if (Math.floor(this.score) === 100 && this.stageChange) {
      this.stageChange = false;
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
    }
  }

  // item요소 활용하기!
  getItem(itemId) {
    console.log(this.itemData);
    const targetItem = this.itemData.findIndex((item) => item.id == itemId);
    const scored = this.itemData[targetItem].score;

    this.score += scored;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;
    const stage = 1;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';
    
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;
    const stageX = 25;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);
    const stagePadded = stage.toString().padStart(2, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    this.ctx.fillText(`STAGE ${stagePadded}`, stageX, y);
  }
}

export default Score;
