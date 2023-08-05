<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::name('session.')
    ->prefix('session')
    ->group(
        __DIR__ . '/Routes/API/User/Session/api.php'
);

Route::middleware(['auth:sanctum','role:Admin'])->name('admin.')
    ->prefix('admin/subject')
    ->group(
        __DIR__ . '/Routes/API/Admin/Subject/api.php'
);

Route::middleware(['auth:sanctum','role:Admin'])->name('admin.')
    ->prefix('admin/level')
    ->group(
        __DIR__ . '/Routes/API/Admin/Level/api.php'
);
Route::middleware(['auth:sanctum','role:Admin'])->name('admin.')
    ->prefix('admin/sublevel')
    ->group(
        __DIR__ . '/Routes/API/Admin/SubLevel/api.php'
);
Route::middleware(['auth:sanctum','role:Admin'])->name('admin.')
    ->prefix('admin/topic')
    ->group(
        __DIR__ . '/Routes/API/Admin/Topic/api.php'
);
Route::middleware(['auth:sanctum','role:Admin'])->name('admin.')
    ->prefix('admin/question')
    ->group(
        __DIR__ . '/Routes/API/Admin/Question/api.php'
);
Route::name('admin.')
    ->prefix('admin/option')
    ->group(
        __DIR__ . '/Routes/API/Admin/QuestionOption/api.php'
);
Route::middleware(['auth:sanctum','role:Admin'])->name('admin.')
    ->prefix('admin/user')
    ->group(
        __DIR__ . '/Routes/API/Admin/User/api.php'
);
Route::name('user.')
    ->prefix('user/registration')
    ->group(
        __DIR__ . '/Routes/API/User/Registration/api.php'
);
Route::name('user.')
    ->prefix('user/subject')
    ->group(
        __DIR__ . '/Routes/API/User/Subject/api.php'
);

Route::name('user.')
    ->prefix('user/level')
    ->group(
        __DIR__ . '/Routes/API/User/Level/api.php'
);
Route::name('user.')
    ->prefix('user/sublevel')
    ->group(
        __DIR__ . '/Routes/API/User/SubLevel/api.php'
);
Route::name('user.')
    ->prefix('user/topic')
    ->group(
        __DIR__ . '/Routes/API/User/Topic/api.php'
);
Route::name('user.')
    ->prefix('user/question')
    ->group(
        __DIR__ . '/Routes/API/User/Question/api.php'
);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
