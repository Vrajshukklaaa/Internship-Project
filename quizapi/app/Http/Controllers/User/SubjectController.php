<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\SubjectService;
use App\Http\Resources\SubjectResourceCollection;
use App\Traits\Response\ResponseTrait;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    use ResponseTrait;

    /**
     * @return SubjectResourceCollection
     */

    public function __construct(SubjectService $subject)
    {
         $this->subject = $subject;
    }

    public function index(): SubjectResourceCollection
    {
        return SubjectResourceCollection::make(
            $this->subject->all(null,null,null,null,null,null,100,true)
        );
    }
}
