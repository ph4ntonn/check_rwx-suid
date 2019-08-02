/**
 * en_US
 */

module.exports = {
    title: "Search the rwx paths and the files can be used as suid-pwn",
    toolbar: {
        new: "User",
        clear: "Clear",
        search_rwx:"Search the rwx paths (Going by the keyword)",
        search_suid:"Search the suid-pwn files (Going by the keyword)"
    },
    message: {
        rwx_success: "Searching complete",
        clear_success:"Clearing complete",
        search_success: "Searching complete"
    },
    prompt: {
        current_user: "Please enter the username you want to search",
        search_word:"Please enter the keyword you want to search"
    },
    cell:{
        path:"rwx paths",
        suid:"suid-pwn files"
    },
    error:{
        no_user:"Can\'t find the user",
        other:"Timeout ! Please check out your timeout setting in the shell\'s setting platfrom , set a larger number and try again afterward"
    }

};