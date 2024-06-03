import React from 'react'
import config from './configuration.json'
import Link from 'next/link'
export const AdminMenu = () => {
  return (
    <div>
      {
        config.map(({ id, text, path }) => {
          return <Link href={`/admin/${path}`} id={id}>{text}</Link>
        })
      }
    </div>
  )
}
