<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;

class QuestionOption extends Model
{
    use HasFactory;
    protected $fillable = [
        'question_id',
        'option_key',
        'option_value',
        'is_correct'
    ];

    public function questions(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->BelongsTo(Question::class);
    }
    public function getQuestions()
    {
        return $this->questions()->get();
    }
}



