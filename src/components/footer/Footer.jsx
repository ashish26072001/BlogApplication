import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.container}>
        <div>©2024 Blog. All rights reserved.</div>
        <div className={styles.social}>
            <Image src='/1.png' width={15} height={15} alt='image'className={styles.icon}></Image>
            <Image src='/2.png' width={15} height={15} alt='image'className={styles.icon}></Image>
            <Image src='/3.png' width={15} height={15} alt='image'className={styles.icon}></Image>
            <Image src='/4.png' width={15} height={15} alt='image'className={styles.icon}></Image>
        </div>
    </div>
  )
}

export default Footer