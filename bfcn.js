/* 
    命令行传参：node bfcn.js [src] [dest] [replace_src] [replace_target]
    src: 来源目录
    dest: 目标目录
    replace_src: 要替换的正则表达式
    replace_target: 替换内容
*/

const fs = require('fs');
const src_dir = process.argv[2];
const dest_dir = process.argv[3];
let replace_src = process.argv[4];
let replace_target = process.argv[5];

console.log('src_dir',src_dir)
console.log(fs.existsSync(src_dir))
if(src_dir && fs.existsSync(src_dir)){
    if(!replace_src){
        replace_src = '';
    }

    if(!replace_target){
        replace_target = '';
    }

    // 循环遍历目录下的文件
    var files = fs.readdirSync(src_dir);

    files.forEach((file) => {
        const filepath = src_dir + '/' + file;
        const filename = file.split('.')[0];
        const filetype = file.split('.')[1];
        const new_filename = filename.replace(replace_src, replace_target);

        if(!dest_dir) {
            dest_dir = src_dir + '/_batchDir';
        }
        const new_filepath = dest_dir + '/' + new_filename + '.' + filetype;


        fs.copyFileSync(filepath, new_filepath);
    });

}else {
    console.log('来源目录不正确');
}
