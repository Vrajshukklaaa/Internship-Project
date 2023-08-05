<?php
namespace App\Services;

use App\Repositories\LevelRepository;
use App\Services\BaseService;
use App\Models\Level;

class LevelService extends BaseService
{
    /**
     * @var LevelRepository
     */
    protected LevelRepository $level;

    /**
     * @param LevelRepository $level
     */
    public function __construct(LevelRepository $level)
    {
        $this->level = $level;
        parent::__construct($this->level);
    }
}
