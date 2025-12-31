<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Book;
use App\Models\Category;

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

Route::get('/katalog', function (Request $request) {
    // Ambil semua kategori untuk sidebar filter
    $categories = Category::all();

    // Query buku dengan relasi kategori
    $books = Book::with('category')
        ->when($request->search, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(12)
        ->withQueryString(); // Menjaga parameter search saat pindah halaman

    return Inertia::render('Katalog/Index', [
        'categories' => $categories,
        'books' => $books,
        'filters' => $request->only(['search']) // Mengirim balik status filter ke frontend
    ]);
})->name('katalog.index');

Route::get('/acara', function () {
    $events = [
        'data' => [
            [
                'id' => 1,
                'title' => 'Bedah Buku: Filosofi Teras',
                'date' => '2025-01-12',
                'time' => '10:00 - 12:00',
                'location' => 'Aula Utama LibroSphere',
                'category' => 'Workshop',
                'description' => 'Diskusi mendalam bersama praktisi mengenai penerapan stoisisme dalam kehidupan modern.',
                'image' => 'https://via.placeholder.com/800x400?text=Bedah+Buku',
                'status' => 'Mendatang'
            ],
            [
                'id' => 2,
                'title' => 'Workshop Menulis Digital',
                'date' => '2025-01-15',
                'time' => '13:00 - 15:00',
                'location' => 'Ruang Multimedia',
                'category' => 'Edukasi',
                'description' => 'Pelatihan menulis artikel SEO dan teknik bercerita di media sosial.',
                'image' => 'https://via.placeholder.com/800x400?text=Workshop+Menulis',
                'status' => 'Pendaftaran Dibuka'
            ],
            [
                'id' => 3,
                'title' => 'Lomba Resensi Buku Nasional',
                'date' => '2025-01-20',
                'time' => 'Sepanjang Hari',
                'location' => 'Online',
                'category' => 'Lomba',
                'description' => 'Tunjukkan kemampuan analisismu dan menangkan hadiah jutaan rupiah.',
                'image' => 'https://via.placeholder.com/800x400?text=Lomba+Resensi',
                'status' => 'Mendatang'
            ],
        ]
    ];

    return Inertia::render('Acara/Index', [
        'events' => $events
    ]);
})->name('acara.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'books_borrowed' => 2,
            'active_reservations' => 1,
            'total_fines' => 'Rp 5.000',
        ],
        'recent_loans' => [
            [
                'id' => 1,
                'title' => 'Struktur Data Modern',
                'due_date' => '2025-01-10',
                'status' => 'Dipinjam',
                'is_overdue' => false
            ],
            [
                'id' => 2,
                'title' => 'Laskar Pelangi',
                'due_date' => '2024-12-28',
                'status' => 'Terlambat',
                'is_overdue' => true
            ],
        ]
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
