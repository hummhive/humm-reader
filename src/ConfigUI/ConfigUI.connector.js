import { useQuery, useReactiveVar } from "@apollo/client"
import propsMapper from "../utils/propsMapper"
import ConfigUI from "./ConfigUI"
import packageJson from "../../package.json"
import { parseDomain } from "parse-domain"
import { useAPI } from "@hummhive/api-react-utils"
import {
  activeHiveIDVar,
  taskQueueVar,
  apolloOperationsVar,
} from "@hummhive/local-state"

const mapProps = () => {
  const { packageName, id } = packageJson.connectionDefinition
  const websiteGeneratorAPI = useAPI(
    Symbol.for("website-generator"),
    packageName
  )
  const connectionsAPI = useAPI(Symbol.for("connections"))
  const taskQueueAPI = useAPI(Symbol.for("task-queue"))
  const notificationsAPI = useAPI(Symbol.for("notifications"))

  const taskQueue = useReactiveVar(taskQueueVar)
  const { data: getHive } = useQuery(apolloOperationsVar().queries.GET_HIVE, {
    variables: { id: useReactiveVar(activeHiveIDVar) },
  })

  const hive = getHive && getHive.getHive
  const connectionConfig = hive && hive.connectionsConfig[id]

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
      await connectionsAPI.connect(hive.id, connectionDefinition)
      await connectionsAPI.updateConnectionConfig(hive.id, id, { domain })

      await websiteGeneratorAPI.build(hive.id)
    } catch (err) {
      notificationsAPI.add(err.message || err, "error")
    }
  }

  return {
    isConnecting: !!taskQueue.find(t => t.id === taskQueueConnectId),
    connect: addConnectToTaskQueue,
    existingDomain: connectionConfig && connectionConfig.domain,
  }
}

export default propsMapper(mapProps)(ConfigUI)
