import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

export const HiveContext = React.createContext({})

export const HiveProvider = ({ children }) => {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
        getDataEndpoint
      }
    }
  `)
  const [hive, setHive] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchHive = async () => {
    setLoading(true)

    const hive = await fetch(coreData.getDataEndpoint, {
      method: "POST",
      body: JSON.stringify({
        hivePublicKey: coreData.hivePublicKey,
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
