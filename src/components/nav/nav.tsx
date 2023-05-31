import { classNames } from '../../globalutility';
import styles from './nav.module.scss';
import { useState } from 'preact/hooks';
import React from 'preact/compat';


interface Page {
    page: string;
    call: () => any;
    icon: string;
}

export interface NavProps {
    className?: string;
    pages: Page[];
    options: { darkmode: boolean };
    currentpage: string;
    title: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-navs-and-templates
 */
export const Nav = ({ className, pages, options, currentpage, title }: NavProps) => {
    const [isOpen, toggleOpen] = useState(false);

    function toggle_hamburger() {
        toggleOpen(!isOpen);
    }
    return (
        <nav className={classNames(styles.root, className)}>
            <div className={styles.barroot} style={!isOpen ? {borderStyle: "none none solid none", borderWidth: "2px", borderColor: "#7d7d7d"} : {}}>
                {isOpen ?<div className={styles.NavBarItem}> {title}</div>  : <div></div>}
                {isOpen ? (
                    <div className={styles.hamburger} onClick={toggle_hamburger}>
                        <div
                            className={classNames(
                                styles.hamburger_close_line,
                                styles.hamburger_close_line_top
                            )}
                        />
                        <div className={styles.hamburger_close_line_bottom} />
                    </div>
                ) : (
                    <div className={styles.hamburger} onClick={toggle_hamburger}>
                        <div className={styles.hamburger_line_top} />
                        <div className={styles.hamburger_line_bottom} />
                    </div>
                )}
            </div>
            {isOpen ? (
                <div className={styles.menuroot} style={{borderStyle: "none none solid none", borderWidth: "2px", borderColor: "#7d7d7d"}}>
                    <ul className={styles.menu}>
                        {pages.map((data, key) => (
                            <li
                                style={
                                    { '--background-color': currentpage == data.page ? "#f2f2f2" : "none" } as React.CSSProperties
                                }
                                key={key}
                                onClick={() => {
                                    toggle_hamburger();
                                    data.call();
                                }}
                                className={styles.page}
                            >
                                {data.page}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </nav>
    );
};
