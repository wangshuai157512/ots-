export const checkEnglishName = (rule, value, callback)=> {
    if(value) {
        let reg = new RegExp("^[a-zA-Z]+$")
        if(!reg.test(value)) {
            callback(new Error('输入内容必须未纯英文'))
        }else {
            callback(); 
        }
    }
    callback();
}
