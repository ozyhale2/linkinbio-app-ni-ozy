'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation';
import { MessageLevel, setMessage } from '@/app/components/flashMessage/FlashMessage';
import prisma from '@/lib/prisma';

const zCoerceNum = z.coerce.number();
const zCoerceStr = z.coerce.string();

const addLink = async (data: FormData) => {
    const name = zCoerceStr.parse(data.get('name'))
    const linkValue = zCoerceStr.parse(data.get('link'))
    const linkInBioId = zCoerceNum.parse(data.get('linkInBioId'))

    const link = await prisma.links.create({
        data: {
            name: name,
            link: linkValue,
            linkInBioId: linkInBioId
        }
    });

    console.log('Link Added: ')
    console.log(link);

    const token = await setMessage('Successfully Added a Link', MessageLevel.Success);

    redirect('/admin/linkinbio/' + linkInBioId + '?_fmt=' + token, "push" as any)
}

const updateLink = async (data: FormData) => {
    const linkObject = await prisma.links.update({
        where: {
            id: zCoerceNum.parse(data.get('id')),
        },
        data: {
            name: zCoerceStr.parse(data.get('name')),
            link: zCoerceStr.parse(data.get('link'))
        },
    })

    console.log('Link Updated: ')
    console.log(linkObject);

    const level : number = MessageLevel.Success
    const token = await setMessage('Successfully Updated a Link', level);

    redirect('/admin/linkinbio/' + linkObject.linkInBioId + '?_fmt=' + token, "push" as any)
}

const deleteLink = async (id: number) => {
    const link = await prisma.links.update({
        where: {
            id: id,
        },
        data: {
            deleted: true
        },
    })

    console.log('Link deleted: ')
    console.log(link);

    const token = await setMessage('Successfully Deleted a Link in Bio', MessageLevel.Success);

    redirect('/admin/linkinbio/' + link.linkInBioId + '?_fmt=' + token, "push" as any)
}

export { addLink, updateLink, deleteLink }