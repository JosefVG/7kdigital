<?php
// api/db.php
// Cambia estos datos por los de tu hosting
$DB_HOST = "localhost";
$DB_NAME = "kdigitalroot_7kwebsite"; 
$DB_USER = "kdigitalroot_7k";
$DB_PASS = "RY^2.NXbC](a";

try {
  $pdo = new PDO(
    "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
    $DB_USER,
    $DB_PASS,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false
    ]
  );
} catch (Exception $e) {
  http_response_code(500);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode(["ok" => false, "message" => "Error de conexión a la base de datos."]);
  exit;
}
