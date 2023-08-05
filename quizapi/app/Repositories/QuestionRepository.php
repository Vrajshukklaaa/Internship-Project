<?php
namespace App\Repositories;

use App\Models\Question;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class QuestionRepository extends BaseRepository
{
    /**
     * @var Question
     */
    protected Question $question;

    /**
     * @param Question $question
     */
    public function __construct(Question $question)
    {
        $this->question = $question;
        parent::__construct($question);
    }
    
}
