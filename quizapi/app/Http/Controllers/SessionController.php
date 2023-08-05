<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UserController;
use App\Http\Requests\LoginRequest;
use App\Traits\Response\ResponseTrait;
use Illuminate\Http\Request;

class SessionController extends UserController
{
    use ResponseTrait;

    /**
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        $userLogin = $this->user->login(
            $request->validated()
        );

        if( $userLogin === false ){
            return $this->jsonResponseFail(
                trans('user/session/login.fail'),
                401
            );
        }
        return $this->jsonResponseSuccess(
            $userLogin
        );
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        if(
            $request->user()->currentAccessToken()->delete()
        ){
            return $this->jsonResponseSuccess(
                trans('user/session/logout.success')
            );
        }

        return $this->jsonResponseSuccess(
            trans('user/session/logout.fail')
        );
    }
}
