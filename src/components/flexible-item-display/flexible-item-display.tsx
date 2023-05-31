import {classNames} from '../../globalutility';
import styles from './flexible-item-display.module.scss';
import { FlexibleItem, FlexibleItemProps } from '../flexible-item/flexible-item';
import { sizedchunk_array} from './utility'
import { useEffect, useRef, useState } from 'preact/hooks';

export interface FlexibleItemDisplayProps {
    className?: string;
    items:FlexibleItemProps[]
}

export const FlexibleItemDisplay = ({ className, items }: FlexibleItemDisplayProps) => {
    const [chunked_items, change_chunked_items] = useState<FlexibleItemProps[][]>([])
    const root_ref = useRef<HTMLDivElement | null>(null)
    const items_const = items
    const rearrange_timer = useRef(true);
    const resizeObserver = new ResizeObserver((entries) => {
        if (rearrange_timer.current)
        for (const entry of entries) {
                rearrange_timer.current = false
                //console.log("RESIZE");
                sizedchunk_array(JSON.parse(JSON.stringify(items_const)), 10, root_ref.current != null ? root_ref.current?.getBoundingClientRect().width : 500).then((chunk_array)=>{
                    //console.log(chunk_array);
                    
                    change_chunked_items(chunk_array)
                    setTimeout(function() {
                        rearrange_timer.current = true
                    }, 500);
                })
        }
    })
    useEffect(() => {
        if (root_ref.current != null)
        {
            console.log("EFFECT");
            resizeObserver.observe(root_ref.current)
            sizedchunk_array(JSON.parse(JSON.stringify(items_const)), 5, root_ref.current.offsetWidth).then((chunk_array)=>{
                change_chunked_items(chunk_array)
            })
        }
        else {}
    }, [])
    
    //console.log(chunked_items);
    
    return <div ref={root_ref} className={classNames(styles.root, className)}>
        {chunked_items.map((row, key) => {
            return <div key={key} className={classNames(styles.row, className)}>
                {row.map((item, key2) => <FlexibleItem
                    key={key2}
                    img_url={item.img_url}
                    title={item.title}
                    alt_img_urls={item.alt_img_urls}
                    price={item.price}
                    height={item.height}
                ></FlexibleItem>)}
            </div>
        })}
    </div>;
};
