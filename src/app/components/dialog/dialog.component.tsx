import React, {useRef} from "react";
import classNames from 'classnames';
import PrimaryButton from "../primary-button/primary-button.component";
import useOnClickOutside from "app/hooks/useOutsideClick";
import closeIcon from 'app/images/close.png'
import classes from './dialog.module.scss';

interface Props {
    children: React.ReactNode;
    visible: boolean;
    className?: string;
    confirmButtonText?: string;
    closeButtonText?: string;
    title?: string;
    loading?: boolean;
    onConfirm?: { () : void };
    onClose?: { () : void };
}

const Dialog: React.SFC<Props> = ({className, title, visible, children, confirmButtonText, closeButtonText, onConfirm, onClose, loading } : Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, onClose);
    return (
        <div className={classNames(classes.background, {[classes.hidden] : !visible })}>
            <div ref={ref} className={classNames(classes.dialog, className)} >
                <div onClick={onClose} className={classes.closeWrapper}>
                    <img className={classes.closeIcon} src={closeIcon} />
                </div>
                <div className={classes.title}>
                    {title}
                </div>
                <div className={classes.dialogBody}>
                    {children}
                </div>
                {
                    onConfirm && onClose && confirmButtonText && closeButtonText &&
                    <div className={classes.dialogButtons}>
                        <PrimaryButton variant="empty" className={classes.rightButton} onClick={onClose} text={closeButtonText} />
                        <PrimaryButton className={classes.leftButton} onClick={onConfirm} text={confirmButtonText} loading={loading} />
                    </div>
                }

            </div>);
    </div>)
}

export default Dialog;