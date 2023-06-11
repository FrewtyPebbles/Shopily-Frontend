import {classNames} from '../../globalutility';
import styles from './categories-page.module.scss';
import { FlexibleItemDisplay } from '../flexible-item-display/flexible-item-display';
import { FlexibleItemProps } from '../flexible-item/flexible-item';
import { useState } from 'react';

export interface CategoriesPageProps {
    className?: string;
    items: FlexibleItemProps[];
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-categories-pages-and-templates
 */
export const CategoriesPage = ({ className, items }: CategoriesPageProps) => {
    const [search_open, change_search_open] = useState(true)
    return <div className={classNames(styles.root, className)}>
        <h1>Catalogue</h1>
        {!window.matchMedia("(pointer:coarse)").matches ? 
        // PC
        <div className={classNames(styles.displayroot, className)}>
            {search_open ? 
            <div className={classNames(styles.searchroot, styles.searchrootopen, className)}>
                {/* VERTICAL SEARCH BAR */}
                <div onClick={() => {change_search_open(!search_open)}} className={classNames(styles.searchtitle, className)}>
                    <div>Search</div>
                    <div>-</div>
                </div>

                <input type="text" />

                {/* VERTICAL SEARCH BAR END */}
            </div>
            :
            <div className={classNames(styles.searchroot, styles.searchrootclosed, className)}>
                <div onClick={() => {change_search_open(!search_open)}}>
                    <div>+</div>
                </div>
            </div>}
            <div className={classNames(styles.itemdisplayroot, search_open ? styles.itemdisplayrootopen : styles.itemdisplayrootclosed, className)}>
                <FlexibleItemDisplay items={items}></FlexibleItemDisplay>
            </div>
        </div>
        : // MOBILE
        <div>
            <div className={classNames(styles.itemdisplayroot, className)}>
                <FlexibleItemDisplay items={items}></FlexibleItemDisplay>
            </div>
        </div>}
    </div>;
};
