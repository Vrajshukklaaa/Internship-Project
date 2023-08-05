<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SubjectCreateRequest;
use App\Http\Requests\SubjectUpdateRequest;
use App\Services\SubjectService;
use App\Http\Resources\SubjectResourceCollection;
use App\Http\Resources\SubjectResource;
use App\Traits\Response\ResponseTrait;

class SubjectController extends Controller
{
    use ResponseTrait;
    /**
     * @var SubjectService
     */
    protected SubjectService $subject;

    /**
     * @param SubjectService $subject
     */

    public function __construct(SubjectService $subject)
    {
        $this->subject = $subject;
    }
     /**
     * @param SubjectRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SubjectCreateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $subject = $this->subject->create(
            $data
        );
        if( $subject ){
             return $this->jsonResponseSuccess(
                trans('admin/subject.create.success')
            );
        }

        return $this->jsonResponseFail(
            trans('admin/subject.create.fail'),
            400
        );
    }

    
    /**
     * @param SubjectResourceCollection $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): SubjectResourceCollection
    {

        return SubjectResourceCollection::make(
            $this->subject->all(null, null, null, null, null, null, 100, true)
        );
    }

        /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return SubjectResource
     */
    public function show($id)
    {
        $subject = $this->subject->show(
            ['id' => $id]
        );

        if ($subject) {
            return new SubjectResource(
                $subject
            );
        }
        return $this->jsonResponseFail(
            trans('admin/subject.show.fail')
        );
    }
    public function update(SubjectUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();

        $subject = $this->subject->update($data['id'], $data);

        if ($subject)
            return $this->jsonResponseSuccess(
                trans('common/contact.update.success')
            );
        return $this->jsonResponseFail(
            trans('common/contact.update.fail')
        );
    }

    public function destroy($id)
    {

        $this->subject->delete($id);
        return $this->jsonResponseSuccess(
            trans('common/contact.delete.success')
        );
    }


}
