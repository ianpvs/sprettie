export interface SelectProps {
    itens: ItemProps[],
    label?: string,
    onSelected: (item: ItemProps) => any
    maxHeight?: number | string,
    minHeight?: number | string,
}

export interface ItemProps {
    label: string,
    value: string | number,
}

export interface FlatProps {
    item: ItemProps,
}