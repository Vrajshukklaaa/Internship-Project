<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\QuestionOption;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'topic_id',
        'question',
        'explanation',
        'revisiontext',
        'video'
    ];

      /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function options(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->HasMany(QuestionOption::class);
    }

    public function getOptions()
    {
        return $this->options()->get();
    }
}
