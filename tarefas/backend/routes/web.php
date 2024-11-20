<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TarefaController;
use Illuminate\Http\Request;
use App\Http\Middleware\ValidateTask;
use App\Http\Middleware\SearchTask;

Route::get('/api/tarefas/{id}', [TarefaController::class, 'getTaskById'])->middleware(SearchTask::class);
Route::get('/api/tarefas', [TarefaController::class, 'list']);
Route::put('/api/tarefas/{id}', [TarefaController::class, 'edit'])->middleware(SearchTask::class)->middleware(ValidateTask::class);
Route::delete('/api/tarefas/{id}', [TarefaController::class, 'delete'])->middleware(SearchTask::class);
Route::post('/api/tarefas', [TarefaController::class, 'newTask'])->middleware(ValidateTask::class);



