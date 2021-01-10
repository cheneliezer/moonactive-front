import React, { useState, useRef } from 'react';
import TableColumnVM from 'app/models/vms/table-column.vm';
import TableHeaders from './components/headers.component';
import List from '../list/list.component';
import Menu, { MenuItem } from '../menu/menu.component';
import threeDotsImage from '../../images/three-dots.png';
import useOnClickOutside from 'app/hooks/useOutsideClick';
import * as classNames from 'classnames';
import classes from './table.module.scss';
import Checkbox from '../checkbox/checkbox.component';

const ITEM_HEIGHT = 50

interface TableProps {
   items: Array<any>,
   total: number,
   itemHeight?: number;
   columns: Array<TableColumnVM>,
   className?: string
   actions?: Array<MenuItem>,
   loading?: boolean;
   checked?: Array<number>
   onMenuItemClicked?: { (item: any, actionKey: string) : void },
   onSortColumns?: { () : void },
   onScrolledToBottom?: { () : void },
   onRowSelected?: { (index: number) : void },
}

const Table = ({ items, total, actions, loading, columns, checked, onSortColumns, onScrolledToBottom, onMenuItemClicked, onRowSelected , className, itemHeight = ITEM_HEIGHT } : TableProps) => {
  const [activeMenu, setActiveMenu] = useState<number>(-1)
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => setActiveMenu(-1));

  const handleMenuItemClicked = (item: any, key: string) => {
    setActiveMenu(-1)
    if(onMenuItemClicked) {
      onMenuItemClicked(item, key)
    }
  }
  const handleRowClicked = (index: number) => {
    if(onRowSelected) {
      onRowSelected(index)
    }
  }
    return (
      <div className={classNames(classes.tableWrapper, className)}>
        <div className={classes.totalText}>
          Total items : {total}
        </div>
        <TableHeaders columns={columns} onSort={onSortColumns}/>
        {
          loading &&
          <div className={classes.loadingBottom}>
            <div className={classes.spinner}/>
          </div>
        }
        <div className={classes.tableBody}>
          <div className={classes.table} >
           <List
            onScrolledToBottom={onScrolledToBottom}
            numItems={items.length} 
            itemHeight={itemHeight} 
            windowHeight={500} 
            renderItem={({index, style}: {index:number, style: any}) =>
             (<div key={index} className={classes.row} style={{...style, height: itemHeight}}>
               {
                 checked &&
                  <div className={classes.rowCheckbox} onClick={() => handleRowClicked(index)}>
                      <Checkbox checked={checked.includes(index)} onClicked={() => handleRowClicked(index)} />
                </div>
               }

                {
                columns.map(({key, cellRenderer} : TableColumnVM) => (
                      <div key={key} className={classes.rowItem}>
                          { cellRenderer ? cellRenderer(items[index]) : items[index][key]}
                      </div>
                ))
              }
              {
                actions && 
                <div className={classes.rowAction}>
                    <img onClick={() => setActiveMenu(index)} src={threeDotsImage} className={classes.actionImage}/>
                    {
                      activeMenu === index &&
                      <div ref={menuRef} className={classes.menuWrapper}>
                        <Menu onClick={(key: string) => handleMenuItemClicked(items[index], key)} items={actions}/>
                      </div>
                    }
                </div>
              }
            </div>)} 
            />
            </div>
        </div>
      </div>
    );
  };

  export default Table