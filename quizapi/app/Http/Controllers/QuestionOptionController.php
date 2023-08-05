<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionOptionCreateRequest;
use App\Http\Requests\QuestionOptionUpdateRequest;
use App\Services\QuestionOptionService;
use App\Http\Resources\QuestionOptionResourceCollection;
use App\Http\Resources\QuestionOptionResource;
use App\Traits\Response\ResponseTrait;

class QuestionOptionController extends Controller
{
    use ResponseTrait;
    /**
     * @var QuestionOptionService
     */
    protected QuestionOptionService $option;

    /**
     * @param QuestionOptionService $option
     */

    public function __construct(QuestionOptionService $option)
    {
        $this->option = $option;
    }
     /**
     * @param QuestionOptionCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    // public function store(QuestionOptionCreateRequest $request): \Illuminate\Http\JsonResponse
    // {
    //     $data = $request->validated();
    //     $option = $this->option->create(
    //         $data
    //     );
    //     if( $option ){
    //          return $this->jsonResponseSuccess(
    //             trans('admin/option.create.success')
    //         );
    //     }

    //     return $this->jsonResponseFail(
    //         trans('admin/option.create.fail'),
    //         400
    //     );
    // }

    
    /**
     * @param QuestionOptionResourceCollection $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): QuestionOptionResourceCollection
    {

        return QuestionOptionResourceCollection::make(
            $this->option->all(null, null, null, null, null, null, 100, true)
        );
    }

        /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return QuestionOptionResource
     */
    public function show($id)
    {
        $option = $this->option->show(
            ['id' => $id]
        );

        if ($option) {
            return new QuestionOptionResource(
                $option
            );
        }
        return $this->jsonResponseFail(
            trans('admin/option.show.fail')
        );
    }
    public function update(QuestionOptionUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();

        $option = $this->option->update($data['id'], $data);

        if ($option)
            return $this->jsonResponseSuccess(
                trans('admin/question.update.success')
            );
        return $this->jsonResponseFail(
            trans('admin/question.update.fail')
        );
    }

    public function destroy($id)
    {

        $this->option->delete($id);
        return $this->jsonResponseSuccess(
            trans('admin/question.delete.success')
        );
    }
}
