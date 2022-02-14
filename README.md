# vue3-admin

基于 Vue3 + Element Plus 的后台管理系统解决方案。
原作地址[vue-manage-system](https://github.com/lin-xin/vue-manage-system)，该项目提供精简版框架，删除不必要组件，加入sass与tailwindcss。

## 安装步骤

```
// 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn
npm install 

// 开启服务器，浏览器访问 http://localhost:8080
npm run dev

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```
tailwindcss报错请执行如下语句：  
npm uninstall tailwindcss postcss autoprefixer  
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9  
## License

[MIT](https://github.com/lin-xin/vue-manage-system/blob/master/LICENSE)
