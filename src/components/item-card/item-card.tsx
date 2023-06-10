import {classNames} from '../../globalutility';
import styles from './item-card.module.scss';
// import { useState } from 'preact/hooks';
import stars from '../../assets/5_stars.png'
import stars_bg from '../../assets/5_stars_bg.png'


export interface ItemCardProps {
    className?: string;
    tags: string[];
    title: string;
    alt_titles: string[];
    short_description: string;
    description: string;
    price: number;
    rating: number; //number out of 5 stars
    image_urls: string[];
    height: string;
    width: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-item-cards-and-templates
 */
export const ItemCard = ({ short_description, width, height, className, tags, title, description, price, rating, image_urls }: ItemCardProps) => {
    //const [current_image, change_current_image] = useState(0)
    tags
    description
    const current_image = 0
    return <div className={classNames(styles.root, className)} style={{height:height, width:width}}>
        <div className={classNames(styles.toproot)}>
            <div className={classNames(styles.boxshadow)}>
            </div>
            <div className={classNames(styles.titlebar)}>
                <div className={classNames(styles.title)}>{title}</div>
                <div className={classNames(styles.price)}>${price}</div>
            </div>
            <img loading={"lazy"} src={image_urls[current_image]} className={classNames(styles.currentimage)}/>
        </div>
        <div className={classNames(styles.bottomroot, className)}>
            <div className={classNames(styles.ratingroot)}>
                <img src={stars_bg} title={`${rating}/5`} className={classNames(styles.ratingbg)}/>
                <div className={classNames(styles.starsroot)} style={{width:`calc(130px / ${5/rating})`}}>
                    <img src={stars} title={`${rating}/5`} className={classNames(styles.rating)}/>
                </div>
                <div>{rating}/5</div>
            </div>
            {short_description}
        </div>
    </div>;
};
