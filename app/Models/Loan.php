<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Loan extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'user_id',
        'book_item_id',
        'loan_date',
        'due_date',
        'return_date',
        'status',
    ];

    /**
     * Casting tipe data tanggal secara otomatis.
     */
    protected $casts = [
        'loan_date' => 'date',
        'due_date' => 'date',
        'return_date' => 'date',
    ];

    /**
     * Relasi: Pinjaman ini dimiliki oleh seorang Anggota (User).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi: Pinjaman ini merujuk pada satu item buku fisik tertentu.
     */
    public function bookItem(): BelongsTo
    {
        return $this->belongsTo(BookItem::class);
    }

    /**
     * Relasi: Pinjaman ini mungkin memiliki satu catatan denda (jika terlambat).
     */
    public function fine(): HasOne
    {
        return $this->hasOne(Fine::class);
    }

    /**
     * Scope: Mempermudah filter pinjaman yang masih aktif (belum dikembalikan).
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope: Mempermudah filter pinjaman yang terlambat.
     */
    public function scopeOverdue($query)
    {
        return $query->where('status', 'overdue');
    }
}