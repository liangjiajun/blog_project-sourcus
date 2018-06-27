Page({
  data: {
    directory: [//侧边导航
      { id: 1, title: '热销', check: true },
      { id: 2, title: '热销1', check: false },
      { id: 3, title: '热销2', check: false },
    ],
    list:[//商品列表
      {
        title:'热销',
        item:[
          { id: 1, title: '黄焖鸡米饭黄焖鸡米饭黄焖鸡米饭黄焖鸡米饭', price: '12.10', },
          { id: 1, title: '黄焖鸡米饭', price: '10.0',  },
          { id: 1, title: '黄焖鸡米饭', price: '120',  },
          { id: 1, title: '黄焖鸡米饭', price: '12.14',  },
          { id: 1, title: '黄焖鸡米饭', price: '53.36',  },
          { id: 1, title: '黄焖鸡米饭', price: '48.26', },
        ]
      },
      {
        title: '热销1',
        item: [
          { id: 1, title: '番茄炒蛋', price: '12.10', },
          { id: 1, title: '番茄炒蛋', price: '10.0', },
          { id: 1, title: '番茄炒蛋', price: '120', },
          { id: 1, title: '番茄炒蛋', price: '12.14', },
          { id: 1, title: '番茄炒蛋', price: '53.36', },
          { id: 1, title: '番茄炒蛋', price: '48.26', },
        ]
      },
      {
        title: '热销2',
        item: [
          {
            id: 1, title: '手撕鸡', price: '12.00'},
        ]
      },
    ],
    listOffsetTop:[],//商品的高度
    offsetTopIndex:0,//当前商品
    scrollTop:'',//滚动到哪个商品类
  },
  onLoad: function (options) {    
    const _this = this;
    let _arr = [];
    /**
     * 获取单个商品列表的高度
     */
    _this.data.list.forEach((el,i)=>{
      let queryi = wx.createSelectorQuery();
      queryi.select('#list'+i).boundingClientRect();
      queryi.exec(function (res) {
        // console.log(res[0].top)
        _arr.push((res[0].height + res[0].top)-80);
        _this.setData({
          listOffsetTop: _arr
        })
      })
    });
  },
  /**
   * 列表滚动
   */
  scroll:function(e){
    const _this = this,
          _data = _this.data.listOffsetTop,//高度数组
          _directory = _this.data.directory,//侧边导航
          _scrollIndex = _this.data.offsetTopIndex;//当前商品索引
    let _top = e.detail.scrollTop,//滚动高度
       _returnInd = _this.interval(_data, _top+25);//区间计算返回的索引

       //将区间算法返回的index和当前商品的index做判断
    if (_returnInd !== _scrollIndex){
        _this.setData({
          offsetTopIndex: _returnInd,
        })
        //修改侧边导航状态
        _directory.forEach((el,i)=>{el.check = i === _returnInd ? true : false;});
        _this.setData({directory: _directory,})
    }   
  },
  /**
   * 区间算法
   * array 从小到大排序的数组
   * val 匹配的数值
   */
  interval(array, val){
    if (val < Math.min.apply(null, array)) {return 0;};
    if (val > Math.max.apply(null, array)) {return array.length - 1;};
    for (let i = 0; i < array.length; i++) {
      if (array[i] > val) {
        return i;
        break;
      };
    };
  },
  /**
   * 改变侧边导航的状态
   */
  directoryActive:function(e){
    const _this = this,
          _ind = e.currentTarget.dataset.ind,
          _data = _this.data.directory;
    _data.forEach((el, i) => { el.check = i === _ind ? true : false; });

    _this.setData({ 
      directory: _data, 
      scrollTop: 'list'+_ind,
    })
  }
})
