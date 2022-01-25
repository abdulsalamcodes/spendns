import React from 'react'
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-500 md:p-12
        bg-gradient-to-r from-sky-500 to-indigo-500">
            <div className={styles.loader}>Loading...</div>
        </div>
    )
}

export default Loader;
