import * as React from 'react'
import { IPageRoute } from '../../../types/types'
import { Route, Routes } from "react-router";
import withSuspense from '../../../hoc/withSuspense';
import Content from '../../organism/content/Content';

interface IProps {
    pageRoutes: Array<IPageRoute>
}

const PageRoutes: React.FC<IProps> = ({pageRoutes}) => {
    return (
        <Content>
            <Routes>
                {
                    pageRoutes.map(pageRoute => {
                        const Page = withSuspense(pageRoute.component)

                        return  <Route key={pageRoute.path}
                                    path={pageRoute.path}
                                    element={<Page />}
                                    />                   
                    })
                }
            </Routes>
        </Content>
        
    )   
}

export default React.memo(PageRoutes)