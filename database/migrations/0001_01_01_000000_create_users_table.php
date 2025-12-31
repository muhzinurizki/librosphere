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
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('email')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');

      // Tambahan untuk LibroSphere
      $table->string('username')->unique()->nullable(); // Username unik
      $table->string('phone')->nullable();             // Nomor telepon untuk notifikasi denda
      $table->text('address')->nullable();              // Alamat lengkap
      $table->string('avatar')->nullable();             // Foto profil
      $table->enum('role', ['admin', 'librarian', 'member'])->default('member'); // Role pengguna
      $table->boolean('is_active')->default(true);      // Status keaktifan anggota

      $table->rememberToken();
      $table->timestamps();
    });

    // Tabel bawaan lainnya (password_reset_tokens & sessions) biarkan saja tetap ada
    Schema::create('password_reset_tokens', function (Blueprint $table) {
      $table->string('email')->primary();
      $table->string('token');
      $table->timestamp('created_at')->nullable();
    });

    Schema::create('sessions', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->foreignId('user_id')->nullable()->index();
      $table->string('ip_address', 45)->nullable();
      $table->text('user_agent')->nullable();
      $table->longText('payload');
      $table->integer('last_activity')->index();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('users');
    Schema::dropIfExists('password_reset_tokens');
    Schema::dropIfExists('sessions');
  }
};
