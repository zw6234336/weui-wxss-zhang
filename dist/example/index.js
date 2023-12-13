
Page({
  mixins: [require('../mixin/common')],
  data: {
    imagePath: '/example/images/table-5.jpg',
  },
  kindToggle(e) {
    const { id } = e.currentTarget; const { list } = this.data;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list,
    });
  },
  changeTheme() {
    console.log(this.data);
    getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
  },
  chooseImage: function() {
    var that = this;
    that.setData({
      isLoading: true  // 开始上传图片时显示loading组件
    });
    wx.chooseImage({
      count: 1,  // 允许用户选择的图片数量
      sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imagePath: res.tempFilePaths[0] , // 将选择的图片的路径保存到数据中
          isLoading: false  // 上传完成后隐藏loading组件
        });
      // 获取用户信息
        wx.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中
          success: (res) => {
            console.log(res.userInfo)
          }
        });
        
      // wx.uploadFile({
      //     url: 'https://springboot-rik5-84809-6-1323123546.sh.run.tcloudbase.com/',  // 你的上传接口地址
      //     filePath: res.tempFilePaths[0],
      //     name: 'file',
      //     formData: {
      //       'user': 'test'  // 其他要传递的参数
      //     },
      //     success (res){
      //       that.setData({
      //         isLoading: false  // 上传完成后隐藏loading组件
      //       });
      //       const data = res.data
      //       // do something
      //     }
      //   })
      wx.cloud.callContainer({
        "config": {
          "env": "prod-4gmx72kd8944b766"
        },
        "path": "/api/count",
        "header": {
          "X-WX-SERVICE": "springboot-rik5"
        },
        "method": "POST",
        "data": {
          "action": "inc"
        }
      })
      }
      
    })
}});
