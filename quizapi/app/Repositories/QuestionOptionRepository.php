<?php
namespace App\Repositories;

use App\Models\QuestionOption;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class QuestionOptionRepository extends BaseRepository
{
    /**
     * @var QuestionOption
     */
    protected QuestionOption $option;

    /**
     * @param QuestionOption $option
     */
    public function __construct(QuestionOption $option)
    {
        $this->option = $option;
        parent::__construct($option);
    }
    
}
