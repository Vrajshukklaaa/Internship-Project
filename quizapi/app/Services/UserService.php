<?php

namespace App\Services;

use App\Http\Requests\LoginRequest;
use App\Repositories\UserRepository;
use App\Services\BaseService;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserService extends BaseService
{
    /**
     * @var UserRepository
     */
    protected UserRepository $user;

    /**
     * @param UserRepository $user
     */
    public function __construct(UserRepository $user)
    {
        $this->user = $user;
        parent::__construct($this->user);
    }

    /**
     * @param string $role
     * @return mixed
     */
    public function getUserByRole(string $role)
    {
        return $this->user->getUserByRole($role);
    }

    /**
     * @param array $request
     * @return array|false
     */
    public function login(array $request): bool|array
    {
              
        $user = $this->user->show(
            [
                'email' => $request['email']
            ],
            [
                'Roles'
            ]
        );
       
       
        if (! $user || ! Hash::check($request['password'], $user->password)) {
            return false;
        }

        $userRole = $user->getRoleNames();
     
        if(empty($userRole[0]))
            return [
                'user'=>$user,
                'type' => $userRole,
                'token' => $user->createToken(
                    $request['device_name']
                )->plainTextToken
            ];

        return [
                'user'=>$user,
                'type' => $userRole,
                'token' => $user->createToken(
                    $request['device_name'],
                    [
                        $userRole[0]
                    ]
                )->plainTextToken
            ];
    }
	public function getVendorStore(User $user){
		echo "<pre>";
		print_r($user->vendors()->get());
		die;
	}
}
