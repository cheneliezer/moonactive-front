import React from 'react';
import TableColumnVM from 'app/models/vms/table-column.vm';
import sortImage from 'app/images/sort.png'    
import classes from './headers.module.scss';

interface Props  {
   columns: Array<TableColumnVM>
   onSort?: {() : void}
}
const TableHeaders = ({ columns, onSort} : Props) => (
  <div className={classes.headersWrapper}>
    <div className={classes.headers}>
      {
        columns.map(({key, label} : TableColumnVM) => (
            <div key={key} className={classes.header}>
                {label}
            </div>
        ))
      }
      {
        onSort &&
        <img className={classes.sortImage} src={sortImage} onClick={onSort} />
      }
    </div>
  </div>
);

  export default TableHeaders