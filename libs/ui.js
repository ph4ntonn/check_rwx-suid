/**
 * UI
 */

const WIN = require('ui/window');
const LANG = require('../language/');
const LANG_T = antSword["language"]['toastr'];


class UI {
  constructor(opt) {
    // 创建窗口
    this.win = new WIN({
      title: `${LANG['title']}----- ${opt['url']}`,
      width: 666,
      height: 450,
    });
    this.opt=opt;
    this.createMainLayout();
    return {
      onCheck: (func) => {
        this.bindToolbarClickHandler(func);
      },
      onAbout: () => {}
    }
  }

  /**
   * 创建界面
   */
  createMainLayout() {
    let layout = this.win.win.attachLayout('2E');
    layout.cells('a').setText(`<i class="fa fa-bars"></i> ${LANG['cell']['path']}`);
    layout.cells('b').setText(`<i class="fa fa-bars"></i> ${LANG['cell']['suid']}`);
    layout.cells('b').collapse();
    this.createToolbar();
    this.createGrid(layout.cells('a'));
    this.createGrid_1(layout.cells('b'));
    this.layout=layout;
  }
 //rwx目录grid
  createGrid(cell) {
    let grid = cell.attachGrid();
    grid.setHeader(`
      ${LANG['cell']['path']}
    `);
    grid.setNoHeader(true);
    grid.setColTypes("ro");
    grid.setColSorting('str');
    grid.setInitWidths("666");
    grid.setColAlign("left");
    grid.enableMultiselect(true);
    grid.enableBlockSelection(true);
    grid.init();

    this.grid = grid;
  }

  //suid文件grid
  createGrid_1(cell) {
    let grid_1 = cell.attachGrid();
    grid_1.setHeader(`
      ${LANG['cell']['path']}
    `);
    grid_1.setNoHeader(true);
    grid_1.setColTypes("ro");
    grid_1.setColSorting('str');
    grid_1.setInitWidths("666");
    grid_1.setColAlign("left");
    grid_1.enableMultiselect(true);
    grid_1.enableBlockSelection(true);
    grid_1.init();

    this.grid_1 = grid_1;
  }


  /**
   * 工具栏
   */
  createToolbar() {
    let toolbar = this.win.win.attachToolbar();
    toolbar.loadStruct([
      { id: 'new',type: 'button', text: LANG['toolbar']['new'], icon: 'plus-circle'},
      { id: 'search_rwx',type: 'button', text: LANG['toolbar']['search_rwx'], icon: 'eye'},
      { id: 'search_suid',type: 'button', text: LANG['toolbar']['search_suid'], icon: 'eye'},
      { id: 'clear', type: 'button', text: LANG['toolbar']['clear'], icon: 'remove' }
    ]);
    this.toolbar = toolbar;
  }


  /**
  * 监听按钮点击事件
  * @param  {Function} callback [description]
  * @return {[type]}            [description]
  */
  bindToolbarClickHandler(callback) {
    let self = this;
    this.toolbar.attachEvent('onClick', (id) => {
      switch(id){
      case "new":
        switch (this.opt.type) {
          //当webshell类型为php时
          case "php":
            layer.
              prompt({
               value: "",
               title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["current_user"]}`
            }, (value, i, e) => {
              layer.close(i);
              this.win.win.progressOn();
              callback({
                type: "username",
                user: value,
                file_type: this.opt.type,
              }).then((path) => {
                if (path) {
                  this.path = path;
                  let griddata = [];
                  let griddata_1 = [];
                  //解析得到的数据
                  path.text.split("ph4ntom_ph4ntom")[0].split('\n').map((item, i) => {
                    if (!item) {
                      return
                    }
                    ;
                    item = antSword.noxss(item + "/");
                    griddata.push({
                      id: i,
                      data: item.split('\t')
                    });
                  });
                  path.text.split("ph4ntom_ph4ntom")[1].split('\n').map((item, i) => {
                    if (!item) {
                      return
                    }
                    ;
                    item = antSword.noxss(item);
                    griddata_1.push({
                      id: i,
                      data: item.split('\t')
                    });
                  });
                  // 开始加载grid
                  this.grid.clearAll();
                  this.grid_1.clearAll();
                  this.grid.parse({
                    rows: griddata
                  }, "json");
                  this.grid_1.parse({
                    rows: griddata_1
                  }, "json");
                  this.win.win.progressOff();
                  toastr.success(LANG["message"]["rwx_success"], LANG_T['success']);
                }
              }).catch((err) => {
                if (err == "Cannot find the user") {
                  toastr.error(LANG['error']['no_user'], antSword['language']['toastr']['error']);
                } else {
                  toastr.error(LANG['error']['other'], antSword['language']['toastr']['error']);
                }
                this.win.win.progressOff();
              })
            });
            break;
         //当webshell为asp时，无需输入用户名
          case "asp":
            layer.
            confirm('当前shell为asp类型，是否确认写入检测脚本至目标服务器？',{
              btn: ['确定','取消'],
              title:"提示"
            }, (i, e) => {
              layer.close(i);
              this.win.win.progressOn();
              callback({
                type: "username",
                file_type: this.opt.type,
              }).then((path) => {
                toastr.success(LANG["message"]["create_asp_success"], LANG_T['success']);
                this.win.win.progressOff();
              }).catch((err) => {
                  toastr.error(LANG['error']['unknown'], antSword['language']['toastr']['error']);
                this.win.win.progressOff();
              })
            });
            break;

          case "aspx":
            layer.
            confirm('当前shell为aspx类型，是否确认写入检测脚本至目标服务器？',{
              btn: ['确定','取消'],
              title:"提示"
            }, (i, e) => {
              layer.close(i);
              this.win.win.progressOn();
              callback({
                type: "username",
                file_type: this.opt.type,
              }).then((path) => {
                toastr.success(LANG["message"]["create_aspx_success"], LANG_T['success']);
                this.win.win.progressOff();
              }).catch((err) => {
                toastr.error(LANG['error']['unknown'], antSword['language']['toastr']['error']);
                this.win.win.progressOff();
              })
            });
            break;
        }
        break;

        //根据关键字查找rwx目录
          case "search_rwx" :
            layer.prompt({
            value: "",
            title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["search_word"]}`
          },(value,i, e) => {
            layer.close(i);
            var searchResult = this.grid.findCell(value, 0, false);
            var cell_found = []
            cell_found = searchResult.toString().substring(0, searchResult.toString().length - 2).split(",0,")
            for (i = 0; i <= cell_found.length; i++) {
              this.grid.selectCell(cell_found[i], 0, true, true);
            }
            toastr.success(LANG["message"]["search_success"], LANG_T['success']);
          })
          break;

          //根据关键字查找suid提权文件
        case "search_suid" :
          layer.prompt({
          value: "",
          title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["search_word"]}`
        },(value,i, e) => {
          layer.close(i);
          var searchResult=this.grid_1.findCell(value,0,false);
          var cell_found=[]
          cell_found=searchResult.toString().substring(0,searchResult.toString().length-2).split(",0,")
          for (i = 0; i <=cell_found.length; i++) {
            this.grid_1.selectCell(cell_found[i]-1,0,true,true);
          }
          toastr.success(LANG["message"]["search_success"], LANG_T['success']);
         })
         break;

        //清空grid
       case "clear":
         this.grid.clearAll();
         this.grid_1.clearAll();
         toastr.success(LANG["message"]["clear_success"], LANG_T['success']);
         break;
      }
    });
  }

}

module.exports = UI;
