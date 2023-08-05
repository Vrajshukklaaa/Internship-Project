<?php
namespace App\Services;

use App\Repositories\TopicRepository;
use App\Services\BaseService;
use App\Models\Topic;

class TopicService extends BaseService
{
    /**
     * @var TopicRepository
     */
    protected TopicRepository $topic;

    /**
     * @param TopicRepository $topic
     */
    public function __construct(TopicRepository $topic)
    {
        $this->topic = $topic;
        parent::__construct($this->topic);
    }
}
