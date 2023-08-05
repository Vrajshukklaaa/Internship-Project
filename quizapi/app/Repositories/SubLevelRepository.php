<?php
namespace App\Repositories;

use App\Models\SubLevel;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class SubLevelRepository extends BaseRepository
{
    /**
     * @var SubLevel
     */
    protected SubLevel $sublevel;

    /**
     * @param SubLevel $level
     */
    public function __construct(SubLevel $sublevel)
    {
        $this->sublevel = $sublevel;
        parent::__construct($sublevel);
    }
    
}
