const fileRegex = /\.(md)$/

//将md文件解析成vue能识别的组件
import { parse } from '@vue/compiler-sfc'
import { compile } from '@vue/compiler-dom'

//解析md文件
import { marked } from 'marked'

export default function myPlugin() {
    return {
        //插件名字
        name: 'markdown-loader',
        transform(src, id) {
            //判断是不是md结尾的文件
            if (fileRegex.test(id)) {
                //将md文件内容转成html，这个转换的插件也是可以自己写
                let html = marked(src, { async: false })

                //生成vue能解析的格式
                const ret = parse(`<template><div>${html}</div></template>`);
                const code = compile(ret.descriptor.template.content, { mode: 'module' }).code;
                const render = `${code};
                let __script = {};
                __script.render = render;
                  export default __script;`
                return {
                    code: render,
                    map: null
                }
            }
        },
    }
}
