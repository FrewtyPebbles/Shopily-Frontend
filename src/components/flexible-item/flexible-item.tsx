import {classNames} from '../../globalutility';
import styles from './flexible-item.module.scss';
import { useEffect, useRef, useState } from 'preact/hooks';

export interface FlexibleItemProps {
    className?: string;
    height?:number;
    img_url:string;
    alt_img_urls:string[];
    title:string;
    price:number;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-flexible-items-and-templates
 */
export const FlexibleItem = ({ className, img_url, alt_img_urls, title, price, height }: FlexibleItemProps) => {
    const root_ref = useRef<HTMLDivElement | null>(null)
    const [root_element_width, change_root_element_width] = useState<string>("")
    const title_ref = useRef<HTMLDivElement | null>(null)
    const title_size = useRef(15)
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            let elem_width = root_ref.current?.getBoundingClientRect().width
            let elem_height = root_ref.current?.getBoundingClientRect().height
            let font_size = 15 * ((((elem_width as number)/(elem_height as number)) + ((elem_height as number)/(elem_width as number)))/2)
            title_size.current = font_size
            change_root_element_width(root_ref.current == null ? "": `${elem_width}px`)
        }
    })
    useEffect(() => {
        if (root_ref.current != null)
        {
            resizeObserver.observe(root_ref.current)
            change_root_element_width(root_ref.current == null ? "": `${root_ref.current?.getBoundingClientRect().width}px`)
        }
        else {}
    }, [root_ref.current, title_ref.current])
    return <div ref={root_ref} style={{height:height}} className={classNames(styles.root, className)}>
        <div style={{width:root_element_width}} className={classNames(styles.boxshadow, className)}></div>
        <div ref={title_ref} style={{width:root_element_width, fontSize:`${title_size.current}px`}} className={classNames(styles.title, className)}><span>{title}</span><span className={classNames(styles.price, className)}>{price}</span></div>
        <img className={classNames(styles.image, className)} src={img_url} alt="" />
    </div>;
};
