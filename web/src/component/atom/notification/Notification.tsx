import * as React from "react";
import { connect } from "react-redux";
import { TState } from "../../../redux/store";
import { getNotification } from "../../../utils/selectors";
import {INotifyMessage, action, notifyMessageType} from '../../../redux/app';
import * as styles from './notification.module.scss';
import * as classNames from "classnames";

interface IOwnProps {}

const Notification: React.FC<IStateProps & IDispatchProps> = ({notifications, removeNotify}) => {
  return (
    <div className={styles.notifications}>
      {
        notifications.map(notification => {

          setTimeout(() => {
            removeNotify(notification.id)
          }, 3000)

          return ( 
            <div className={classNames({
              [styles.notification]: true,
              [styles.success]: notification.type === notifyMessageType.success
            }) }>
              {notification.message}
            </div>
          )
        } )
      }
    </div>
  ) 
        
}

interface IStateProps {
  notifications: Array<INotifyMessage>
}

const mapStateToProps = (state: TState): IStateProps => ({
  notifications: getNotification(state)
})

interface IDispatchProps {
  removeNotify: (id: number) => void
}

export default connect <IStateProps, IDispatchProps, IOwnProps, TState> (mapStateToProps, {
  removeNotify: action.removeNotify
}) (React.memo(Notification))
