import React, { useEffect, useState } from 'react';
import Card from "app/components/card/card.component";
import PrimaryButton from "app/components/primary-button/primary-button.component";
import PromotionsResponseSModel from 'app/models/server-models/promotionsResponse.smodel';
import TableColumnVM from 'app/models/vms/table-column.vm';
import Table from 'app/components/table/table.component';
import PromotionVM from 'app/models/vms/promotion.vm';
import emptyStateImg from '../../images/empty-state.png'
import * as classNames from 'classnames';
import PromotionEditDialog from './components/promotion-edit-dialog/promotion-edit-dialog.component';
import ColumnSortDialog from './components/column-sort-dialog/column-sort-dialog.component';
import SortableItemVM from 'app/models/vms/sortable-item.vm'
import { bulkDeletePromotionsRequest, deletePromotionRequest, duplicatePromotionRequest, editPromotionRequest, generatePromotionsRequest, getPromotionsRequest } from 'app/network/requests';
import { AxiosResponse } from 'axios';
import { DEFAULT_TABLE_LIMIT } from 'app/constants/local-related';
import PromotionDTO from 'app/models/dtos/promotion.dto';
import classes from './promotions-page.module.scss';
import trashIcon from 'app/images/trash.png';
import { createPromotionsVM, createPromotionVM } from 'app/utils';
import PromotionSModel from 'app/models/server-models/promotion.smodel';
import PromotionTypeView from './components/promotion-type-view/promotion-type-view.component';
import ActionMenu from 'app/components/action-menu/action-menu.componet';


const columns : Array<TableColumnVM> = [
    {
        key: "name",
        type: "string",
        label: "Name",
    },
    {
        key: "type",
        type: "string",
        label: "Type",
        cellRenderer: (item: PromotionVM) => <PromotionTypeView type={item.type}/>
    },
    {
        key: "startDate",
        type: "string",
        label: "Start Date",
    },
    {
        key: "endDate",
        type: "string",
        label: "End Date",
    },
    {
        key: "userGroupName",
        type: "string",
        label: "User Group Name",
    }
]

const EmptyState = () => {
    return (
        <div className={classes.emptyStateWrapper}>
            <img src={emptyStateImg} className={classes.emptyStateImage}/>
            <div className={classes.textWrapper}>
                <div className={classes.title}>
                    Oh no!
                </div>
                <div className={classes.description}>
                    There are no promotions. Would you like to generate some ?
                </div>
            </div>
        </div>
    )
}


const PromotionsPage = (props : {}) => {
    const [promotions, setPromotions] = useState<Array<PromotionVM>>([])
    const [offset, setOffset] = useState<number>(0)
    const [checkedArray, setCheckedArray] = useState<Array<number>>([])
    const [isSettingColumnOrder, setIsSettingColumnOrder] = useState<boolean>(false)
    const [columnOrder, setColumnOrder] = useState<Array<SortableItemVM>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isEditingPromtoions, setIsEditingPromotion] = useState<boolean>(false)
    const [isGeneratingPromotions, setIsGeneratingPromotions] = useState<boolean>(false)
    const [promotionEdited, setPromotionEdited] = useState<PromotionVM | undefined>(undefined)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const columnOrder : string | null = localStorage.getItem("columnOrder")
        getPromotions()
        if(!!columnOrder) {
            setSortingBasedOnColumns(JSON.parse(columnOrder).map((columnKey: string) => columns.find(column => column.key === columnKey)!))
        } else {
            setSortingBasedOnColumns(columns)
        }
    },[])
    useEffect(() => {
        getPromotions()
    },[offset])

    const handleSortingOrder = (newOrder: Array<SortableItemVM>) => {
        localStorage.setItem("columnOrder", JSON.stringify(newOrder.map(order => order.id)))
        setColumnOrder(newOrder)
    }
    const setSortingBasedOnColumns = (columns : Array<TableColumnVM>) => {
        // @ts-ignore
        setColumnOrder(columns.map((column: TableColumnVM) => ({id: column.key, name: column.label})))
    }
    const handleDelete = async ({id} : PromotionVM) => {
        try {
            await deletePromotionRequest(id)
            const newPromotions = promotions.filter(item => item.id !== id)
            setTotal(total - 1)
            setPromotions(newPromotions);
        } catch (e) {
            
        }
    }
    const handleDuplicate = async ({id} : PromotionVM) => {
        try {
            const response : AxiosResponse<PromotionSModel> = await duplicatePromotionRequest(id)
            const duplicatedPromotion : PromotionSModel = response.data;
            const newTotal = total + 1;
            const promotionVm : PromotionVM = createPromotionVM(duplicatedPromotion)
            if(offset + DEFAULT_TABLE_LIMIT > newTotal &&  newTotal > offset) { // In last page
                setPromotions([...promotions, promotionVm])
            }
            setTotal(total + 1)
        } catch (e) {
            
        }
    }
    const getPromotionChanges = (oldPromotion: PromotionVM, newPromotion: PromotionVM) : PromotionDTO =>  {
        const promotionDto : PromotionDTO = {}
        if(oldPromotion.name !== newPromotion.name) {
            promotionDto['name'] =newPromotion.name;
        }
        if(oldPromotion.userGroupName !== newPromotion.userGroupName) {
            promotionDto['userGroupName'] = newPromotion.userGroupName;
        }
        if(oldPromotion.type !== newPromotion.type) {
            promotionDto['type'] = newPromotion.type.toString();
        }
        if(oldPromotion.startDate !== newPromotion.startDate) {
            promotionDto['startDate'] = newPromotion.startDate;
        }
        if(oldPromotion.endDate !== newPromotion.endDate) {
            promotionDto['endDate'] = newPromotion.endDate;
        }
        return promotionDto;
    }
    const handleDeleteAll = async () => {
        try {
            const ids = checkedArray.map(itemIndex => promotions[itemIndex].id)
            await bulkDeletePromotionsRequest(ids)
            const newPromotions = promotions.filter((item, index) => !checkedArray.includes(index) )
            const newCheckedArray = checkedArray.filter(itemIndex => !checkedArray.includes(itemIndex) )
            setCheckedArray(newCheckedArray)
            setPromotions(newPromotions)
            setTotal(total - checkedArray.length)

        } catch (e) {

        }
    }
    const handleEditRequested = async (editedPromotion : PromotionVM) => {
        const oldPromotion : PromotionVM | undefined = promotions.find(oldPromotion => oldPromotion.id === editedPromotion.id)
        const { id } = editedPromotion;
        const promotionDto : PromotionDTO = getPromotionChanges(oldPromotion!, editedPromotion);
        try {
            setIsEditingPromotion(true)
            await editPromotionRequest(id, promotionDto)
            const newPromotions = promotions.map(item => item.id === id ? (editedPromotion) : item)
            setPromotions(newPromotions);
            setPromotionEdited(undefined)
        } catch (e) {
        } finally {
            setIsEditingPromotion(false)
        }
    }
    const handleEdit = (promotion : PromotionVM) => {
        setPromotionEdited(promotion)
    }
    const actions = [
        {
            key: 'edit',
            label: "Edit"
        },
        {
            key: 'delete',
            label: "Delete"
        },
        {
            key: 'duplicate',
            label: "Duplicate"
        },
    ]
    const generateData = async () => {
        setIsGeneratingPromotions(true)
        await generatePromotionsRequest()
        setIsGeneratingPromotions(false)
        getPromotions()

    }
    const getPromotions = async () => {
        setLoading(true)
        const response : AxiosResponse<PromotionsResponseSModel> = await getPromotionsRequest({offset, limit: DEFAULT_TABLE_LIMIT})
        const promotionsData = response.data;
        const { total: newTotal, promotions: newPromotions} = promotionsData
        const promotionsVms: Array<PromotionVM> = createPromotionsVM(newPromotions)
        setLoading(false)
        setPromotions([...promotions,...promotionsVms])
        setTotal(newTotal)
    }
    const handleAction = (item: any, key: string) => {
        switch(key) {
            case 'edit':
                handleEdit(item as PromotionVM)
                break;
            case 'delete':
                handleDelete(item as PromotionVM)
                break;
            case 'duplicate':
                handleDuplicate(item as PromotionVM)
                break;
            default:
                
        }
    }
    const handleCloseEditModal = () => {
        setPromotionEdited(undefined)
    }
    const sortColumns = (a: TableColumnVM, b: TableColumnVM)  => {
        const aFound = columnOrder.find((order: SortableItemVM) => a.key === order.id.toString())
        const bFound = columnOrder.find((order: SortableItemVM) => b.key === order.id.toString())
        if(columnOrder.indexOf(aFound!) > columnOrder.indexOf(bFound!)) {
            return 1
        } else {
            return -1;
        }

    }
    const handleBottomReached = () => {
        if(total > offset + DEFAULT_TABLE_LIMIT) { // If there are more items to pull
            setOffset(offset + DEFAULT_TABLE_LIMIT)
        }
    }
    const handleRowSelected = (index: number) => {
        const indexOfCheckedItem = checkedArray.indexOf(index)
        let newCheckedArray = [...checkedArray]
        if(indexOfCheckedItem === -1) {
            newCheckedArray.push(index)
        } else {
            newCheckedArray.splice(indexOfCheckedItem, 1)
        }
        setCheckedArray(newCheckedArray)
    }
    const isShowingEmptyState = !loading && !promotions.length
    const sortedColumn = columns.sort(sortColumns)
    return (
        <div className={classes.mainGrid}>
            <ActionMenu open={checkedArray.length > 0} >
                <div className={classes.trashIconButton}>
                    <img src={trashIcon} onClick={handleDeleteAll} className={classes.trashIcon}/>
                </div>
            </ActionMenu>
            {
                columnOrder.length &&
                <ColumnSortDialog 
                    columnOrder={columnOrder} 
                    onListChanged={handleSortingOrder} 
                    onClose={ () => setIsSettingColumnOrder(false)} 
                    visible={isSettingColumnOrder} 
                />
            }
            {
                !!promotionEdited &&
                <PromotionEditDialog
                    promotion={promotionEdited!} 
                    visible={!!promotionEdited} 
                    onDone={handleEditRequested} 
                    onClose={handleCloseEditModal}
                    loading={isEditingPromtoions}
                />
            }
            <Card className={classNames(classes.card, { [classes.small]: isShowingEmptyState})}>
                {
                    !isShowingEmptyState
                    ? <Table
                        onRowSelected={handleRowSelected}
                        checked={checkedArray}
                        loading={loading}
                        onScrolledToBottom={handleBottomReached}
                        onSortColumns={() => setIsSettingColumnOrder(true)} 
                        actions={actions} onMenuItemClicked={handleAction} 
                        columns={sortedColumn} 
                        total={total} 
                        items={promotions}
                    />
                    : <div className={classes.noPromotionsWrapper}>
                        <EmptyState />
                        <PrimaryButton
                            className={classes.button}
                            text={"Generate promotions"}
                            loading={isGeneratingPromotions}
                            onClick={generateData}
                        />
                    </div>
                }
            </Card> 
        </div>
    );

}

export default PromotionsPage;