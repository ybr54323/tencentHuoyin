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
        selectMenu: [{
            label: "系统",
            placeHolder: "请选择系统",
            // 0是关闭下拉菜单，1是打开下拉菜单
            status: 0,
            selections: [
                "系统1", "系统2"
            ]
        }, {
            label: "渠道",
            placeHolder: "请选择渠道",
            status: 0,
            selections: [
                "渠道1", "渠道2"
            ]
        }, {
            label: "大区",
            placeHolder: "请选择大区",
            status: 0,
            selections: [
                "大区1", "大区2"
            ]
        }, {
            label: "角色",
            placeHolder: "请选择角色",
            status: 0,
            selections: [
                "角色1", "角色2"
            ]
        }]
    },

    /**
     * 组件的方法列表
     */
    methods: {
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
        handleCloseBindRole(e) {
            
        }
    }
})