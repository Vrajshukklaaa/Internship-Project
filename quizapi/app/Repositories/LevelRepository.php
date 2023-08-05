<?php
namespace App\Repositories;

use App\Models\Level;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class LevelRepository extends BaseRepository
{
    /**
     * @var Level
     */
    protected Level $level;

    /**
     * @param Level $level
     */
    public function __construct(Level $level)
    {
        $this->level = $level;
        parent::__construct($level);
    }
    
}
