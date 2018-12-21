export type WindowExt = Window & {
    receiveDomData:(data:any,windowDom:HTMLElement | Window,id:string)=>void;
    //.contentWindow.postMessage
    postMessage:()=>void;
}

// window.getComputedStyle
// 父级 中使用 iframe.contentWindow.postMessage
// iframe 中 使用 注册  window.addEventListener('message',()=>void) 接收数据