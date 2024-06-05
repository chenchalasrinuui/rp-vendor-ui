import React, { useState } from 'react'
import config from './configuration.json'
import Link from 'next/link'
import styles from './AdminMenu.module.css';
import { usePathname, useRouter } from 'next/navigation'
import { Modal } from '@/reusableComponents/Modal';
import { AppCookie } from '@/services/cookies';
import { useAppContext } from '@/statemanagement/appContext';

export const AdminMenu = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { dispatch }: any = useAppContext();
  const [isShowModal, setIsShowModal] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState(pathName?.split('/')?.pop() || 'home')
  const handleMenuClick = (eve: any) => {
    const { id } = eve.target;
    if (id === 'logout') {
      eve.preventDefault();
      setIsShowModal(true);
    } else {
      setActiveMenuItem(id)
    }
  }
  const modalActions = (action: string) => {
    if (action === 'C') {
      setIsShowModal(false)
    } else {
      dispatch({
        type: "LOGIN",
        payload: {
          isLoggedIn: false,
          role: '',
          uid: ''
        }
      })
      setIsShowModal(false);
      AppCookie.clear();
      router.push("/")
    }
  }
  return (
    <div className={styles.menu}>
      {
        config.map(({ id, text, path }, index) => {
          return <Link className={activeMenuItem === id ? "active-menu" : ''} onClick={handleMenuClick} key={`Link_${index}`} href={`/admin/${path}`} id={id}>{text}</Link>
        })
      }
      {isShowModal && <Modal modalActions={modalActions} />}
    </div>
  )
}
