<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionCreateRequest;
use App\Http\Requests\QuestionUpdateRequest;
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
     * @param QuestionCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(QuestionCreateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $question = $this->question->create(
            $data
        );
         //echo "<pre>";print_r( $data);die();
        if( $question ){
            $question->options()->createMany($data['options']);           
             return $this->jsonResponseSuccess(
                trans('admin/question.create.success')
            );
        }

        return $this->jsonResponseFail(
            trans('admin/question.create.fail'),
            400
        );
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
    public function show($id)
    {
        $question = $this->question->show(
            ['id' => $id]
        );
 
        if ($question) {
           
            return new QuestionResource(
                $question
            );
        }
        return $this->jsonResponseFail(
            trans('admin/question.show.fail')
        );
    }
    public function update(QuestionUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        
        $question = $this->question->update($data['id'], $data);
        //echo "<pre>";print_r( $data);die();

        if ($question){
            $question = $this->question->show(
                ['id' => $data['id']]
            );
            //delete all options
            $question->options()->delete();
            //add new 
            $question->options()->createMany($request->options);           
            return $this->jsonResponseSuccess(
                trans('admin/question.update.success')
            );
        }
        return $this->jsonResponseFail(
            trans('admin/question.update.fail')
        );
    }

    public function destroy($id)
    {

        $this->question->delete($id);
        return $this->jsonResponseSuccess(
            trans('admin/question.delete.success')
        );
    }

}
