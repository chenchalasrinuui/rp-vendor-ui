import React, { useEffect, useRef, useState } from 'react'
import config from './configuration.json'
import { Menu } from '@/reusableComponents/Menu';

export const AdminMenu = () => {


  return (<>
    <Menu config={config} role="admin" />

  </>

  )
}
