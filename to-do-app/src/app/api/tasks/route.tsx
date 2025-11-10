import {NextResponse} from 'next/server'
import {db} from  '../../lib/firebase'
import {doc, updateDoc, deleteDoc} from 'firebase/firestore'

export async function PUT(req:Request, context:{params:any}) {
    try{
        const {id} = await  context.params;
        if(!id){
            return NextResponse.json({error:"task Id is required"}, {status:400});
        }
        const body = await req.json();
        const taskRef =doc(db,'tasks',id);
        await updateDoc(taskRef,{...body, updateAt: new Date(),});
        return NextResponse.json({id, ...body});
    }catch (err){
        console.error("PUT /api/tasks/:id error:", err);
        return NextResponse.json({error: 'tailed to update task'}, {status:500});
    }
}

export async function DELETE(req:Request, context:{params:any}) {
    try{
        //Await params
        const {id} = await context.params;
        if(!id){
            return NextResponse.json({error:'task id is required'});
        }
        const taskRef = doc(db, 'tasks', id);
        await deleteDoc(taskRef);
        return NextResponse.json({message:'task deleted'});
    }catch(error){
        console.error('DELETE /api/tasks/:id error:', error);
        return NextResponse.json({error:'failed to delete task'}, {status:500});
    }
}