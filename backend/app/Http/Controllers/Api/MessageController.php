<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return response()->json(Message::latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:80'],
            'email' => ['required', 'email', 'max:100'],
            'message' => ['required', 'string', 'min:5', 'max:2000'],
        ]);

        $message = Message::create($data);

        $toAddress = (string) env('CONTACT_RECEIVER_EMAIL', env('MAIL_FROM_ADDRESS', 'hello@example.com'));

        if ($toAddress !== '') {
            Mail::raw(
                "Jauna ziņa no kontaktformas:\n\nVārds: {$data['name']}\nE-pasts: {$data['email']}\n\nZiņa:\n{$data['message']}",
                static function ($mail) use ($toAddress): void {
                    $mail->to($toAddress)->subject('Jauna ziņa no TableTales kontaktformas');
                }
            );
        }

        return response()->json($message, 201);
    }
}
