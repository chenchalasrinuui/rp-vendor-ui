import React from 'react'
import config from './configuration.json'
import Link from 'next/link'
export const VendorMenu = () => {
    return (
        <div>
            {
                config.map(({ id, text, path }) => {
                    return <Link href={`/vendor/${path}`} id={id}>{text}</Link>
                })
            }
        </div>
    )
}
