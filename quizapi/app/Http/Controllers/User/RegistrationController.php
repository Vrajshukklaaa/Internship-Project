<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\RegistrationCreateRequest;
use App\Traits\Response\ResponseTrait;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
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
     * @param RegistrationCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function hashPassword(array $data): array
    {
        $data['password'] = Hash::make($data['password']);

        return $data;
    }
    public function store(RegistrationCreateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $this->hashPassword( $request->validated() );
        $user = $this->user->create(
            $data
        );
        if( $user ){
            $user->assignRole('Free');
             return $this->jsonResponseSuccess(
                trans('user/registration.create.success')
            );
        }

        return $this->jsonResponseFail(
            trans('user/registration.create.fail'),
            400
        );
    }
  
}
