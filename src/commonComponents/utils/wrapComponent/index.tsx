import styled from 'styled-components';
import './index.scss';
import {BoxSize} from 'src/commonComponents/types';
import {getWrap} from '../';
import {useRef} from 'react';
export const getDraggableComponents = (InnerComponent: any, name: string, boxSize: BoxSize) => {
  const Wrap = getWrap(boxSize)
  console.log('我在这里被使用了')
  const dragHandle = (current: React.MouseEvent, target: HTMLDivElement) => {
    const {clientWidth, clientHeight} = target;
    const {clientX, clientY} = current;
    console.log(clientX, clientY)
    const moveHandle = (moveEvent: MouseEvent, width: number, height: number, startX: number, startY: number) => {
      (target as HTMLDivElement).style.width = width + moveEvent.clientX - startX + 'px';
      (target as HTMLDivElement).style.height = height + moveEvent.clientY - startY + 'px';
      console.log(moveEvent.clientX, moveEvent.clientY)
    }
    document.onmousemove = (e) => moveHandle(e, clientWidth, clientHeight, clientX, clientY)
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    }

  }
  return (props: any) => {
    const dragBox = useRef<HTMLDivElement>(null)
    return (
      <Wrap className={"general-component-wrap" + " " + name} ref={dragBox}>
        <div className="general-component-inner-wrap" >
          <section className="drag-button-section" onMouseDown={(e) => dragHandle(e, dragBox.current as HTMLDivElement)}>
            <div className='drag-button left' data-direction="left"></div>
            <div className='drag-button topleft' data-direction="topleft"></div>
            <div className='drag-button top' data-direction="top"></div>
            <div className='drag-button topright' data-direction="topright"></div>
            <div className='drag-button right' data-direction="right"></div>
            <div className='drag-button rightbottom' data-direction="bottomright"></div>
            <div className='drag-button bottom' data-direction="bottom"></div>
            <div className='drag-button bottomleft' data-direction="bottomleft"></div>
          </section>
          <InnerComponent {...props} />
        </div>
      </Wrap>
    )
  }
}
