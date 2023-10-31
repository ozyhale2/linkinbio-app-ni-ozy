import { getLinkInBio } from '../Functions';
import EditUI from '../EditUI';
import Links from './Links';
import Link from 'next/link';

const LinkInBioEditPage = async ({ params }: { params: { id: number } }) => {
    const linkInBio = await getLinkInBio(params.id);

    if (linkInBio) {
        return (
            <>
                <Link href="/admin/linkinbio" className='btn btn-accent btn-sm mb-8' type="button">Back</Link>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <EditUI id={linkInBio.id} name={linkInBio.name} description={linkInBio.description} />
                    </div>
                    <div className='col-span-2'>
                        <Links linkInBioId={linkInBio.id} />
                    </div>
                </div>
            </>
        )
    } else {
        throw new Error('Record does not exist: ' + params.id);
    }


}

export default LinkInBioEditPage