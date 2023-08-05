<?php
namespace App\Services;

use App\Repositories\SubjectRepository;
use App\Services\BaseService;
use App\Models\Subject;

class SubjectService extends BaseService
{
    /**
     * @var SubjectRepository
     */
    protected SubjectRepository $subject;

    /**
     * @param SubjectRepository $subject
     */
    public function __construct(SubjectRepository $subject)
    {
        $this->subject = $subject;
        parent::__construct($this->subject);
    }
}
