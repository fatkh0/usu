import * as React from "react";
import Preloader from "../component/atom/preloader/Preloader";


const withSuspense = (Component: typeof React.Component): React.ReactNode => {
  return (props: any) => {
    return (
      <React.Suspense fallback={<Preloader/>} >
        <Component {...props} />
      </React.Suspense>
  )
  }
}

export default withSuspense