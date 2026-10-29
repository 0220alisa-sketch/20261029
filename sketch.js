let spriteSheet;
let frames = []; 
let totalFrames = 14; 
let currentFrame = 0;
let x, y;
let speed = 4;
let facing = 1; // 1 表示向右，-1 表示向左
let animSpeed = 0.15; // 動畫播放速度
let animCounter = 0;
let loaded = false;

// 宣告動態計算的尺寸變數
let actualFrameWidth, actualFrameHeight;

function preload() {
  // 載入橫向圖片精靈，路徑為 1/STOP/stop.png[cite: 1]
  spriteSheet = loadImage('1/STOP/stop.png', () => {
    // 自動抓取整張圖片的實際總寬度與高度
    let totalWidth = spriteSheet.width;
    let totalHeight = spriteSheet.height;
    
    // 自動計算精確的單張寬度（總寬度除以 14 張）
    actualFrameWidth = totalWidth / totalFrames;
    actualFrameHeight = totalHeight; // 高度通常為整張圖的高
    
    console.log(`圖片載入成功！總寬: ${totalWidth}, 自動計算每張寬: ${actualFrameWidth}, 高: ${actualFrameHeight}`);
    
    // 自動均分裁切 14 張圖
    for (let i = 0; i < totalFrames; i++) {
      let img = spriteSheet.get(i * actualFrameWidth, 0, actualFrameWidth, actualFrameHeight);
      frames.push(img);
    }
    loaded = true;
  }, (err) => {
    console.error("圖片載入失敗，請確認 1/STOP/stop.png 路徑與資料夾大小寫是否正確！", err);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 初始化角色在畫面中央
  x = width / 2;
  y = height / 2;
  imageMode(CENTER);
}

function draw() {
  // 設定畫布背景顏色為 caf0f8
  background('#caf0f8');
  
  // 若尚未載入完成，顯示讀取文字
  if (!loaded) {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("圖片載入中...", width / 2, height / 2);
    return;
  }
  
  let moving = false;
  
  // 檢查 A 鍵 ('a' / 'A') 或左方向鍵
  if (keyIsDown(65) || keyIsDown(97) || keyIsDown(LEFT_ARROW)) {
    x -= speed;
    facing = -1; // 轉向往左
    moving = true;
  }
  
  // 檢查 D 鍵 ('d' / 'D') 或右方向鍵
  if (keyIsDown(68) || keyIsDown(100) || keyIsDown(RIGHT_ARROW)) {
    x += speed;
    facing = 1; // 轉向往右
    moving = true;
  }
  
  // 若有移動則播放動畫影格，否則停在第一張
  if (moving) {
    animCounter += animSpeed;
    if (animCounter >= 1) {
      currentFrame = (currentFrame + 1) % totalFrames;
      animCounter = 0;
    }
  } else {
    currentFrame = 0;
  }
  
  push();
  translate(x, y);
  scale(facing, 1); // 根據移動方向水平翻轉精靈圖
  
  // 繪製當前影格的圖片（使用自動計算後的精確尺寸，並可在此微調顯示大小）
  let displayWidth = 124;  
  let displayHeight = 102;
  image(frames[currentFrame], 0, 0, displayWidth, displayHeight);
  
  pop();
}

function windowResized() {
  // 當視窗大小改變時自動維持全螢幕
  resizeCanvas(windowWidth, windowHeight);
}