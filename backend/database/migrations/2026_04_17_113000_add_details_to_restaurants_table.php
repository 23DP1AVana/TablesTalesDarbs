<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->string('cuisine', 80)->default('Contemporary')->after('name');
            $table->decimal('rating', 2, 1)->default(4.0)->after('description');
            $table->string('location', 120)->default('Rīga')->after('rating');
            $table->string('price_range', 4)->default('$$')->after('location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->dropColumn(['cuisine', 'rating', 'location', 'price_range']);
        });
    }
};
