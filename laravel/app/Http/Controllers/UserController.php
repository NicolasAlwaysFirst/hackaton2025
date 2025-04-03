<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function auth(Request $request)
    {
        //Делаем поля email и password обязательными, проверяем формат email
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        //Получим пользователя с заданным email
        $user = User::where('email', $data['email'])->first();

        //Если не найден пользователь или Хэш паролей не совпадает с паролем в БД
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Ошибка! Неправильные данные'], 401);
        }

        //Создаем токен для авторизации пользователя
        $token = $user->createToken('auth_token')->plainTextToken;

        //Возвращаем токен и сообщение об успешной авторизации
        return response()->json(
            [
                'token' => $token,
                'user' => $user,
                'message' => 'Успешная авторизация'
            ]
        );
    }

    public function getMe(Request $request) {
        return $request->user();
    }
    public function logout(Request $request){
        $user = $request->user();
        $user->tokens()->delete();
        return response()->json([]);
    }

    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
    
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
    
        ]);
    
        return response()->json(
            [
                'message' => 'Пользователь успешно зарегистрирован',
                'user' => $user
            ],
            201
        );
    }

    public function updatePassword(Request $request){
         // Валидация входных данных
         $request->validate([
            'old_password' => 'required|string',
            'new_password' => 'required|string|min:6', // подтверждение нового пароля
        ]);

        // Получаем текущего аутентифицированного пользователя
        $user = Auth::user();

        // Проверяем, соответствует ли старый пароль
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Неверный старый пароль.', 'status'=>false], 400);
        }

        // Обновляем пароль
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Пароль успешно обновлен.', 'status'=>true]);
    }
}
