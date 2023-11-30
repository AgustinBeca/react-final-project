import React, { useEffect, useState } from "react";
import AddTask from "../components/Tasks/AddTask";
import TasksList from "../components/Tasks/TasksList";
import appfirebase from "../Credenciales";
import { getAuth } from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useDatabase } from "../Contexts/DbContext";

function ToDo() {
    const [tasksList, setTasksList] = useState([]);
    const [updating, setUpdating] = useState(false);
    const auth = getAuth(appfirebase);
    const db = useDatabase();
    const q = query(
        collection(db, "tasks"),
        where("user_id", "==", auth.currentUser.uid)
    );

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(q);
            setTasksList(
                querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        };
        fetchData();
    }, [updating]);

    async function addTaskHandler(taskName, taskDescription, taskDate) {
        await addDoc(collection(db, "tasks"), {
            completed: false,
            description: taskDescription,
            due_date: taskDate,
            title: taskName,
            user_id: auth.currentUser.uid,
        });
        setUpdating(!updating);
    }

    async function changeStatusHandler(id, status) {
        await updateDoc(doc(db, "tasks", id), {
            completed: !status,
        });
        setUpdating(!updating);
    }

    async function deleteTaskHandler(id) {
        await deleteDoc(doc(db, "tasks", id));
        setUpdating(!updating);
    }

    async function editTaskHandler(
        taskName,
        taskDescription,
        taskDate,
        taskId
    ) {
        await updateDoc(doc(db, "tasks", taskId), {
            title: taskName,
            description: taskDescription,
            due_date: taskDate,
        });
        setUpdating(!updating);
    }

    return (
        <>
            <AddTask onAddTask={addTaskHandler} />
            <TasksList
                tasks={tasksList}
                changeStatus={changeStatusHandler}
                deleteTask={deleteTaskHandler}
                editTask={editTaskHandler}
            />
        </>
    );
}

export default ToDo;
