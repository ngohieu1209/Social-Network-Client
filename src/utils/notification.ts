import { notification } from "antd";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

notification.config({
  placement: 'top'
})

export const openNotification = (type: NotificationType, title: string, description: string) => {
  notification[type]({
    message: title,
    description: description,
  })
}
