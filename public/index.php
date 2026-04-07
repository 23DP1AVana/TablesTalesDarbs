<?php
declare(strict_types=1);

session_start();

require_once __DIR__ . '/../src/core/bootstrap.php';

use App\Controllers\AdminController;
use App\Controllers\AuthController;
use App\Controllers\ContactController;
use App\Controllers\DashboardController;
use App\Controllers\HomeController;
use App\Controllers\ProfileController;
use App\Controllers\ReservationController;
use App\Controllers\RestaurantController;

$route = $_GET['route'] ?? 'home';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

/*
Test cases:
1) Register valid user -> redirected to login with success flash.
2) Login invalid password -> stays unauthenticated with error flash.
3) User creates reservation -> pending reservation appears in reservation list.
4) Representative updates reservation status -> row status changes to approved/cancelled.
5) Contact form invalid email -> validation error, message not inserted.
*/

// Basic route table with role-aware checks inside controllers.
switch ($route) {
    case 'home':
        (new HomeController())->index();
        break;
    case 'register':
        (new AuthController())->register($method);
        break;
    case 'login':
        (new AuthController())->login($method);
        break;
    case 'logout':
        (new AuthController())->logout();
        break;
    case 'restaurants':
        (new RestaurantController())->index();
        break;
    case 'restaurant.create':
        (new RestaurantController())->create($method);
        break;
    case 'restaurant.edit':
        (new RestaurantController())->edit($method);
        break;
    case 'restaurant.delete':
        (new RestaurantController())->delete($method);
        break;
    case 'reservations':
        (new ReservationController())->index();
        break;
    case 'reservation.create':
        (new ReservationController())->create($method);
        break;
    case 'reservation.updateStatus':
        (new ReservationController())->updateStatus($method);
        break;
    case 'reservation.delete':
        (new ReservationController())->delete($method);
        break;
    case 'contact':
        (new ContactController())->index($method);
        break;
    case 'dashboard':
        (new DashboardController())->index();
        break;
    case 'admin':
        (new AdminController())->index();
        break;
    case 'admin.users':
        (new AdminController())->users($method);
        break;
    case 'profile':
        (new ProfileController())->index($method);
        break;
    default:
        http_response_code(404);
        view('errors/404', ['title' => '404 Not Found']);
        break;
}
