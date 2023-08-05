<?php
namespace App\Repositories;

use App\Models\Topic;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class TopicRepository extends BaseRepository
{
    /**
     * @var Topic
     */
    protected Topic $topic;

    /**
     * @param Topic $topic
     */
    public function __construct(Topic $topic)
    {
        $this->topic = $topic;
        parent::__construct($topic);
    }
    
}
