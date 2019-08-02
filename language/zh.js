/**
 * zh_CN
 */

module.exports = {
    title: "检查可读写可执行目录&suid提权文件",
    toolbar: {
        new: "用户",
        clear: "清空",
        search_rwx:"搜索可读写可执行目录",
        search_suid:"搜索suid提权文件"
    },
    message: {
        rwx_success: "查询成功",
        clear_success:"清空成功",
        search_success: "搜索完成"
    },
    prompt: {
        current_user: "请输入当前用户",
        search_word:"请输入欲查找的字符"
    },
    cell:{
        path:"可读写可执行路径",
        suid:"suid提权文件"
    },
    error:{
        no_user:"找不到此用户",
        other:"查询超时，请尝试在\"编辑数据\"-\"其他设置\"中调整超时时间后重试"
    }

};
