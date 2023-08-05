<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LevelCreateRequest;
use App\Http\Requests\LevelUpdateRequest;
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
     * @param LevelCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(LevelCreateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $level = $this->level->create(
            $data
        );
        if( $level ){
             return $this->jsonResponseSuccess(
                trans('admin/level.create.success')
            );
        }

        return $this->jsonResponseFail(
            trans('admin/level.create.fail'),
            400
        );
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
    public function show($id)
    {
        $level = $this->level->show(
            ['id' => $id]
        );

        if ($level) {
            return new LevelResource(
                $level
            );
        }
        return $this->jsonResponseFail(
            trans('admin/level.show.fail')
        );
    }
    public function update(LevelUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();

        $level = $this->level->update($data['id'], $data);

        if ($level)
            return $this->jsonResponseSuccess(
                trans('admin/level.update.success')
            );
        return $this->jsonResponseFail(
            trans('admin/level.update.fail')
        );
    }

    public function destroy($id)
    {

        $this->level->delete($id);
        return $this->jsonResponseSuccess(
            trans('admin/level.delete.success')
        );
    }

}
