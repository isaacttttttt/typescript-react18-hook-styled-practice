/**
 * @description 这里存放通用mixin函数
 */
/****************   handle mouseEvent   ****************/
const moveHandle = (target: HTMLDivElement, moveEvent: MouseEvent, width: number, height: number, startX: number, startY: number) => {
  (target as HTMLDivElement).style.width = width + moveEvent.clientX - startX + 'px';
  (target as HTMLDivElement).style.height = height + moveEvent.clientY - startY + 'px';
}
const dragHandle = (target: HTMLDivElement, moveEvent: MouseEvent, width: number, height: number, startX: number, startY: number) => {
  (target as HTMLDivElement).style.top = moveEvent.clientY - height + startY + 'px';
  (target as HTMLDivElement).style.left = moveEvent.clientX - width + startX + 'px';
}
/****************   function for add dragEvent to control BoxSize   ****************/
export const dragToBigHandle = (current: React.MouseEvent, target: HTMLDivElement) => {
  current.stopPropagation();
  current.preventDefault();
  const {clientWidth, clientHeight} = target;
  const {top, left} = target.style;
  const {clientX, clientY} = current;
  const {direction} = (current.target as HTMLDivElement).dataset
  if (direction === "center")
    document.onmousemove = (e) => dragHandle(target, e, clientX, clientY, parseInt(left) || 0, parseInt(top) || 0)
  else
    document.onmousemove = (e) => moveHandle(target, e, clientWidth, clientHeight, clientX, clientY)
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}


