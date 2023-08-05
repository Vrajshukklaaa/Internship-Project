<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
     * @return LevelResource
     */
    public function subject_topic(Request $request,$id):TopicResourceCollection
    {
        $topic = $this->topic->show(
            ['subject_id' => $id]
        );

        return TopicResourceCollection::make(
            $this->topic->all(null, ['subject_id' =>$request->id], null, null, null, null, 100, true)
        );
      
        
    }
    public function level_topic(Request $request,$id):TopicResourceCollection
    {
        $topic = $this->topic->show(
            ['level_id' => $id]
        );

        return TopicResourceCollection::make(
            $this->topic->all(null, ['level_id' =>$request->id], null, null, null, null, 100, true)
        );
       
        // return $this->jsonResponseFail(
        //     trans('admin/topic.show.fail')
        // );
    }

}
