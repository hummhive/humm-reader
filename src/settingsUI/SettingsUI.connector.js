import propsMapper from "../utils/propsMapper"
import SettingsUI from "./SettingsUI"
import packageJson from "../../package.json"

const mapProps = ({ useAPI, taskQueue, currentHive }) => {
  const websiteGeneratorAPI = useAPI(Symbol.for("website-generator"))
  const connectionsAPI = useAPI(Symbol.for("connections"))
  const taskQueueAPI = useAPI(Symbol.for("task-queue"))
  const notificationsAPI = useAPI(Symbol.for("notifications"))

  const taskQueueConnectId = `connect-humm-reader`

  const addConnectToTaskQueue = () => {
    taskQueueAPI.push(taskQueueConnectId, `Connecting humm Reader`, _connect)
  }

  const _connect = async () => {
    try {
      await connectionsAPI.connect(
        currentHive.id,
        packageJson.connectionDefinition
      )
      await websiteGeneratorAPI.build(currentHive.id)
    } catch (err) {
      notificationsAPI.add(err.message || err, "error")
    }
  }

  return {
    isConnecting: !!taskQueue.find(t => t.id === taskQueueConnectId),
    connect: addConnectToTaskQueue,
  }
}

export default propsMapper(mapProps)(SettingsUI)
