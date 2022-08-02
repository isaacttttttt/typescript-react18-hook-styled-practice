export interface Props {
  value: string,
  width: number,
  height: number,
  backgroundColor: string,
  color?: string,
  borderRadius?: number,
  border?: {
    borderWidth: number,
    borderStyle: string,
    borderColor: string,
  },
  onClickAnimate?: {
    [animateName: string]: string
  },
  onClickEvent?: (button: HTMLInputElement) => void,
}
