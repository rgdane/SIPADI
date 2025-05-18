<?php

namespace App\Http\Controllers;

use App\Models\Archive;
use Illuminate\Http\Request;

class ArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $archives = Archive::with('category')
            ->whereNull('deleted_at')
            ->get();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Archives retrieved successfully',
            'data' => $archives
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'note' => 'nullable|string',
        ]);

        $Archive = Archive::create($data);

        return response()->json([
            'code' => 201,
            'status' => 'success',
            'message' => 'Archive created successfully',
            'data' => $Archive
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $Archive = Archive::find($id);

        if (!$Archive) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'Archive not found'
            ], 404);
        }

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Archive retrieved successfully',
            'data' => $Archive
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $Archive = Archive::find($id);

        if (!$Archive) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'Archive not found'
            ], 404);
        }

        $data = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'title' => 'sometimes|string|max:255',
            'date' => 'sometimes|date',
            'note' => 'nullable|string',
        ]);

        $Archive->update($data);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Archive updated successfully',
            'data' => $Archive
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $Archive = Archive::find($id);

        if (!$Archive) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'Archive not found'
            ], 404);
        }

        $Archive->delete();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Archive deleted successfully'
        ], 200);
    }
}
