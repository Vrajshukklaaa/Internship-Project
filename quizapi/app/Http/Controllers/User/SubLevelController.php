<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\SubLevelService;
use App\Http\Resources\SubLevelResourceCollection;
// use App\Http\Resources\SubLevelResource;
use App\Traits\Response\ResponseTrait;

class SubLevelController extends Controller
{
    use ResponseTrait;

    /**
     * @var SubLevelService
     */
    protected SubLevelService $level;

    /**
     * @param SubLevelService $level
     */

    public function __construct(SubLevelService $sublevel)
    {
        $this->sublevel = $sublevel;
    }    
    /**
     * @param SubLevelResourceCollection $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): SubLevelResourceCollection
    {

        return SubLevelResourceCollection::make(
            $this->sublevel->all(null, null, null, null, null, null, 100, true)
        );
    }

      
     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function sub_level(Request $request,$id):SubLevelResourceCollection
    {
        $sublevel = $this->sublevel->show(
            ['level_id' => $id]
        );

      
        return SubLevelResourceCollection::make(
            $this->sublevel->all(null, ['level_id' =>$request->id], null, null, null, null, 100, true)
        );
         
    }
}
