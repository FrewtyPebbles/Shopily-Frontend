import {classNames} from '../../globalutility';
import styles from './feature-page.module.scss';
import { ItemCard } from '../item-card/item-card';
import { useRef, useState } from 'preact/hooks';
import { mouse_over_featured, touch_move_featured } from './utility';
import { FlexibleItemDisplay } from '../flexible-item-display/flexible-item-display';
import { FlexibleItemProps } from '../flexible-item/flexible-item';
import { ItemCardProps } from '../item-card/item-card';

export interface FeaturePageProps {
    className?: string;
    newreleases: FlexibleItemProps[]
    featureditems: ItemCardProps[]
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-feature-pages-and-templates
 */

export const FeaturePage = ({ className, newreleases, featureditems }: FeaturePageProps) => {
    let feature_num_width = 300
    let feature_width = `${feature_num_width}px`
    let feature_height = "300px"
    const touch_last = useRef<[number, number]>([0,0])
    return <div className={classNames(styles.root, className)}>
        <h1 style={{textAlign: "center"}}>SHOPILY</h1>
        <p className={classNames(styles.smalltitle)}>for you</p>
        <hr />
        <div className={classNames(styles.ForYou)}
            onMouseMoveCapture={(event:MouseEvent) => mouse_over_featured(event, featureditems.length, feature_num_width)}
            onTouchMove={(event:TouchEvent) => {
                touch_move_featured(event, touch_last.current, featureditems.length, feature_num_width)
                touch_last.current = [event.touches[0].clientX, event.touches[0].clientY];
            }}>
            {featureditems.map((feature, key) => <ItemCard
                key={key}
                title={feature.title}
                price={feature.price}
                image_urls={feature.image_urls}
                alt_titles={feature.alt_titles}
                short_description={feature.short_description}
                description={feature.description}
                rating={feature.rating}
                width={feature.width}
                height={feature.height}
                tags={feature.tags}
            />)}
        </div>
        <hr />
        <p className={classNames(styles.centered)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, aspernatur saepe odio delectus quidem ipsa adipisci repellat? Cumque culpa eligendi necessitatibus commodi a. Repellendus praesentium, sapiente inventore temporibus laboriosam sunt.
        </p>
        <p className={classNames(styles.smalltitle)}>new releases</p>
        <hr />
        <div>
            <FlexibleItemDisplay items={newreleases}></FlexibleItemDisplay>
        </div>
    </div>;
};
