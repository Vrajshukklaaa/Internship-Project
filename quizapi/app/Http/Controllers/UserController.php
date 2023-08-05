<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Traits\Response\ResponseTrait;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResourceCollection;
use App\Http\Resources\UserResource;



class UserController extends Controller
{
    use ResponseTrait;
    /**
     * @var UserService
     */
    protected UserService $user;

    /**
     * @param UserService $user
     */
    public function __construct(UserService $user)
    {
        $this->user = $user;
    }
     /**
     * @param UserCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function hashPassword(array $data): array
    {
        $data['password'] = Hash::make($data['password']);

        return $data;
    }
    public function store(UserCreateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $this->hashPassword($request->validated());
        $user = $this->user->create(
            $data
        );
        if( $user ){
             return $this->jsonResponseSuccess(
                trans('admin/user.create.success')
            );
        }

        return $this->jsonResponseFail(
            trans('admin/user.create.fail'),
            400
        );
    }
    public function index(Request $request): UserResourceCollection
    {

        return UserResourceCollection::make(
            $this->user->all(null, null, null, null, null, null, 100, true)
        );
    }
        /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return UserResource
     */
    public function show($id)
    {
        $user = $this->user->show(
            ['id' => $id]
        );

        if ($user) {
            return new UserResource(
                $user
            );
        }
        return $this->jsonResponseFail(
            trans('admin/user.show.fail')
        );
    }
    public function update(UserUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        // echo"<pre>";print_r($data);die();
        if(!empty($data['password'])){
        //  echo"<pre>";print_r($this->hashPassword($data['password']));die();
         $data['password']=Hash::make($data['password']);
        }
        $user = $this->user->update($data['id'], $data);


        if ($user)
            return $this->jsonResponseSuccess(
                trans('admin/user.update.success')
            );
        return $this->jsonResponseFail(
            trans('admin/user.update.fail')
        );
    }
    public function destroy($id)
    {

        $this->user->delete($id);
        return $this->jsonResponseSuccess(
            trans('common/contact.delete.success')
        );
    }


}
