import {BoxSize} from "src/commonComponents/types";
import styled from "styled-components";
export const getWrap = ({minWidth, minHeight}: BoxSize) => (
  styled.section`
    min-width:${minWidth};
    min-height:${minHeight}
  `
)
