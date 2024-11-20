import React from 'react';
import { TaskForm } from '../../form/TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";

function AddTask() {
    const [toastValue, setToast] = useState([]);
    const success = () => toast.success("Task cadastrada com sucesso");
    const [toastMsg, setMsg] = useState([]);
  
    useEffect(() => {
      if (toastValue === 1) {
          toast.success(toastMsg);
          setToast(0);
      }else if(toastValue === 2){
          toast.error(toastMsg);
          setToast(0);
      }
    }, [toastValue]);
    
    return (
      <section>
        <h1>Criar Tarefa</h1>
        <TaskForm btnText={"Criar"} setToast={setToast} setMsg={setMsg}></TaskForm>
        <ToastContainer></ToastContainer>
      </section>
    )
}

export default AddTask