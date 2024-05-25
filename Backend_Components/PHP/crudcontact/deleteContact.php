<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$conn = mysqli_connect("localhost", "root", "", "apicontact");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM form WHERE form_id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $response = array("Message" => "Contact Information Deleted!");
        echo json_encode($response);
    } else {
        $response = array("Message" => "Failed to Delete Contact Information, Please try again!");
        echo json_encode($response);
    }
    $stmt->close();
} else {
    $response = array("Message" => "No ID provided");
    echo json_encode($response);
}

$conn->close();
?>