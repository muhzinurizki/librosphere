<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\User;
use App\Models\Loan;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_books' => Book::count(),
                'active_loans' => Loan::where('status', 'active')->count(),
                'total_members' => User::where('role', 'member')->count(),
                'overdue_count' => Loan::where('status', 'overdue')->count(),
            ],
            'recent_activities' => Loan::with(['user', 'bookItem.book'])
                ->latest()
                ->take(5)
                ->get()
        ]);
    }
}
