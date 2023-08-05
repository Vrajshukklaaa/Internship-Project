<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SubLevelCreateRequest;
use App\Http\Requests\SubLevelUpdateRequest;
use App\Services\SubLevelService;
use App\Http\Resources\SubLevelResourceCollection;
use App\Http\Resources\SubLevelResource;
use App\Traits\Response\ResponseTrait;


class SubLevelController extends Controller
{
    use ResponseTrait;

    /**
     * @var SubLevelService
     */
    protected SubLevelService $sublevel;

    /**
     * @param SubLevelService $sublevel
     */

    public function __construct(SubLevelService $sublevel)
    {
        $this->sublevel = $sublevel;
    }
     /**
     * @param SubLevelCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SubLevelCreateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $sublevel = $this->sublevel->create(
            $data
        );
        if( $sublevel ){
             return $this->jsonResponseSuccess(
                trans('admin/sublevel.create.success')
            );
        }

        return $this->jsonResponseFail(
            trans('admin/sublevel.create.fail'),
            400
        );
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
     * @return SubLevelResource
     */
    public function show($id)
    {
        $sublevel = $this->sublevel->show(
            ['id' => $id]
        );

        if ($sublevel) {
            return new SubLevelResource(
                $sublevel
            );
        }
        return $this->jsonResponseFail(
            trans('admin/sublevel.show.fail')
        );
    }
    public function update(SubLevelUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();

        $sublevel = $this->sublevel->update($data['id'], $data);

        if ($sublevel)
            return $this->jsonResponseSuccess(
                trans('admin/sublevel.update.success')
            );
        return $this->jsonResponseFail(
            trans('admin/sublevel.update.fail')
        );
    }

    public function destroy($id)
    {

        $this->sublevel->delete($id);
        return $this->jsonResponseSuccess(
            trans('admin/level.delete.success')
        );
    }
    // public function showlevel(Request $request):SubLevelResource
    // {
    //     $sublevel = $this->getLevels()->get();
        
        
    //         return new SubLevelResource(
    //             $sublevel
    //         );
        
    //     // return $this->jsonResponseFail(
    //     //     trans('admin/sublevel.show.fail')
    //     // );
    // }
}
