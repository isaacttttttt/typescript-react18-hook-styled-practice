import styled from 'styled-components';
import './index.scss';
import {BoxSize} from 'src/commonComponents/types';
import {getWrap, getDragBoxSection, dragToBigHandle} from '../';
import {useRef} from 'react';
export const getDraggableComponents = (InnerComponent: any, name: string, boxSize: BoxSize) => {
  return (props: any) => {
    const Wrap = getWrap({
      minHeight: props.height ?? boxSize.minHeight,
      minWidth: props.width ?? boxSize.minWidth
    })
    const dragBox = useRef<HTMLDivElement>(null)
    return (
      <Wrap className={"general-component-wrap" + " " + name} ref={dragBox}>
        <div className="general-component-inner-wrap" >
          <section className="drag-button-section" onMouseDown={(e) => dragToBigHandle(e, dragBox.current as HTMLDivElement)}>
            <div className='drag-button left' data-direction="left"></div>
            <div className='drag-button topleft' data-direction="topleft"></div>
            <div className='drag-button top' data-direction="top"></div>
            <div className='drag-button topright' data-direction="topright"></div>
            <div className='drag-button right' data-direction="right"></div>
            <div className='drag-button rightbottom' data-direction="bottomright"></div>
            <div className='drag-button bottom' data-direction="bottom"></div>
            <div className='drag-button bottomleft' data-direction="bottomleft"></div>
            <div className='drag-button center' data-direction="center"></div>
          </section>
          <InnerComponent {...props} />
        </div>
      </Wrap>
    )
  }
}
