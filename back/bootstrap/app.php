<?php

use App\Http\Middleware\ForceJsonResponse;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use League\OAuth2\Server\Exception\OAuthServerException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        channels: __DIR__.'/../routes/channels.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            ForceJsonResponse::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $unauthenticatedResponse = fn () => response()->json([
            'message' => 'Unauthenticated.',
        ], 401);

        $exceptions->render(function (AuthenticationException $exception, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'message' => 'Unauthenticated.',
                ], 401);
            }

            return null;
        });

        $exceptions->render(function (OAuthServerException $exception, Request $request) use ($unauthenticatedResponse) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return $unauthenticatedResponse();
            }

            return null;
        });

        $exceptions->render(function (UnauthorizedHttpException $exception, Request $request) use ($unauthenticatedResponse) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return $unauthenticatedResponse();
            }

            return null;
        });
    })->create();
