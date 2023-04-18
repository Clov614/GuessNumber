// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    surprise: '❤I love cqy❤',
  },
  // 生成随机数
  //生成从minNum到maxNum的随机数
  randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
  },

  // 初始化游戏配置
  initGame: function() {
    this.setData({
      ansArray: [],
      inputData: 0,
      maxsize: 4,
      restartFlag: false,
      msg: '',
      targetNum: this.randomNum(1,100),
    });
  },

  handleInput: function(event) {
    this.setData({
      inputData: event.detail.value,
    });
  },

  // 重新开始按钮
  restart: function() {
    this.initGame();
  },

  // 提交按钮处理
  submit: function() {
    let num = parseInt(this.data.inputData,10);
    // 验证是否符合规则
    if (this.check(num)) {
      let targetNum = this.data.targetNum;
      if (num < targetNum) {
        this.data.ansArray.push({
          num: num,
          msg: '猜小了'
        })
        this.setData(this.data)
      } else if (num > targetNum) {
        this.data.ansArray.push({
          num: num,
          msg: '猜大了'
        })
        this.setData(this.data)
      } else {
        this.data.restartFlag = true;
        this.data.msg = '恭喜你，猜对啦';
        this.setData(this.data);
      }
      if (this.data.maxsize == this.data.ansArray.length) {
        this.data.restartFlag = true;
        this.data.msg = '没猜中，游戏结束';
        this.setData(this.data);
      }
    }
  },

  check: function(num) {
    if (Number.isNaN(num)) {
      this.showTips('请输入数字');
      return false;
    }else if (num < 1 || num > 100) {
      this.showTips('须在1~100之间');
      return false;
    }
    return true;
  },

  showTips: function(title) {
    wx.showToast({
      icon: 'error',
      title: title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initGame();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})