import CreateUI from "./CreateUI"
import { PrismaClient } from '@prisma/client';
import EditUI from "./EditUI";
import DeleteUI from "./DeleteUI";
import prisma from '@/lib/prisma';

const Links = async (props: { linkInBioId: number }) => {

    const linkRecords = await prisma.links.findMany({
        where: {
            deleted: false,
            linkInBioId: props.linkInBioId
        }
    });

    return (
        <>
            <CreateUI linkInBioId={props.linkInBioId} />
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {linkRecords.map((linkRecord) => {
                            return <tr key={linkRecord.id} className="hover">
                                <th>{linkRecord.id}</th>
                                <td>{linkRecord.name}</td>
                                <td>{linkRecord.link}</td>
                                <td>
                                    <DeleteUI id={linkRecord.id} />
                                    <EditUI id={linkRecord.id} linkName={linkRecord.name} linkValue={linkRecord.link} />
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Links