import React from 'react';
import Dialog from 'app/components/dialog/dialog.component';
import SortableItemVM from 'app/models/vms/sortable-item.vm';
import { ReactSortable } from 'react-sortablejs';
import sortImg from 'app/images/sort.png';
import classes from './column-sort-dialog.module.scss'

interface Props {
    columnOrder: Array<SortableItemVM>;
    onListChanged: { (list: Array<SortableItemVM>) : void}
    onClose: { () : void };
    visible: boolean;
}
const ColumnSortDialog = ({ visible, columnOrder, onClose, onListChanged } : Props) => (
    <Dialog className={classes.dialog} visible={visible} onClose={onClose}>
        <ReactSortable list={columnOrder} setList={onListChanged}>
            {
            columnOrder.map((item) => (
                <div key={item.id} className={classes.sortItem}>
                    <img src={sortImg} className={classes.sortIcon} />
                    <div key={item.id} className={classes.sortText}>
                        {item.name}
                    </div>
                </div>
            ))
            }
        
        </ReactSortable>
    </Dialog>
);

  export default ColumnSortDialog