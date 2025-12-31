<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BookItem;
use App\Models\Category;

class Book extends Model
{
  //

  public function category()
  {
    return $this->belongsTo(Category::class);
  }

  public function items()
  {
    return $this->hasMany(BookItem::class);
  }
}


