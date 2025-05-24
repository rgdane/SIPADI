<?php

namespace App\Http\Controllers;

use App\Models\Archive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'nik' => 'required|digits:16',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:10240',
        ]);

        if ($request->hasFile('file')) {
            // simpan ke storage/app/public/files
            $path = $request->file('file')->store('files', 'public');
            $data['file'] = Storage::url($path); // hasilnya: /storage/files/namafile.pdf
        }

        $archive = Archive::create($data);

        return response()->json([
            'code' => 201,
            'status' => 'success',
            'message' => 'Archive created successfully',
            'data' => $archive
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $archive = Archive::find($id);

        if (!$archive) {
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
            'data' => $archive
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $archive = Archive::find($id);

        if (!$archive) {
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
            'nik' => 'sometimes|digits:16',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:10240',
        ]);

        if ($request->hasFile('file')) {
            if ($archive->file) {
                Storage::disk('public')->delete($archive->file);
            }
            // simpan ke storage/app/public/files
            $path = $request->file('file')->store('files', 'public');
            $data['file'] = Storage::url($path); // hasilnya: /storage/files/namafile.pdf
        }

        $archive->update($data);

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Archive updated successfully',
            'data' => $archive
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $archive = Archive::find($id);

        if (!$archive) {
            return response()->json([
                'code' => 404,
                'status' => 'error',
                'message' => 'Archive not found'
            ], 404);
        }

        $archive->delete();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Archive deleted successfully'
        ], 200);
    }
}
