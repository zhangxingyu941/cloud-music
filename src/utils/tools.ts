// 防抖函数
export function debounce(fun: Function, time: number) {
  let t: any = null;
  return function (this: any) {
    if (t) clearInterval(t);
    t = setTimeout(() => {
      fun.apply(this, arguments);
    }, time);
  };
}
