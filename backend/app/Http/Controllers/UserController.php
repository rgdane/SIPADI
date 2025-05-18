<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::whereNull('deleted_at')->get();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Users retrieved successfully',
            'data' => $users
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        // Hash password sebelum disimpan
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json([
            'code' => 201,
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'User retrieved successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8',
        ]);

        // Hash password sebelum disimpan
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']); // agar tidak meng-overwrite
        }


        $user->update($data);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'User deleted successfully'
        ], 200);
    }
}
