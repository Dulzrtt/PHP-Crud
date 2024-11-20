<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Tarefas extends Model
{
    use HasFactory;
    
    
    protected $table = 'tarefas';   
    protected $fillable = ['id','titulo','descricao', 'situacao', 'data_limite', 'categoria_id'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id', 'categoria_id');
    }
}
