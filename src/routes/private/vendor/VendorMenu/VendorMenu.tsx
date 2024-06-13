import React from 'react'
import config from './configuration.json'
import { Menu } from '@/reusableComponents/Menu'
export const VendorMenu = () => {
    return <Menu config={config} role="vendor" />
}
