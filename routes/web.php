<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'featuredBooks' => [
            ['id' => 1, 'title' => 'Laskar Pelangi', 'author' => 'Andrea Hirata', 'cover' => 'https://via.placeholder.com/150'],
            ['id' => 2, 'title' => 'Filosofi Teras', 'author' => 'Henry Manampiring', 'cover' => 'https://via.placeholder.com/150'],
        ],
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/katalog', function () {
    // Data Dummy Kategori
    $categories = [
        ['id' => 1, 'name' => 'Sains & Teknologi', 'slug' => 'sains-teknologi', 'icon' => '🔬'],
        ['id' => 2, 'name' => 'Sastra & Fiksi', 'slug' => 'sastra-fiksi', 'icon' => '📚'],
        ['id' => 3, 'name' => 'Sejarah & Budaya', 'slug' => 'sejarah-budaya', 'icon' => '🏛️'],
        ['id' => 4, 'name' => 'Pengembangan Diri', 'slug' => 'pengembangan-diri', 'icon' => '💡'],
    ];

    // Data Dummy Buku (Simulasi hasil paginate)
    $books = [
        'data' => [
            [
                'id' => 1,
                'title' => 'Struktur Data Modern',
                'author' => 'Robert C. Martin',
                'category' => ['name' => 'Sains & Teknologi'],
                'cover_image' => 'https://via.placeholder.com/300x450?text=Struktur+Data',
                'status' => 'available',
                'isbn' => '978-602-1234-56-7'
            ],
            [
                'id' => 2,
                'title' => 'Laskar Pelangi',
                'author' => 'Andrea Hirata',
                'category' => ['name' => 'Sastra & Fiksi'],
                'cover_image' => 'https://via.placeholder.com/300x450?text=Laskar+Pelangi',
                'status' => 'borrowed',
                'isbn' => '978-602-9876-54-3'
            ],
            [
                'id' => 3,
                'title' => 'Filosofi Teras',
                'author' => 'Henry Manampiring',
                'category' => ['name' => 'Pengembangan Diri'],
                'cover_image' => 'https://via.placeholder.com/300x450?text=Filosofi+Teras',
                'status' => 'available',
                'isbn' => '978-602-5555-11-0'
            ],
            [
                'id' => 4,
                'title' => 'Sapiens: Riwayat Singkat Umat Manusia',
                'author' => 'Yuval Noah Harari',
                'category' => ['name' => 'Sejarah & Budaya'],
                'cover_image' => 'https://via.placeholder.com/300x450?text=Sapiens',
                'status' => 'available',
                'isbn' => '978-602-4444-22-1'
            ],
        ],
        // Simulasi struktur pagination Laravel
        'links' => [
            ['url' => '#', 'label' => '&laquo; Previous', 'active' => false],
            ['url' => '#', 'label' => '1', 'active' => true],
            ['url' => '#', 'label' => 'Next &raquo;', 'active' => false],
        ]
    ];

    return Inertia::render('Katalog/Index', [
        'categories' => $categories,
        'books' => $books,
    ]);
})->name('katalog.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
