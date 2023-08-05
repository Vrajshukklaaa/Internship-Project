<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\LevelService;
use App\Http\Resources\LevelResourceCollection;
use App\Http\Resources\LevelResource;
use App\Traits\Response\ResponseTrait;

class LevelController extends Controller
{
    use ResponseTrait;

    /**
     * @var LevelService
     */
    protected LevelService $level;

    /**
     * @param LevelService $level
     */

    public function __construct(LevelService $level)
    {
        $this->level = $level;
    }    
    /**
     * @param LevelResourceCollection $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): LevelResourceCollection
    {

        return LevelResourceCollection::make(
            $this->level->all(null, null, null, null, null, null, 100, true)
        );
    }

       /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return LevelResource
     */
    public function subject_level(Request $request,$id):LevelResourceCollection
    {
        $level = $this->level->show(
            ['subject_id' => $id]
        );

   
        return LevelResourceCollection::make(
            $this->level->all(null, ['subject_id' =>$request->id], null, null, null, null, 100, true)
        );
       
    }
}
