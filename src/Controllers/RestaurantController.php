<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Restaurant;

class RestaurantController
{
    public function index(): void
    {
        $search = sanitize($_GET['search'] ?? '');
        $sort = sanitize($_GET['sort'] ?? 'name');
        $restaurants = (new Restaurant())->all($search, $sort);
        view('restaurants/index', compact('restaurants', 'search', 'sort') + ['title' => 'Restaurants']);
    }

    public function create(string $method): void
    {
        requireRole('admin', 'representative');
        if ($method === 'POST') {
            if (!csrf_validate($_POST['csrf'] ?? null)) {
                flash('error', 'Invalid CSRF token.');
                redirect('restaurants');
            }
            $name = sanitize($_POST['name'] ?? '');
            $description = sanitize($_POST['description'] ?? '');
            if ($name === '' || $description === '') {
                flash('error', 'Please fill all restaurant fields.');
                redirect('restaurants');
            }
            (new Restaurant())->create($name, $description, (int) currentUser()['id']);
            flash('success', 'Restaurant created.');
        }
        redirect('restaurants');
    }

    public function edit(string $method): void
    {
        requireRole('admin', 'representative');
        if ($method === 'POST' && csrf_validate($_POST['csrf'] ?? null)) {
            $id = (int) ($_POST['id'] ?? 0);
            $name = sanitize($_POST['name'] ?? '');
            $description = sanitize($_POST['description'] ?? '');
            (new Restaurant())->update($id, $name, $description);
            flash('success', 'Restaurant updated.');
        }
        redirect('restaurants');
    }

    public function delete(string $method): void
    {
        requireRole('admin');
        if ($method === 'POST' && csrf_validate($_POST['csrf'] ?? null)) {
            (new Restaurant())->delete((int) ($_POST['id'] ?? 0));
            flash('success', 'Restaurant deleted.');
        }
        redirect('restaurants');
    }
}
