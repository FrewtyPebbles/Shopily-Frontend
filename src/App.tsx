import styles from './App.module.scss';
import { Nav } from './components/nav/nav';
import { FeaturePage } from './components/feature-page/feature-page';
import { test_featurepage_featured_items, test_featurepage_releases } from './testdata';
import { useEffect } from 'react';
import { CategoriesPage } from './components/categories-page/categories-page';

export interface AppProps {
    current_page: string
}

function App({current_page}:AppProps) {
    
    useEffect(() => {
        document.title = 'Shopily';
    }, []);

    return (
        <div className={styles.App}>
            <Nav
                title='SHOPILY'
                currentpage={current_page}
                pages={[
                    {
                        page: 'Feature',
                        call: () => {
                            window.location.href = "/"
                        },
                        icon: ""
                    },
                    {
                        page: 'Categories',
                        call: () => {
                            window.location.href = "/categories"
                        },
                        icon: '',
                    },
                    {
                        page: 'About',
                        call: () => {
                            window.location.href = "/about"
                        },
                        icon: '',
                    },
                ]}
                options={{ darkmode: false }}
            />
            {
                (()=>{
                    switch (current_page) {
                        case 'Feature':
                            return <>
                            <FeaturePage newreleases={test_featurepage_releases} featureditems={test_featurepage_featured_items}></FeaturePage>
                            </>
                    
                        case 'Categories':
                            return <>
                            <CategoriesPage items={test_featurepage_releases}></CategoriesPage>
                            </>
                        
                        case "About":
                            return <>
                            
                            </>
                        default:
                            break;
                    }
                    return <></>
                })()
            }
            
        </div>
    );
}

export default App;
