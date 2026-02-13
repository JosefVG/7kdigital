<?php
// api/save_lead.php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(["ok" => false, "message" => "Método no permitido."]);
  exit;
}

require_once __DIR__ . "/db.php";

// Helpers
function clean($v) {
  $v = trim((string)$v);
  return $v;
}

$name    = clean($_POST['name'] ?? "");
$email   = clean($_POST['email'] ?? "");
$budget  = clean($_POST['budget'] ?? "");
$service = clean($_POST['service'] ?? "");
$message = clean($_POST['message'] ?? "");

// Validación básica
if ($name === "" || $email === "" || $budget === "" || $service === "" || $message === "") {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Faltan campos obligatorios."]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Email inválido."]);
  exit;
}

// (Opcional) limita tamaño para evitar basura gigante
if (mb_strlen($message) > 3000) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Mensaje demasiado largo."]);
  exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? null;
$ua = $_SERVER['HTTP_USER_AGENT'] ?? null;

try {
  $stmt = $pdo->prepare("
    INSERT INTO contact_leads (name, email, budget, service, message, ip, user_agent)
    VALUES (:name, :email, :budget, :service, :message, :ip, :ua)
  ");

  $stmt->execute([
    ":name" => $name,
    ":email" => $email,
    ":budget" => $budget,
    ":service" => $service,
    ":message" => $message,
    ":ip" => $ip,
    ":ua" => $ua
  ]);

  echo json_encode(["ok" => true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "message" => "No se pudo guardar."]);
}
