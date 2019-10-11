# NS-SHAFT
![](https://github.com/105062333/NS-SHAFT/blob/master/background.png)

## DEMO
https://105062333.gitlab.io/Assignment_02/

## Report
* A complete game process: start menu => game view => game over => quit or play again
    * 一開始是loading畫面，接下來進入menuState，上下可以選要遊玩的模式。
    * 在1P的模式中，按enter會進入nameState，要填寫名字，之後按enter進入playState就可以開始玩。
    * 死掉之後可以選擇要再玩一次或是離開回menu。
* Your game should follow the basic rules of  "小朋友下樓梯".  
* All things in your game should have correct physical properties and behaviors.
    * 基本上規則就跟小朋友下樓梯一樣，只能左右移動，生命為10，被一次尖刺刺到扣3，站到normal的板子會+1。
    * 分數我設定3秒+1分，往下的速度會隨著時間增加而變快，難度提高。
    * player的animation可以分為5種，往上飛、往左飛、往右飛、往左走、往右走。
* Set up some interesting traps or special mechanisms. .(at least 2 different kinds of platform)
    * platform的話我有六種不同的，有普通的、尖刺、彈簧、左或右的輸送帶、假的板子。
* Add some additional sound effects and UI to enrich your game.
    * 我在menuState和playState還有leaderState都有background music，變換模式、碰到尖刺、gameover都有音效。
    * 在碰到尖刺時畫面會閃一下紅色，死掉時會震動，變成emitter
    * 每個State文字出現也都有特效。
* Store player's name and score in firebase real-time database, and add a leaderboard to your game.
    * 輸入名字之後遊玩，gameover就會記住name, score, 遊玩的時間到firebase real-time database。
    * 在menuState可以選擇leaderboard進去看，那裏會列這個遊戲的前五名資訊，有name, score, 遊玩的時間。

* **Other creative features in your game (describe on README.md)**
    * 在menuState可以上下選擇模式，且會有特效
    * 我有多新增兩個模式，分別是　2 Players 和　challenge
    * 2 players顧名思義就是可以兩個人一起玩，分別控制左右和ad移動，當一個人死時就gameover並且出現文字顯示贏的一方，在這個state有不同的背景、背景音樂、音效。
    * challenge就是挑戰模式，進去之後，往下速度會變來變去，且我拿掉普通的、左或右的輸送帶板子，難度增加很多。
    * 在menu leaderboard 或是輸入名字的state按A會進到infoState，裡面有遊戲的操作及規則。
