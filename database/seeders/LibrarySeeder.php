<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Book;
use App\Models\BookItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LibrarySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Kategori
        $kategori = [
            ['name' => 'Sains & Teknologi', 'slug' => 'sains-teknologi'],
            ['name' => 'Sastra & Fiksi', 'slug' => 'sastra-fiksi'],
            ['name' => 'Pengembangan Diri', 'slug' => 'pengembangan-diri'],
        ];

        foreach ($kategori as $kat) {
            $cat = Category::create($kat);

            // 2. Buat beberapa buku untuk setiap kategori
            for ($i = 1; $i <= 3; $i++) {
                $book = Book::create([
                    'category_id' => $cat->id,
                    'isbn' => Str::random(13),
                    'title' => "Buku " . $cat->name . " Seri " . $i,
                    'author' => "Penulis Hebat " . $i,
                    'description' => "Ini adalah deskripsi mendalam untuk buku " . $i,
                    'publish_year' => 2020 + $i,
                    'cover_image' => 'https://via.placeholder.com/300x450?text=Cover+Buku',
                ]);

                // 3. Buat item fisik (eksemplar) untuk buku tersebut
                BookItem::create([
                    'book_id' => $book->id,
                    'barcode' => 'BRC-' . strtoupper(Str::random(8)),
                    'status' => 'available',
                ]);
            }
        }
    }
}