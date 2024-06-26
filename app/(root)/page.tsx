import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'

import React from 'react'


const Home = async () => {

    const loggedIn = await getLoggedInUser()

    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type='greeting'
                        title='Welcome'
                        user={loggedIn?.name}
                        subtext='Access and manage your account and transctions efficiently' />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35} />
                </header>
                Recent Transactions
            </div>
            <RightSideBar user={loggedIn} transactions={[]} banks={[{}, {}]} />
        </section>
    )
}

export default Home