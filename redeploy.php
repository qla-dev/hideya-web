<?php

declare(strict_types=1);

// Hideya website redeploy. dist/ is committed and served as
// https://qla.dev/hideya, so a redeploy only pulls the latest build.

set_time_limit(0);
ini_set('output_buffering', '0');
ini_set('zlib.output_compression', '0');

if (PHP_SAPI !== 'cli') {
    header('Content-Type: text/plain; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('X-Content-Type-Options: nosniff');
    header('X-Accel-Buffering: no');
}

while (ob_get_level() > 0) {
    ob_end_flush();
}
ob_implicit_flush(true);

$lock = fopen(sys_get_temp_dir().DIRECTORY_SEPARATOR.'hideya-web-redeploy.lock', 'c');
if ($lock === false || ! flock($lock, LOCK_EX | LOCK_NB)) {
    if (PHP_SAPI !== 'cli') {
        http_response_code(409);
    }
    echo "Another redeploy is already running.\n";
    exit(1);
}

$startedAt = time();

foreach ([
    ['label' => 'Pulling latest website', 'command' => 'git pull --ff-only 2>&1'],
    ['label' => 'Current revision', 'command' => 'git log -1 --oneline 2>&1'],
] as $step) {
    echo "\n=== {$step['label']} ===\nCommand: {$step['command']}\n";
    flush();
    $output = [];
    exec('cd '.escapeshellarg(__DIR__).' && '.$step['command'], $output, $exitCode);
    echo implode("\n", $output)."\n";
    if ($exitCode !== 0) {
        if (PHP_SAPI !== 'cli') {
            http_response_code(500);
        }
        echo "{$step['label']} failed with exit code {$exitCode}.\n";
        exit($exitCode);
    }
}

echo "\nRedeploy completed successfully in ".(time() - $startedAt)."s.\n";
