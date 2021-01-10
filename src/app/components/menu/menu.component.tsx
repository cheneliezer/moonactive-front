import React from 'react';
import classes from './menu.module.scss';

export interface MenuItem {
    key: string;
    label: string;
}

interface Props {
    items: Array<MenuItem>
    onClick: {(key: string) : void}
}

const Menu = ({ items, onClick } : Props) => {

    return (
      <div className={classes.menuWrapper}>
        <div className={classes.menu}>
          {
            items.map(({key, label} : MenuItem) => (
                <div onClick={() => onClick(key)} key={key} className={classes.item}>
                    {label}
                </div>
            ))
          }
        </div>
      </div>
    );
  };

  export default Menu