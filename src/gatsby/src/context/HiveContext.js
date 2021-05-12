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

    const hive = await fetch(
      `${coreData.getDataEndpoint}?hivePublicKey=${encodeURIComponent(
        coreData.hivePublicKey
      )}&path=hummhive,hive`,
      { method: "GET" }
    ).then(async res => {
      if (!res.ok) {
        const err = await res.json()
        console.error(err)
        return null
      }
      const buffer = await res.arrayBuffer()
      const string = new TextDecoder().decode(buffer)

      return (string && JSON.parse(string)) || null
    })

    if (hive) {
      setHive(hive)
      localStorage.setItem("cached-hive", JSON.stringify(hive))
    }

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
