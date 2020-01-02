// components/bindRole.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userSelected: [{
        type: "system",
        name: ""
      },
      {
        type: "channel",
        name: ""
      },
      {
        type: "area",
        name: ""
      },
      {
        type: "role",
        name: ""
      }
    ],
    selectMenu: [{
      type: 0,
      label: "系统",
      placeHolder: "请选择系统",
      // 0是关闭下拉菜单，1是打开下拉菜单
      status: 0,
      selections: [{
          id: 0,
          name: "name1"
        },
        {
          id: 1,
          name: "name2"
        }
      ]
    }, {
      type: 1,
      label: "渠道",
      placeHolder: "请选择渠道",
      status: 0,
      selections: [{
          id: 0,
          name: "name1"
        },
        {
          id: 1,
          name: "name2"
        }
      ]
    }, {
      type: 2,
      label: "大区",
      placeHolder: "请选择大区",
      status: 0,
      selections: [{
          id: 0,
          name: "name1"
        },
        {
          id: 1,
          name: "name2"
        }
      ]
    }, {
      type: 3,
      label: "角色",
      placeHolder: "请选择角色",
      status: 0,
      selections: [{
          id: 0,
          name: "name1"
        },
        {
          id: 1,
          name: "name2"
        }
      ]
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开列表
    handleOpenMenu(e) {
      console.log(e.currentTarget);
      let {
        type
      } = e.currentTarget.dataset;
      let selectMenu = this.data.selectMenu;
      type = parseInt(type);
      selectMenu[type].status == 1 ? selectMenu[type].status = 0 : selectMenu[type].status = 1;
      this.setData({
        selectMenu
      })
    },
    // 关闭弹窗
    handleCloseBindRole(e) {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('closeBindRole', myEventDetail, myEventOption);
    },
    handleSelect(e) {
      
      let {
        type,
        id,
        name
      } = e.currentTarget.dataset;
      console.log(type, id, name);
      let selectMenu = this.data.selectMenu;
      selectMenu[type].status = 0;
      let userSelected = this.data.userSelected;
      userSelected[type].name = name;
      userSelected[type].id = id;
      userSelected[type].name = name;
      this.setData({
        userSelected,
        selectMenu
      })
    }
  }
})