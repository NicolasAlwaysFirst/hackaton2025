<?php

use App\Http\Controllers\StatementController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::get('/user', [UserController::class, 'getMe'])->middleware('auth:sanctum');

Route::get('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/user/password', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');


Route::post('/register', [UserController::class, 'register']);


Route::any('/auth', [UserController::class, 'auth'])->name('login');


Route::get('/statements', [StatementController::class, 'index']);
Route::post('/statements', [StatementController::class, 'store']);
