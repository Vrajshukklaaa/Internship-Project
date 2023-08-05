<?php
namespace App\Services;

use App\Repositories\QuestionRepository;
use App\Services\BaseService;
use App\Models\Question;

class QuestionService extends BaseService
{
    /**
     * @var QuestionRepository
     */
    protected QuestionRepository $question;

    /**
     * @param QuestionRepository $question
     */
    public function __construct(QuestionRepository $question)
    {
        $this->question = $question;
        parent::__construct($this->question);
    }

}