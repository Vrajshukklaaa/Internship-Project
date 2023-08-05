<?php
namespace App\Services;

use App\Repositories\SubLevelRepository;
use App\Services\BaseService;
use App\Models\SubLevel;

class SubLevelService extends BaseService
{
    /**
     * @var SubLevelRepository
     */
    protected SubLevelRepository $sublevel;

    /**
     * @param SubLevelRepository $sublevel
     */
    public function __construct(SubLevelRepository $sublevel)
    {
        $this->sublevel = $sublevel;
        parent::__construct($this->sublevel);
    }
}
