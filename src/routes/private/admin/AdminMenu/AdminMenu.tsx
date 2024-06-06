import React, { useEffect, useRef, useState } from 'react'
import config from './configuration.json'
import Link from 'next/link'
import styles from './AdminMenu.module.css';
import { usePathname, useRouter } from 'next/navigation'
import { Modal } from '@/reusableComponents/Modal';
import { AppCookie } from '@/services/cookies';
import { useAppContext } from '@/statemanagement/appContext';
import Image from 'next/image';

export const AdminMenu = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { dispatch }: any = useAppContext();
  const [isShowModal, setIsShowModal] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState(pathName?.split('/')?.pop() || 'home')
  const [isMobileView, setIsMobileview] = useState(false)
  const [left, setLeft] = useState(-150)
  const intervalid: any = useRef();

  const fnResize = () => {
    clearInterval(intervalid.current)
    intervalid.current = setTimeout(() => {
      setIsMobileview(window?.innerWidth < 700)
    }, 500);
  }
  useEffect(() => {
    window.addEventListener("resize", fnResize)
    fnResize();
    return () => {
      window.removeEventListener("resize", fnResize);
    }
  }, [])
  const handleMenuClick = (eve: any) => {
    const { id } = eve.target;
    if (isMobileView) {
      setLeft(-150)
    }
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
  const handleMobileMenuBtnClick = () => {
    setLeft(left === 0 ? -150 : 0)
  }
  return (<>
    {isMobileView && <Image onClick={handleMobileMenuBtnClick} className={styles.mobileMenuBtn} src="/mobileMenu.png" alt="Mobie Menu" width={50} height={50} />}

    <div style={{ left }} className={`${isMobileView ? styles.mobileMenu : styles.menu}`}>
      {
        config.map(({ id, text, path }, index) => {
          return <Link className={activeMenuItem === id ? "active-menu" : ''} onClick={handleMenuClick} key={`Link_${index}`} href={`/admin/${path}`} id={id}>{text}</Link>
        })
      }
    </div>
    {isShowModal && <Modal modalActions={modalActions} />}

  </>

  )
}
