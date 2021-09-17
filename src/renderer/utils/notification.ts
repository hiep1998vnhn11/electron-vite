interface DesktopMsgProps {
  title: string
  body: string
  icon?: string
}

export function DesktopMsg(option: DesktopMsgProps): Promise<boolean> {
  const msgfunc = new window.Notification(option.title, option)
  return new Promise((resolve) => {
    msgfunc.onclick = () => {
      resolve(true)
    }
  })
}
