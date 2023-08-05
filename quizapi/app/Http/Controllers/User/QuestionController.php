<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\QuestionService;
use App\Http\Resources\QuestionResourceCollection;
use App\Http\Resources\QuestionResource;
use App\Traits\Response\ResponseTrait;

class QuestionController extends Controller
{
    use ResponseTrait;

    /**
     * @var QuestionService
     */
    protected QuestionService $question;

    /**
     * @param QuestionService $question
     */

    public function __construct(QuestionService $question)
    {
        $this->question = $question;
    }    
    /**
     * @param QuestionResourceCollection $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): QuestionResourceCollection
    {

        return QuestionResourceCollection::make(
            $this->question->all(null, null, null, null, null, null, 100, true)
        );
    }

       /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return QuestionResource
     */
    public function question_topic(Request $request,$id):QuestionResourceCollection
    {
        $question = $this->question->show(
            ['topic_id' => $id]
        );

       
        return QuestionResourceCollection::make(
            $this->question->all(null, ['topic_id' =>$request->id], null, null, null, null, 100, true)
        );
        
    }
}
