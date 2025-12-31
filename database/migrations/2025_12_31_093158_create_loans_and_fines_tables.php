<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    // Tabel Peminjaman (Loans)
    Schema::create('loans', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->foreignId('book_item_id')->constrained()->onDelete('cascade');
      $table->date('loan_date');
      $table->date('due_date');
      $table->date('return_date')->nullable();
      $table->enum('status', ['active', 'returned', 'overdue'])->default('active');
      $table->timestamps();
    });

    // Tabel Denda (Fines)
    Schema::create('fines', function (Blueprint $table) {
      $table->id();
      $table->foreignId('loan_id')->constrained()->onDelete('cascade');
      $table->decimal('amount', 12, 2);
      $table->enum('status', ['unpaid', 'paid'])->default('unpaid');
      $table->date('payment_date')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('loans_and_fines_tables');
  }
};
