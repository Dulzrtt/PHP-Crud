<?php

namespace App\Http\Middleware;
use App\Models\Tarefas;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SearchTask
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $id = $request->route('id');
        $tarefa = Tarefas::find($id);
        
        if(!$tarefa){
            return response()->json(['Erro' => 'Tarefa nao encontrada'], 404);
        }
        $request->attributes->set('tarefa', $tarefa);
        
        return $next($request);
    }
}
