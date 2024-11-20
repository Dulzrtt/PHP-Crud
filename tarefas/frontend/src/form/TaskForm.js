import React from 'react'
import api from '../utils/api'
import { useEffect, useState } from "react"
import styles from './Form.module.css'

export const TaskForm = ({btnText, taskEdit, closeModal, reloadTasks, setToast, setMsg}) => {
    const [task, setTask] = useState({
        titulo: '',
        descricao: '',
        situacao: '',
        categoria_id: '',
        data_limite: '',
    })
  
    useEffect(() => {
        if(taskEdit) {
            setTask({
                titulo: taskEdit.titulo || '', 
                descricao: taskEdit.descricao || '',
                situacao: taskEdit.situacao || '',
                categoria_id: taskEdit.categoria_id || '',
                data_limite: taskEdit.data_limite || ''
            });
            setTask(prevTask => ({
                ...prevTask, id: taskEdit.id
            }))
        
        }
    }, [taskEdit]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };
    
    const handleSubmit =  async (e) =>{
        e.preventDefault();
        if(taskEdit){
            try{
                await api.put(`tarefas/${taskEdit.id}`, task);
                setMsg("Tarefa editada com sucesso");
                setToast(1);
                closeModal();
                reloadTasks();
            }
            catch(err){
                const key = Object.keys(err.response.data)[0];
                setMsg(err.response.data[key][0]);
                setToast(2);
                console.log(err.response.data);
            }
        }else{
            try{
                await api.post('tarefas', task);
                setMsg('Tarefa cadastrada com sucesso');
                setToast(1);
            }catch(err){
                const key = Object.keys(err.response.data)[0];
                setMsg(err.response.data[key][0]);
                setToast(2);
                
            }
        }

    }
    
    return (
    <section className={styles.section_form}>
            <div className={styles.div_form}>
                <form className={styles.form_style} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Titulo"
                        onChange={handleChange}
                        value={task.titulo}
                    />
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descricao"
                        onChange={handleChange}
                        value={task.descricao}
                    />
                    
                    <select name='situacao' onChange={handleChange} value={task.situacao}>
                        <option value="" disabled>Selecione a situacao</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Em progresso">Em progresso</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>

                    <select name='categoria_id' onChange={handleChange} value={task.categoria_id}>
                        <option value="" disabled>Selecione a Categoria</option>
                        <option value="1" >Urgente</option>
                        <option value="2" >Medio</option>
                    </select>
                    
                    <input
                        type="date"
                        name="data_limite"
                        onChange={handleChange}
                        value={task.data_limite}
                    />
                    <input type="submit" value={btnText}></input>
                </form>
            </div>
        </section>
  )
}
