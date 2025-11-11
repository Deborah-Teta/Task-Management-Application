"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Task } from "./types/Task";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (user) {
      const q = query(collection(db, "tasks"), where("userEmail", "==", user.email!));
      const snapshot = await getDocs(q);
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task)));
    }
  };

  const handleSubmit = async () => {
    if (user) {
      const taskData = { title, description, priority, completed: false, userEmail: user.email };
      if (editingId) {
        await updateDoc(doc(db, "tasks", editingId), taskData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "tasks"), taskData);
      }
      setTitle("");
      setDescription("");
      setPriority("Low");
      fetchTasks();
    }
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setEditingId(task.id);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await updateDoc(doc(db, "tasks", id), { completed: !completed });
    fetchTasks();
  };

  const handleLogOut = async () =>{
    try{
      await signOut(auth)
      alert('Logged out successfully')
      router.push('/Login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login");
    else fetchTasks();
  }, [user, loading]);

  if (loading || !user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Hello, {user.email}</h1>
      <button className="bg-red-500 text-white p-2 mb-4" onClick={handleLogOut}>Logout</button>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="mb-4">
        <input className="border p-2 w-full mb-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input className="border p-2 w-full mb-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <select className="border p-2 w-full mb-2" value={priority} onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button className="bg-green-500 text-white p-2 w-full" type="submit">{editingId ? "Update" : "Add"} Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mb-2 flex justify-between items-center">
            <div>
              <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id, task.completed)} />
              <span className={task.completed ? "line-through" : ""}> {task.title} - {task.description} ({task.priority})</span>
            </div>
            <div>
              <button className="text-blue-500 mr-2" onClick={() => handleEdit(task)}>Edit</button>
              <button className="text-red-500" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* <button onClick={handleLogOut} className="mt-4 text-sm px-4 py-2 text-blue-600"> signOut</button> */}
    </div>
  );
}