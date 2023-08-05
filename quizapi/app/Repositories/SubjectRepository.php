<?php
namespace App\Repositories;

use App\Models\Subject;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class SubjectRepository extends BaseRepository
{
    /**
     * @var Subject
     */
    protected Subject $subject;

    /**
     * @param Subject $subject
     */
    public function __construct(Subject $subject)
    {
        $this->subject = $subject;
        parent::__construct($subject);
    }
    
}
