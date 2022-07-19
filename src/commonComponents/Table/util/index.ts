export const getCellData = (target: HTMLElement) => {
    const data = Object.assign(
        {},
        target.dataset,
        target.parentElement?.dataset,
        (target.children[0] as HTMLElement)?.dataset,
        {value: target.innerText ?? target.parentElement?.innerText ?? (target.children[0] as HTMLElement).innerText}
    )
    return data
}