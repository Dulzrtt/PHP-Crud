<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categoria', function (Blueprint $table) {
            $table->id('categoria_id');
            $table->string('name', length: 50);
            $table->timestamps();
        });
    
        Schema::create('tarefas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('titulo', length: 50);
            $table->string('descricao', length: 50);
            $table->enum('situacao', ['Pendente','Em progresso','Finalizada']);
            $table->date('data_limite');
            $table->unsignedBigInteger('categoria_id');
            $table->foreign('categoria_id')->references('categoria_id')->on('categoria')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categoria');
        Schema::dropIfExists('tarefas');
    }
};
