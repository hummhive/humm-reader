import { useQuery, useReactiveVar } from "@apollo/client"
import propsMapper from "../utils/propsMapper"
import SettingsUI from "./SettingsUI"
import packageJson from "../../package.json"
import { parseDomain } from "parse-domain"
import { useAPI } from "@hummhive/api-react-utils"
import { activeHiveIDVar, taskQueueVar } from "@hummhive/local-state"
import { GET_HIVE } from "graphql/constants"

const mapProps = () => {
  const { packageName } = packageJson.connectionDefinition
  const websiteGeneratorAPI = useAPI(
    Symbol.for("website-generator"),
    packageName
  )
  const connectionsAPI = useAPI(Symbol.for("connections"))
  const taskQueueAPI = useAPI(Symbol.for("task-queue"))
  const notificationsAPI = useAPI(Symbol.for("notifications"))

  const taskQueue = useReactiveVar(taskQueueVar)
  const { data: getHive } = useQuery(GET_HIVE, {
    variables: { id: useReactiveVar(activeHiveIDVar) },
  })

  const hive = getHive && getHive.getHive

  const settings =
    (hive &&
      connectionsAPI.getConnectionSettings(hive.connections, packageName)) ||
    {}

  const taskQueueConnectId = `connect-humm-reader`

  const addConnectToTaskQueue = domain => {
    if (!domain) {
      notificationsAPI.add("Please enter a domain", "error")
      return
    }
    const { subDomains } = parseDomain(domain)
    if (!subDomains || subDomains.length === 0) {
      notificationsAPI.add("Please enter a subdomain", "error")
      return
    }
    if (subDomains.find(element => element === "www")) {
      notificationsAPI.add("Please don't use www", "error")
      return
    }

    taskQueueAPI.push(
      taskQueueConnectId,
      `Connecting humm Reader`,
      _connect,
      domain
    )
  }

  const _connect = async domain => {
    try {
      const { connectionDefinition } = packageJson
      connectionDefinition.settings = {
        ...connectionDefinition.settings,
        domain,
      }

      await connectionsAPI.connect(hive.id, connectionDefinition)
      await websiteGeneratorAPI.build(hive.id)
    } catch (err) {
      notificationsAPI.add(err.message || err, "error")
    }
  }

  return {
    isConnecting: !!taskQueue.find(t => t.id === taskQueueConnectId),
    connect: addConnectToTaskQueue,
    existingDomain: settings.domain,
  }
}

export default propsMapper(mapProps)(SettingsUI)
