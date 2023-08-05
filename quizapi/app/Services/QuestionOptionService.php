<?php
namespace App\Services;

use App\Repositories\QuestionOptionRepository;
use App\Services\BaseService;
use App\Models\QuestionOption;

class QuestionOptionService extends BaseService
{
    /**
     * @var QuestionOptionRepository
     */
    protected QuestionOptionRepository $option;

    /**
     * @param QuestionOptionRepository $option
     */
    public function __construct(QuestionOptionRepository $option)
    {
        $this->option = $option;
        parent::__construct($this->option);
    }
}