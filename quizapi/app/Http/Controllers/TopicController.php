<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\TopicCreateRequest;
use App\Http\Requests\TopicUpdateRequest;
use App\Services\TopicService;
use App\Http\Resources\TopicResourceCollection;
use App\Http\Resources\TopicResource;
use App\Traits\Response\ResponseTrait;

class TopicController extends Controller
{
    use ResponseTrait;
    /**
     * @var TopicService
     */
    protected TopicService $topic;

    /**
     * @param TopicService $topic
     */

    public function __construct(TopicService $topic)
    {
        $this->topic = $topic;
    }
     /**
     * @param TopicCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TopicCreateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $topic = $this->topic->create(
            $data
        );
        if( $topic ){
             return $this->jsonResponseSuccess(
                trans('admin/topic.create.success')
            );
        }

        return $this->jsonResponseFail(
            trans('admin/subject.create.fail'),
            400
        );
    }

    
    /**
     * @param TopicResourceCollection $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): TopicResourceCollection
    {

        return TopicResourceCollection::make(
            $this->topic->all(null, null, null, null, null, null, 100, true)
        );
    }

        /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return TopicResource
     */
    public function show($id)
    {
        $topic = $this->topic->show(
            ['id' => $id]
        );

        if ($topic) {
            return new TopicResource(
                $topic
            );
        }
        return $this->jsonResponseFail(
            trans('admin/subject.show.fail')
        );
    }
    public function update(TopicUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();

        $topic = $this->topic->update($data['id'], $data);

        if ($topic)
            return $this->jsonResponseSuccess(
                trans('common/contact.update.success')
            );
        return $this->jsonResponseFail(
            trans('common/contact.update.fail')
        );
    }

    public function destroy($id)
    {

        $this->topic->delete($id);
        return $this->jsonResponseSuccess(
            trans('common/contact.delete.success')
        );
    }


}
