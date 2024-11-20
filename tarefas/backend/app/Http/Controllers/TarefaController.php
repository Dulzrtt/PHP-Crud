<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarefas;
use Illuminate\Support\Facades\Validator;

class TarefaController extends Controller
{
    public function list(){
        $tarefas = Tarefas::with('categoria')->orderBy('created_at', 'desc')->get();
        return response()->json($tarefas);
    }

    public function newTask(Request $req){
        $tarefa = Tarefas::create($req->all());
        return response()->json("tarefa criado com sucesso", 201);
    }
    public function edit(Request $req, $id){
        $tarefa = $req->attributes->get('tarefa');
        $tarefa->update($req->all());
        return response()->json("Tarefa atualizada com suceesso", 200);
    }
    public function delete(Request $req, $id){
        $tarefa = $req->attributes->get('tarefa');
        $tarefa->delete();
        return response()->json("Tarefa excluida com suceesso", 200);
    }
    public function getTaskById(Request $req, $id){
        $tarefa = $req->attributes->get('tarefa');
        return response($tarefa);
    }
    
}
