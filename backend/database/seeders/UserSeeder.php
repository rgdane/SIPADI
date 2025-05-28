<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ],
            [
                'name' => 'Pengguna',
                'email' => 'pengguna@gmail.com',
                'password' => Hash::make('pengguna123'),
                'role' => 'pengguna',
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
