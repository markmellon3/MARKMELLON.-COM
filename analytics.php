<?php
header('Content-Type: application/json');

// You can replace these with real queries to your database or analytics system
$data = [
    'totalVisitors' => 1234,
    'activeUsers' => 12,
    'pageViews' => 4567
];

echo json_encode($data);