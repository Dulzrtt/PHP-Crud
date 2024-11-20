import React from 'react';
import api from '../../utils/api';
import { useEffect, useState } from 'react';
//toast
import { ToastContainer, toast } from 'react-toastify';
//form
import { TaskForm } from '../../form/TaskForm';
//layouts
import SelectTable from '../layouts/SelectTable';
//css
import Style from './Home.module.css';
import modalStyle from "./Modal.module.css"
import 'react-toastify/dist/ReactToastify.css'; 

function Home() {
    //task arrays
    const [tasks, setTasks] = useState([]);
    const [filtredTasks, setFiltredtasks] = useState([]);
    //
    const [situation, setSituation] = useState("Todas");
    //const para ediçao
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState();
    
    //mudar a valor da situaçao
    const handleSituationChange = (selectOption) =>{
        setSituation(selectOption.target.value);
    }
    //deletar
    const handleDelete = async (id) =>{
        try{
            await api.delete(`tarefas/${id}`);
            await fetchTasks();
        }catch(err){
            console.log(err);        
        }
    }
    //editar
    const handleEdit = (id) =>{
        setModal(true);
        setEditId(id);
    }

    //concluir a tarrefa
    const handleDone = async (task) =>{
        task.situacao = "Finalizada";
        try{
            await api.put(`tarefas/${task.id}`, task);
            console.log(task.id);
            fetchTasks();
            
        }catch(err){
            console.log(err);
        }
    }

    //funcao de pegar as tarefas da api
    const fetchTasks = async () => {
        try{
            const response = await api.get("tarefas");
            setTasks(response.data);
        }catch(err){
            console.log(err);
        }
    }
    
    //pegar as tarefas da api quando a pagina é carregada
    useEffect(() =>{
        fetchTasks();
    }, []);

    //para nao precisar ficar fzndo requisicao para api sempre que a situation é modificada 
    useEffect(() =>{
        if(situation !== "Todas"){
            const tasksArray = tasks.filter(task => task.situacao === situation);
            setFiltredtasks(tasksArray);
        }else{
            setFiltredtasks(tasks);
        }
    }, [tasks, situation])
    
    //toast alert
    const [toastValue, setToast] = useState([]);
    const success = () => toast.success("Task editada com sucesso");
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
        <section >
           
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Categoria</th>
                        <th>Situacao
                            <select onChange={handleSituationChange} value={situation}>
                                <option value="Todas">Todas</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Finalizada">Finalizada</option>
                                <option value="Em progresso">Em Progresso</option>
                            </select>
                        </th>
                        <th>Data Limite</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                        {filtredTasks.length > 0 &&
                            filtredTasks.map((task) =>(
                                <tr key={task.id} onClick={() => console.log("teste")}>
                                    <td>{task.titulo}</td>
                                    <td>{task.categoria.name}</td>
                                    <td>{task.situacao}</td>
                                    <td>{task.data_limite}</td>
                                    <td>
                                        <span> <button  onClick={() => handleDelete(task.id)}>Excluir</button></span>
                                        <span> <button  onClick={() => handleEdit(task.id)}>Editar</button></span>
                                        <span> <button onClick={() => handleDone(task)}>Concluir</button></span>
                                    {modal && editId === task.id && (
                                        <div className={modalStyle.modal}>
                                            <div className={modalStyle.modal_content}>
                                                <span onClick={() => setModal(false)}className={modalStyle.close}>&times;</span>
                                                <h1>Edit Task</h1>
                                                <TaskForm btnText="Editar" taskEdit={task} closeModal={() =>setModal(false)} reloadTasks={fetchTasks} setToast={setToast} setMsg={setMsg}/>
                                                
                                            </div>                                            
                                        </div>
                                      
                                    )}
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
            <ToastContainer></ToastContainer>
        </section>
    )
}

export default Home