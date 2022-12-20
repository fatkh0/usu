import * as React from "react";
import { connect } from "react-redux";
import { TState } from "../../../redux/store";
import { getIsLoading } from "../../../utils/selectors";
import * as styles from './preloader.module.scss';

interface IOwnProps {}

const Preloader: React.FC<IStateProps> =({isLoading}) => {
  return isLoading ? (
        <div className={styles.preloader}>
          Loading ...
        </div>
    ) : null
}

interface IStateProps {
  isLoading: boolean
}

const mapStateToProps = (state: TState): IStateProps => ({
  isLoading: getIsLoading(state)
})


interface IDispatchProps {}

export default connect <IStateProps, IDispatchProps, IOwnProps, TState> (mapStateToProps, {}) (React.memo(Preloader))
