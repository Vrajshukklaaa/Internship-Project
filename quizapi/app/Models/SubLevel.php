<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class SubLevel extends Model
{
    use HasFactory;
    protected $fillable = [
        'title','level_id'
    ];

    // public function levels(): \Illuminate\Database\Eloquent\Relations\HasOne
    // {
    //     return $this->HasOne(Level::class);
    // }
    // public function getLevels()
    // {
    //     return $this->levels()->where('level_id' == 'id')->get();
    // }
}
