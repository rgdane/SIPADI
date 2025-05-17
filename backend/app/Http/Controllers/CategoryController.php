<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::whereNull('deleted_at')->get();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Categories retrieved successfully',
            'data' => $categories
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'note' => 'nullable|string',
        ]);

        $category = Category::create($data);

        return response()->json([
            'code' => 201,
            'status' => 'success',
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Category retrieved successfully',
            'data' => $category
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }

        $data = $request->validate([
            'code' => 'sometimes|string|max:255',
            'name' => 'sometimes|string|max:255',
            'note' => 'nullable|string',
        ]);

        $category->update($data);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Category updated successfully',
            'data' => $category
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Category deleted successfully'
        ], 200);
    }
}
