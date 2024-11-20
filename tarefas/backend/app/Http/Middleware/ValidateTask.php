<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ValidateTask
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|min:5',
            'descricao' => 'required',
            'situacao' => 'required|in:Pendente,Em progresso,Finalizada',
            'data_limite' => 'required|date|after:today',
            'categoria_id' => 'required|exists:categoria,categoria_id',
        ],[
            'titulo.required' => "O título é obrigatório",
            'descricao.required' => "Adicione uma descricao",
            'titulo.min' => "O título deve ter no mínimo 5 caracteres",
            'situacao.required' => "A situação precisa ser Pendente, Em progresso ou Finalizada",
            'situacao.in' => "A situação precisa ser Pendente, Em progresso ou Finalizada",
            'data_limite.after' => "Precisa ser uma data futura",
            'categoria_id.required' => "Selecione uma categoria",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        return $next($request);
    }
}
