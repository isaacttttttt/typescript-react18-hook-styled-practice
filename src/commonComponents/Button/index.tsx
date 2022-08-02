import {Props} from "./types";
import {getWrapComponent} from '../utils';
import styled from "styled-components";
import './index.scss';
import React from "react";
const Button = ({value, width, height, backgroundColor = '#4d4d4d', color = '#4d4d4d', borderRadius, border, onClickEvent, onClickAnimate}: Props) => {
  const defaultButton = {
    borderWidth: 'none',
    borderColor: 'none',
    borderStyle: 'none'
  }
  const {borderWidth, borderColor, borderStyle} = border ?? defaultButton;
  const CustomButton = styled.button`
  min-width:${width}px;
  min-height:${height}px;
  background-color:${backgroundColor};
  color:${color};
  border:${borderWidth}px ${borderColor} ${borderStyle};
  border-Radius:${borderRadius}px
  `
  const defaultClickHandle = (evt: React.MouseEvent) => {
    console.log(evt);
  }
  return (
    <CustomButton className='button-wrap' onClick={(e) => defaultClickHandle(e)}>
      {value}
    </CustomButton>
  )
}
const ButtonSize = {
  minHeight: 56,
  minWidth: 78
}
export default getWrapComponent(Button, 'Button', ButtonSize)
