'use client'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import DismissButton from './DismissButton'

type AlertProps = {
    message: string | undefined,
    token: string | undefined,
    level: string
}

const Alert = (props: AlertProps) => {
    const searchParams = useSearchParams()
    const token = searchParams?.get('_fmt')
    const pathname = usePathname()

    return (
        <>
            {props.message && props.token && props.token === token ? (
                <div className='container m-4 mb-8'>
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{props.message}</span>
                        <DismissButton pathname={pathname} />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Alert