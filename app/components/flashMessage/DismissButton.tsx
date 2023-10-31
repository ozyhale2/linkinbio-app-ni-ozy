import { redirect } from 'next/navigation'
import { z } from 'zod'

const zCoerceStr = z.coerce.string();

const dismiss = (formData: FormData) => {
    const pathname = formData.get('pathname');
    redirect(zCoerceStr.parse(pathname), "push" as any)
}

const DismissButton = (props: { pathname: string | null }) => {
    return (
        <form className='object-right-top' action={dismiss}>
            <input type="hidden" name="pathname" value={props.pathname ? props.pathname : ''} />
            <button>x</button>
        </form>
    )
}

export default DismissButton