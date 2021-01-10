
export default interface TableColumnVM {
    key: string;
    type: 'string' | 'number';
    label: string;
    cellRenderer?: { (data: any) : React.ReactNode };
}