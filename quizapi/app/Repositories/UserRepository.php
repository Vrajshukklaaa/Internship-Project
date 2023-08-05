<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;

class UserRepository extends BaseRepository
{
    /**
     * @var User
     */
    protected User $user;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
        parent::__construct($user);
    }

    /**
     * @param string $role
     * @return mixed
     */
    public function getUserByRole(string $role): mixed
    {
        return $this->user::role($role)->get();
    }
}
