import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// TODO: de-hardcode these
const dataBridgeGetDataUrl = "http://localhost:8787/getData"
const hivePublicKey = "Bejij2geEMQwQRDRR/SArTKlvO8XqKO5zBeu7ZZODTw="

export const HiveContext = React.createContext({})

export const HiveProvider = ({ children }) => {
  const [hive, setHive] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchHive = async () => {
    setLoading(true)

    const hive = await fetch(dataBridgeGetDataUrl, {
      method: "POST",
      body: JSON.stringify({
        hivePublicKey,
        collectionId: "hummHive",
        dataId: "default",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json())

    setHive(hive.public)
    localStorage.setItem("cached-hive", JSON.stringify(hive.public))

    setLoading(false)
  }

  useEffect(() => {
    const cachedHive = localStorage.getItem("cached-hive")
    if (cachedHive) setHive(JSON.parse(cachedHive))

    fetchHive()
  }, [])

  return (
    <HiveContext.Provider value={{ loading, hive }}>
      {children}
    </HiveContext.Provider>
  )
}

HiveProvider.propTypes = {
  children: PropTypes.any,
}
