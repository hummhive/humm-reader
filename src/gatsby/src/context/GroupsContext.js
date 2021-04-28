import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

export const GroupsContext = React.createContext({})

export const GroupsProvider = ({ children }) => {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
        getDataEndpoint
      }
    }
  `)
  const [groups, setGroups] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchGroups = async () => {
    setLoading(true)

    const groups = await fetch(
      `${coreData.getDataEndpoint}?hivePublicKey=${encodeURIComponent(
        coreData.hivePublicKey
      )}&path=hummhive,groups`,
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

    setGroups(groups)
    setLoading(false)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <GroupsContext.Provider value={{ loading, groups }}>
      {children}
    </GroupsContext.Provider>
  )
}

GroupsProvider.propTypes = {
  children: PropTypes.any,
}
